/**
 * Croma Mumbai Hunter — Multi-SKU & Category Stock & Fulfillment Scanner
 * Designed with Apple / Linear Glassmorphism HUD aesthetics.
 * Scans all matching products across 86+ Mumbai & MMR pincodes in real-time.
 * Evaluates both Store Express (SDEL) and Warehouse Dispatch (HDEL) simultaneously.
 */

(function () {
  'use strict';

  // Toggle existing instance
  const existing = document.getElementById('croma-hunter-root');
  if (existing) {
    existing.style.display = existing.style.display === 'none' ? 'block' : 'none';
    return;
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

  // Catalog search fetching ALL matching products across all pagination pages concurrently
  async function searchCatalogAll(query) {
    const page0Url = `https://api.croma.com/searchservices/v1/search?query=${encodeURIComponent(query)}:relevance&channelCode=400001&channel=WEB&currentPage=0&pageSize=21&fields=FULL`;
    const res = await fetch(page0Url, { headers: API_HEADERS });
    if (!res.ok) throw new Error(`Search error ${res.status}`);
    const data0 = await res.json();
    const rawProds = [...(data0.products || [])];
    const totalPages = data0.pagination?.totalPages || 1;
    const totalResults = data0.pagination?.totalResults || rawProds.length;

    if (totalPages > 1) {
      // Parallel fetch all remaining pages up to 35 pages (~735 products)
      const maxPages = Math.min(totalPages, 35);
      const remainingPromises = [];
      for (let p = 1; p < maxPages; p++) {
        const pageUrl = `https://api.croma.com/searchservices/v1/search?query=${encodeURIComponent(query)}:relevance&channelCode=400001&channel=WEB&currentPage=${p}&pageSize=21&fields=FULL`;
        remainingPromises.push(
          fetch(pageUrl, { headers: API_HEADERS })
            .then(r => r.ok ? r.json() : null)
            .then(d => d?.products || [])
            .catch(() => [])
        );
      }
      const otherPagesProducts = await Promise.all(remainingPromises);
      for (const prods of otherPagesProducts) {
        rawProds.push(...prods);
      }
    }

    // Deduplicate products by SKU (code)
    const seen = new Set();
    const unique = [];
    for (const p of rawProds) {
      const sku = String(p.code);
      if (sku && !seen.has(sku)) {
        seen.add(sku);
        unique.push(p);
      }
    }

    return {
      products: unique,
      totalResults: unique.length || totalResults,
      totalPages
    };
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

  // Modern Glassmorphic Stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    #modal {
      position: fixed;
      top: 16px;
      right: 16px;
      width: min(740px, 95vw);
      height: min(740px, 94vh);
      background: rgba(14, 18, 27, 0.92);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
      border: 1px solid rgba(0, 229, 190, 0.28);
      border-radius: 18px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 229, 190, 0.14);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: #e2e8f0;
      font-size: 13px;
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-12px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Header */
    #header {
      background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%);
      padding: 13px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: linear-gradient(135deg, #00E5BE, #0077b6);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 229, 190, 0.35);
    }
    .brand-title {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.3px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-pill {
      background: rgba(0, 229, 190, 0.15);
      color: #00E5BE;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      border: 1px solid rgba(0, 229, 190, 0.35);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ctrl-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      transition: all 0.15s;
    }
    .ctrl-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
    .ctrl-btn.close:hover {
      background: rgba(239, 68, 68, 0.25);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.4);
    }

    /* Body */
    #body {
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      max-height: calc(92vh - 65px);
    }

    /* Search & Action Input */
    .search-bar {
      position: relative;
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
      color: #64748b;
      pointer-events: none;
    }
    input[type="text"] {
      width: 100%;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f8fafc;
      padding: 9px 12px 9px 36px;
      border-radius: 10px;
      font-size: 13px;
      outline: none;
      transition: all 0.2s;
    }
    input[type="text"]:focus {
      border-color: #00E5BE;
      box-shadow: 0 0 0 3px rgba(0, 229, 190, 0.18);
      background: rgba(15, 23, 42, 0.95);
    }
    input[type="text"]::placeholder {
      color: #64748b;
    }

    .btn-scan {
      background: linear-gradient(135deg, #00E5BE 0%, #00a68d 100%);
      color: #07191d;
      border: none;
      padding: 0 20px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 14px rgba(0, 229, 190, 0.28);
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-scan:hover:not(:disabled) {
      filter: brightness(1.1);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(0, 229, 190, 0.4);
    }
    .btn-scan:disabled {
      background: rgba(255, 255, 255, 0.06);
      color: #64748b;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
    .btn-scan.btn-scan-stop {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
    }
    .btn-scan.btn-scan-stop:hover:not(:disabled) {
      box-shadow: 0 6px 18px rgba(239, 68, 68, 0.5);
    }

    /* Catalog Info & Summary Bar */
    #pagination-bar {
      display: none;
      justify-content: space-between;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 9px;
      padding: 6px 12px;
      font-size: 11.5px;
    }
    .catalog-count-badge {
      font-size: 10.5px;
      font-weight: 700;
      background: rgba(0, 229, 190, 0.15);
      color: #00E5BE;
      border: 1px solid rgba(0, 229, 190, 0.35);
      border-radius: 12px;
      padding: 2px 9px;
      white-space: nowrap;
    }

    /* Product Selector & Summary Card */
    .hero-card {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.7) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .prod-thumb-wrap {
      width: 48px;
      height: 48px;
      background: #ffffff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
    .prod-thumb {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .prod-details {
      flex: 1;
      min-width: 0;
    }
    .prod-header-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .prod-title {
      font-weight: 700;
      font-size: 13.5px;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .prod-price {
      font-size: 13.5px;
      font-weight: 800;
      color: #00E5BE;
      letter-spacing: -0.2px;
      white-space: nowrap;
    }
    .prod-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 4px;
    }
    .product-picker-select {
      background: #0f172a;
      color: #00E5BE;
      border: 1px solid rgba(0, 229, 190, 0.35);
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      padding: 3px 8px;
      outline: none;
      cursor: pointer;
      max-width: 420px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Live Stats Row - Compact single row */
    .stats-grid {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 6px 12px;
    }
    .stat-card {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .stat-label {
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
    }
    .stat-val {
      font-size: 13.5px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .stat-val.green { color: #10b981; }
    .stat-val.red { color: #ef4444; }
    .stat-val.cyan { color: #00E5BE; }

    /* Progress bar */
    .progress-wrap {
      display: none;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 6px;
      height: 5px;
      overflow: hidden;
      position: relative;
    }
    .progress-bar-fill {
      background: linear-gradient(90deg, #00E5BE, #38bdf8);
      height: 100%;
      width: 0%;
      transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 10px rgba(0, 229, 190, 0.5);
    }

    /* Zone & Fulfillment Filters */
    .filter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }
    .zone-group {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .zone-chip {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      padding: 3px 8px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }
    .zone-chip:hover {
      background: rgba(255, 255, 255, 0.09);
      color: #f1f5f9;
    }
    .zone-chip.active {
      background: rgba(0, 229, 190, 0.15);
      border-color: rgba(0, 229, 190, 0.5);
      color: #00E5BE;
      font-weight: 700;
    }
    .filter-toggles {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .filter-toggle {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: #94a3b8;
      cursor: pointer;
      user-select: none;
    }
    .filter-toggle input {
      accent-color: #00E5BE;
      cursor: pointer;
    }

    /* Badges */
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 6px;
    }
    .badge-status.avail {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }
    .badge-status.oos {
      background: rgba(239, 68, 68, 0.12);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.25);
    }
    .badge-express {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(0, 229, 190, 0.15);
      color: #00E5BE;
      border: 1px solid rgba(0, 229, 190, 0.35);
      border-radius: 5px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .badge-warehouse {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 5px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 700;
    }

    .pulse-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #34d399;
      box-shadow: 0 0 6px #34d399;
    }

    /* Table */
    .table-container {
      background: rgba(10, 15, 26, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      min-height: 240px;
      max-height: 380px;
      overflow-y: auto;
      flex: 1;
    }
    .table-container::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .table-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.18);
      border-radius: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    thead {
      position: sticky;
      top: 0;
      background: #0f172a;
      z-index: 10;
    }
    th {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
      padding: 9px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    td {
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 12px;
      color: #cbd5e1;
    }
    tr:hover td {
      background: rgba(255, 255, 255, 0.02);
    }
    .pincode-cell {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #00E5BE;
    }
    .btn-view-prod {
      background: rgba(0, 229, 190, 0.12);
      color: #00E5BE;
      border: 1px solid rgba(0, 229, 190, 0.35);
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-view-prod:hover {
      background: #00E5BE;
      color: #0b1118;
    }

    /* Footer */
    #footer {
      padding: 10px 18px 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(14, 18, 27, 0.95);
    }
    .footer-note {
      font-size: 11px;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .btn-action-group {
      display: flex;
      gap: 8px;
    }
    .btn-act {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s;
    }
    .btn-act:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
    .btn-act.primary {
      background: rgba(0, 229, 190, 0.15);
      border-color: rgba(0, 229, 190, 0.35);
      color: #00E5BE;
    }
    .btn-act.primary:hover {
      background: rgba(0, 229, 190, 0.25);
    }

    /* Toast */
    #toast {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #00E5BE;
      color: #07191d;
      padding: 7px 16px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 12px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0, 229, 190, 0.4);
    }
    #toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07191d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
        <button class="ctrl-btn" id="btn-minimize" title="Minimize">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button class="ctrl-btn close" id="btn-close" title="Close">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div id="body">
      <!-- Search Input -->
      <div class="search-bar">
        <div class="search-input-wrap">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="query-input" placeholder="Paste Croma product URL, 6-digit SKU (e.g. 317553), or category..." />
        </div>
        <button class="btn-scan" id="btn-scan">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Scan</span>
        </button>
      </div>

      <!-- Catalog Summary Bar -->
      <div id="pagination-bar">
        <div id="search-summary-text">Searching Croma catalog...</div>
        <div class="catalog-count-badge" id="catalog-count-badge">All Loaded</div>
      </div>

      <!-- Active Product Card / View Switcher -->
      <div class="hero-card">
        <div class="prod-thumb-wrap">
          <img id="product-img" class="prod-thumb" src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1606478950/Croma%20Assets/UI/croma_logo.png" />
        </div>
        <div class="prod-details">
          <div class="prod-header-line">
            <div class="prod-title" id="product-title">All Matching Products</div>
            <div class="prod-price" id="product-price">₹ -</div>
          </div>
          <div class="prod-meta-row">
            <select class="product-picker-select" id="product-picker">
              <option value="ALL">⭐ View All Matching Products (Summary Matrix)</option>
            </select>
            <span class="badge-express" title="Both Store Express & Warehouse checked simultaneously">⚡+🚚 Auto Dual Mode</span>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Scanned Pincodes</span>
          <span class="stat-val cyan" id="stat-scanned">0 / 86</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">In-Stock Stores/Hubs</span>
          <span class="stat-val green" id="stat-avail">0</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Unavailable</span>
          <span class="stat-val red" id="stat-oos">0</span>
        </div>
      </div>

      <!-- Animated Progress Bar -->
      <div class="progress-wrap" id="progress-container">
        <div class="progress-bar-fill" id="progress-bar"></div>
      </div>

      <!-- Filter Bar -->
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
            <input type="checkbox" id="chk-avail-only" checked />
            <span>In-Stock Only</span>
          </label>
          <label class="filter-toggle">
            <input type="checkbox" id="chk-express-only" />
            <span>⚡ Express Only</span>
          </label>
        </div>
      </div>

      <!-- Results Table -->
      <div class="table-container">
        <table>
          <thead id="table-head">
            <tr>
              <th>Product</th>
              <th style="width: 85px;">Price</th>
              <th style="width: 130px;">Mumbai In-Stock</th>
              <th>Fastest Delivery</th>
              <th style="width: 100px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr>
              <td colspan="5" style="text-align: center; color: #64748b; padding: 32px 16px;">
                Enter a category like <b>earbuds</b>, <b>laptop</b>, <b>soundbar</b> or a 6-digit SKU and click <b>Scan</b>!
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div id="footer">
        <div class="footer-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00E5BE" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Dual Mode: ⚡ Store Express (SDEL) & 🚚 Warehouse (HDEL)</span>
        </div>
        <div class="btn-action-group">
          <button class="btn-act" id="btn-copy">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
          <button class="btn-act primary" id="btn-export">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  `;

  shadow.appendChild(modal);

  // State Management
  let currentQuery = "";
  let currentProducts = []; // Array of all matching products loaded
  let activeSelectedSKU = "ALL"; // "ALL" or specific SKU
  let activeZone = "ALL";
  let scanMatrix = {}; // { [sku]: { [pincode]: itemResult } }
  let isScanning = false;
  let abortScan = false;

  // DOM Elements
  const queryInput = shadow.getElementById('query-input');
  const btnScan = shadow.getElementById('btn-scan');
  const paginationBar = shadow.getElementById('pagination-bar');
  const searchSummaryText = shadow.getElementById('search-summary-text');
  const catalogCountBadge = shadow.getElementById('catalog-count-badge');

  const productImg = shadow.getElementById('product-img');
  const productTitle = shadow.getElementById('product-title');
  const productPrice = shadow.getElementById('product-price');
  const productPicker = shadow.getElementById('product-picker');

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
    bodyDiv.style.display = bodyDiv.style.display === 'none' ? 'flex' : 'none';
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
      if (p.image) productImg.src = p.image;
    }
  }

  // Populate Product Picker Dropdown with all matching products
  function populateProductPicker() {
    productPicker.innerHTML = '';

    currentProducts.forEach((p, idx) => {
      const opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = `${idx + 1}. [${p.code}] ${p.name.slice(0, 48)}... (${p.price || ''})`;
      productPicker.appendChild(opt);
    });

    if (!activeSelectedSKU || !currentProducts.some(p => p.code === activeSelectedSKU)) {
      activeSelectedSKU = currentProducts[0]?.code || "";
    }

    productPicker.value = activeSelectedSKU;
    updateHeroCard(activeSelectedSKU);
  }

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

  productPicker.onchange = async () => {
    activeSelectedSKU = productPicker.value;
    updateHeroCard(activeSelectedSKU);
    if (!scanMatrix[activeSelectedSKU] || Object.keys(scanMatrix[activeSelectedSKU]).length === 0) {
      if (!isScanning) await startScan();
    } else {
      renderTable();
      updateStats();
    }
  };

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
          fBadge = `<span class="badge-express">⚡ Store Express [${r.expressStore}]</span><br><span style="font-size:9.5px; color:#38bdf8;">+ 🚚 Warehouse [${r.warehouseHub}]</span>`;
        } else if (r.hasExpress) {
          fBadge = `<span class="badge-express">⚡ Store Express [${r.expressStore}]</span><div style="font-size:10px; color:#94a3b8;">${r.expressStoreName}</div>`;
        } else if (r.hasWarehouse) {
          fBadge = `<span class="badge-warehouse">🚚 Warehouse [${r.warehouseHub}]</span><div style="font-size:10px; color:#94a3b8;">${r.warehouseHubName}</div>`;
        }
      }

      const eta = r.available ? (formatDeliveryETA(r.fastestDate, r.hasExpress ? r.expressCarrier : r.warehouseCarrier)) : '-';

      return `
        <tr>
          <td class="pincode-cell">${r.pin}</td>
          <td>
            <div style="font-weight:600; color:#f1f5f9;">${r.area}</div>
            <div style="font-size:10px; color:#64748b;">${r.zone}</div>
          </td>
          <td>
            <span class="badge-status ${r.available ? 'avail' : 'oos'}">
              ${r.available ? '<span class="pulse-dot"></span>IN STOCK' : 'OUT OF STOCK'}
            </span>
          </td>
          <td>${fBadge}</td>
          <td style="font-size:11px; color:${r.available ? '#e2e8f0' : '#64748b'}; font-weight:${r.available ? '600' : 'normal'};">
            ${eta}
          </td>
        </tr>
      `;
    }).join('');
  }

  // Drilldown helper exposed to custom element host
  host.__selectSKU = async (sku) => {
    activeSelectedSKU = sku;
    productPicker.value = sku;
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

  // Scan Controls: Separate startScan and stopScan to avoid accidental self-aborts
  function stopScan() {
    if (isScanning) {
      abortScan = true;
      btnScan.disabled = true;
      btnScan.innerHTML = `<span>Stopping...</span>`;
    }
  }

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

    // If query changed or no products loaded, query Croma search catalog
    if (q && (q !== currentQuery || currentProducts.length === 0)) {
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
          const res = await searchCatalogAll(targetSku);
          const matchedProd = res.products?.find(p => String(p.code) === String(targetSku)) || res.products?.[0];
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
      } else {
        try {
          const res = await searchCatalogAll(q);
          const rawProds = res.products || [];
          if (rawProds.length === 0) {
            showToast(`No products found for "${q}" 🔍`);
            btnScan.disabled = false;
            btnScan.innerHTML = `<span>Scan</span>`;
            return;
          }

          currentProducts = rawProds.map(p => {
            const rawP = p.price?.value || parseFloat((p.price?.formattedValue || "").replace(/[^\d.]/g, '')) || 0;
            const img = p.images?.find(im => im.imageType === 'PRIMARY')?.url || p.productImage || "";
            const pUrl = p.url ? (p.url.startsWith('http') ? p.url : `https://www.croma.com${p.url}`) : `https://www.croma.com/p/${p.code}`;
            return {
              code: String(p.code),
              name: p.name,
              price: p.price?.formattedValue || (rawP ? `₹${rawP.toLocaleString('en-IN')}` : ""),
              rawPrice: rawP,
              image: img,
              url: pUrl
            };
          });

          // Show Catalog Summary Bar with full count
          paginationBar.style.display = 'flex';
          searchSummaryText.innerHTML = `Loaded all <b style="color:#00E5BE;">${currentProducts.length}</b> products for "${q}"`;
          catalogCountBadge.textContent = `${currentProducts.length} Products Ready`;

          activeSelectedSKU = currentProducts[0].code;
        } catch (err) {
          showToast("Search failed: " + err.message);
          btnScan.disabled = false;
          btnScan.innerHTML = `<span>Scan</span>`;
          return;
        }
      }

      populateProductPicker();
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
    abortScan = false;
    btnScan.disabled = false;
    btnScan.className = 'btn-scan btn-scan-stop';
    btnScan.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <rect x="5" y="5" width="14" height="14" rx="2"></rect>
      </svg>
      <span>Stop</span>
    `;

    progressContainer.style.display = 'block';
    scanMatrix[targetProduct.code] = scanMatrix[targetProduct.code] || {};

    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #00E5BE; padding: 28px;">⚡ Scanning [${targetProduct.code}] across 86+ Mumbai & MMR pincodes in real-time...</td></tr>`;

    const targetPins = [...MUMBAI_PINCODES];
    const total = targetPins.length;
    let completed = 0;
    let totalInStockOccurrences = 0;
    let hitRateLimit = false;

    const CONCURRENCY = 4;
    let index = 0;

    async function worker() {
      while (true) {
        if (abortScan || hitRateLimit) break;
        if (index >= targetPins.length) break;
        const pinItem = targetPins[index++];
        if (!pinItem || !pinItem.pin) break;

        let batchResults = {};
        try {
          batchResults = (await checkBatchSLA([targetProduct], pinItem.pin)) || {};
          // 20ms safe delay between requests
          await new Promise(r => setTimeout(r, 20));
        } catch (e) {
          if (e.message === "WAF_RATE_LIMIT") {
            hitRateLimit = true;
            abortScan = true;
            break;
          }
          batchResults = {};
        }

        if (abortScan) break;
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
      abortScan = false;
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
        showToast(completed < total ? `Scan Stopped (${completed}/${total} pincodes)` : `Scan Complete! In-Stock at ${totalInStockOccurrences} of 86 Pincodes ✨`);
      }
    }
  }

  btnScan.onclick = () => {
    if (isScanning) {
      stopScan();
    } else {
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
      const priceMatch = rawPriceText.match(/₹[\d,]+(\.\d{2})?/);
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
      populateProductPicker();

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

    navigator.clipboard.writeText(text).then(() => showToast("Copied Multi-SKU Report! 📋"));
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
