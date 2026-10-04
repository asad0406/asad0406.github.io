/**
 * Croma Mumbai Hunter — Single-SKU Stock & Fulfillment Scanner
 * Designed with Apple / Linear Glassmorphism HUD aesthetics.
 * Scans one product across 86+ Mumbai & MMR pincodes in real-time.
 * Evaluates both Store Express (SDEL) and Warehouse Dispatch (HDEL) simultaneously.
 */

(function () {
  'use strict';

  // Clean up any existing instance to ensure fresh state and latest code execution
  const existing = document.getElementById('croma-hunter-root');
  if (existing) {
    existing.remove();
  }

  // 1. Mumbai & MMR Pincode Database (86 Pincodes across 4 Zones)
  const MUMBAI_PINCODES = [
    // South Mumbai
    { pin: "400001", area: "Fort / Colaba / Ballard Estate", zone: "South Mumbai" },
    { pin: "400002", area: "Kalbadevi / Marine Lines", zone: "South Mumbai" },
    { pin: "400003", area: "Mandvi / Masjid Bunder", zone: "South Mumbai" },
    { pin: "400004", area: "Girgaon / Charni Road", zone: "South Mumbai" },
    { pin: "400005", area: "Colaba / Cuffe Parade", zone: "South Mumbai" },
    { pin: "400006", area: "Malabar Hill / Walkeshwar", zone: "South Mumbai" },
    { pin: "400007", area: "Grant Road / Nana Chowk", zone: "South Mumbai" },
    { pin: "400008", area: "Mumbai Central / Tardeo", zone: "South Mumbai" },
    { pin: "400009", area: "Chinchbunder / Dongri", zone: "South Mumbai" },
    { pin: "400010", area: "Mazgaon / Dockyard", zone: "South Mumbai" },
    { pin: "400011", area: "Jacob Circle / Mahalaxmi", zone: "South Mumbai" },
    { pin: "400012", area: "Parel / Lalbaug", zone: "South Mumbai" },
    { pin: "400013", area: "Lower Parel / Delisle Road", zone: "South Mumbai" },
    { pin: "400014", area: "Dadar East / Wadala", zone: "South Mumbai" },
    { pin: "400015", area: "Sewri", zone: "South Mumbai" },
    { pin: "400016", area: "Mahim", zone: "South Mumbai" },
    { pin: "400018", area: "Worli / Century Bhavan", zone: "South Mumbai" },
    { pin: "400020", area: "Churchgate / Marine Drive", zone: "South Mumbai" },
    { pin: "400021", area: "Nariman Point", zone: "South Mumbai" },
    { pin: "400025", area: "Prabhadevi", zone: "South Mumbai" },
    { pin: "400026", area: "Breach Candy / Cumballa Hill", zone: "South Mumbai" },
    { pin: "400027", area: "Byculla", zone: "South Mumbai" },
    { pin: "400028", area: "Dadar West / Shivaji Park", zone: "South Mumbai" },
    { pin: "400030", area: "Worli Sea Face", zone: "South Mumbai" },
    { pin: "400031", area: "Wadala West", zone: "South Mumbai" },
    { pin: "400034", area: "Tardeo / Tulsiwadi", zone: "South Mumbai" },
    { pin: "400036", area: "Malabar Hill / Kemps Corner", zone: "South Mumbai" },
    { pin: "400037", area: "Antop Hill", zone: "South Mumbai" },

    // Western Suburbs
    { pin: "400049", area: "Juhu / Vile Parle West", zone: "Western Suburbs" },
    { pin: "400050", area: "Bandra West", zone: "Western Suburbs" },
    { pin: "400051", area: "Bandra Kurla Complex (BKC)", zone: "Western Suburbs" },
    { pin: "400052", area: "Khar West", zone: "Western Suburbs" },
    { pin: "400053", area: "Andheri West / Lokhandwala", zone: "Western Suburbs" },
    { pin: "400054", area: "Santacruz West", zone: "Western Suburbs" },
    { pin: "400055", area: "Santacruz East / Kalina", zone: "Western Suburbs" },
    { pin: "400056", area: "Vile Parle West (JVPD)", zone: "Western Suburbs" },
    { pin: "400057", area: "Vile Parle East", zone: "Western Suburbs" },
    { pin: "400058", area: "Andheri West / Azad Nagar", zone: "Western Suburbs" },
    { pin: "400059", area: "Andheri East / Marol", zone: "Western Suburbs" },
    { pin: "400060", area: "Jogeshwari East", zone: "Western Suburbs" },
    { pin: "400061", area: "Versova / Madh", zone: "Western Suburbs" },
    { pin: "400062", area: "Goregaon West", zone: "Western Suburbs" },
    { pin: "400063", area: "Goregaon East / Gokuldham", zone: "Western Suburbs" },
    { pin: "400064", area: "Malad West / Orlem", zone: "Western Suburbs" },
    { pin: "400065", area: "Aarey Milk Colony", zone: "Western Suburbs" },
    { pin: "400066", area: "Borivali East", zone: "Western Suburbs" },
    { pin: "400067", area: "Kandivali West / Charkop", zone: "Western Suburbs" },
    { pin: "400068", area: "Dahisar West", zone: "Western Suburbs" },
    { pin: "400069", area: "Andheri East / JB Nagar", zone: "Western Suburbs" },
    { pin: "400092", area: "Borivali West / Shimpoli", zone: "Western Suburbs" },
    { pin: "400093", area: "Chakala / Sahar Airport", zone: "Western Suburbs" },
    { pin: "400095", area: "Kandivali West / Marve", zone: "Western Suburbs" },
    { pin: "400097", area: "Malad East / Dindoshi", zone: "Western Suburbs" },
    { pin: "400099", area: "Sahar Airport / CSIA", zone: "Western Suburbs" },
    { pin: "400101", area: "Kandivali East / Thakur Complex", zone: "Western Suburbs" },
    { pin: "400102", area: "Jogeshwari West / Oshiwara", zone: "Western Suburbs" },
    { pin: "400104", area: "Goregaon West / Bangur Nagar", zone: "Western Suburbs" },

    // Central & Eastern Suburbs
    { pin: "400017", area: "Dharavi", zone: "Central & Eastern" },
    { pin: "400022", area: "Sion / Chunabhatti", zone: "Central & Eastern" },
    { pin: "400024", area: "Kurla East / Nehru Nagar", zone: "Central & Eastern" },
    { pin: "400070", area: "Kurla West / LBS Road", zone: "Central & Eastern" },
    { pin: "400071", area: "Chembur / RK Studio", zone: "Central & Eastern" },
    { pin: "400072", area: "Saki Naka / Asalpha", zone: "Central & Eastern" },
    { pin: "400074", area: "Chembur East / Mahul", zone: "Central & Eastern" },
    { pin: "400075", area: "Pant Nagar / Ghatkopar East", zone: "Central & Eastern" },
    { pin: "400076", area: "Powai / Hiranandani", zone: "Central & Eastern" },
    { pin: "400077", area: "Ghatkopar East", zone: "Central & Eastern" },
    { pin: "400078", area: "Bhandup West / Neptune Mall", zone: "Central & Eastern" },
    { pin: "400079", area: "Vikhroli West / Park Site", zone: "Central & Eastern" },
    { pin: "400080", area: "Mulund West / LBS Road", zone: "Central & Eastern" },
    { pin: "400081", area: "Mulund East", zone: "Central & Eastern" },
    { pin: "400083", area: "Vikhroli East / Kannamwar", zone: "Central & Eastern" },
    { pin: "400086", area: "Ghatkopar West / R City Mall", zone: "Central & Eastern" },
    { pin: "400088", area: "Govandi / Trombay / Deonar", zone: "Central & Eastern" },
    { pin: "400089", area: "Tilak Nagar / Chembur", zone: "Central & Eastern" },

    // Thane & Navi Mumbai
    { pin: "400601", area: "Thane Station / Naupada", zone: "Thane & Navi Mumbai" },
    { pin: "400604", area: "Thane Teen Hath Naka", zone: "Thane & Navi Mumbai" },
    { pin: "400607", area: "Thane Ghodbunder / The Walk", zone: "Thane & Navi Mumbai" },
    { pin: "400614", area: "CBD Belapur / Palm Beach", zone: "Thane & Navi Mumbai" },
    { pin: "400703", area: "Vashi Sector 17", zone: "Thane & Navi Mumbai" },
    { pin: "400705", area: "Vashi Akshar Plaza", zone: "Thane & Navi Mumbai" },
    { pin: "400706", area: "Seawoods Grand Central / Nerul", zone: "Thane & Navi Mumbai" },
    { pin: "400708", area: "Airoli / Mindspace", zone: "Thane & Navi Mumbai" },
    { pin: "401107", area: "Mira Road East", zone: "Thane & Navi Mumbai" },
    { pin: "401202", area: "Vasai West", zone: "Thane & Navi Mumbai" },
    { pin: "401303", area: "Virar West", zone: "Thane & Navi Mumbai" }
  ];

  const STORE_NAMES = {
    "A001": "Croma - Juhu",
    "A009": "Croma - Belapur",
    "A013": "Croma - Mulund West",
    "A026": "Croma - Fort",
    "A035": "Croma - R City Mall",
    "A039": "Croma - Sion",
    "A041": "Croma - Oberoi Mall",
    "A074": "Croma - Breach Candy",
    "A092": "Croma - Kandivali Mahavir Nagar",
    "A119": "Croma - Prabhadevi",
    "A127": "Croma - Andheri West",
    "A133": "Croma - Vashi Akshar Plaza",
    "A140": "Croma - Bhandup West",
    "A141": "Croma - Seawoods Mall",
    "A147": "Croma - Borivali West",
    "A153": "Croma - Malad Infiniti Mall",
    "A174": "Croma - Chembur RK Studio",
    "A175": "Croma - Thane Ghodbunder",
    "A178": "Croma - Kurla LBS Road",
    "A285": "Croma - Kandivali MG Road",
    "A401": "Croma - Thane The Walk",
    "A493": "Croma - Powai",
    "A525": "Croma - Borivali East MG Road",
    "A660": "Croma - Goregaon SV Road",
    "A728": "Croma - Thane Teen Hath Naka",
    "A729": "Croma - Vile Parle East",
    "A736": "Croma - Santacruz West",
    "A749": "Croma - Oberoi Skycity Mall",
    "A999": "Edge by Croma - Ghatkopar",
    "D054": "Croma Central Hub (D054)",
    "D056": "Croma Regional Hub (D056)",
    "E009": "Croma Central Hub (Bhiwandi)",
    "E056": "Croma Regional Hub (E056)"
  };

  const API_HEADERS = {
    "client_id": "CROMA-WEB-APP",
    "accesstoken": "147e1b36-c87f-4a27-a9ec-1825f7fbdca8",
    "oms-apim-subscription-key": "1131858141634e2abe2efb2b3a2a2a5d",
    "content-type": "application/json",
    "accept": "application/json, text/plain, */*"
  };

  function formatDeliveryETA(dateStr, carrier) {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const opts = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
      const formatted = d.toLocaleString('en-IN', opts);
      return carrier ? `${formatted} (${carrier.replace('Blitz - ', '')})` : formatted;
    } catch (e) {
      return dateStr;
    }
  }

  // Resolve one requested SKU from the Croma catalog.
  async function searchProductBySku(query) {
    const page0Url = `https://api.croma.com/searchservices/v1/search?query=${encodeURIComponent(query)}:relevance&channelCode=400001&channel=WEB&currentPage=0&pageSize=5&fields=FULL`;
    const res = await fetch(page0Url, { headers: API_HEADERS });
    if (!res.ok) throw new Error(`Search error ${res.status}`);
    const data0 = await res.json();
    const products = data0.products || [];
    return { product: products.find(p => String(p.code) === String(query)) || products[0] || null };
  }

  // Single-SKU Drilldown SLA query checking both SDEL (Store Express) and HDEL (Warehouse) simultaneously
  // Protected with WAF Circuit Breaker to prevent Akamai rate-limiting
  async function checkBatchSLA(products, pincode) {
    if (!products || !products.length || !pincode) return {};

    const promiseLine = [];
    let lineId = 1;
    for (const p of products) {
      const sku = String(p.code);
      promiseLine.push({
        fulfillmentType: "SDEL",
        itemID: sku,
        lineId: String(lineId++),
        reqEndDate: "2500-01-01",
        reqStartDate: "",
        requiredQty: "1",
        shipToAddress: { zipCode: String(pincode), extn: { irlAddressLine1: "", irlAddressLine2: "" } },
        extn: { widerStoreFlag: "N" }
      });
      promiseLine.push({
        fulfillmentType: "HDEL",
        itemID: sku,
        lineId: String(lineId++),
        reqEndDate: "2500-01-01",
        reqStartDate: "",
        requiredQty: "1",
        shipToAddress: { zipCode: String(pincode), extn: { irlAddressLine1: "", irlAddressLine2: "" } },
        extn: { widerStoreFlag: "N" }
      });
    }

    const payload = {
      promise: {
        allocationRuleID: "SYSTEM",
        checkInventory: "Y",
        organizationCode: "CROMA",
        sourcingClassification: "EC",
        promiseLines: { promiseLine }
      }
    };

    const skuResults = {};
    for (const p of products) {
      skuResults[String(p.code)] = {
        sku: String(p.code),
        available: false,
        hasExpress: false,
        hasWarehouse: false,
        expressStore: "",
        expressStoreName: "",
        expressCarrier: "",
        expressDate: "",
        warehouseHub: "",
        warehouseHubName: "",
        warehouseCarrier: "",
        warehouseDate: "",
        fastestDate: "",
        fastestMode: ""
      };
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);

    try {
      const res = await fetch("https://api.croma.com/inventory/oms/v2/tms/details-pwa/", {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
      clearTimeout(timer);
      if (!res) return skuResults;
      if (res.status === 403 || res.status === 429) {
        throw new Error("WAF_RATE_LIMIT");
      }
      if (!res.ok) return skuResults;

      const data = await res.json();
      const lines = data?.promise?.suggestedOption?.option?.promiseLines?.promiseLine || [];

      for (const line of lines) {
        const item = skuResults[String(line.itemID)];
        if (!item) continue;
        const assignment = line.assignments?.assignment?.[0];
        if (!assignment) continue;

        item.available = true;
        const node = assignment.shipNode || "";
        const nodeName = STORE_NAMES[node] || (node ? `Hub [${node}]` : "");
        const dDate = assignment.deliveryDate || "";
        const carrier = (line.carrierServiceCode || "").replace("Blitz - ", "");

        if (line.fulfillmentType === "SDEL") {
          item.hasExpress = true;
          item.expressStore = node;
          item.expressStoreName = nodeName;
          item.expressCarrier = carrier;
          item.expressDate = dDate;
        } else if (line.fulfillmentType === "HDEL") {
          item.hasWarehouse = true;
          item.warehouseHub = node;
          item.warehouseHubName = nodeName;
          item.warehouseCarrier = carrier;
          item.warehouseDate = dDate;
        }

        if (item.hasExpress) {
          item.fastestMode = "SDEL";
          item.fastestDate = item.expressDate;
        } else if (item.hasWarehouse) {
          item.fastestMode = "HDEL";
          item.fastestDate = item.warehouseDate;
        }
      }
      return skuResults;
    } catch (e) {
      clearTimeout(timer);
      if (e.message === "WAF_RATE_LIMIT") throw e;
      return skuResults;
    }
  }

  // Inject UI Root
  const host = document.createElement('div');
  host.id = 'croma-hunter-root';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // Clean Light Theme Stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    #modal {
      position: fixed;
      top: 16px;
      right: 16px;
      width: min(1040px, calc(100vw - 40px));
      height: min(760px, calc(100vh - 40px));
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: #1e293b;
      font-size: 13px;
      animation: fadeIn 0.2s ease-out;
    }
    #modal.minimized { height: auto; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Header ── */
    #header {
      background: #ffffff;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      cursor: grab;
      user-select: none;
    }
    #header:active { cursor: grabbing; }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-badge {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: linear-gradient(135deg, #0f7c90, #0e9aa7);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(15, 124, 144, 0.25);
    }
    .brand-title {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.3px;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-pill {
      background: #f0fdfa;
      color: #0f766e;
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      border: 1px solid #99f6e4;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ctrl-btn {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #94a3b8;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.15s;
    }
    .ctrl-btn:hover {
      background: #f1f5f9;
      color: #475569;
      border-color: #cbd5e1;
    }
    .ctrl-btn.close:hover {
      background: #fef2f2;
      color: #dc2626;
      border-color: #fecaca;
    }

    /* ── Body ── */
    #body {
      padding: 12px 16px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    /* ── Search Bar ── */
    .search-bar {
      display: flex;
      gap: 8px;
    }
    .search-input-wrap {
      position: relative;
      flex: 1;
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
    }
    input[type="text"] {
      width: 100%;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      color: #1e293b;
      padding: 9px 14px 9px 36px;
      border-radius: 10px;
      font-size: 13px;
      outline: none;
      transition: all 0.15s;
    }
    input[type="text"]:focus {
      border-color: #0f7c90;
      box-shadow: 0 0 0 3px rgba(15, 124, 144, 0.1);
    }
    input[type="text"]::placeholder {
      color: #94a3b8;
    }

    .btn-scan {
      background: #0f7c90;
      color: #ffffff;
      border: none;
      padding: 0 20px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 1px 3px rgba(15, 124, 144, 0.3);
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-scan:hover:not(:disabled) {
      background: #0e6b7d;
      box-shadow: 0 2px 8px rgba(15, 124, 144, 0.35);
    }
    .btn-scan:disabled {
      background: #e2e8f0;
      color: #94a3b8;
      cursor: wait;
      box-shadow: none;
    }

    /* ── Product Info Strip ── */
    .hero-strip {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }
    .prod-thumb-wrap {
      width: 40px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;
      flex-shrink: 0;
    }
    .prod-thumb {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 5px;
    }
    .prod-thumb-fallback {
      display: none;
      color: #0f7c90;
      font: 700 9px 'JetBrains Mono', monospace;
      letter-spacing: 0.4px;
    }
    .prod-details {
      flex: 1;
      min-width: 0;
    }
    .prod-headline {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .prod-title {
      font-weight: 700;
      font-size: 13.5px;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .prod-price {
      font-size: 14px;
      font-weight: 800;
      color: #0f766e;
      letter-spacing: -0.3px;
      white-space: nowrap;
    }
    .prod-subline {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 3px;
    }
    .catalog-summary {
      font-size: 11px;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .catalog-count-badge {
      font-size: 10px;
      font-weight: 700;
      background: #f0fdfa;
      color: #0f766e;
      border: 1px solid #99f6e4;
      border-radius: 8px;
      padding: 1px 6px;
      white-space: nowrap;
    }

    /* ── Live Stats Badges ── */
    .live-stats-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .stat-pill {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 4px 12px;
      min-width: 56px;
    }
    .stat-pill.green-pill {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }
    .stat-pill.red-pill {
      background: #fef2f2;
      border-color: #fecaca;
    }
    .stat-lbl {
      font-size: 9px;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .green-pill .stat-lbl { color: #16a34a; }
    .red-pill .stat-lbl { color: #dc2626; }
    .stat-num {
      font-size: 14px;
      font-weight: 800;
      color: #1e293b;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1.2;
    }
    .stat-num.cyan { color: #0f7c90; }
    .green-pill .stat-num { color: #16a34a; }
    .red-pill .stat-num { color: #dc2626; }

    /* ── Progress Bar ── */
    .progress-wrap {
      display: none;
      background: #e2e8f0;
      border-radius: 3px;
      height: 3px;
      overflow: hidden;
    }
    .progress-bar-fill {
      background: linear-gradient(90deg, #0f7c90, #0e9aa7);
      height: 100%;
      width: 0%;
      transition: width 0.15s ease;
    }

    /* ── Filter Bar ── */
    .filter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .zone-group {
      display: flex;
      gap: 4px;
    }
    .zone-chip {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 3px 10px;
      border-radius: 16px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.12s;
    }
    .zone-chip:hover {
      background: #e2e8f0;
      color: #334155;
    }
    .zone-chip.active {
      background: #0f7c90;
      border-color: #0f7c90;
      color: #ffffff;
      font-weight: 600;
    }
    .filter-toggles {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .filter-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: #64748b;
      cursor: pointer;
      user-select: none;
    }
    .filter-toggle input {
      accent-color: #0f7c90;
      cursor: pointer;
      width: 14px;
      height: 14px;
    }

    /* ── Table ── */
    .table-container {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    .table-container::-webkit-scrollbar {
      width: 5px;
    }
    .table-container::-webkit-scrollbar-track {
      background: #f8fafc;
    }
    .table-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .table-container::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    thead {
      position: sticky;
      top: 0;
      background: #f8fafc;
      z-index: 10;
    }
    th {
      font-size: 10.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
      white-space: nowrap;
    }
    td {
      padding: 8px 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 12.5px;
      color: #334155;
      vertical-align: middle;
    }
    tr:hover td {
      background: #f0fdfa;
    }
    .pincode-cell {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 12.5px;
      color: #0f7c90;
    }

    /* ── Badges ── */
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .badge-status.avail {
      background: #dcfce7;
      color: #16a34a;
      border: 1px solid #bbf7d0;
    }
    .badge-status.oos {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
    .badge-express {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: #f0fdfa;
      color: #0f766e;
      border: 1px solid #99f6e4;
      border-radius: 5px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .badge-warehouse {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #bfdbfe;
      border-radius: 5px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .pulse-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #16a34a;
    }

    /* ── Footer ── */
    #footer {
      padding: 8px 16px 10px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
    }
    .footer-note {
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .btn-action-group {
      display: flex;
      gap: 6px;
    }
    .btn-act {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s;
    }
    .btn-act:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
      color: #1e293b;
    }
    .btn-act.primary {
      background: #f0fdfa;
      border-color: #99f6e4;
      color: #0f766e;
    }
    .btn-act.primary:hover {
      background: #0f7c90;
      border-color: #0f7c90;
      color: #ffffff;
    }

    /* ── Toast ── */
    #toast {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #0f7c90;
      color: #1e293b;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s ease-out;
      z-index: 1000;
      white-space: nowrap;
    }
    #toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    @media (max-width: 760px) {
      #modal { top: 8px; right: 8px; width: calc(100vw - 16px); height: calc(100dvh - 16px); border-radius: 12px; }
      #body { padding: 10px 10px 0; gap: 8px; }
      .hero-strip { flex-wrap: wrap; gap: 8px; padding: 9px; }
      .prod-details { flex-basis: calc(100% - 56px); }
      .live-stats-bar { width: 100%; justify-content: stretch; }
      .stat-pill { flex: 1; }
      .filter-bar { align-items: stretch; flex-direction: column; }
      .zone-group { overflow-x: auto; padding-bottom: 3px; }
      .zone-chip { flex: 0 0 auto; }
      .filter-toggles { justify-content: flex-start; flex-wrap: wrap; }
      .table-container { overflow: auto; }
      table { min-width: 700px; }
      #footer { gap: 8px; padding: 8px 10px; flex-wrap: wrap; }
      .footer-note { flex: 1 1 100%; }
      .btn-action-group { margin-left: auto; }
    }
    @media (max-width: 480px) {
      #modal { top: 0; right: 0; width: 100vw; height: 100dvh; border-radius: 0; }
      .brand-pill { display: none; }
      .search-bar { flex-direction: column; }
      .btn-scan { min-height: 40px; justify-content: center; }
      .prod-subline { flex-wrap: wrap; }
      .catalog-summary { flex-basis: 100%; }
    }
  `;
  shadow.appendChild(style);

  // HUD HTML Layout
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.innerHTML = `
    <div id="toast"></div>

    <!-- Header -->
    <div id="header">
      <div class="brand-wrap">
        <div class="logo-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
            <line x1="12" y1="2" x2="12" y2="5"></line>
            <line x1="12" y1="19" x2="12" y2="22"></line>
            <line x1="2" y1="12" x2="5" y2="12"></line>
            <line x1="19" y1="12" x2="22" y2="12"></line>
          </svg>
        </div>
        <div class="brand-title">
          <span>Croma Hunter</span>
          <span class="brand-pill">MMR LIVE</span>
        </div>
      </div>
      <div class="header-actions">
        <button class="ctrl-btn" id="btn-minimize" title="Minimize panel" aria-label="Minimize panel">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button class="ctrl-btn close" id="btn-close" title="Close">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div id="body">
      <!-- Search Bar -->
      <div class="search-bar">
        <div class="search-input-wrap">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="query-input" placeholder="Enter one product SKU or paste its Croma URL..." />
        </div>
        <button class="btn-scan" id="btn-scan">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Re-Scan</span>
        </button>
      </div>

      <!-- Product Info + Live Stats -->
      <div class="hero-strip">
        <div class="prod-thumb-wrap">
          <img id="product-img" class="prod-thumb" alt="Product thumbnail" />
          <span id="product-img-fallback" class="prod-thumb-fallback">SKU</span>
        </div>
        <div class="prod-details">
          <div class="prod-headline">
            <span class="prod-title" id="product-title">Ready to Scan</span>
            <span class="prod-price" id="product-price">&#8377; -</span>
          </div>
          <div class="prod-subline">
            <div id="search-summary-text" class="catalog-summary">Enter a product SKU or product URL</div>
            <div class="catalog-count-badge" id="catalog-count-badge" style="display:none;"></div>
          </div>
        </div>

        <div class="live-stats-bar">
          <div class="stat-pill" title="Pincodes scanned">
            <span class="stat-lbl">Pins</span>
            <span class="stat-num cyan" id="stat-scanned">0 / 86</span>
          </div>
          <div class="stat-pill green-pill" title="In-Stock fulfillment available">
            <span class="stat-lbl">&#9889; In-Stock</span>
            <span class="stat-num" id="stat-avail">0</span>
          </div>
          <div class="stat-pill red-pill" title="Unavailable / Out of Stock">
            <span class="stat-lbl">OOS</span>
            <span class="stat-num" id="stat-oos">0</span>
          </div>
        </div>
      </div>

      <!-- Hidden pagination bar shim -->
      <div id="pagination-bar" style="display:none;"></div>

      <!-- Progress Bar -->
      <div class="progress-wrap" id="progress-container">
        <div class="progress-bar-fill" id="progress-bar"></div>
      </div>

      <!-- Filter Controls -->
      <div class="filter-bar">
        <div class="zone-group" id="zone-chips">
          <span class="zone-chip active" data-zone="ALL">All (86)</span>
          <span class="zone-chip" data-zone="South Mumbai">South (28)</span>
          <span class="zone-chip" data-zone="Western Suburbs">Western (29)</span>
          <span class="zone-chip" data-zone="Central & Eastern">Central/East (18)</span>
          <span class="zone-chip" data-zone="Thane & Navi Mumbai">Thane/Navi (11)</span>
        </div>
        <div class="filter-toggles">
          <label class="filter-toggle">
          <input type="checkbox" id="chk-avail-only" />
            <span>In-Stock Only</span>
          </label>
          <label class="filter-toggle">
            <input type="checkbox" id="chk-express-only" />
            <span>&#9889; Express Only</span>
          </label>
        </div>
      </div>

      <!-- Results Table -->
      <div class="table-container">
        <table>
          <thead id="table-head">
            <tr>
              <th style="width: 80px;">Pincode</th>
              <th>Area / Locality</th>
              <th style="width: 100px;">Status</th>
              <th>Fulfillment Mode &amp; Store</th>
              <th style="width: 140px;">Delivery ETA</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr>
              <td colspan="5" style="text-align: center; color: #94a3b8; padding: 48px 16px;">
                Enter one product SKU or paste a Croma product URL, then click <b>Scan</b>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div id="footer">
        <div class="footer-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f7c90" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Dual Mode: &#9889; Store Express (SDEL) &amp; &#128666; Warehouse (HDEL)</span>
        </div>
        <div class="btn-action-group">
          <button class="btn-act" id="btn-copy">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
          <button class="btn-act primary" id="btn-export">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  `;
  shadow.appendChild(modal);

  // State Management
  let currentQuery = "";
  let currentProducts = []; // Contains only the product being scanned
  let activeSelectedSKU = "ALL"; // "ALL" or specific SKU
  let activeZone = "ALL";
  let scanMatrix = {}; // { [sku]: { [pincode]: itemResult } }
  let isScanning = false;

  // DOM Elements
  const queryInput = shadow.getElementById('query-input');
  const btnScan = shadow.getElementById('btn-scan');
  const paginationBar = shadow.getElementById('pagination-bar');
  const searchSummaryText = shadow.getElementById('search-summary-text');
  const catalogCountBadge = shadow.getElementById('catalog-count-badge');

  const productImg = shadow.getElementById('product-img');
  const productImgFallback = shadow.getElementById('product-img-fallback');
  const productTitle = shadow.getElementById('product-title');
  const productPrice = shadow.getElementById('product-price');

  const progressContainer = shadow.getElementById('progress-container');
  const progressBar = shadow.getElementById('progress-bar');
  const statScanned = shadow.getElementById('stat-scanned');
  const statAvail = shadow.getElementById('stat-avail');
  const statOos = shadow.getElementById('stat-oos');
  const tableHead = shadow.getElementById('table-head');
  const tableBody = shadow.getElementById('table-body');
  const chkAvailOnly = shadow.getElementById('chk-avail-only');
  const chkExpressOnly = shadow.getElementById('chk-express-only');
  const zoneChips = shadow.getElementById('zone-chips');
  const btnCopy = shadow.getElementById('btn-copy');
  const btnExport = shadow.getElementById('btn-export');
  const btnClose = shadow.getElementById('btn-close');
  const btnMinimize = shadow.getElementById('btn-minimize');
  const bodyDiv = shadow.getElementById('body');
  const toast = shadow.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  // Window Controls
  btnClose.onclick = () => host.remove();
  btnMinimize.onclick = () => {
    const minimized = modal.classList.toggle('minimized');
    bodyDiv.style.display = minimized ? 'none' : 'flex';
    btnMinimize.title = minimized ? 'Restore panel' : 'Minimize panel';
    btnMinimize.setAttribute('aria-label', btnMinimize.title);
  };

  // Draggable HUD
  const header = shadow.getElementById('header');
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  header.onmousedown = (e) => {
    if (e.target.closest('.ctrl-btn')) return;
    isDragging = true;
    dragOffset.x = e.clientX - modal.getBoundingClientRect().left;
    dragOffset.y = e.clientY - modal.getBoundingClientRect().top;
    e.preventDefault();
  };
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    modal.style.left = (e.clientX - dragOffset.x) + 'px';
    modal.style.top = (e.clientY - dragOffset.y) + 'px';
    modal.style.right = 'auto';
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  // Update Hero Card details for selected SKU
  function updateHeroCard(sku) {
    const p = currentProducts.find(x => x.code === sku) || currentProducts[0];
    if (p) {
      productTitle.textContent = p.name;
      productPrice.textContent = p.price || "₹ -";
      productImg.hidden = !p.image;
      productImgFallback.style.display = p.image ? 'none' : 'block';
      if (p.image) productImg.src = p.image;
    }
  }

  productImg.onerror = () => {
    productImg.hidden = true;
    productImgFallback.style.display = 'block';
  };

  // Update Stats Counters for active SKU
  function updateStats() {
    const targetSku = activeSelectedSKU || currentProducts[0]?.code;
    const pMap = scanMatrix[targetSku] || {};
    const scannedPins = Object.keys(pMap).length;
    const availPins = Object.values(pMap).filter(x => x.available).length;
    statScanned.textContent = `${scannedPins} / 86`;
    statAvail.textContent = availPins;
    statOos.textContent = scannedPins - availPins;
  }

  // Render Table: 86-pincode drilldown breakdown for selected SKU
  function renderTable() {
    const availOnly = chkAvailOnly.checked;
    const expressOnly = chkExpressOnly.checked;

    tableHead.innerHTML = `
      <tr>
        <th style="width: 75px;">Pincode</th>
        <th>Area / Locality</th>
        <th style="width: 105px;">Status</th>
        <th>Fulfillment Mode & Store</th>
        <th style="width: 135px;">Delivery ETA</th>
      </tr>
    `;

    const targetSku = activeSelectedSKU || currentProducts[0]?.code;
    const pMap = scanMatrix[targetSku] || {};

    const filtered = MUMBAI_PINCODES.map(item => {
      const entry = pMap[item.pin] || {
        pin: item.pin,
        area: item.area,
        zone: item.zone,
        available: false
      };
      return entry;
    }).filter(r => {
      if (activeZone !== "ALL" && r.zone !== activeZone) return false;
      if (availOnly && !r.available) return false;
      if (expressOnly && !r.hasExpress) return false;
      return true;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 28px;">No pincodes match the selected filters.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(r => {
      let fBadge = '<span style="color:#64748b;">-</span>';
      if (r.available) {
        if (r.hasExpress && r.hasWarehouse) {
          fBadge = `<span class="badge-express">&#9889; Store Express [${r.expressStore}]</span><br><span style="font-size:9.5px; color:#0f766e;">+ &#128666; Warehouse [${r.warehouseHub}]</span>`;
        } else if (r.hasExpress) {
          fBadge = `<span class="badge-express">&#9889; Store Express [${r.expressStore}]</span><div style="font-size:10px; color:#64748b;">${r.expressStoreName}</div>`;
        } else if (r.hasWarehouse) {
          fBadge = `<span class="badge-warehouse">&#128666; Warehouse [${r.warehouseHub}]</span><div style="font-size:10px; color:#64748b;">${r.warehouseHubName}</div>`;
        }
      }

      const eta = r.available ? (formatDeliveryETA(r.fastestDate, r.hasExpress ? r.expressCarrier : r.warehouseCarrier)) : '-';

      return `
        <tr>
          <td class="pincode-cell">${r.pin}</td>
          <td>
            <div style="font-weight:600; color:#334155;">${r.area}</div>
            <div style="font-size:10px; color:#64748b;">${r.zone}</div>
          </td>
          <td>
            <span class="badge-status ${r.available ? 'avail' : 'oos'}">
              ${r.available ? '<span class="pulse-dot"></span>IN STOCK' : 'OUT OF STOCK'}
            </span>
          </td>
          <td>${fBadge}</td>
          <td style="font-size:11px; color:${r.available ? '#334155' : '#64748b'}; font-weight:${r.available ? '600' : 'normal'};">
            ${eta}
          </td>
        </tr>
      `;
    }).join('');
  }

  // Drilldown helper exposed to custom element host
  host.__selectSKU = async (sku) => {
    activeSelectedSKU = sku;
    updateHeroCard(sku);
    if (!scanMatrix[sku] || Object.keys(scanMatrix[sku]).length === 0) {
      if (!isScanning) await startScan();
    } else {
      renderTable();
      updateStats();
    }
  };

  // Zone Chips Filter
  zoneChips.onclick = (e) => {
    const chip = e.target.closest('.zone-chip');
    if (chip) {
      shadow.querySelectorAll('.zone-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeZone = chip.getAttribute('data-zone');
      renderTable();
    }
  };

  chkAvailOnly.onchange = renderTable;
  chkExpressOnly.onchange = renderTable;

  // Single-SKU Drilldown Scan Runner across all 86 Mumbai pincodes
  async function startScan() {
    if (isScanning) return; // Guard against concurrent runs

    const q = queryInput.value.trim();
    if (!q && currentProducts.length === 0) {
      showToast("Please enter a product, SKU, or Croma URL! 🔍");
      queryInput.focus();
      return;
    }

    // Check if user entered a Croma product URL or direct SKU
    const urlSkuMatch = q.match(/\/p\/(\d+)/);
    const directSkuMatch = q.match(/^\d{5,7}$/);
    const targetSku = urlSkuMatch ? urlSkuMatch[1] : (directSkuMatch ? directSkuMatch[0] : null);

    if (q && !targetSku) {
      showToast("Enter one 5–7 digit SKU or paste a Croma product URL.");
      queryInput.focus();
      return;
    }

    // Load only the requested product by SKU or product URL
    if (q && (q !== currentQuery || currentProducts.length === 0 || !currentProducts[0]?.rawPrice)) {
      currentQuery = q;
      btnScan.disabled = true;
      btnScan.className = 'btn-scan';
      btnScan.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Loading...</span>
      `;

      if (targetSku) {
        // Direct SKU or pasted Product URL
        try {
          const res = await searchProductBySku(targetSku);
          const matchedProd = res.product;
          if (matchedProd) {
            const rawP = matchedProd.price?.value || parseFloat((matchedProd.price?.formattedValue || "").replace(/[^\d.]/g, '')) || 0;
            const img = matchedProd.images?.find(im => im.imageType === 'PRIMARY')?.url || matchedProd.productImage || "";
            const pUrl = matchedProd.url ? (matchedProd.url.startsWith('http') ? matchedProd.url : `https://www.croma.com${matchedProd.url}`) : `https://www.croma.com/p/${matchedProd.code}`;
            currentProducts = [{
              code: String(matchedProd.code),
              name: matchedProd.name,
              price: matchedProd.price?.formattedValue || (rawP ? `₹${rawP.toLocaleString('en-IN')}` : ""),
              rawPrice: rawP,
              image: img,
              url: pUrl
            }];
          } else {
            currentProducts = [{
              code: String(targetSku),
              name: `Product SKU [${targetSku}]`,
              price: "",
              rawPrice: 0,
              image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1606478950/Croma%20Assets/UI/croma_logo.png",
              url: `https://www.croma.com/p/${targetSku}`
            }];
          }
        } catch (e) {
          currentProducts = [{
            code: String(targetSku),
            name: `Product SKU [${targetSku}]`,
            price: "",
            rawPrice: 0,
            image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1606478950/Croma%20Assets/UI/croma_logo.png",
            url: `https://www.croma.com/p/${targetSku}`
          }];
        }
        paginationBar.style.display = 'flex';
        searchSummaryText.innerHTML = `Loaded SKU <b style="color:#00E5BE;">[${targetSku}]</b>: ${currentProducts[0].name.slice(0, 36)}...`;
        catalogCountBadge.textContent = '1 SKU Ready';
        activeSelectedSKU = String(targetSku);
      }
    }

    if (currentProducts.length === 0) {
      showToast("Please enter a search query or product URL! 🔍");
      return;
    }

    const targetProduct = currentProducts.find(p => p.code === activeSelectedSKU) || currentProducts[0];
    if (!targetProduct) return;
    activeSelectedSKU = targetProduct.code;
    updateHeroCard(activeSelectedSKU);

    // Begin real-time single-SKU drilldown scanning of all 86 Mumbai pincodes
    isScanning = true;
    btnScan.disabled = true;
    btnScan.className = 'btn-scan';
    btnScan.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Scanning...</span>
    `;

    progressContainer.style.display = 'block';
    scanMatrix[targetProduct.code] = scanMatrix[targetProduct.code] || {};

    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #00E5BE; padding: 28px;">&#9889; Scanning [${targetProduct.code}] across 86+ Mumbai & MMR pincodes in real-time...</td></tr>`;

    const targetPins = [...MUMBAI_PINCODES];
    const total = targetPins.length;
    let completed = 0;
    let totalInStockOccurrences = 0;
    let hitRateLimit = false;

    const CONCURRENCY = 1;
    let index = 0;

    async function worker() {
      while (true) {
        if (hitRateLimit) break;
        if (index >= targetPins.length) break;
        const pinItem = targetPins[index++];
        if (!pinItem || !pinItem.pin) break;

        let batchResults = {};
        try {
          batchResults = (await checkBatchSLA([targetProduct], pinItem.pin)) || {};
          // Pause between sequential pincode requests to reduce rate-limit pressure.
          await new Promise(r => setTimeout(r, 250));
        } catch (e) {
          if (e.message === "WAF_RATE_LIMIT") {
            hitRateLimit = true;
            break;
          }
          batchResults = {};
        }

        completed++;

        const res = (batchResults && batchResults[targetProduct.code]) || {};
        const entry = {
          pin: pinItem.pin,
          area: pinItem.area || "",
          zone: pinItem.zone || "",
          available: !!res?.available,
          hasExpress: !!res?.hasExpress,
          hasWarehouse: !!res?.hasWarehouse,
          expressStore: res?.expressStore || "",
          expressStoreName: res?.expressStoreName || "",
          expressCarrier: res?.expressCarrier || "",
          expressDate: res?.expressDate || "",
          warehouseHub: res?.warehouseHub || "",
          warehouseHubName: res?.warehouseHubName || "",
          warehouseCarrier: res?.warehouseCarrier || "",
          warehouseDate: res?.warehouseDate || "",
          fastestDate: res?.fastestDate || "",
          fastestCarrier: (res?.hasExpress ? res?.expressCarrier : res?.warehouseCarrier) || ""
        };

        if (entry.available) totalInStockOccurrences++;
        scanMatrix[targetProduct.code][pinItem.pin] = entry;

        const pct = Math.min(100, Math.round((completed / total) * 100));
        progressBar.style.width = pct + '%';
        statScanned.textContent = `${completed} / ${total}`;
        statAvail.textContent = totalInStockOccurrences;
        statOos.textContent = completed - totalInStockOccurrences;

        if (completed % 4 === 0 || completed >= total) {
          renderTable();
        }
      }
    }

    try {
      const workers = Array(CONCURRENCY).fill(0).map(() => worker());
      await Promise.all(workers);
    } catch (err) {
      console.warn("Scan loop error:", err);
    } finally {
      isScanning = false;
      btnScan.disabled = false;
      btnScan.className = 'btn-scan';
      btnScan.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span>Re-Scan</span>
      `;
      renderTable();
      if (hitRateLimit) {
        showToast("⚠️ Akamai Rate Limit reached. Please pause a moment or switch network.");
      } else {
        showToast(completed < total ? `Scan Finished (${completed}/${total} pincodes)` : `Scan Complete! In-Stock at ${totalInStockOccurrences} of 86 Pincodes ✨`);
      }
    }
  }

  btnScan.onclick = () => {
    if (!isScanning) {
      startScan();
    }
  };

  queryInput.onkeydown = (e) => {
    if (e.key === 'Enter') {
      if (!isScanning) startScan();
    }
  };

  // Auto-detect SKU if user opens bookmarklet while on a Croma product page
  try {
    const skuMatch = window.location.pathname.match(/\/p\/(\d+)/) || window.location.href.match(/\/p\/(\d+)/);
    if (skuMatch && skuMatch[1]) {
      const pageSku = skuMatch[1];
      const pageTitle = document.querySelector('h1')?.textContent?.trim() || document.title.replace(' - Buy Online at Best Price in India - Croma', '').trim();
      const rawPriceText = document.querySelector('[class*="amount"], [class*="price"], [data-testid*="price"]')?.textContent?.trim() || "";
      const priceMatch = rawPriceText.match(/(?:\u20B9|Rs\.?)\s*[\d,]+(?:\.\d{2})?/i);
      const pagePrice = priceMatch ? priceMatch[0] : rawPriceText;
      const pageImg = document.querySelector('img[src*="croma.com"], img[src*="media-ik"]')?.src || "";

      queryInput.value = window.location.href;
      currentQuery = window.location.href;
      currentProducts = [{
        code: pageSku,
        name: pageTitle || `Product [${pageSku}]`,
        price: pagePrice,
        rawPrice: 0,
        image: pageImg,
        url: window.location.href
      }];
      activeSelectedSKU = pageSku;

      paginationBar.style.display = 'flex';
      searchSummaryText.innerHTML = `Auto-Detected SKU <b style="color:#00E5BE;">[${pageSku}]</b> from this page`;
      catalogCountBadge.textContent = 'Auto-Scanning';

      // Automatically launch scan on product page load
      setTimeout(() => {
        if (!isScanning) startScan();
      }, 300);
    }
  } catch (e) {}

  setTimeout(() => queryInput.focus(), 120);

  // Copy Summary Report
  btnCopy.onclick = () => {
    if (currentProducts.length === 0) {
      showToast("Run a scan before copying! ⚠️");
      return;
    }

    const text = [
      `========================================`,
      `🎯 CROMA MUMBAI INVENTORY INTELLIGENCE REPORT`,
      `========================================`,
      `🔍 Query: ${currentQuery || 'Custom Scan'}`,
      `📦 Products Scanned: ${currentProducts.length}`,
      `🕒 Verified At: ${new Date().toLocaleString()}`,
      `⚡ Modes Checked: Store Express (SDEL) & Warehouse (HDEL)`,
      `========================================\n`,
      ...currentProducts.map(p => {
        const pMap = scanMatrix[p.code] || {};
        const availPins = Object.values(pMap).filter(x => x.available);
        return [
          `📦 [${p.code}] ${p.name} (${p.price || 'N/A'})`,
          `  └─ In-Stock at ${availPins.length} of 86 Mumbai pincodes:`,
          ...(availPins.slice(0, 8).map(x => `     • ${x.pin} ${x.area} -> ${x.hasExpress ? `⚡ Express [${x.expressStore}]` : ''}${x.hasWarehouse ? ` 🚚 Warehouse [${x.warehouseHub}]` : ''} (${formatDeliveryETA(x.fastestDate, x.fastestCarrier)})`)),
          availPins.length > 8 ? `     • ... and ${availPins.length - 8} more pincodes` : ''
        ].filter(Boolean).join('\n');
      })
    ].join('\n\n');

    navigator.clipboard.writeText(text).then(() => showToast("Copied stock report! 📋"));
  };

  // Export Comprehensive CSV
  btnExport.onclick = () => {
    if (currentProducts.length === 0) {
      showToast("Run a scan before exporting! ⚠️");
      return;
    }

    const headers = [
      "Product_SKU",
      "Product_Name",
      "Product_Price",
      "Product_URL",
      "Pincode",
      "Area",
      "Zone",
      "Availability_Status",
      "Store_Express_Available",
      "Store_Express_Code",
      "Store_Express_Name",
      "Store_Express_Carrier",
      "Store_Express_ETA",
      "Warehouse_Available",
      "Warehouse_Code",
      "Warehouse_Name",
      "Warehouse_Carrier",
      "Warehouse_ETA",
      "Fastest_Delivery_Date",
      "Scan_Timestamp"
    ];

    const scanTime = new Date().toISOString();
    const rows = [];

    currentProducts.forEach(p => {
      const pMap = scanMatrix[p.code] || {};
      const cleanName = p.name.replace(/"/g, '""');
      const cleanPrice = p.price.replace(/"/g, '""');

      MUMBAI_PINCODES.forEach(item => {
        const r = pMap[item.pin] || { available: false };
        rows.push([
          `"${p.code}"`,
          `"${cleanName}"`,
          `"${cleanPrice}"`,
          `"${p.url}"`,
          item.pin,
          `"${item.area.replace(/"/g, '""')}"`,
          `"${item.zone.replace(/"/g, '""')}"`,
          r.available ? "IN_STOCK" : "OUT_OF_STOCK",
          r.hasExpress ? "YES" : "NO",
          r.expressStore || "",
          `"${(r.expressStoreName || "").replace(/"/g, '""')}"`,
          `"${(r.expressCarrier || "").replace(/"/g, '""')}"`,
          `"${(r.expressDate || "").replace(/"/g, '""')}"`,
          r.hasWarehouse ? "YES" : "NO",
          r.warehouseHub || "",
          `"${(r.warehouseHubName || "").replace(/"/g, '""')}"`,
          `"${(r.warehouseCarrier || "").replace(/"/g, '""')}"`,
          `"${(r.warehouseDate || "").replace(/"/g, '""')}"`,
          `"${(r.fastestDate || "").replace(/"/g, '""')}"`,
          `"${scanTime}"`
        ]);
      });
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `croma_mumbai_${(currentQuery || 'scan').replace(/\s+/g, '_')}_all_skus.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast("Downloaded Comprehensive Stock CSV! 💾");
  };

})();
