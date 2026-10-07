const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const resultsHtmlPath = path.join(repoRoot, 'swiggy-instamart', 'results.html');
const hunterJsPath = path.join(repoRoot, 'swiggy-instamart', 'swiggy-hunter.js');
const hunterMinJsPath = path.join(repoRoot, 'swiggy-instamart', 'swiggy-hunter.min.js');

// 1. Load Stores from verified mumbai_pods_with_live_swiggy_addresses.json
let storesData = [];
const livePodsPath = path.join(repoRoot, 'swiggy-instamart', 'mumbai_pods_with_live_swiggy_addresses.json');
const fallbackPodsPath = 'C:\\Users\\Om Computers\\Pictures\\swiggy_new\\mumbai_pods_with_live_swiggy_addresses.json';
const podsJsonPath = fs.existsSync(livePodsPath) ? livePodsPath : fallbackPodsPath;

if (fs.existsSync(podsJsonPath)) {
  const rawPods = JSON.parse(fs.readFileSync(podsJsonPath, 'utf8'));
  storesData = rawPods.map(p => [
    p.podId,
    p.locality,
    p.coordinates?.latitude || 0,
    p.coordinates?.longitude || 0,
    p.liveSwiggyAddress || p.primaryServingAddress || '',
    p.pincode || ''
  ]);
  console.log(`Loaded ${storesData.length} dark stores with pre-saved live Swiggy addresses.`);
} else {
  console.warn('Pods JSON not found, using fallback store array');
}

const rawHtml = fs.readFileSync(resultsHtmlPath, 'utf8');

