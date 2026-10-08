/**
 * Blinkit MMR Hunter — scan one search query across every Blinkit dark store
 * in the Mumbai Metropolitan Region.
 *
 * Loaded as a bookmarklet while on https://blinkit.com. Same-origin, so cookies
 * and CORS just work. The store list is fetched from blinkit_mmr.json at run
 * time, so editing that file is enough — nothing to rebuild here.
 *
 * Location is spoofed per request via the lat/lon headers the search API reads;
 * your saved address is never touched.
 */
(function () {
  'use strict';

  document.getElementById('bk-hunter')?.remove();

  const BASE = 'https://asad0406.github.io/blinkit/';
  const STORES_URL = BASE + 'blinkit_mmr.json';
  const RESULTS_URL = BASE + 'results.html';
  const PAGE_SIZE = 12;
  const MAX_GAP_MS = 6000;
  const MAX_TRIES = 4;

  let stores = [];
  let rows = [];
  let scanning = false;
  let abort = false;
  let gap = 1500;            // grows on its own when Blinkit starts throttling
  let throttled = 0;

  // ---------- API ----------

  const text = (n) => (n && n.text) || null;

  const parseProduct = (d) => {
    const cart = d?.atc_action?.add_to_cart?.cart_item || {};
    return {
      product_id: d?.identity?.id ?? null,
      name: text(d.name),
      variant: text(d.variant),
      price: text(d.normal_price),
      mrp: text(d.mrp),
      inventory: d.inventory ?? null,
      merchant_id: cart.merchant_id ?? null,
    };
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /**
   * Blinkit starts returning 429 after roughly 50 rapid searches. Back off
   * exponentially per request, and permanently widen the inter-store gap so the
   * rest of the scan stays under the limit instead of burning through it.
   */
  async function apiFetch(url, hdrs) {
    for (let attempt = 0; ; attempt++) {
      if (abort) throw new Error('aborted');
      const r = await fetch(url, {
        method: 'POST', credentials: 'include', headers: hdrs, body: '{}',
      });
      if (r.ok) return r.json();
      const limited = r.status === 429 || r.status >= 500;
      if (!limited || attempt >= MAX_TRIES - 1) throw new Error(`HTTP ${r.status}`);

      throttled++;
      gap = Math.min(Math.round(gap * 1.5), MAX_GAP_MS);
      const retryAfter = parseFloat(r.headers.get('retry-after')) * 1000;
      const wait = Math.max(retryAfter || 0, 2000 * 2 ** attempt);
      setStatus(`Throttled (HTTP ${r.status}) — waiting ${Math.round(wait / 1000)}s, gap now ${gap}ms…`, true);
      await sleep(wait);
    }
  }

  async function searchStore(query, lat, lng, pages) {
    const hdrs = {
      'Content-Type': 'application/json',
      lat: String(lat),
      lon: String(lng),
      app_client: 'consumer_web',
    };
    const out = [];
    const seen = new Set();
    for (let i = 0; i < pages; i++) {
      const offset = i * PAGE_SIZE;
      const p = new URLSearchParams({
        offset, limit: PAGE_SIZE, q: query, actual_query: query,
        search_type: 'type_to_search', search_method: 'basic',
        page_index: i, tab_position: 0,
      });
      if (offset) {
        p.set('last_snippet_type', 'product_card_snippet_type_2');
        p.set('last_widget_type', 'listing_container');
      }
      const j = await apiFetch(`/v1/layout/search?${p}`, hdrs);
      // any product card variant, not just type_2 — electronics use different snippets
      const batch = (j.response?.snippets || [])
        .filter((s) => String(s.widget_type || '').includes('product_card'))
        .map((s) => parseProduct(s.data));
      if (!batch.length) break;
      let added = 0;
      for (const prod of batch) {
        if (!seen.has(prod.product_id)) { seen.add(prod.product_id); out.push(prod); added++; }
      }
      if (!added) break; // results repeating -> matches exhausted
    }
    return out;
  }

  // ---------- scan ----------

  async function scan() {
    const query = $('bk-q').value.trim();
    if (!query) return setStatus('Enter a search query first.', true);
    const pages = Math.max(1, Math.min(5, +$('bk-pages').value || 1));

    if (!stores.length) {
      setStatus('Loading MMR store list…');
      try {
        stores = window.__BK_STORES__ || await (await fetch(STORES_URL + '?t=' + Date.now())).json();
      } catch (e) {
        return setStatus('Could not load store list: ' + e.message, true);
      }
    }

    rows = [];
    abort = false;
    scanning = true;
    throttled = 0;
    gap = Math.max(200, +$('bk-gap').value || 1500);
    $('bk-go').textContent = '■ Stop';

    let hits = 0;
    let done = 0;
    const total = stores.length;

    // returns the stores that failed, so they can be swept up in a second pass
    async function pass(list, label) {
      const failed = [];
      for (let i = 0; i < list.length; i++) {
        if (abort) { failed.push(...list.slice(i)); break; }
        const s = list[i];
        const [lat, lng] = s.coordinates;
        setStatus(`${label} ${done}/${total} · ${hits} with stock · ${rows.length} rows${failed.length ? ` · ${failed.length} failed` : ''} · ${gap}ms gap`);
        try {
          const products = await searchStore(query, lat, lng, pages);
          if (products.length) hits++;
          for (const prod of products) {
            rows.push({ store_id: s.id, address: s.address || '', lat, lng, accuracy: s.accuracy, ...prod });
          }
          done++;
          render();
        } catch (e) {
          if (String(e.message) === 'aborted') { failed.push(...list.slice(i)); break; }
          failed.push(s);
        }
        if (i < list.length - 1) await sleep(gap);
      }
      return failed;
    }

    let failed = await pass(stores, 'Scanning');

    if (failed.length && !abort) {
      gap = Math.min(Math.max(gap * 2, 2000), MAX_GAP_MS);
      setStatus(`Retrying ${failed.length} failed stores at ${gap}ms…`);
      await sleep(gap);
      failed = await pass(failed, 'Retry');
    }

    scanning = false;
    $('bk-go').textContent = '⚡ Scan MMR';
    setStatus(`${abort ? 'Stopped' : 'Done'} — ${hits}/${total} stores stocked "${query}" · ${rows.length} rows`
      + `${failed.length ? ` · ${failed.length} unreachable` : ''}${throttled ? ` · throttled ${throttled}×` : ''}`);
    window.blinkitRows = rows;
    window.blinkitFailed = failed;
  }

  // ---------- export ----------

  const save = (blob, name) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  };

  const stamp = () => new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');

  /**
   * The results page lives on asad0406.github.io, so it is a separate origin
   * with no CSP of its own — nothing to inject into this page, nothing to
   * rebuild when the page changes. It pings us when it is listening.
   */
  function openResults() {
    if (!rows.length) return setStatus('Nothing to show yet — run a scan first.', true);
    const win = window.open(RESULTS_URL, 'bk-results');
    if (!win) return setStatus('Popup blocked — allow popups for blinkit.com.', true);
    const query = $('bk-q').value.trim();
    const hand = (e) => {
      if (e.source !== win || !e.data || e.data.type !== 'bk-ready') return;
      win.postMessage({ type: 'bk-data', rows, query }, BASE.replace(/\/blinkit\/$/, ''));
      window.removeEventListener('message', hand);
    };
    window.addEventListener('message', hand);
    try { win.focus(); } catch (e) {}
  }

  function toCsv() {
    const cols = ['store_id', 'address', 'lat', 'lng', 'accuracy', 'product_id', 'name', 'variant', 'price', 'mrp', 'inventory', 'merchant_id'];
    const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    return [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n');
  }

  // ---------- UI ----------

  const $ = (id) => document.getElementById(id);

  function setStatus(t, warn) {
    const el = $('bk-status');
    el.textContent = t;
    el.style.color = warn ? '#f87171' : '#94a3b8';
  }

  const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function render() {
    const tbody = $('bk-rows');
    if (!rows.length) { tbody.innerHTML = ''; return; }
    // cheapest first — the point of scanning every store
    const sorted = [...rows].sort((a, b) => (parseFloat(String(a.price).replace(/[^\d.]/g, '')) || 1e9) - (parseFloat(String(b.price).replace(/[^\d.]/g, '')) || 1e9));
    tbody.innerHTML = sorted.map((r) => `<tr>
      <td><a href="https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}" target="_blank" rel="noopener">${r.store_id}</a></td>
      <td>${esc(r.name)}${r.variant ? ` <span class="bk-dim">${esc(r.variant)}</span>` : ''}</td>
      <td class="bk-price">${esc(r.price)}</td>
      <td class="bk-dim">${esc(r.mrp)}</td>
      <td>${r.inventory ?? '-'}</td>
      <td class="bk-dim">${esc(r.merchant_id)}</td>
    </tr>`).join('');
    $('bk-count').textContent = rows.length ? `${rows.length} rows` : '';
  }

  const root = document.createElement('div');
  root.id = 'bk-hunter';
  root.innerHTML = `
    <style>
      #bk-hunter{position:fixed;top:16px;right:16px;z-index:2147483647;width:620px;max-width:calc(100vw - 32px);
        background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:14px;
        font:13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden}
      #bk-hunter *{box-sizing:border-box}
      .bk-head{display:flex;align-items:center;gap:8px;padding:12px 14px;background:#1e293b;border-bottom:1px solid #334155;cursor:move}
      .bk-head b{font-size:14px;flex:1}
      .bk-pill{background:rgba(248,203,70,.15);color:#f8cb46;border:1px solid rgba(248,203,70,.35);
        font-size:11px;font-weight:800;padding:2px 8px;border-radius:20px}
      .bk-x{background:none;border:none;color:#94a3b8;font-size:18px;cursor:pointer;line-height:1;padding:0 4px}
      .bk-body{padding:14px}
      .bk-form{display:flex;gap:8px;margin-bottom:10px}
      #bk-q{flex:1;background:#1e293b;border:1px solid #334155;color:#f8fafc;border-radius:8px;padding:9px 11px;font-size:13px}
      #bk-pages,#bk-gap{background:#1e293b;border:1px solid #334155;color:#f8fafc;border-radius:8px;padding:9px 6px;text-align:center}
      #bk-pages{width:52px}
      #bk-gap{width:72px}
      #bk-go{background:linear-gradient(135deg,#eab308,#f8cb46);color:#0f172a;border:none;border-radius:8px;
        padding:9px 16px;font-weight:800;cursor:pointer;white-space:nowrap}
      .bk-bar{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}
      #bk-status{flex:1;color:#94a3b8;font-size:12px;min-width:160px}
      .bk-btn{background:#1e293b;border:1px solid #334155;color:#cbd5e1;border-radius:7px;padding:6px 11px;font-size:12px;cursor:pointer}
      .bk-btn:hover{border-color:#475569}
      .bk-wrap{max-height:46vh;overflow:auto;border:1px solid #334155;border-radius:9px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th{position:sticky;top:0;background:#1e293b;text-align:left;padding:7px 9px;font-size:11px;
        text-transform:uppercase;letter-spacing:.04em;color:#94a3b8;border-bottom:1px solid #334155}
      td{padding:7px 9px;border-bottom:1px solid #1e293b;vertical-align:top}
      tr:hover td{background:#16213a}
      td a{color:#f8cb46;text-decoration:none}
      .bk-dim{color:#94a3b8}
      .bk-price{font-weight:700;color:#4ade80;white-space:nowrap}
    </style>
    <div class="bk-head">
      <span class="bk-pill">MMR</span><b>Blinkit Hunter</b>
      <span id="bk-count" class="bk-dim" style="font-size:12px"></span>
      <button class="bk-x" id="bk-close" title="Close">×</button>
    </div>
    <div class="bk-body">
      <div class="bk-form">
        <input id="bk-q" placeholder="Search query" value="iphone 17">
        <input id="bk-pages" type="number" min="1" max="5" value="1" title="Pages per store (12 results each)">
        <input id="bk-gap" type="number" min="200" step="100" value="1500" title="Delay between stores in ms. Raised automatically if Blinkit throttles.">
        <button id="bk-go">⚡ Scan MMR</button>
      </div>
      <div class="bk-bar">
        <span id="bk-status">Ready — 146 MMR dark stores, 1500ms apart (~4 min).</span>
        <button class="bk-btn" id="bk-open">↗ Full results</button>
        <button class="bk-btn" id="bk-json">⬇ JSON</button>
        <button class="bk-btn" id="bk-csv">⬇ CSV</button>
      </div>
      <div class="bk-wrap">
        <table><thead><tr>
          <th>Store</th><th>Product</th><th>Price</th><th>MRP</th><th>Stock</th><th>Merchant</th>
        </tr></thead><tbody id="bk-rows"></tbody></table>
      </div>
    </div>`;
  document.body.appendChild(root);

  $('bk-close').onclick = () => { abort = true; root.remove(); };
  $('bk-go').onclick = () => { if (scanning) { abort = true; } else { scan(); } };
  $('bk-q').onkeydown = (e) => { if (e.key === 'Enter' && !scanning) scan(); };
  $('bk-open').onclick = openResults;
  $('bk-json').onclick = () => rows.length
    ? save(new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' }), `blinkit_mmr_${stamp()}.json`)
    : setStatus('Nothing to export yet.', true);
  $('bk-csv').onclick = () => rows.length
    ? save(new Blob([toCsv()], { type: 'text/csv' }), `blinkit_mmr_${stamp()}.csv`)
    : setStatus('Nothing to export yet.', true);

  // drag by the header
  (() => {
    const head = root.querySelector('.bk-head');
    let dx = 0, dy = 0;
    const move = (e) => { root.style.left = e.clientX - dx + 'px'; root.style.top = e.clientY - dy + 'px'; root.style.right = 'auto'; };
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    head.onmousedown = (e) => {
      if (e.target.closest('button')) return;
      const r = root.getBoundingClientRect();
      dx = e.clientX - r.left; dy = e.clientY - r.top;
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    };
  })();

  console.log('Blinkit MMR Hunter ready. Rows land on window.blinkitRows after a scan.');
})();
