const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const resultsHtmlPath = path.join(repoRoot, 'swiggy-instamart', 'results.html');
const hunterJsPath = path.join(repoRoot, 'swiggy-instamart', 'swiggy-hunter.js');
const hunterMinJsPath = path.join(repoRoot, 'swiggy-instamart', 'swiggy-hunter.min.js');

// 1. Load Stores from verified mumbai_pods_primary_addresses.json
let storesData = [];
const podsJsonPath = 'C:\\Users\\Om Computers\\Pictures\\swiggy_new\\mumbai_pods_primary_addresses.json';
if (fs.existsSync(podsJsonPath)) {
  const rawPods = JSON.parse(fs.readFileSync(podsJsonPath, 'utf8'));
  storesData = rawPods.map(p => [
    p.podId,
    p.locality,
    p.coordinates?.latitude || 0,
    p.coordinates?.longitude || 0,
    p.primaryServingAddress || ''
  ]);
  console.log(`Loaded ${storesData.length} dark stores from pods JSON.`);
} else {
  console.warn('Pods JSON not found, using fallback store array');
}

const rawHtml = fs.readFileSync(resultsHtmlPath, 'utf8');

// 2. Build the hunter script code
function generateHunterCode(stores, tableHtml) {
  const storesJson = JSON.stringify(stores);
  const tableHtmlJson = JSON.stringify(tableHtml);

  return `/**
 * 🛵 Swiggy Instamart Multi-Store Hunter v1.0
 * Injects a floating interactive search GUI directly on swiggy.com/instamart
 * to scan all 112 Mumbai dark stores (or custom uploaded pods JSON).
 */
(function() {
  if (window.__SWIGGY_HUNTER_LOADED__) {
    const existing = document.getElementById('sw-hunter-overlay');
    if (existing) existing.style.display = 'flex';
    console.log('🛵 Swiggy Instamart Hunter already active! Reopened window.');
    return;
  }
  window.__SWIGGY_HUNTER_LOADED__ = true;

  let STORES = ${storesJson};

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const money = m => (m && m.units != null ? Number(m.units) + (m.nanos || 0) / 1e9 : null);
  const IMG_BASE = 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/';

  let lastRequestAt = 0;
  const REQUEST_GAP_MS = 1750;

  async function rateLimitedFetch(...args) {
    const wait = lastRequestAt + REQUEST_GAP_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequestAt = Date.now();
    const res = await fetch(...args);
    if (res.status === 429) {
      updateStatusWarn('Rate limited by Swiggy (HTTP 429). Backing off 3.5s...');
      await sleep(3500);
      lastRequestAt = Date.now();
      return fetch(...args);
    }
    return res;
  }

  async function setLocationViaApi({ lat, lng, address }) {
    const label = address || \`\${lat}, \${lng}\`;
    const res = await rateLimitedFetch('/api/instamart/home/select-location/v2', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json', accept: '*/*' },
      body: JSON.stringify({ data: { lat, lng, address: label, addressId: '', annotation: label, clientId: 'INSTAMART-APP' } }),
    });
    if (!res.ok) throw new Error('select-location HTTP ' + res.status);
    const json = await res.json();
    if (json.statusCode === 400) throw new Error(\`not serviceable (\${lat}, \${lng})\`);
    if (json.statusCode !== 0) throw new Error('select-location statusCode ' + json.statusCode + ' ' + (json.statusMessage || ''));
  }

  async function getAddressViaApi(lat, lng) {
    const res = await rateLimitedFetch(\`/api/instamart/maps/address-widgets/v2?lat=\${lat}&lng=\${lng}\`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: { accept: '*/*' },
    });
    if (!res.ok) throw new Error('address-widgets HTTP ' + res.status);
    const json = await res.json();
    const addr = (json.data && json.data.address) || {};
    const meta = addr.metadata || {};
    return {
      address: meta.formattedAddress || addr.subtitle || addr.title || '',
      pincode: meta.postalCode || '',
    };
  }

  const SEARCH_URL = o => \`/api/instamart/search/v2?offset=\${o}&ageConsent=false&voiceSearchTrackingId=&storeId=&primaryStoreId=&secondaryStoreId=\`;

  function gridProducts(json) {
    const out = [];
    const walk = o => {
      if (!o || typeof o !== 'object') return;
      if (Array.isArray(o)) { o.forEach(walk); return; }
      if (Array.isArray(o.variations) && o.variations.length && o.variations[0].price) { out.push(o); return; }
      Object.values(o).forEach(walk);
    };
    for (const c of (json.data && json.data.cards) || []) {
      const type = String((c.card && c.card.card && c.card.card['@type']) || '');
      if (/GridWidget$/.test(type)) walk(c);
    }
    return out;
  }

  async function searchViaApi(query, maxPages = 20) {
    const products = [];
    let offset = 0, searchResultsOffset = null;
    for (let page = 0; page < maxPages; page++) {
      const body = { query };
      if (searchResultsOffset != null) body.searchResultsOffset = Number(searchResultsOffset);

      let json;
      for (let attempt = 0; ; attempt++) {
        const res = await rateLimitedFetch(SEARCH_URL(offset), {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json', accept: '*/*' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('search API returned HTTP ' + res.status);
        json = await res.json();
        if (json.statusCode === 0) break;
        if (json.statusCode === 429 && attempt < 1) {
          updateStatusWarn('Swiggy 429 rate limit payload. Waiting 3.5s...');
          await sleep(3500);
          continue;
        }
        const e = new Error('search API statusCode ' + json.statusCode);
        if (json.statusCode === 429) e.rateLimited = true;
        throw e;
      }

      const list = gridProducts(json);
      products.push(...list);
      const next = json.data && json.data.pageOffset && json.data.pageOffset.nextOffset;
      if (!next) break;
      offset = next;
      searchResultsOffset = json.data.searchResultsOffset;
      await sleep(400);
    }
    return products;
  }

  // DOM Search fallback
  function realClick(el) {
    for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
      el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
    }
  }

  function typeInto(input, text) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    input.focus();
    setter.call(input, text);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  async function waitForEl(fn, timeout = 7000, step = 150) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      const v = fn();
      if (v) return v;
      await sleep(step);
    }
    throw new Error('timeout waiting for DOM element');
  }

  async function runSearchDom(query) {
    let box = document.querySelector('[data-testid="search-page-header-search-bar-input"]');
    if (!box) {
      const trigger = document.querySelector('[data-testid="search-container"]');
      if (trigger) realClick(trigger);
      box = await waitForEl(() => document.querySelector('[data-testid="search-page-header-search-bar-input"]'));
    }
    typeInto(box, query);
    await sleep(200);
    const form = box.closest('form');
    if (form) form.requestSubmit();
    await waitForEl(() => document.querySelector('[data-testid="item-collection-card-full"]'), 10000, 100);
  }

  function findScroller() {
    let el = document.querySelector('[data-testid="item-collection-card-full"]');
    while (el) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el;
      el = el.parentElement;
    }
    return document.scrollingElement || document.body;
  }

  async function loadAllResultsDom(maxRounds = 40, patienceMs = 1200) {
    const scroller = findScroller();
    const cardCount = () => document.querySelectorAll('[data-testid="item-collection-card-full"]').length;
    let last = cardCount(), lastHeight = scroller.scrollHeight, idle = 0;
    for (let i = 0; i < maxRounds && idle < 2; i++) {
      scroller.scrollTop = scroller.scrollHeight;
      const t0 = Date.now();
      let grew = false;
      while (Date.now() - t0 < patienceMs) {
        await sleep(90);
        if (cardCount() > last || scroller.scrollHeight > lastHeight) { grew = true; break; }
      }
      if (grew) await sleep(150);
      last = cardCount();
      lastHeight = scroller.scrollHeight;
      idle = grew ? 0 : idle + 1;
    }
  }

  function cardDataFiber(card) {
    const rk = Object.keys(card).find(k => k.startsWith('__reactInternalInstance') || k.startsWith('__reactFiber'));
    let fiber = rk ? card[rk] : null;
    for (let i = 0; fiber && i < 10; i++, fiber = fiber['return']) {
      const d = fiber.memoizedProps && fiber.memoizedProps.data;
      if (d && Array.isArray(d.variations)) return d;
    }
    return null;
  }

  async function searchViaDom(query) {
    await runSearchDom(query);
    await loadAllResultsDom();
    const products = [];
    for (const card of document.querySelectorAll('[data-testid="item-collection-card-full"]')) {
      const d = cardDataFiber(card);
      if (d) products.push(d);
    }
    return products;
  }

  function productsToRows(products, store) {
    const seen = new Set();
    const rows = [];
    const [podId, locality, lat, lng, defaultAddress] = store;
    const resolvedAddr = store.resolvedAddress || defaultAddress || '';
    const resolvedPin = store.resolvedPincode || '';
    const maps = \`https://www.google.com/maps?q=\${lat},\${lng}\`;

    for (const d of products) {
      for (const v of d.variations || []) {
        const price = v.price || {};
        const mrp = money(price.mrp);
        const sell = money(price.offerPrice);
        const inStock = !(d.inStock === false || (v.inventory && v.inventory.inStock === false));
        const key = v.skuId || (d.productId + (v.quantityDescription || ''));
        if (seen.has(key)) continue;
        seen.add(key);

        const rawName = (v.displayName || d.displayName || '').trim();
        const qty = (v.quantityDescription || '').trim();

        const row = {
          store_id: podId || '',
          store_locality: locality || '',
          store_address: resolvedAddr,
          store_pincode: resolvedPin,
          maps_url: maps,
          name: rawName,
          brand: v.brandName || d.brand || '',
          quantity: qty,
          stock: inStock ? 'In stock' : 'Sold out',
          mrp_inr: mrp,
          selling_price_inr: sell,
          discount_pct: (mrp && sell && mrp > sell) ? Math.round(((mrp - sell) / mrp) * 1000) / 10 : 0,
          category: v.category || d.category || '',
          sub_category: v.subCategoryType || d.subCategoryType || '',
          product_id: d.productId || '',
          image_1: (v.imageIds && v.imageIds[0]) ? IMG_BASE + v.imageIds[0] : (d.images && d.images[0] ? IMG_BASE + d.images[0] : ''),
          product_url: d.productId ? \`https://www.swiggy.com/instamart/item/\${d.productId}\` : ''
        };
        rows.push(row);
      }
    }
    return rows;
  }

  let isScanning = false;
  let abortScan = false;
  let searchResults = [];
  let resultsOpenedForScan = false;

  // 1. Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'sw-hunter-styles';
  styleEl.textContent = \`
    #sw-hunter-overlay {
      position: fixed;
      top: 24px;
      right: 24px;
      width: 480px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 48px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28), 0 4px 16px rgba(15, 23, 42, 0.08);
      z-index: 999999999;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      border: 1px solid rgba(203, 213, 225, 0.9);
      overflow: hidden;
      animation: swFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes swFadeIn {
      from { opacity: 0; transform: translateY(-12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .sw-h-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 13px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .sw-h-title {
      font-size: 14.5px;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sw-h-badge {
      background: #ff7a1a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      padding: 2.5px 8px;
      border-radius: 12px;
      letter-spacing: 0.04em;
      box-shadow: 0 2px 6px rgba(255, 122, 26, 0.35);
    }
    .sw-h-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sw-h-btn {
      background: transparent;
      border: none;
      color: #ffffff;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      line-height: 1;
      opacity: 0.8;
      border-radius: 50%;
      font-size: 14px;
      transition: all 0.15s ease;
    }
    .sw-h-btn:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.16);
      transform: scale(1.05);
    }

    .sw-h-body {
      padding: 16px 18px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sw-h-input-group {
      display: flex;
      gap: 10px;
    }
    .sw-h-input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1.5px solid #e2e8f0;
      font-size: 13.5px;
      background: #f8fafc;
      color: #0f172a;
      outline: none;
      transition: all 0.15s ease;
    }
    .sw-h-input:focus {
      border-color: #ff7a1a;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(255, 122, 26, 0.16);
    }
    .sw-h-input::placeholder { color: #94a3b8; }
    .sw-h-submit {
      background: linear-gradient(135deg, #ff7a1a 0%, #e5660a 100%);
      color: #ffffff;
      border: none;
      padding: 10px 18px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(255, 122, 26, 0.35);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sw-h-submit:hover {
      box-shadow: 0 6px 18px rgba(255, 122, 26, 0.45);
      transform: translateY(-1px);
    }
    .sw-h-submit.scanning {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
    }
    .sw-h-submit.scanning:hover {
      box-shadow: 0 6px 18px rgba(239, 68, 68, 0.45);
    }
    .sw-h-submit:disabled {
      opacity: 0.65;
      cursor: not-allowed;
      transform: none;
    }

    .sw-h-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #475569;
      flex-wrap: wrap;
      gap: 8px;
    }
    .sw-h-check {
      display: flex;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      user-select: none;
      font-weight: 500;
    }
    .sw-h-check input[type="checkbox"] {
      accent-color: #ff7a1a;
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
    .sw-h-store-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sw-h-select {
      padding: 5px 10px;
      border-radius: 8px;
      border: 1.5px solid #e2e8f0;
      font-size: 11.5px;
      outline: none;
      background: #f8fafc;
      color: #334155;
      font-weight: 500;
      cursor: pointer;
      transition: border-color 0.15s;
      max-width: 190px;
    }
    .sw-h-select:focus { border-color: #ff7a1a; }

    .sw-h-upload-link {
      font-size: 11px;
      color: #ff7a1a;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .sw-h-upload-link:hover {
      text-decoration: underline;
    }

    .sw-h-progress-bar-bg {
      width: 100%;
      height: 4px;
      background: #f1f5f9;
      border-radius: 2px;
      overflow: hidden;
      display: none;
      margin: 2px 0;
    }
    .sw-h-progress-bar-fill {
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #ff7a1a, #10b981);
      transition: width 0.2s ease;
    }
    .sw-h-status {
      font-size: 11.5px;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 18px;
      font-weight: 500;
    }
    .sw-h-status-left {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sw-h-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      display: inline-block;
      flex: none;
    }
    .sw-h-dot.pulse {
      background: #ff7a1a;
      animation: swPulse 1.2s infinite;
    }
    @keyframes swPulse {
      0% { opacity: 0.3; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.15); }
      100% { opacity: 0.3; transform: scale(0.9); }
    }
    .sw-h-count-badge {
      background: #fff7ed;
      color: #ff7a1a;
      font-weight: 700;
      font-size: 10.5px;
      padding: 2px 8px;
      border-radius: 10px;
      display: none;
      flex: none;
    }

    .sw-h-banner {
      display: none;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 9px 13px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
      animation: swFadeIn 0.2s ease;
    }
    .sw-h-banner.opened {
      background: #ecfdf5;
      border: 1.5px solid #a7f3d0;
      color: #065f46;
    }
    .sw-h-banner.blocked {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      color: #92400e;
    }
    .sw-h-banner-btn {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: opacity 0.15s;
    }
    .sw-h-banner.blocked .sw-h-banner-btn {
      background: #d97706;
    }
    .sw-h-banner-btn:hover { opacity: 0.92; }

    .sw-h-summary {
      display: none;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      background: #f8fafc;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }
    .sw-h-sum-item { text-align: center; }
    .sw-h-sum-val { font-size: 15px; font-weight: 800; color: #0f172a; }
    .sw-h-sum-lbl { font-size: 9.5px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.03em; margin-top: 2px; }

    .sw-h-results-box {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      display: none;
    }
    .sw-h-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    .sw-h-table th {
      background: #f1f5f9;
      padding: 7px 10px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      position: sticky;
      top: 0;
      z-index: 2;
      border-bottom: 1px solid #e2e8f0;
    }
    .sw-h-table td {
      padding: 7px 10px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    .sw-h-table tr:hover td { background: #f8fafc; }
    .sw-h-price { font-weight: 800; color: #059669; }
    .sw-h-stock { font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
    .sw-h-in { background: #ecfdf5; color: #065f46; }
    .sw-h-out { background: #fef2f2; color: #991b1b; }

    .sw-h-footer {
      padding: 12px 18px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sw-h-page-btn {
      flex: 1;
      background: #ff7a1a;
      color: #ffffff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
      box-shadow: 0 2px 8px rgba(255, 122, 26, 0.25);
    }
    .sw-h-page-btn:hover {
      background: #e5660a;
      box-shadow: 0 4px 12px rgba(255, 122, 26, 0.35);
    }
    .sw-h-tool-btn {
      background: #ffffff;
      color: #334155;
      border: 1.5px solid #e2e8f0;
      padding: 7px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .sw-h-tool-btn:hover {
      border-color: #cbd5e1;
      background: #f1f5f9;
      color: #0f172a;
    }

    /* Reopen Floating Launcher */
    #sw-hunter-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 30px;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
      z-index: 999999998;
      cursor: pointer;
      font-weight: 700;
      font-size: 13px;
      display: none;
      align-items: center;
      gap: 8px;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    #sw-hunter-launcher:hover {
      transform: scale(1.04);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.45);
    }
  \`;
  document.head.appendChild(styleEl);

  // 2. Inject HTML Overlay
  const overlay = document.createElement('div');
  overlay.id = 'sw-hunter-overlay';
  overlay.innerHTML = \`
    <div class="sw-h-header">
      <div class="sw-h-title">
        <span style="font-size: 16px;">🛵</span>
        <span>Instamart Hunter</span>
        <span class="sw-h-badge" id="sw-h-badge">\${STORES.length} STORES</span>
      </div>
      <div class="sw-h-actions">
        <button class="sw-h-btn" id="sw-h-min" title="Minimize">−</button>
        <button class="sw-h-btn" id="sw-h-close" title="Close">✕</button>
      </div>
    </div>
    <div class="sw-h-body">
      <div class="sw-h-input-group">
        <input type="text" id="sw-h-query" class="sw-h-input" placeholder="Search product (e.g. butter, amul milk, coke, atta)..." />
        <button id="sw-h-start-btn" class="sw-h-submit">🛵 Scan Stores</button>
      </div>
      <div class="sw-h-options">
        <label class="sw-h-check">
          <input type="checkbox" id="sw-h-instock" checked />
          <span>In-Stock Only</span>
        </label>
        <div class="sw-h-store-wrap">
          <span>Store:</span>
          <select id="sw-h-store" class="sw-h-select">
            <option value="all">All \${STORES.length} Stores</option>
            \${STORES.map((s, i) => \`<option value="\${i}">\${s[1]}</option>\`).join('')}
          </select>
        </div>
        <input type="file" id="sw-h-file" accept=".json" style="display:none;" />
        <span class="sw-h-upload-link" id="sw-h-upload-trigger" title="Upload custom pods JSON">📁 Upload JSON</span>
      </div>
      <div class="sw-h-progress-bar-bg" id="sw-h-pbar-bg">
        <div class="sw-h-progress-bar-fill" id="sw-h-pbar"></div>
      </div>
      <div class="sw-h-status" id="sw-h-status">
        <div class="sw-h-status-left">
          <span class="sw-h-dot" id="sw-h-dot"></span>
          <span id="sw-h-status-text">Ready to search.</span>
        </div>
        <span class="sw-h-count-badge" id="sw-h-count"></span>
      </div>
      <div class="sw-h-banner" id="sw-h-banner"></div>
      <div class="sw-h-summary" id="sw-h-summary">
        <div class="sw-h-sum-item">
          <div class="sw-h-sum-val" id="sw-sum-stores">0</div>
          <div class="sw-h-sum-lbl">Stores Found</div>
        </div>
        <div class="sw-h-sum-item">
          <div class="sw-h-sum-val" id="sw-sum-items">0</div>
          <div class="sw-h-sum-lbl">Items</div>
        </div>
        <div class="sw-h-sum-item">
          <div class="sw-h-sum-val" id="sw-sum-min" style="color: #059669;">-</div>
          <div class="sw-h-sum-lbl">Min Price</div>
        </div>
      </div>
      <div class="sw-h-results-box" id="sw-h-results">
        <table class="sw-h-table">
          <thead>
            <tr>
              <th>Locality</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody id="sw-h-table-body"></tbody>
        </table>
      </div>
    </div>
    <div class="sw-h-footer">
      <button class="sw-h-page-btn" id="sw-h-page">🌐 Results Table ↗</button>
      <button class="sw-h-tool-btn" id="sw-h-csv">⬇ Export CSV</button>
    </div>
  \`;
  document.body.appendChild(overlay);

  // Drag the panel by its header
  const header = overlay.querySelector('.sw-h-header');
  header.style.cursor = 'move';
  header.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    const rect = overlay.getBoundingClientRect();
    const offX = e.clientX - rect.left, offY = e.clientY - rect.top;
    overlay.style.right = 'auto';
    overlay.style.bottom = 'auto';
    const onMove = (ev) => {
      overlay.style.left = Math.max(0, ev.clientX - offX) + 'px';
      overlay.style.top = Math.max(0, ev.clientY - offY) + 'px';
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    e.preventDefault();
  });

  // 3. Inject Launcher Pill
  const launcher = document.createElement('div');
  launcher.id = 'sw-hunter-launcher';
  launcher.innerHTML = \`🛵 <span>Instamart Hunter</span>\`;
  document.body.appendChild(launcher);

  // UI Event Handlers
  const queryInput = document.getElementById('sw-h-query');
  const startBtn = document.getElementById('sw-h-start-btn');
  const closeBtn = document.getElementById('sw-h-close');
  const minBtn = document.getElementById('sw-h-min');
  const statusText = document.getElementById('sw-h-status-text');
  const statusDot = document.getElementById('sw-h-dot');
  const countBadge = document.getElementById('sw-h-count');
  const banner = document.getElementById('sw-h-banner');
  const pbarBg = document.getElementById('sw-h-pbar-bg');
  const pbar = document.getElementById('sw-h-pbar');
  const resultsBox = document.getElementById('sw-h-results');
  const tableBody = document.getElementById('sw-h-table-body');
  const summaryBox = document.getElementById('sw-h-summary');
  const csvBtn = document.getElementById('sw-h-csv');
  const storeSelect = document.getElementById('sw-h-store');
  const fileInput = document.getElementById('sw-h-file');
  const uploadTrigger = document.getElementById('sw-h-upload-trigger');
  const badgeEl = document.getElementById('sw-h-badge');

  function updateStatusWarn(text) {
    if (statusText) statusText.textContent = text;
  }

  // Custom JSON Upload Handler
  uploadTrigger.onclick = () => fileInput.click();
  fileInput.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        if (!Array.isArray(json) || !json.length) {
          alert('Invalid JSON file. Expected an array of dark stores.');
          return;
        }
        let parsed = [];
        if (Array.isArray(json[0])) {
          parsed = json;
        } else {
          parsed = json.map(p => [
            p.podId || p.id || '',
            p.locality || p.name || 'Store',
            p.coordinates?.latitude || p.lat || 0,
            p.coordinates?.longitude || p.lng || 0,
            p.primaryServingAddress || p.address || ''
          ]);
        }
        STORES = parsed;
        badgeEl.textContent = \`\${STORES.length} STORES\`;
        storeSelect.innerHTML = \`<option value="all">All \${STORES.length} Stores</option>\` +
          STORES.map((s, i) => \`<option value="\${i}">\${s[1]}</option>\`).join('');
        alert(\`Successfully loaded \${STORES.length} dark stores from custom JSON!\`);
      } catch (err) {
        alert('Error parsing JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  function showResultsReadyBanner(items, query, opened) {
    if (!banner) return;
    banner.style.display = 'flex';
    if (opened) {
      banner.className = 'sw-h-banner opened';
      banner.innerHTML = \`
        <span>✨ <b>\${items.length}</b> products found! Results opened in new tab ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">View Again</button>
      \`;
    } else {
      banner.className = 'sw-h-banner blocked';
      banner.innerHTML = \`
        <span>🛵 <b>\${items.length}</b> products ready! Click to open table ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">Open Results</button>
      \`;
    }
    const bBtn = document.getElementById('sw-h-banner-btn');
    if (bBtn) {
      bBtn.onclick = () => openBlankResultsTable(items, query, false);
    }
  }

  closeBtn.onclick = () => {
    overlay.style.display = 'none';
    launcher.style.display = 'flex';
  };
  minBtn.onclick = () => {
    overlay.style.display = 'none';
    launcher.style.display = 'flex';
  };
  launcher.onclick = () => {
    overlay.style.display = 'flex';
    launcher.style.display = 'none';
  };

  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startBtn.click();
  });

  // Main Search Runner
  startBtn.onclick = async () => {
    const query = queryInput.value.trim();
    if (!query) {
      queryInput.focus();
      return;
    }

    if (isScanning) {
      abortScan = true;
      startBtn.textContent = 'Stopping...';
      startBtn.disabled = true;
      if (searchResults.length > 0 && !resultsOpenedForScan) {
        resultsOpenedForScan = true;
        openBlankResultsTable(searchResults, query, false);
      }
      return;
    }

    isScanning = true;
    abortScan = false;
    resultsOpenedForScan = false;
    startBtn.innerHTML = '⏹ Stop Scan';
    startBtn.classList.add('scanning');
    pbarBg.style.display = 'block';
    pbar.style.width = '0%';
    resultsBox.style.display = 'block';
    summaryBox.style.display = 'grid';
    if (banner) banner.style.display = 'none';
    tableBody.innerHTML = '';
    searchResults = [];
    statusDot.className = 'sw-h-dot pulse';

    const inStockOnly = document.getElementById('sw-h-instock').checked;
    const storeChoice = document.getElementById('sw-h-store').value;
    const targetStores = storeChoice === 'all' ? STORES : [STORES[parseInt(storeChoice, 10)]];

    let storesWithItems = 0;
    let minPriceFound = 999999;

    for (let i = 0; i < targetStores.length; i++) {
      if (abortScan) break;
      const store = targetStores[i];
      const [podId, loc, lat, lng, defaultAddress] = store;
      const pct = Math.round(((i + 1) / targetStores.length) * 100);
      pbar.style.width = \`\${pct}%\`;
      statusText.textContent = \`[\${i + 1}/\${targetStores.length}] Checking \${loc}...\`;

      try {
        // Location update via Swiggy API
        await setLocationViaApi({ lat, lng, address: loc });
        try {
          const resolved = await getAddressViaApi(lat, lng);
          store.resolvedAddress = resolved.address;
          store.resolvedPincode = resolved.pincode;
        } catch (e) {
          store.resolvedAddress = defaultAddress || '';
          store.resolvedPincode = '';
        }

        let products = [];
        try {
          products = await searchViaApi(query);
        } catch (err) {
          if (err.rateLimited) {
            statusText.textContent = \`[\${i + 1}/\${targetStores.length}] DOM fallback for \${loc}...\`;
            products = await searchViaDom(query);
          } else {
            throw err;
          }
        }

        const rows = productsToRows(products, store);
        let storeAdded = false;

        for (const row of rows) {
          if (inStockOnly && row.stock !== 'In stock') continue;

          searchResults.push(row);
          storeAdded = true;

          const price = row.selling_price_inr;
          if (price && price < minPriceFound) minPriceFound = price;

          // Append preview row to UI table
          const tr = document.createElement('tr');
          tr.innerHTML = \`
            <td><b>\${row.store_locality}</b></td>
            <td>\${row.name}</td>
            <td class="sw-h-price">\${price ? '₹' + price : '-'}</td>
            <td><span class="sw-h-stock \${row.stock === 'In stock' ? 'sw-h-in' : 'sw-h-out'}">\${row.stock === 'In stock' ? 'In Stock' : 'Out'}</span></td>
          \`;
          tableBody.appendChild(tr);
        }

        if (storeAdded) storesWithItems++;

        // Update live metrics
        document.getElementById('sw-sum-stores').textContent = storesWithItems;
        document.getElementById('sw-sum-items').textContent = searchResults.length;
        document.getElementById('sw-sum-min').textContent = minPriceFound < 999999 ? \`₹\${minPriceFound}\` : '-';
        countBadge.style.display = searchResults.length ? 'inline-block' : 'none';
        countBadge.textContent = \`\${searchResults.length} found\`;

      } catch (err) {
        console.warn('Scan error for', loc, err);
        statusText.textContent = \`[\${i + 1}/\${targetStores.length}] \${loc} skipped (\${err.message})\`;
      }

      if (i < targetStores.length - 1 && !abortScan) {
        await sleep(400);
      }
    }

    isScanning = false;
    startBtn.innerHTML = '🛵 Scan Stores';
    startBtn.classList.remove('scanning');
    startBtn.disabled = false;
    statusDot.className = 'sw-h-dot';
    countBadge.style.display = searchResults.length ? 'inline-block' : 'none';
    countBadge.textContent = \`\${searchResults.length} total\`;
    statusText.textContent = abortScan
      ? \`Scan stopped (\${searchResults.length} items found).\`
      : \`✓ Done! Scanned \${targetStores.length} stores (\${searchResults.length} items found).\`;
    window.swiggyResults = searchResults;

    // Auto open results once done or stopped
    if (searchResults.length > 0 && !resultsOpenedForScan) {
      resultsOpenedForScan = true;
      openBlankResultsTable(searchResults, query, true);
    }
  };

  const TABLE_PAGE_HTML = ${tableHtmlJson};

  function openBlankResultsTable(items, query, isAuto = false) {
    if (!items || !items.length) {
      if (!isAuto) alert("No results yet. Run a search first!");
      return;
    }
    window.swiggyResults = items;
    let win = null;
    try {
      win = window.open("", "_blank");
    } catch (e) {
      console.warn("window.open error:", e);
    }
    if (!win || win.closed || typeof win.closed === "undefined") {
      if (typeof showResultsReadyBanner === "function") showResultsReadyBanner(items, query, false);
      if (!isAuto) alert("Popup blocked! Please allow popups for swiggy.com to view results.");
      return;
    }
    const nonce = document.querySelector('script[nonce]')?.nonce || document.querySelector('script[nonce]')?.getAttribute('nonce') || '';
    const nonceAttr = nonce ? \` nonce="\${nonce}"\` : '';
    const safeData = JSON.stringify(items).replace(/<\\/script/gi, '<\\\\/script');
    const safeQuery = JSON.stringify(query || '');
    const injection = \`DATA = \${safeData};\\n    currentQuery = \${safeQuery};\\n    initData(DATA, currentQuery);\`;
    let html = TABLE_PAGE_HTML
      .replace('<style id="app-style">', \`<style id="app-style"\${nonceAttr}>\`)
      .replace('<script id="app-script">', \`<script id="app-script"\${nonceAttr}>\`)
      .replace('/* __DATA_INJECTION__ */', injection);
    win.document.open();
    win.document.write(html);
    win.document.close();
    try { win.focus(); } catch (e) {}
    if (typeof showResultsReadyBanner === "function") showResultsReadyBanner(items, query, true);
  }

  document.getElementById('sw-h-page').onclick = () => {
    const q = queryInput.value.trim() || '';
    const items = searchResults.length ? searchResults : (window.swiggyResults || []);
    openBlankResultsTable(items, q, false);
  };

  // CSV Export
  csvBtn.onclick = () => {
    const items = searchResults.length ? searchResults : (window.swiggyResults || []);
    if (!items.length) {
      alert('No results to export.');
      return;
    }
    const headers = [
      '#',
      'Store_Locality',
      'Store_ID',
      'Brand',
      'Product_Name',
      'Quantity',
      'Selling_Price_INR',
      'MRP_INR',
      'Discount_Pct',
      'Stock',
      'Category',
      'Sub_Category',
      'Store_Address',
      'Google_Maps_URL',
      'Product_URL'
    ];
    const rows = searchResults.map((r, i) => [
      i + 1,
      \`"\${(r.store_locality || '').replace(/"/g, '""')}"\`,
      \`"\${r.store_id || ''}"\`,
      \`"\${(r.brand || '').replace(/"/g, '""')}"\`,
      \`"\${(r.name || '').replace(/"/g, '""')}"\`,
      \`"\${(r.quantity || '').replace(/"/g, '""')}"\`,
      r.selling_price_inr ?? '',
      r.mrp_inr ?? '',
      r.discount_pct || 0,
      \`"\${r.stock || ''}"\`,
      \`"\${(r.category || '').replace(/"/g, '""')}"\`,
      \`"\${(r.sub_category || '').replace(/"/g, '""')}"\`,
      \`"\${(r.store_address || '').replace(/"/g, '""')}"\`,
      \`"\${r.maps_url || ''}"\`,
      \`"\${r.product_url || ''}"\`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const q = queryInput.value.trim() || 'all_stores';
    a.download = \`swiggy_instamart_\${q.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_\${Date.now()}.csv\`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

})();
`;
}

// 3. Generate unminified swiggy-hunter.js
const fullScript = generateHunterCode(storesData, rawHtml);
fs.writeFileSync(hunterJsPath, fullScript, 'utf8');
console.log(`Generated swiggy-hunter.js (${fullScript.length} bytes)`);

// 4. Generate minified swiggy-hunter.min.js
// Since TABLE_PAGE_HTML contains full HTML strings, we keep it intact and output directly
fs.writeFileSync(hunterMinJsPath, fullScript, 'utf8');
console.log(`Generated swiggy-hunter.min.js (${fullScript.length} bytes)`);
console.log('Build completed successfully!');