// 2. Build the hunter script code
function generateHunterCode(stores, tableHtml) {
  const storesJson = JSON.stringify(stores);
  const tableHtmlJson = JSON.stringify(tableHtml);

  return `/**
 * 🛵 Swiggy Instamart Multi-Store Hunter & Real-Time Health Auditor v2.0
 * Injects a floating interactive search GUI directly on swiggy.com/instamart
 * to scan products & audit store serviceability across all 112 Mumbai dark stores.
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
  const REQUEST_GAP_MS = 1000;

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
    return json;
  }

  async function checkStoreStatusViaApi(store) {
    const [podId, loc, lat, lng, defaultAddress, defaultPin] = store;
    const label = loc || \`\${lat}, \${lng}\`;
    
    let res;
    try {
      res = await rateLimitedFetch('/api/instamart/home/select-location/v2', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', accept: '*/*' },
        body: JSON.stringify({ data: { lat, lng, address: label, addressId: '', annotation: label, clientId: 'INSTAMART-APP' } }),
      });
    } catch (e) {
      return {
        store_id: podId || '',
        store_locality: loc || '',
        store_address: defaultAddress || '',
        store_pincode: defaultPin || '',
        maps_url: \`https://www.google.com/maps?q=\${lat},\${lng}\`,
        status: 'Unserviceable',
        status_type: 'unserviceable',
        eta: '-',
        message: 'Network / connection error',
        is_health: true
      };
    }

    if (!res.ok) {
      return {
        store_id: podId || '',
        store_locality: loc || '',
        store_address: defaultAddress || '',
        store_pincode: defaultPin || '',
        maps_url: \`https://www.google.com/maps?q=\${lat},\${lng}\`,
        status: res.status === 400 ? 'Unserviceable' : 'Error',
        status_type: res.status === 400 ? 'unserviceable' : 'error',
        eta: '-',
        message: \`HTTP \${res.status}\`,
        is_health: true
      };
    }

    const json = await res.json();
    if (json.statusCode === 400) {
      return {
        store_id: podId || '',
        store_locality: loc || '',
        store_address: defaultAddress || '',
        store_pincode: defaultPin || '',
        maps_url: \`https://www.google.com/maps?q=\${lat},\${lng}\`,
        status: 'Unserviceable',
        status_type: 'unserviceable',
        eta: '-',
        message: 'Out of Swiggy delivery coverage',
        is_health: true
      };
    }

    const cards = (json.data && json.data.cards) || [];
    let isClosed = false;
    let isComingSoon = false;
    let eta = '';
    let statusMsg = '';

    for (const c of cards) {
      const cardData = c.card && c.card.card;
      if (!cardData) continue;
      
      const layout = cardData.layout || {};
      const bgAsset = String(layout.backgroundAssetId || '');
      if (bgAsset.toLowerCase().includes('closed')) {
        isClosed = true;
      }

      const elements = (cardData.gridElements && cardData.gridElements.infoWithStyle && cardData.gridElements.infoWithStyle.info) || [];
      for (const el of elements) {
        const dyn = el.dynamicWidget;
        if (dyn && dyn.templateValues) {
          const titleText = dyn.templateValues.title && dyn.templateValues.title.value && dyn.templateValues.title.value.text;
          if (titleText && titleText.toLowerCase().includes('coming soon')) {
            isComingSoon = true;
            statusMsg = titleText;
          }
        }
      }

      if (cardData.slaDetails && cardData.slaDetails.slaString) {
        eta = cardData.slaDetails.slaString;
      }
    }

    if (!eta) {
      const rawText = JSON.stringify(cards);
      const etaMatch = rawText.match(/(\\d+\\s*-\\s*\\d+\\s*MINS?|\\d+\\s*MINS?)/i);
      if (etaMatch) eta = etaMatch[1];
    }

    let status = 'Live & Active';
    let statusType = 'live';

    if (isComingSoon) {
      status = 'Coming Soon';
      statusType = 'coming_soon';
    } else if (isClosed) {
      status = 'Temporarily Closed';
      statusType = 'closed';
    }

    return {
      store_id: podId || '',
      store_locality: loc || '',
      store_address: defaultAddress || '',
      store_pincode: defaultPin || '',
      maps_url: \`https://www.google.com/maps?q=\${lat},\${lng}\`,
      status: status,
      status_type: statusType,
      eta: eta || (statusType === 'live' ? 'Active' : '-'),
      message: statusMsg || (statusType === 'live' ? 'Delivering now' : (statusType === 'closed' ? 'Store temporarily paused' : 'Coming soon to area')),
      is_health: true
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

  function productsToRows(products, store) {
    const seen = new Set();
    const rows = [];
    const [podId, locality, lat, lng, defaultAddress, defaultPin] = store;
    const resolvedAddr = store.resolvedAddress || defaultAddress || '';
    const resolvedPin = store.resolvedPincode || defaultPin || '';
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
          store_status: store.status || 'Live & Active',
          delivery_eta: store.eta || '-',
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
  let healthResults = [];
  let currentMode = 'search'; // 'search' | 'health'
  let resultsOpenedForScan = false;

  // 1. Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'sw-hunter-styles';
  styleEl.textContent = \`
    #sw-hunter-overlay {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 480px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 40px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.9);
      z-index: 999999999;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      overflow: hidden;
      animation: swFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes swFadeIn {
      from { opacity: 0; transform: translateY(-12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .sw-h-header {
      background: linear-gradient(135deg, #090d16 0%, #172033 100%);
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
      font-weight: 800;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sw-h-badge {
      background: rgba(255, 122, 26, 0.18);
      border: 1px solid rgba(255, 122, 26, 0.4);
      color: #ff9838;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 14px;
      letter-spacing: 0.03em;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .sw-h-badge-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #10b981;
      display: inline-block;
    }
    .sw-h-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sw-h-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      line-height: 1;
      border-radius: 50%;
      font-size: 13px;
      transition: all 0.15s ease;
    }
    .sw-h-btn:hover {
      background: rgba(255, 255, 255, 0.22);
      transform: scale(1.05);
    }

    /* Mode Tabs */
    .sw-h-tabs {
      display: flex;
      background: #f1f5f9;
      border-radius: 10px;
      padding: 3px;
      gap: 4px;
    }
    .sw-h-tab {
      flex: 1;
      padding: 7px 10px;
      border: none;
      background: transparent;
      color: #64748b;
      font-size: 11.5px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .sw-h-tab.active {
      background: #ffffff;
      color: #0f172a;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }

    .sw-h-body {
      padding: 16px 18px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Search row */
    .sw-h-search-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sw-h-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      background: #f8fafc;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      padding: 0 10px 0 12px;
      transition: all 0.2s ease;
      gap: 8px;
    }
    .sw-h-input-wrap:focus-within {
      border-color: #ff7a1a;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(255, 122, 26, 0.15);
    }
    .sw-h-search-icon {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1;
      flex: none;
    }
    .sw-h-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 0;
      font-size: 13px;
      color: #0f172a;
      outline: none;
      font-weight: 500;
    }
    .sw-h-input::placeholder { color: #94a3b8; font-weight: 400; }
    .sw-h-clear-btn {
      background: #e2e8f0;
      color: #64748b;
      border: none;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 9px;
      line-height: 1;
      flex: none;
      transition: background 0.15s;
    }
    .sw-h-clear-btn:hover { background: #cbd5e1; color: #0f172a; }

    /* Action Buttons */
    .sw-h-submit {
      background: linear-gradient(135deg, #ff7a1a 0%, #ea580c 100%);
      color: #ffffff;
      border: none;
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
      box-shadow: 0 3px 10px rgba(255, 122, 26, 0.35);
      display: flex;
      align-items: center;
      gap: 6px;
      flex: none;
    }
    .sw-h-submit:hover {
      box-shadow: 0 5px 15px rgba(255, 122, 26, 0.45);
      transform: translateY(-1px);
    }
    .sw-h-submit.scanning {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 3px 10px rgba(239, 68, 68, 0.35);
    }

    /* Health Mode Box */
    .sw-h-health-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .sw-h-health-desc {
      font-size: 12px;
      color: #475569;
      line-height: 1.4;
      flex: 1;
    }

    /* Filter Options Row */
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
      gap: 6px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 12px;
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
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.15s;
      max-width: 185px;
    }
    .sw-h-select:focus { border-color: #ff7a1a; }
    .sw-h-upload-link {
      font-size: 11.5px;
      color: #ff7a1a;
      text-decoration: none;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .sw-h-upload-link:hover { text-decoration: underline; }

    /* Live Progress Card */
    .sw-h-live-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 11px 14px;
      display: none;
      flex-direction: column;
      gap: 8px;
      animation: swFadeIn 0.2s ease;
    }
    .sw-h-live-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .sw-h-live-store-info {
      display: flex;
      align-items: center;
      gap: 7px;
      overflow: hidden;
    }
    .sw-h-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff7a1a;
      flex: none;
      animation: swPulse 1.2s infinite;
    }
    @keyframes swPulse {
      0% { transform: scale(0.85); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(0.85); opacity: 0.5; }
    }
    .sw-h-live-store-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sw-h-live-store-sub {
      font-size: 11px;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sw-h-live-pct {
      background: #ffedd5;
      color: #ea580c;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 10px;
      flex: none;
      font-variant-numeric: tabular-nums;
    }
    .sw-h-pbar-wrap {
      width: 100%;
      height: 5px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    .sw-h-pbar-fill {
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #ff7a1a 0%, #10b981 100%);
      transition: width 0.2s ease;
      border-radius: 4px;
    }

    /* Live Summary Box */
    .sw-h-summary {
      display: none;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .sw-h-sum-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px;
      text-align: center;
    }
    .sw-h-sum-val {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      font-variant-numeric: tabular-nums;
    }
    .sw-h-sum-lbl {
      font-size: 9.5px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.03em;
      margin-top: 2px;
    }

    /* Live Preview Table */
    .sw-h-results-box {
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      display: none;
      background: #ffffff;
    }
    .sw-h-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
    }
    .sw-h-table th {
      background: #f8fafc;
      padding: 7px 10px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      position: sticky;
      top: 0;
      z-index: 2;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11px;
    }
    .sw-h-table td {
      padding: 6px 10px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
      vertical-align: middle;
    }
    .sw-h-table tr:hover td { background: #fdfaf6; }
    .sw-h-td-prod {
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 170px;
    }
    .sw-h-thumb {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      object-fit: contain;
      background: #f8fafc;
      flex: none;
      border: 1px solid #e2e8f0;
    }
    .sw-h-prod-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
      font-size: 11px;
    }
    .sw-h-price { font-weight: 800; color: #059669; }
    .sw-h-loc-pill {
      background: #f1f5f9;
      color: #334155;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }
    .sw-h-stock { font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
    .sw-h-in { background: #ecfdf5; color: #065f46; }
    .sw-h-out { background: #fef2f2; color: #991b1b; }

    /* Store Health Badges in HUD */
    .sw-h-health-pill {
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .sw-h-health-pill.live { background: #ecfdf5; color: #065f46; }
    .sw-h-health-pill.closed { background: #fffbeb; color: #92400e; }
    .sw-h-health-pill.coming_soon { background: #fef2f2; color: #991b1b; }
    .sw-h-health-pill.unserviceable { background: #f1f5f9; color: #475569; }

    /* Results Ready Banner */
    .sw-h-banner {
      display: none;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 14px;
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
      padding: 6px 13px;
      border-radius: 7px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(5, 150, 105, 0.3);
      transition: all 0.15s;
    }
    .sw-h-banner.blocked .sw-h-banner-btn {
      background: #d97706;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.3);
    }

    /* Footer Navigation */
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
      background: #f1f5f9;
      color: #64748b;
      border: 1.5px solid #cbd5e1;
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
    }
    .sw-h-page-btn.ready {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
    }
    .sw-h-page-btn.ready:hover {
      background: #1e293b;
      transform: translateY(-1px);
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
    }

    /* Reopen Floating Launcher */
    #sw-hunter-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #090d16 0%, #172033 100%);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 30px;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.4);
      border: 1.5px solid rgba(255, 122, 26, 0.35);
      z-index: 999999998;
      cursor: pointer;
      font-weight: 700;
      font-size: 13px;
      display: none;
      align-items: center;
      gap: 8px;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      transition: transform 0.15s ease;
    }
    #sw-hunter-launcher:hover {
      transform: scale(1.04);
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
        <span>Swiggy Instamart Hunter</span>
        <span class="sw-h-badge" id="sw-h-badge">
          <span class="sw-h-badge-dot"></span>
          <span>\${STORES.length} Pods</span>
        </span>
      </div>
      <div class="sw-h-actions">
        <button class="sw-h-btn" id="sw-h-min" title="Minimize">−</button>
        <button class="sw-h-btn" id="sw-h-close" title="Close">✕</button>
      </div>
    </div>
    <div class="sw-h-body">
      <!-- Mode Tabs -->
      <div class="sw-h-tabs">
        <button class="sw-h-tab active" id="sw-tab-search">🔍 Search Products</button>
        <button class="sw-h-tab" id="sw-tab-health">🏥 Store Health Audit</button>
      </div>

      <!-- Search Input Area -->
      <div id="sw-h-search-section">
        <div class="sw-h-search-box">
          <div class="sw-h-input-wrap">
            <span class="sw-h-search-icon">🔍</span>
            <input type="text" id="sw-h-query" class="sw-h-input" placeholder="Search product (e.g. milk, mobile, lays)..." autocomplete="off" />
            <button id="sw-h-clear" class="sw-h-clear-btn" title="Clear">✕</button>
          </div>
          <button id="sw-h-start-btn" class="sw-h-submit">▶ Start Scan</button>
        </div>
      </div>

      <!-- Store Health Audit Area -->
      <div id="sw-h-health-section" style="display: none;">
        <div class="sw-h-health-box">
          <div class="sw-h-health-desc">
            <b>⚡ Real-Time Pod Health Audit</b><br>
            Pings Swiggy's live API to verify which of the 112 dark stores are actively delivering, closed, or coming soon.
          </div>
          <button id="sw-h-health-btn" class="sw-h-submit" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow: 0 3px 10px rgba(5, 150, 105, 0.35);">⚡ Run Audit</button>
        </div>
      </div>

      <!-- Settings Row -->
      <div class="sw-h-options">
        <label class="sw-h-check" id="sw-h-instock-wrap">
          <input type="checkbox" id="sw-h-instock" checked />
          <span>In-Stock Only</span>
        </label>
        <div class="sw-h-store-wrap">
          <span>Target:</span>
          <select id="sw-h-store" class="sw-h-select">
            <option value="all">All \${STORES.length} Stores</option>
            \${STORES.map((s, i) => \`<option value="\${i}">\${s[1]}</option>\`).join('')}
          </select>
        </div>
        <input type="file" id="sw-h-file" accept=".json" style="display:none;" />
        <span class="sw-h-upload-link" id="sw-h-upload-trigger" title="Upload custom pods JSON">📁 Custom JSON</span>
      </div>

      <!-- Live Progress Card -->
      <div class="sw-h-live-card" id="sw-h-live-card">
        <div class="sw-h-live-head">
          <div class="sw-h-live-store-info">
            <span class="sw-h-pulse-dot"></span>
            <div>
              <div class="sw-h-live-store-title" id="sw-live-store-title">Ready...</div>
              <div class="sw-h-live-store-sub" id="sw-live-store-sub">Ready</div>
            </div>
          </div>
          <span class="sw-h-live-pct" id="sw-live-pct">0%</span>
        </div>
        <div class="sw-h-pbar-wrap">
          <div class="sw-h-pbar-fill" id="sw-h-pbar"></div>
        </div>
      </div>

      <div class="sw-h-banner" id="sw-h-banner"></div>

      <!-- Live Stats -->
      <div class="sw-h-summary" id="sw-h-summary">
        <div class="sw-h-sum-item">
          <div class="sw-h-sum-val" id="sw-sum-val1">0</div>
          <div class="sw-h-sum-lbl" id="sw-sum-lbl1">Items Found</div>
        </div>
        <div class="sw-h-sum-item">
          <div class="sw-h-sum-val" id="sw-sum-val2">0</div>
          <div class="sw-h-sum-lbl" id="sw-sum-lbl2">Stores w/ Stock</div>
        </div>
        <div class="sw-h-sum-item">
          <div class="sw-h-sum-val" id="sw-sum-val3" style="color: #059669;">-</div>
          <div class="sw-h-sum-lbl" id="sw-sum-lbl3">Lowest Price</div>
        </div>
      </div>

      <!-- Live Preview Table -->
      <div class="sw-h-results-box" id="sw-h-results">
        <table class="sw-h-table">
          <thead id="sw-h-thead">
            <tr>
              <th>Product</th>
              <th>Locality</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody id="sw-h-table-body"></tbody>
        </table>
      </div>
    </div>
    <div class="sw-h-footer">
      <button class="sw-h-page-btn" id="sw-h-page">📊 Results Table (0 items)</button>
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
  const tabSearch = document.getElementById('sw-tab-search');
  const tabHealth = document.getElementById('sw-tab-health');
  const searchSection = document.getElementById('sw-h-search-section');
  const healthSection = document.getElementById('sw-h-health-section');
  const instockWrap = document.getElementById('sw-h-instock-wrap');
  const queryInput = document.getElementById('sw-h-query');
  const clearBtn = document.getElementById('sw-h-clear');
  const startBtn = document.getElementById('sw-h-start-btn');
  const healthBtn = document.getElementById('sw-h-health-btn');
  const closeBtn = document.getElementById('sw-h-close');
  const minBtn = document.getElementById('sw-h-min');
  const liveCard = document.getElementById('sw-h-live-card');
  const liveStoreTitle = document.getElementById('sw-live-store-title');
  const liveStoreSub = document.getElementById('sw-live-store-sub');
  const livePct = document.getElementById('sw-live-pct');
  const banner = document.getElementById('sw-h-banner');
  const pbar = document.getElementById('sw-h-pbar');
  const resultsBox = document.getElementById('sw-h-results');
  const thead = document.getElementById('sw-h-thead');
  const tableBody = document.getElementById('sw-h-table-body');
  const summaryBox = document.getElementById('sw-h-summary');
  const sumVal1 = document.getElementById('sw-sum-val1');
  const sumVal2 = document.getElementById('sw-sum-val2');
  const sumVal3 = document.getElementById('sw-sum-val3');
  const sumLbl1 = document.getElementById('sw-sum-lbl1');
  const sumLbl2 = document.getElementById('sw-sum-lbl2');
  const sumLbl3 = document.getElementById('sw-sum-lbl3');
  const csvBtn = document.getElementById('sw-h-csv');
  const pageBtn = document.getElementById('sw-h-page');
  const storeSelect = document.getElementById('sw-h-store');
  const fileInput = document.getElementById('sw-h-file');
  const uploadTrigger = document.getElementById('sw-h-upload-trigger');
  const badgeEl = document.getElementById('sw-h-badge');

  function updateStatusWarn(text) {
    if (liveStoreSub) liveStoreSub.textContent = text;
  }

  // Switch Tabs
  tabSearch.onclick = () => {
    if (isScanning) return;
    currentMode = 'search';
    tabSearch.classList.add('active');
    tabHealth.classList.remove('active');
    searchSection.style.display = 'block';
    healthSection.style.display = 'none';
    instockWrap.style.display = 'flex';
    thead.innerHTML = '<tr><th>Product</th><th>Locality</th><th>Price</th><th>Stock</th></tr>';
    sumLbl1.textContent = 'Items Found';
    sumLbl2.textContent = 'Stores w/ Stock';
    sumLbl3.textContent = 'Lowest Price';
    sumVal3.style.color = '#059669';
    updateResultsButton(searchResults.length);
  };

  tabHealth.onclick = () => {
    if (isScanning) return;
    currentMode = 'health';
    tabHealth.classList.add('active');
    tabSearch.classList.remove('active');
    searchSection.style.display = 'none';
    healthSection.style.display = 'block';
    instockWrap.style.display = 'none';
    thead.innerHTML = '<tr><th>Locality</th><th>Status</th><th>ETA</th><th>Pincode</th></tr>';
    sumLbl1.textContent = '🟢 Live Stores';
    sumLbl2.textContent = '🟡 Closed Stores';
    sumLbl3.textContent = '🔴 Coming Soon';
    sumVal3.style.color = '#991b1b';
    updateResultsButton(healthResults.length);
  };

  // Clear button
  queryInput.oninput = () => {
    clearBtn.style.display = queryInput.value ? 'flex' : 'none';
  };
  clearBtn.onclick = () => {
    queryInput.value = '';
    clearBtn.style.display = 'none';
    queryInput.focus();
  };

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
            p.liveSwiggyAddress || p.primaryServingAddress || p.address || '',
            p.pincode || (p.primaryServingAddress?.match(/\\b(4\\d{5})\\b/) || [''])[0] || ''
          ]);
        }
        STORES = parsed;
        badgeEl.innerHTML = \`<span class="sw-h-badge-dot"></span><span>\${STORES.length} Pods</span>\`;
        storeSelect.innerHTML = \`<option value="all">All \${STORES.length} Stores</option>\` +
          STORES.map((s, i) => \`<option value="\${i}">\${s[1]}</option>\`).join('');
        alert(\`Successfully loaded \${STORES.length} dark stores from custom JSON!\`);
      } catch (err) {
        alert('Error parsing JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  function updateResultsButton(count) {
    if (currentMode === 'health') {
      if (count > 0) {
        pageBtn.className = 'sw-h-page-btn ready';
        pageBtn.innerHTML = \`📊 View Health Report (\${count} Stores) ↗\`;
      } else {
        pageBtn.className = 'sw-h-page-btn';
        pageBtn.innerHTML = '📊 View Health Report (Not run yet)';
      }
    } else {
      if (count > 0) {
        pageBtn.className = 'sw-h-page-btn ready';
        pageBtn.innerHTML = \`📊 Open Results Table (\${count.toLocaleString()} Items) ↗\`;
      } else {
        pageBtn.className = 'sw-h-page-btn';
        pageBtn.innerHTML = '📊 Results Table (No results yet)';
      }
    }
  }

  function showResultsReadyBanner(items, query, opened) {
    if (!banner) return;
    banner.style.display = 'flex';
    const isHealth = (query === 'Store Health Audit');
    const noun = isHealth ? 'store audits' : 'products';

    if (opened) {
      banner.className = 'sw-h-banner opened';
      banner.innerHTML = \`
        <span>✨ <b>\${items.length.toLocaleString()}</b> \${noun} ready! Table opened in new tab ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">View Again</button>
      \`;
    } else {
      banner.className = 'sw-h-banner blocked';
      banner.innerHTML = \`
        <span>🛵 <b>\${items.length.toLocaleString()}</b> \${noun} ready! Click to open report ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">Open Report</button>
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

  // 1. PRODUCT SEARCH SCANNER
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
    liveCard.style.display = 'flex';
    pbar.style.width = '0%';
    resultsBox.style.display = 'block';
    summaryBox.style.display = 'grid';
    if (banner) banner.style.display = 'none';
    tableBody.innerHTML = '';
    searchResults = [];
    updateResultsButton(0);

    const inStockOnly = document.getElementById('sw-h-instock').checked;
    const storeChoice = document.getElementById('sw-h-store').value;
    const targetStores = storeChoice === 'all' ? STORES : [STORES[parseInt(storeChoice, 10)]];

    let storesWithItems = 0;
    let minPriceFound = 999999;

    for (let i = 0; i < targetStores.length; i++) {
      if (abortScan) break;
      const store = targetStores[i];
      const [podId, loc, lat, lng, defaultAddress, defaultPin] = store;
      store.resolvedAddress = defaultAddress || '';
      store.resolvedPincode = defaultPin || '';

      const pct = Math.round(((i + 1) / targetStores.length) * 100);
      pbar.style.width = \`\${pct}%\`;
      livePct.textContent = \`\${pct}%\`;
      liveStoreTitle.textContent = \`[\${i + 1}/\${targetStores.length}] \${loc}\`;
      liveStoreSub.textContent = 'Checking store health & serviceability...';

      try {
        // 1. Pre-check store health & serviceability in real time
        const health = await checkStoreStatusViaApi(store);
        store.status = health.status;
        store.status_type = health.status_type;
        store.eta = health.eta;

        if (inStockOnly && health.status_type !== 'live') {
          liveStoreSub.textContent = \`📍 \${loc} • [\${health.status}] \${health.message} (Skipped)\`;
          if (i < targetStores.length - 1 && !abortScan) await sleep(200);
          continue;
        }

        liveStoreSub.textContent = \`🟢 \${health.status} (\${health.eta}) • Searching "\${query}"...\`;

        // 2. Search products for this active store
        let products = [];
        try {
          products = await searchViaApi(query);
        } catch (err) {
          if (err.rateLimited) {
            liveStoreSub.textContent = \`Rate limit reached for \${loc}. Using DOM fallback...\`;
            products = await searchViaDom(query);
          } else {
            throw err;
          }
        }

        const rows = productsToRows(products, store);
        let storeAdded = false;

        for (const row of rows) {
          if (inStockOnly && row.stock !== 'In stock') continue;

          row.store_status = health.status;
          row.delivery_eta = health.eta;

          searchResults.push(row);
          storeAdded = true;

          const price = row.selling_price_inr;
          if (price && price < minPriceFound) minPriceFound = price;

          const tr = document.createElement('tr');
          const imgTag = row.image_1
            ? \`<img src="\${row.image_1}" class="sw-h-thumb" onerror="this.outerHTML='<span style=\\\\'font-size:15px;\\\\'>🛵</span>'">\`
            : \`<span style="font-size:15px;">🛵</span>\`;
          tr.innerHTML = \`
            <td>
              <div class="sw-h-td-prod">
                \${imgTag}
                <span class="sw-h-prod-title">\${row.name}</span>
              </div>
            </td>
            <td><span class="sw-h-loc-pill">\${row.store_locality}</span></td>
            <td class="sw-h-price">\${price ? '₹' + price : '-'}</td>
            <td><span class="sw-h-stock \${row.stock === 'In stock' ? 'sw-h-in' : 'sw-h-out'}">\${row.stock === 'In stock' ? 'In Stock' : 'Out'}</span></td>
          \`;
          tableBody.appendChild(tr);
          if (tableBody.children.length > 50) {
            tableBody.removeChild(tableBody.firstElementChild);
          }
        }

        if (storeAdded) storesWithItems++;

        sumVal1.textContent = searchResults.length.toLocaleString();
        sumVal2.textContent = \`\${storesWithItems}/\${targetStores.length}\`;
        sumVal3.textContent = minPriceFound < 999999 ? \`₹\${minPriceFound}\` : '-';
        updateResultsButton(searchResults.length);

      } catch (err) {
        console.warn('Scan error for', loc, err);
        liveStoreSub.textContent = \`\${loc} skipped (\${err.message})\`;
      }

      if (i < targetStores.length - 1 && !abortScan) {
        await sleep(350);
      }
    }

    isScanning = false;
    startBtn.innerHTML = '▶ Start Scan';
    startBtn.classList.remove('scanning');
    startBtn.disabled = false;
    liveStoreTitle.textContent = abortScan
      ? \`Scan stopped (\${searchResults.length} items found)\`
      : \`✓ Scan completed! (\${searchResults.length} items found)\`;
    liveStoreSub.textContent = \`Found products across \${storesWithItems} of \${targetStores.length} stores.\`;
    window.swiggyResults = searchResults;
    updateResultsButton(searchResults.length);

    if (searchResults.length > 0 && !resultsOpenedForScan) {
      resultsOpenedForScan = true;
      openBlankResultsTable(searchResults, query, true);
    }
  };

  // 2. STORE HEALTH AUDITOR
  healthBtn.onclick = async () => {
    if (isScanning) {
      abortScan = true;
      healthBtn.textContent = 'Stopping...';
      healthBtn.disabled = true;
      if (healthResults.length > 0 && !resultsOpenedForScan) {
        resultsOpenedForScan = true;
        openBlankResultsTable(healthResults, 'Store Health Audit', false);
      }
      return;
    }

    isScanning = true;
    abortScan = false;
    resultsOpenedForScan = false;
    healthBtn.innerHTML = '⏹ Stop Audit';
    healthBtn.classList.add('scanning');
    liveCard.style.display = 'flex';
    pbar.style.width = '0%';
    resultsBox.style.display = 'block';
    summaryBox.style.display = 'grid';
    if (banner) banner.style.display = 'none';
    tableBody.innerHTML = '';
    healthResults = [];
    updateResultsButton(0);

    const storeChoice = document.getElementById('sw-h-store').value;
    const targetStores = storeChoice === 'all' ? STORES : [STORES[parseInt(storeChoice, 10)]];

    let liveCount = 0, closedCount = 0, comingCount = 0;

    for (let i = 0; i < targetStores.length; i++) {
      if (abortScan) break;
      const store = targetStores[i];
      const [podId, loc, lat, lng, defaultAddress, defaultPin] = store;

      const pct = Math.round(((i + 1) / targetStores.length) * 100);
      pbar.style.width = \`\${pct}%\`;
      livePct.textContent = \`\${pct}%\`;
      liveStoreTitle.textContent = \`[\${i + 1}/\${targetStores.length}] \${loc}\`;
      liveStoreSub.textContent = 'Checking real-time serviceability...';

      try {
        const auditRes = await checkStoreStatusViaApi(store);
        healthResults.push(auditRes);

        if (auditRes.status_type === 'live') liveCount++;
        else if (auditRes.status_type === 'closed') closedCount++;
        else comingCount++;

        liveStoreSub.textContent = \`\${auditRes.status} • \${auditRes.eta !== '-' ? 'ETA: ' + auditRes.eta : auditRes.message}\`;

        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td><b>\${auditRes.store_locality}</b></td>
          <td><span class="sw-h-health-pill \${auditRes.status_type}">\${auditRes.status}</span></td>
          <td>\${auditRes.eta !== '-' ? '⚡ ' + auditRes.eta : '-'}</td>
          <td><span class="sw-h-loc-pill">\${auditRes.store_pincode || '-'}</span></td>
        \`;
        tableBody.appendChild(tr);
        if (tableBody.children.length > 50) {
          tableBody.removeChild(tableBody.firstElementChild);
        }

        sumVal1.textContent = liveCount;
        sumVal2.textContent = closedCount;
        sumVal3.textContent = comingCount;
        updateResultsButton(healthResults.length);

      } catch (err) {
        console.warn('Audit error for', loc, err);
        liveStoreSub.textContent = \`\${loc} skipped (\${err.message})\`;
      }

      if (i < targetStores.length - 1 && !abortScan) {
        await sleep(350);
      }
    }

    isScanning = false;
    healthBtn.innerHTML = '⚡ Run Audit';
    healthBtn.classList.remove('scanning');
    healthBtn.disabled = false;
    liveStoreTitle.textContent = abortScan
      ? \`Audit stopped (\${healthResults.length} stores checked)\`
      : \`✓ Audit Complete! (\${liveCount} Live, \${closedCount} Closed, \${comingCount} Coming Soon)\`;
    liveStoreSub.textContent = \`Checked \${healthResults.length} of \${targetStores.length} dark stores in real time.\`;
    window.swiggyHealthResults = healthResults;
    updateResultsButton(healthResults.length);

    if (healthResults.length > 0 && !resultsOpenedForScan) {
      resultsOpenedForScan = true;
      openBlankResultsTable(healthResults, 'Store Health Audit', true);
    }
  };

  const TABLE_PAGE_HTML = ${tableHtmlJson};

  function openBlankResultsTable(items, query, isAuto = false) {
    if (!items || !items.length) {
      if (!isAuto) alert("No results yet. Run a search or health audit first!");
      return;
    }
    if (currentMode === 'health' || query === 'Store Health Audit') {
      window.swiggyHealthResults = items;
    } else {
      window.swiggyResults = items;
    }

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
    if (currentMode === 'health') {
      const items = healthResults.length ? healthResults : (window.swiggyHealthResults || []);
      openBlankResultsTable(items, 'Store Health Audit', false);
    } else {
      const q = queryInput.value.trim() || '';
      const items = searchResults.length ? searchResults : (window.swiggyResults || []);
      openBlankResultsTable(items, q, false);
    }
  };

  // CSV Export
  csvBtn.onclick = () => {
    if (currentMode === 'health') {
      const items = healthResults.length ? healthResults : (window.swiggyHealthResults || []);
      if (!items.length) {
        alert('No audit results to export. Run Store Health Audit first.');
        return;
      }
      const headers = ['#', 'Store_Locality', 'Store_ID', 'Status', 'Delivery_ETA', 'Status_Message', 'Store_Address', 'Store_Pincode', 'Google_Maps_URL'];
      const rows = items.map((r, i) => [
        i + 1,
        \`"\${(r.store_locality || '').replace(/"/g, '""')}"\`,
        \`"\${r.store_id || ''}"\`,
        \`"\${r.status || ''}"\`,
        \`"\${r.eta || ''}"\`,
        \`"\${(r.message || '').replace(/"/g, '""')}"\`,
        \`"\${(r.store_address || '').replace(/"/g, '""')}"\`,
        \`"\${r.store_pincode || ''}"\`,
        \`"\${r.maps_url || ''}"\`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = \`swiggy_store_health_audit_\${Date.now()}.csv\`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    const items = searchResults.length ? searchResults : (window.swiggyResults || []);
    if (!items.length) {
      alert('No results to export.');
      return;
    }
    const headers = [
      '#',
      'Store_Locality',
      'Store_ID',
      'Store_Status',
      'Delivery_ETA',
      'Store_Address',
      'Store_Pincode',
      'Brand',
      'Product_Title',
      'Quantity',
      'Selling_Price_INR',
      'MRP_INR',
      'Discount_Pct',
      'Stock',
      'Category',
      'Sub_Category',
      'Google_Maps_URL',
      'Product_URL'
    ];
    const rows = items.map((r, i) => [
      i + 1,
      \`"\${(r.store_locality || '').replace(/"/g, '""')}"\`,
      \`"\${r.store_id || ''}"\`,
      \`"\${r.store_status || 'Live & Active'}"\`,
      \`"\${r.delivery_eta || '-'}"\`,
      \`"\${(r.store_address || '').replace(/"/g, '""')}"\`,
      \`"\${r.store_pincode || ''}"\`,
      \`"\${(r.brand || '').replace(/"/g, '""')}"\`,
      \`"\${(r.name || '').replace(/"/g, '""')}"\`,
      \`"\${(r.quantity || '').replace(/"/g, '""')}"\`,
      r.selling_price_inr ?? '',
      r.mrp_inr ?? '',
      r.discount_pct || 0,
      \`"\${r.stock || ''}"\`,
      \`"\${(r.category || '').replace(/"/g, '""')}"\`,
      \`"\${(r.sub_category || '').replace(/"/g, '""')}"\`,
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
fs.writeFileSync(hunterMinJsPath, fullScript, 'utf8');
console.log(`Generated swiggy-hunter.min.js (${fullScript.length} bytes)`);
console.log('Build completed successfully!');
