/**
 * 🛵 Swiggy Instamart Multi-Store Hunter v1.0
 * Injects a floating interactive search GUI directly on swiggy.com/instamart
 * to scan all 112 Mumbai dark stores (with pre-saved live addresses).
 */
(function() {
  if (window.__SWIGGY_HUNTER_LOADED__) {
    const existing = document.getElementById('sw-hunter-overlay');
    if (existing) existing.style.display = 'flex';
    console.log('🛵 Swiggy Instamart Hunter already active! Reopened window.');
    return;
  }
  window.__SWIGGY_HUNTER_LOADED__ = true;

  let STORES = [["1403454","Aaram Nagar Part 2",19.133278,72.813,"Aram Nagar Part 2, Jeet Nagar, Versova, Andheri West, Mumbai, Maharashtra 400061, India","400061"],["1404877","AG Nagar",19.26767,72.878021,"MIDC, Mira Road East, Mira Bhayandar, Maharashtra, India","401107"],["810366","Andheri East",19.1198744,72.861152,"Gundavali, Andheri East, Mumbai, Maharashtra, India","400093"],["1398452","Andheri West",19.137528,72.833722,"Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra, India","400053"],["1113109","Antop Hill",19.0450204,72.8680399,"Sion East, Sion, Mumbai, Maharashtra, India","400022"],["1402264","Apex Mulund",19.184767,72.948677,"Kamgar Colony, Mulund West, Mumbai, Maharashtra, India","400080"],["1405161","Balkum / Majiwada North",19.225,73.01,"Kasheli, Maharashtra, India","421302"],["1404984","Bandra Hill Road",19.056,72.83,"Bandra West, Mumbai, Maharashtra, India","400050"],["969383","Bandra West",19.047184,72.833307,"India",""],["1084119","Belapur",19.0216017,73.028307,"Sector 23, Nerul, Navi Mumbai, Maharashtra, India","400614"],["1404771","Bethany Hospital",19.218496,72.953194,"Upvan, Thane West, Thane, Maharashtra 400606, India","400606"],["788745","Bhandup",19.158428,72.941495,"Industrial Area, Bhandup West, Mumbai, Maharashtra, India","400078"],["1388687","Bhayander",19.300099,72.85513,"Bhayandar, Vikas Industrial Estate, Bhayandar East, Mira Bhayandar, Maharashtra, India","401105"],["1405215","Bhayanderpada / Owala Village",19.268,72.955,"Owale, Thane West, Thane, Maharashtra 400615, India","400615"],["1237261","Borivali East",19.231257,72.860731,"Jestaram Kapadia Road, Chinchpada, Borivali, Mumbai, Maharashtra 400066, India","400066"],["1404796","Borivali East (Magathane)",19.245,72.865,"Ashok Van, Dahisar East, Mumbai, Maharashtra, India","400068"],["1396283","Byculla East",18.975889,72.838389,"Mustafa Bazar, Byculla, Mumbai, Maharashtra, India","400010"],["1384969","Chandivali",19.114,72.894,"Chandivali Farm Road, Chandivali, Powai, Mumbai, Maharashtra 400072, India","400072"],["1390223","Chikan Ghar",19.25444,73.139913,"Bhoirwadi, Kalyan, Maharashtra 421301, India","421301"],["1405185","Colaba / Churchgate",18.925,72.84,"Fort, Mumbai, Maharashtra, India",""],["1404448","Colaba Police Colony",18.915,72.82,"GD Somani Road, Cuffe Parade, Mumbai, Maharashtra 400005, India","400005"],["1402806","Container Yard - MP",19.139512,72.928823,"Ganesh Nagar, Bhandup West, Mumbai, Maharashtra 400078, India","400078"],["1062418","Dahisar West",19.251583,72.858646,"Mhatre Wadi, Dahisar West, Mumbai, Maharashtra 400068, India","400068"],["1399706","Devicha Pada",19.226694,73.083389,"Bhoir Wadi, Dombivli West, Kalyan, Maharashtra 421202, India","421202"],["1383130","Dhobi Talao",18.936506,72.838211,"Ballard Estate, Fort, Mumbai, Maharashtra 400001, India","400001"],["1403051","Eksar",19.236029,72.837357,"Gorai 3, Borivali West, Mumbai, Maharashtra 400091, India","400091"],["1400554","Elymus",19.2053419,73.1158054,"Dombivli, Kalyan, Maharashtra 421203, India","421203"],["1389632","Gaothan (Airoli)",19.165497,72.996665,"Sector 1A, Airoli, Navi Mumbai, Maharashtra 400708, India","400708"],["1385645","Ghansoli",19.112493,73.007007,"CIDCO Resesve Plots, Ghansoli, Navi Mumbai, Maharashtra, India","400701"],["1405232","Ghatkopar East / Tilak Nagar",19.075,72.925,"Mumbai, Maharashtra 400043, India","400043"],["1405210","Girgaon",18.945,72.828,"Navajeevan Wadi, Sonapur, Marine Lines, Mumbai, Maharashtra 400002, India","400002"],["1135722","Girgaon Chowpatty",18.955,72.818,"Charni Road East, Opera House, Girgaon, Mumbai, Maharashtra, India","400004"],["1402064","Goregaon West",19.178824,72.874072,"Malad, Sankalp Colony, Malad East, Mumbai, Maharashtra 400097, India","400097"],["1404958","Goregaon West (Link Road)",19.17,72.85,"Pandurang Wadi, Goregaon East, Mumbai, Maharashtra 400063, India","400063"],["1381561","Hawaiian Village",19.2761339,72.9602383,"Owale, Thane West, Thane, Maharashtra 400615, India","400615"],["1396296","Hiranandani MBC Park",19.265951,72.965698,"Ghodbunder Road, Kasarwadawali, Thane, Mumbai, Maharashtra 400615, India","400615"],["1381966","Indira Nagar",19.0662856,72.8918191,"Dr Mandakini Parihar Marg, Tilak Nagar, Mumbai, Maharashtra 400089, India","400089"],["1239162","Inorbit Mall Malad West",19.17681,72.83422,"Vibgyor School Rd, Miindspace, Malad West, Mumbai, Maharashtra 400064, India","400064"],["1135721","Jogeshwari West Station Road",19.14,72.842,"Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra, India","400102"],["1295148","Juhu / Vile Parle West",19.11,72.835,"MHADA Colony, Juhu, Mumbai, Maharashtra, India","400056"],["1238358","JVLR (Jogeshwari East)",19.138,72.86,"Samarth Nagar, Jogeshwari East, Mumbai, Maharashtra 400060, India","400060"],["1403030","Kalina",19.071075,72.864707,"Santacruz-chembur link Rd, Santacruz East, Mumbai, Maharashtra 400098, India","400098"],["1401485","Kalpataru Parkcity",19.222,72.982,"Kailash Nagar, Thane West, Thane, Maharashtra, India","400607"],["1400553","Kalwa",19.200708,72.999932,"Kharegaon, Kalwa, Thane, Maharashtra, India","400605"],["1388387","Kalyan East",19.226485,73.133177,"Shivaji Colony, Kalyan, Maharashtra 421306, India","421306"],["1402062","Kalyan West",19.22,73.12,"Dombivli, Tata Power Company Limited, Dombivli East, Kalyan, Maharashtra, India","421203"],["1400552","Kalyan-Dombivli North",19.24,73.16,"Bhim Nagar, Sidhi Vinayak Nagar, Ulhasnagar, Maharashtra 421002, India","421002"],["1401265","Kamothe",19.017364,73.101226,"Jawahar Co-op Ind, Kamothe, Panvel, Maharashtra 410209, India","410209"],["1400231","Kandivali",19.208417,72.825028,"Sector 3, Charkop, Charkop Industrial Estate, Kandivali West, Mumbai, Maharashtra 400067, India","400067"],["1190779","Kandivali East (Thakur Complex)",19.2,72.865,"Kandivali, Hanuman Nagar, Kandivali East, Mumbai, Maharashtra, India","400101"],["1405158","Kasarvadavali / Waghbil",19.27,73.01,"Dive, Maharashtra, India","421302"],["1386534","Katai Pipeline Road",19.1641535,73.1165815,"Khoni Pagadyacha Pada, Maharashtra 421204, India","421204"],["1395728","Katai Village",19.163778,73.076,"Nilaje, Casa Bella Gold, Katai Village, Kalyan, Maharashtra 421204, India","421204"],["1082435","Kharghar",19.05184,73.081064,"Central Park Rd, Sector 19, Kharghar, Navi Mumbai, Maharashtra 410210, India","410210"],["1404760","Kharghar - MP",19.041431,73.071152,"Block G, Sector 12, Kharghar, Panvel, Maharashtra 410210, India","410210"],["1405053","Kurla West / BKC",19.075,72.88,"Hallow Pul, Kurla West, Mumbai, Maharashtra 400070, India","400070"],["1403034","Lodha Amara",19.2326343,72.9937873,"Kolshet Industrial Area, Thane West, Thane, Maharashtra, India","400607"],["1392531","Lower Parel",19.000903,72.830223,"Lower Parel, Mumbai, Maharashtra, India","400013"],["1404993","Lower Parel / Worli",19,72.855,"Comed Rambhau Dev Ji Patil Rd, Gandhi Nagar, Parel, Mumbai, Maharashtra 400015, India","400015"],["1381967","Mahim",19.0361932,72.8467828,"New Dinkar Co Operative Housing Society, Mahim, Mumbai, Maharashtra 400016, India","400016"],["1404681","Majiwada - MP",19.215929,72.976555,"Subhash Nagar, Thane West, Thane, Maharashtra 400601, India","400601"],["1398760","Marathi Patrakar / Matunga East",19.014972,72.844694,"Madhavwadi, Dadar, Mumbai, Maharashtra 400014, India","400014"],["1404907","Marathon Nexzone",18.970366,73.131569,"Palaspe Phata, Panvel, Navi Mumbai, Maharashtra 410221, India","410221"],["1399809","Marol",19.110389,72.887194,"Krishanlal Marwah Rd, Saki Vihar, Andheri East, Mumbai, Maharashtra 400072, India","400072"],["1398759","Millennium Avanish / Rabale",19.1426207,72.9913945,"Diva Nagar Road, Sector-10A  Airoli, Mumbai, Maharashtra 400708, India","400708"],["1346590","Mira Hubtown",19.285109,72.876539,"Chandan Shanti, Mira Road East, Mira Bhayandar, Maharashtra 401107, India","401107"],["1404642","Mira Road - MP",19.280079,72.877907,"Hatkesh Udhog Nagar, Mira Road East, Mira Bhayandar, Maharashtra 401107, India","401107"],["1390224","Model Colony Mumbai",19.142508,72.809449,"Yari Rd, Yagna Nagar, Andheri West, Mumbai, Maharashtra 400061, India","400061"],["1278165","Mulund West",19.170386,72.953872,"Asha Nagar, Mulund West, Mumbai, Maharashtra 400080, India","400080"],["1404751","Naupada",19.1846431,72.9675317,"Shivaji Nagar, Thane West, Thane, Maharashtra, India","400602"],["1404757","Nerul - MP",19.039675,73.009544,"Sector 14, Nerul, Navi Mumbai, Maharashtra 400706, India","400706"],["1402784","Nilaje Gaon",19.155699,73.074898,"Maduban Society, Nilaje, Kalyan, Maharashtra 421204, India","421204"],["1230883","Oberoi Mall",19.173818,72.856488,"Malad, Dindoshipada, Malad East, Mumbai, Maharashtra, India","400063"],["1402785","Owala Naka",19.265,72.965,"Anand Nagar, Thane West, Thane, Maharashtra 400615, India","400615"],["1319696","Pali Hill / 14th Road Khar",19.065,72.831,"Bandra West, Mumbai, Maharashtra, India","400050"],["1404645","Park Road",19.105726,72.851463,"Paranjape Nagar, Vile Parle, Mumbai, Maharashtra 400057, India","400057"],["1391897","Postal Colony Chembur",19.0588409,72.8907382,"Eastern Express Highway, Postal Colony, Chembur, Mumbai, Maharashtra 400071, India","400071"],["1135720","Powai 2",19.1188,72.9052,"MHADA Colony 19, Powai, Mumbai, Maharashtra 400076, India","400076"],["1388686","Pragati Nagar",19.410025,72.830872,"Nala Sopara, Ambawadi, Nalasopara East, Vasai-Virar, Maharashtra, India","401209"],["1298955","R City Mall, Ghatkopar West",19.0950627,72.9176548,"Lal Bahadur Shastri Rd, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra 400086, India","400086"],["1403842","Relief Road",19.165392,72.846725,"Jawahar Nagar, Goregaon West, Mumbai, Maharashtra 400104, India","400104"],["1387703","RK Studios",19.047268,72.90815,"Ghatla, Chembur, Mumbai, Maharashtra, India","400071"],["1403216","RoadPali",19.043961,73.098068,"Roadpali, Kalamboli, Panvel, Maharashtra, India","410218"],["1401266","Runwal Garden",19.188412,73.094688,"Mangaon, Sonar Pada, Dombivli East, Kalyan, Maharashtra 421204, India","421204"],["1238357","Sagarli Gaon",19.207338,73.098347,"Dombivli, MIDC, Dombivli East, Kalyan, Maharashtra, India","421203"],["1405018","Saki Naka",19.098,72.888,"Ashok Nagar, Saki Naka, Mumbai, Maharashtra, India","400072"],["1404964","Sangharsh Nagar Chandivali",19.108,72.896,"GM Colony, Yadav Nagar, Chandivali, Powai, Mumbai, Maharashtra 400072, India","400072"],["1405089","Sanpada Carshed",19.065,73.01,"Sector 3, Sanpada, Navi Mumbai, Maharashtra 400705, India","400705"],["1335483","Seawoods (Navi Mumbai)",19.017979,73.012567,"Karave Link Road, Sector 38, Seawoods, Navi Mumbai, Maharashtra 400706, India","400706"],["1403032","Sec 11 Belapur",19.015339,73.042534,"Sector 11, CBD Belapur, Navi Mumbai, Maharashtra, India","400614"],["1405076","Sector 14 Kopar Khairane",19.102,73.008,"Kopar Khairane, Navi Mumbai, Maharashtra, India","400709"],["1396295","Sion East",19.022056,72.86825,"Vidyalankar College Road, Antop Hill, Mumbai, Maharashtra 400037, India","400037"],["1400977","Takka Naka",18.980835,73.113323,"Old Panvel, Panvel, Navi Mumbai, Maharashtra, India","410206"],["1386846","Taloja Jail Road",19.069468,73.074544,"Utsav Chowk - CISF Road, Sector 35, Panvel, Navi Mumbai, Maharashtra 410210, India","410210"],["1402459","Taloja Phase 2",19.071998,73.095683,"Taloja Phase 2, Taloja, Panvel, Maharashtra 410208, India","410208"],["1396282","Tardeo Police Station",18.969984,72.814278,"Janata Nagar, Tardeo, Mumbai, Maharashtra, India","400034"],["1381500","Telecom Factory",19.0499236,72.9165793,"Govandi Station Rd, Deonar, Govandi East, Mumbai, Maharashtra 400088, India","400088"],["1382439","Thakur Village",19.20579,72.8741,"ठाकुर, कांदिवली ईस्ट, मुंबई, महाराष्ट्र 400101, India","400101"],["1336659","Thane West",19.2280146,72.9756959,"Manpada, Thane West, Thane, Maharashtra, India","400601"],["1402458","Ulwe",18.969516,73.023393,"Jai Bhavani Road, Sector 18, Ulwe, Navi Mumbai, Maharashtra 410206, India","410206"],["1381643","Uthalsar",19.2083033,72.9773984,"Lal Bahadur Shastri Marg, Azad Nagar, Thane West, Thane, Maharashtra 400601, India","400601"],["1403211","Vadale Lake - MP",18.998722,73.111639,"Sector 15, Khanda Colony, Panvel, Maharashtra 410206, India","410206"],["1314371","Vasai Virar",19.384573,72.830382,"Shastri Nagar, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202, India","401202"],["810367","Vikhroli",19.118084,72.922486,"HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra, India","400083"],["1190780","Vile Parle",19.0866481,72.8374707,"VM Bhargav Road, Santacruz West, Mumbai, Maharashtra 400054, India","400054"],["1397051","Vile Parle",19.104799,72.838066,"Indira Nagar, Vile Parle West, Mumbai, Maharashtra 400056, India","400056"],["1295147","Vile Parle East",19.1147357,72.8502962,"Professor NS Phadke Road, Vijay Nagar, Andheri East, Mumbai, Maharashtra 400053, India","400053"],["1404876","Virar Carshed",19.424294,72.811562,"Zero Road, Sriprastha, Nalasopara West, Nala Sopara, Maharashtra 401203, India","401203"],["1402063","Virar East",19.470556,72.808861,"Evershine Globle City, Dongarpada, Rustomjee Global City, Virar West, Vasai-Virar, Maharashtra, India","401303"],["1404646","Waghbil Naka",19.2501102,72.9740743,"Patlipada Village, Thane West, Thane, Maharashtra, India","400615"],["1405057","Worli",19.016,72.817,"Koliwada, Worli, Mumbai, Maharashtra 400030, India","400030"],["929911","Yojit Estates",19.1932313,72.956769,"Ambika Nagar No 3, Thane West, Thane, Maharashtra 400604, India","400604"]];

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const money = m => (m && m.units != null ? Number(m.units) + (m.nanos || 0) / 1e9 : null);
  const IMG_BASE = 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/';

  let lastRequestAt = 0;
  const REQUEST_GAP_MS = 1100;

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
    const label = address || `${lat}, ${lng}`;
    const res = await rateLimitedFetch('/api/instamart/home/select-location/v2', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json', accept: '*/*' },
      body: JSON.stringify({ data: { lat, lng, address: label, addressId: '', annotation: label, clientId: 'INSTAMART-APP' } }),
    });
    if (!res.ok) throw new Error('select-location HTTP ' + res.status);
    const json = await res.json();
    if (json.statusCode === 400) throw new Error(`not serviceable (${lat}, ${lng})`);
    if (json.statusCode !== 0) throw new Error('select-location statusCode ' + json.statusCode + ' ' + (json.statusMessage || ''));
  }

  async function getAddressViaApi(lat, lng) {
    const res = await rateLimitedFetch(`/api/instamart/maps/address-widgets/v2?lat=${lat}&lng=${lng}`, {
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

  const SEARCH_URL = o => `/api/instamart/search/v2?offset=${o}&ageConsent=false&voiceSearchTrackingId=&storeId=&primaryStoreId=&secondaryStoreId=`;

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
    const [podId, locality, lat, lng, defaultAddress, defaultPin] = store;
    const resolvedAddr = store.resolvedAddress || defaultAddress || '';
    const resolvedPin = store.resolvedPincode || defaultPin || '';
    const maps = `https://www.google.com/maps?q=${lat},${lng}`;

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
          product_url: d.productId ? `https://www.swiggy.com/instamart/item/${d.productId}` : ''
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
  styleEl.textContent = `
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
  `;
  document.head.appendChild(styleEl);

  // 2. Inject HTML Overlay
  const overlay = document.createElement('div');
  overlay.id = 'sw-hunter-overlay';
  overlay.innerHTML = `
    <div class="sw-h-header">
      <div class="sw-h-title">
        <span style="font-size: 16px;">🛵</span>
        <span>Instamart Hunter</span>
        <span class="sw-h-badge" id="sw-h-badge">${STORES.length} STORES</span>
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
            <option value="all">All ${STORES.length} Stores</option>
            ${STORES.map((s, i) => `<option value="${i}">${s[1]}</option>`).join('')}
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
  `;
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
  launcher.innerHTML = `🛵 <span>Instamart Hunter</span>`;
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
            p.liveSwiggyAddress || p.primaryServingAddress || p.address || '',
            p.pincode || (p.primaryServingAddress?.match(/\b(4\d{5})\b/) || [''])[0] || ''
          ]);
        }
        STORES = parsed;
        badgeEl.textContent = `${STORES.length} STORES`;
        storeSelect.innerHTML = `<option value="all">All ${STORES.length} Stores</option>` +
          STORES.map((s, i) => `<option value="${i}">${s[1]}</option>`).join('');
        alert(`Successfully loaded ${STORES.length} dark stores from custom JSON!`);
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
      banner.innerHTML = `
        <span>✨ <b>${items.length}</b> products found! Results opened in new tab ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">View Again</button>
      `;
    } else {
      banner.className = 'sw-h-banner blocked';
      banner.innerHTML = `
        <span>🛵 <b>${items.length}</b> products ready! Click to open table ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">Open Results</button>
      `;
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
      const [podId, loc, lat, lng, defaultAddress, defaultPin] = store;
      store.resolvedAddress = defaultAddress || '';
      store.resolvedPincode = defaultPin || '';

      const pct = Math.round(((i + 1) / targetStores.length) * 100);
      pbar.style.width = `${pct}%`;
      statusText.textContent = `[${i + 1}/${targetStores.length}] Checking ${loc}...`;

      try {
        // Location update via Swiggy API
        await setLocationViaApi({ lat, lng, address: loc });

        let products = [];
        try {
          products = await searchViaApi(query);
        } catch (err) {
          if (err.rateLimited) {
            statusText.textContent = `[${i + 1}/${targetStores.length}] DOM fallback for ${loc}...`;
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
          tr.innerHTML = `
            <td><b>${row.store_locality}</b></td>
            <td>${row.name}</td>
            <td class="sw-h-price">${price ? '₹' + price : '-'}</td>
            <td><span class="sw-h-stock ${row.stock === 'In stock' ? 'sw-h-in' : 'sw-h-out'}">${row.stock === 'In stock' ? 'In Stock' : 'Out'}</span></td>
          `;
          tableBody.appendChild(tr);
        }

        if (storeAdded) storesWithItems++;

        // Update live metrics
        document.getElementById('sw-sum-stores').textContent = storesWithItems;
        document.getElementById('sw-sum-items').textContent = searchResults.length;
        document.getElementById('sw-sum-min').textContent = minPriceFound < 999999 ? `₹${minPriceFound}` : '-';
        countBadge.style.display = searchResults.length ? 'inline-block' : 'none';
        countBadge.textContent = `${searchResults.length} found`;

      } catch (err) {
        console.warn('Scan error for', loc, err);
        statusText.textContent = `[${i + 1}/${targetStores.length}] ${loc} skipped (${err.message})`;
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
    countBadge.textContent = `${searchResults.length} total`;
    statusText.textContent = abortScan
      ? `Scan stopped (${searchResults.length} items found).`
      : `✓ Done! Scanned ${targetStores.length} stores (${searchResults.length} items found).`;
    window.swiggyResults = searchResults;

    // Auto open results once done or stopped
    if (searchResults.length > 0 && !resultsOpenedForScan) {
      resultsOpenedForScan = true;
      openBlankResultsTable(searchResults, query, true);
    }
  };

  const TABLE_PAGE_HTML = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>🛵 Swiggy Instamart — Results</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n  <style id=\"app-style\">\n    :root {\n      --ink: #1f1b16;\n      --paper: #edebdf;\n      --card: #ffffff;\n      --crate: #2b5235;\n      --crate-tint: #e4ede3;\n      --brick: #a6402b;\n      --brick-tint: #f4e5e0;\n      --swiggy: #ff7a1a;\n      --swiggy-dim: #e5660a;\n      --stone: #5b5648;\n      --line: #dcd8c8;\n      --display: \"Space Grotesk\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, system-ui, sans-serif;\n      --body: \"IBM Plex Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, system-ui, sans-serif;\n    }\n    * { box-sizing: border-box; }\n    body {\n      margin: 0;\n      font: 400 13px/1.5 var(--body);\n      background: var(--paper);\n      color: var(--ink);\n    }\n\n    header {\n      position: sticky;\n      top: 0;\n      z-index: 10;\n      background: var(--paper);\n      border-bottom: 2px solid var(--ink);\n      padding: 14px 20px 12px;\n    }\n    .top-row {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 14px;\n      flex-wrap: wrap;\n    }\n    .title-row {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n    .title-logo {\n      font-size: 24px;\n      line-height: 1;\n      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));\n    }\n    .query-tag {\n      font-family: var(--display);\n      font-weight: 700;\n      font-size: 19px;\n      letter-spacing: -.01em;\n      background: var(--ink);\n      color: var(--paper);\n      padding: 5px 14px 6px;\n      border-radius: 3px;\n      transform: rotate(-.6deg);\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n    }\n    .query-tag .q-mark {\n      color: var(--swiggy);\n    }\n\n    #metaCard {\n      flex: none;\n      display: flex;\n      gap: 6px;\n      flex-wrap: wrap;\n    }\n    #metaCard .stat {\n      font-family: var(--display);\n      border: 1.5px solid var(--ink);\n      border-radius: 3px;\n      padding: 5px 11px;\n      color: var(--ink);\n      font-size: 11.5px;\n      font-weight: 600;\n      white-space: nowrap;\n      background: var(--card);\n    }\n    #metaCard .stat b {\n      color: var(--swiggy-dim);\n      font-weight: 700;\n    }\n\n    .toolbar {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      margin-top: 12px;\n      flex-wrap: wrap;\n    }\n    .toolbar .spacer {\n      flex: 1;\n      min-width: 0;\n    }\n    input#filter, select.filter-select {\n      padding: 7px 11px;\n      border: 1.5px solid var(--line);\n      border-radius: 20px;\n      font-size: 12.5px;\n      background: var(--card);\n      color: var(--ink);\n      flex: none;\n      font-family: var(--body);\n      outline: none;\n    }\n    select.filter-select {\n      min-width: 135px;\n      cursor: pointer;\n    }\n    input#filter {\n      width: 220px;\n    }\n    input#filter:focus, select.filter-select:focus {\n      border-color: var(--swiggy);\n    }\n    button.tool-btn {\n      padding: 7px 14px;\n      border: 1.5px solid var(--line);\n      border-radius: 20px;\n      background: var(--card);\n      color: var(--ink);\n      font-size: 12.5px;\n      font-weight: 600;\n      cursor: pointer;\n      flex: none;\n      font-family: var(--body);\n      transition: all 0.15s;\n    }\n    button.tool-btn:hover {\n      border-color: var(--swiggy);\n    }\n    button.tool-btn.active {\n      background: var(--crate);\n      border-color: var(--crate);\n      color: #fff;\n    }\n    button.btn-primary {\n      background: var(--swiggy);\n      border: none;\n      color: #ffffff;\n      font-family: var(--display);\n      font-weight: 700;\n      padding: 8px 16px;\n    }\n    button.btn-primary:hover {\n      background: var(--swiggy-dim);\n    }\n\n    #tableWrap {\n      overflow: auto;\n      max-height: calc(100vh - 128px);\n      padding: 0 20px 20px;\n    }\n    table {\n      border-collapse: collapse;\n      width: 100%;\n      font-size: 12.5px;\n    }\n    thead th {\n      position: sticky;\n      top: 0;\n      background: var(--paper);\n      text-align: left;\n      padding: 10px 10px 8px;\n      border-bottom: 2px solid var(--ink);\n      font-weight: 600;\n      font-family: var(--display);\n      color: var(--ink);\n      white-space: nowrap;\n      cursor: pointer;\n      user-select: none;\n    }\n    thead th:hover {\n      color: var(--swiggy);\n    }\n    tbody td {\n      padding: 9px 10px;\n      border-bottom: 1px solid var(--line);\n      font-weight: 400;\n      max-width: 280px;\n      white-space: normal;\n      overflow-wrap: break-word;\n      vertical-align: middle;\n    }\n    tbody tr {\n      border-left: 4px solid transparent;\n      transition: background 0.1s;\n    }\n    tbody td.nowrap {\n      max-width: none;\n      white-space: nowrap;\n    }\n    tbody tr:hover {\n      background: #ffffff;\n    }\n    tbody tr.sold-out {\n      background: var(--brick-tint);\n      border-left-color: var(--brick);\n    }\n    tbody tr.sold-out:hover {\n      background: #efd6cf;\n    }\n    tbody tr.in-stock {\n      background: var(--crate-tint);\n      border-left-color: var(--crate);\n    }\n    tbody tr.in-stock:hover {\n      background: #d6e5d4;\n    }\n    td.num {\n      text-align: right;\n      font-variant-numeric: tabular-nums;\n      font-family: var(--display);\n      font-weight: 600;\n    }\n    td a {\n      color: var(--swiggy-dim);\n      text-decoration: none;\n      font-weight: 600;\n    }\n    td a:hover {\n      text-decoration: underline;\n    }\n\n    .prod-link {\n      color: var(--ink);\n      font-weight: 600;\n      line-height: 1.35;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n    .prod-link:hover {\n      color: var(--swiggy-dim);\n    }\n    .brand-tag {\n      font-size: 10px;\n      font-weight: 700;\n      color: var(--stone);\n      text-transform: uppercase;\n      letter-spacing: 0.03em;\n      margin-bottom: 2px;\n    }\n    .qty-tag {\n      font-size: 11px;\n      font-weight: 600;\n      color: var(--stone);\n    }\n    .thumb {\n      height: 36px;\n      width: 36px;\n      object-fit: contain;\n      border-radius: 4px;\n      vertical-align: middle;\n      cursor: zoom-in;\n      background: #ffffff;\n      border: 1px solid var(--line);\n    }\n    .thumb-fallback {\n      height: 36px;\n      width: 36px;\n      border-radius: 4px;\n      background: var(--card);\n      border: 1px solid var(--line);\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      color: var(--stone);\n      vertical-align: middle;\n    }\n\n    .view-btn {\n      border: 1.5px solid var(--line);\n      background: var(--card);\n      border-radius: 5px;\n      width: 26px;\n      height: 26px;\n      cursor: pointer;\n      font-size: 13px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      transition: all 0.15s;\n    }\n    .view-btn:hover {\n      border-color: var(--swiggy);\n      transform: scale(1.08);\n    }\n\n    #empty {\n      padding: 60px 20px;\n      text-align: center;\n      color: var(--stone);\n      font-family: var(--display);\n      font-size: 15px;\n      font-weight: 600;\n    }\n\n    /* Modals */\n    .modal-overlay {\n      position: fixed;\n      inset: 0;\n      background: rgba(31, 27, 22, .55);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 100;\n      padding: 20px;\n    }\n    .modal-card {\n      background: var(--card);\n      border-radius: 4px;\n      width: 490px;\n      max-width: 100%;\n      max-height: 88vh;\n      overflow-y: auto;\n      box-shadow: 0 24px 60px rgba(31,27,22,.4);\n      position: relative;\n    }\n    .modal-card::before {\n      content: \"\";\n      position: absolute;\n      top: -10px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 20px;\n      height: 20px;\n      background: radial-gradient(circle, transparent 60%, var(--card) 61%);\n    }\n    .modal-head {\n      display: flex;\n      gap: 12px;\n      align-items: center;\n      padding: 20px 20px 16px;\n      border-bottom: 2px dashed var(--line);\n      position: sticky;\n      top: 0;\n      background: var(--card);\n      z-index: 2;\n    }\n    .modal-head img {\n      width: 48px;\n      height: 48px;\n      border-radius: 6px;\n      object-fit: contain;\n      flex: none;\n      background: var(--paper);\n      border: 1px solid var(--line);\n    }\n    .modal-head .name {\n      font-family: var(--display);\n      font-weight: 600;\n      font-size: 14.5px;\n      line-height: 1.3;\n      flex: 1;\n    }\n    .modal-close {\n      cursor: pointer;\n      color: var(--stone);\n      font-size: 14px;\n      line-height: 1;\n      flex: none;\n      width: 26px;\n      height: 26px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 50%;\n      background: var(--paper);\n      user-select: none;\n    }\n    .modal-close:hover {\n      background: var(--line);\n      color: var(--ink);\n    }\n\n    .modal-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 14px;\n      padding: 16px 20px;\n    }\n    .modal-grid .full {\n      grid-column: 1 / -1;\n    }\n    .modal-field .k {\n      font-family: var(--display);\n      font-size: 10.5px;\n      font-weight: 600;\n      color: var(--stone);\n      margin-bottom: 3px;\n      border-left: 2px solid var(--swiggy);\n      padding-left: 6px;\n    }\n    .modal-field .v {\n      font-size: 12.5px;\n      line-height: 1.45;\n      word-break: break-word;\n      padding-left: 8px;\n    }\n\n    .modal-section {\n      padding: 14px 20px 18px;\n      border-top: 2px dashed var(--line);\n    }\n    .modal-section .sec-title {\n      font-family: var(--display);\n      font-size: 11px;\n      font-weight: 600;\n      color: var(--ink);\n      border-left: 2px solid var(--swiggy);\n      padding-left: 6px;\n    }\n    .price-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 10px;\n      padding: 8px 10px;\n      border-radius: 4px;\n      font-size: 12.5px;\n      margin-bottom: 4px;\n    }\n    .price-row .store {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      flex: 1;\n      min-width: 0;\n      flex-wrap: wrap;\n    }\n    .price-row .amount {\n      font-family: var(--display);\n      font-weight: 600;\n      font-variant-numeric: tabular-nums;\n      flex: none;\n      white-space: nowrap;\n    }\n    .price-row.best {\n      background: var(--crate-tint);\n    }\n    .price-row.worst {\n      background: var(--brick-tint);\n    }\n    .price-row .amount.best {\n      color: var(--crate);\n    }\n    .price-row .amount.worst {\n      color: var(--brick);\n    }\n    .pill {\n      font-family: var(--display);\n      font-size: 9.5px;\n      font-weight: 700;\n      padding: 2px 7px;\n      border-radius: 3px;\n      display: inline-block;\n      width: fit-content;\n      color: #fff;\n    }\n    .pill.best {\n      background: var(--crate);\n    }\n    .pill.worst {\n      background: var(--brick);\n    }\n    .price-row .soldout {\n      color: var(--stone);\n      font-size: 11px;\n    }\n\n    .price-compare {\n      display: flex;\n      gap: 8px;\n      margin-bottom: 6px;\n    }\n    .price-card {\n      flex: 1 1 0;\n      min-width: 0;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 3px;\n      padding: 10px 12px;\n      border-radius: 4px;\n    }\n    .price-card.best {\n      background: var(--crate-tint);\n    }\n    .price-card.worst {\n      background: var(--brick-tint);\n    }\n    .price-card .pc-label {\n      font-size: 11.5px;\n      color: var(--stone);\n      margin-top: 3px;\n    }\n    .pc-amount-row {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 2px;\n    }\n    .price-card .pc-amount {\n      font-family: var(--display);\n      font-size: 17px;\n      font-weight: 700;\n      font-variant-numeric: tabular-nums;\n    }\n    .price-card .pc-amount.best {\n      color: var(--crate);\n    }\n    .price-card .pc-amount.worst {\n      color: var(--brick);\n    }\n    .save-tag {\n      font-family: var(--body);\n      font-size: 10.5px;\n      font-weight: 600;\n      color: #fff;\n      padding: 2px 7px;\n      border-radius: 10px;\n      background: var(--crate);\n    }\n\n    .toggle-stores {\n      display: inline-block;\n      cursor: pointer;\n      color: var(--swiggy-dim);\n      font-family: var(--display);\n      font-weight: 600;\n      font-size: 11.5px;\n      margin: 6px 0 0 8px;\n      user-select: none;\n    }\n    .toggle-stores:hover {\n      color: var(--ink);\n      text-decoration: underline;\n    }\n\n    @media (max-width: 800px) {\n      header { padding: 12px 14px; }\n      .toolbar { gap: 6px; }\n      #tableWrap { padding: 0 10px 14px; }\n      input#filter { width: 100%; }\n      select.filter-select { flex: 1; min-width: 120px; }\n    }\n  </style>\n</head>\n<body>\n\n  <header>\n    <div class=\"top-row\">\n      <div class=\"title-row\">\n        <span class=\"title-logo\">🛵</span>\n        <span class=\"query-tag\" id=\"titleTag\">\n          <span class=\"q-mark\">#</span><span id=\"queryLabel\">Instamart Hunter</span>\n        </span>\n      </div>\n      <div id=\"metaCard\"></div>\n    </div>\n    <div class=\"toolbar\">\n      <select id=\"filterStore\" class=\"filter-select\">\n        <option value=\"\">All stores</option>\n      </select>\n      <select id=\"filterBrand\" class=\"filter-select\">\n        <option value=\"\">All brands</option>\n      </select>\n      <select id=\"filterCategory\" class=\"filter-select\">\n        <option value=\"\">All categories</option>\n      </select>\n      <select id=\"filterStock\" class=\"filter-select\">\n        <option value=\"\">All stock</option>\n        <option value=\"In stock\">In stock</option>\n        <option value=\"Sold out\">Sold out</option>\n      </select>\n      <select id=\"sortSelect\" class=\"filter-select\">\n        <option value=\"price-asc\">💵 Price: Low to High</option>\n        <option value=\"price-desc\">💎 Price: High to Low</option>\n        <option value=\"discount-desc\">🔥 Highest Discount %</option>\n        <option value=\"brand-asc\">🏷️ Brand: A to Z</option>\n        <option value=\"title-asc\">🔤 Product: A to Z</option>\n        <option value=\"store-asc\">📍 Store: A to Z</option>\n      </select>\n      <input id=\"filter\" type=\"text\" placeholder=\"Search product, brand, store...\">\n      <button id=\"filterVariation\" class=\"tool-btn\">Price varies by store</button>\n      <div class=\"spacer\"></div>\n      <button id=\"download\" class=\"tool-btn btn-primary\">Download CSV</button>\n    </div>\n  </header>\n\n  <div id=\"tableWrap\"></div>\n\n  <script id=\"app-script\">\n    const tableWrap = document.getElementById('tableWrap');\n    const filterEl = document.getElementById('filter');\n    const storeSel = document.getElementById('filterStore');\n    const brandSel = document.getElementById('filterBrand');\n    const catSel = document.getElementById('filterCategory');\n    const stockSel = document.getElementById('filterStock');\n    const sortSel = document.getElementById('sortSelect');\n    const variationBtn = document.getElementById('filterVariation');\n\n    const COLUMN_ORDER = [\n      'store_locality',\n      'name',\n      'brand',\n      'quantity',\n      'stock',\n      'mrp_inr',\n      'selling_price_inr',\n      'discount_pct',\n      'category',\n      'image_1',\n      'maps_url'\n    ];\n\n    const COLUMN_LABELS = {\n      store_locality: 'Store / Locality',\n      name: 'Product',\n      brand: 'Brand',\n      quantity: 'Quantity',\n      stock: 'Stock',\n      mrp_inr: 'MRP (₹)',\n      selling_price_inr: 'Price (₹)',\n      discount_pct: 'Discount %',\n      category: 'Category',\n      image_1: 'Image',\n      maps_url: 'Map',\n      store_id: 'Store ID',\n      store_pincode: 'Pincode',\n      store_address: 'Store Address',\n      sub_category: 'Sub-category',\n      product_id: 'Product ID'\n    };\n\n    const DETAIL_COLS = ['store_locality', 'store_id', 'store_pincode', 'brand', 'quantity', 'selling_price_inr', 'mrp_inr', 'discount_pct', 'stock', 'category', 'sub_category', 'store_address'];\n    const DETAIL_FULL_WIDTH = new Set(['store_address']);\n    const NUMERIC_COLS = new Set(['mrp_inr', 'selling_price_inr', 'discount_pct']);\n    const NOWRAP_COLS = new Set(['stock', 'quantity', 'image_1', 'maps_url']);\n\n    const label = c => COLUMN_LABELS[c] || c;\n\n    let DATA = [];\n    let allRows = [];\n    let renderedRows = [];\n    let currentQuery = '';\n    let sortCol = null, sortDir = 1;\n    let onlyVariation = false;\n    let cheapestByKey = new Map();\n\n    const variantKey = r => `${r.name || ''}__${r.brand || ''}__${r.quantity || ''}`.trim().toLowerCase();\n\n    function normalizeRow(r) {\n      const avail = (r.stock === 'In stock' || r.inStock === true || r.availability === 'IN_STOCK') ? 'In stock' : 'Sold out';\n      const title = (r.name || r.title || r.titles?.title || '-').trim();\n\n      return {\n        store_locality: r.store_locality || r.locality || '-',\n        store_id: r.store_id || r.podId || r.storeId || '-',\n        store_pincode: r.store_pincode || r.pincode || '',\n        store_address: r.store_address || r.deliveryLocation || '',\n        maps_url: r.maps_url || r.mapsUrl || '',\n        name: title,\n        brand: r.brand || '',\n        quantity: r.quantity || '',\n        stock: avail,\n        mrp_inr: r.mrp_inr != null ? Number(r.mrp_inr) : (r.mrp != null ? Number(r.mrp) : null),\n        selling_price_inr: r.selling_price_inr != null ? Number(r.selling_price_inr) : (r.price != null ? Number(r.price) : null),\n        discount_pct: r.discount_pct != null ? Number(r.discount_pct) : (r.discount != null ? Number(r.discount) : 0),\n        category: r.category || '',\n        sub_category: r.sub_category || '',\n        product_id: r.product_id || r.productId || '',\n        image_1: r.image_1 || r.imageUrl || '',\n        product_url: r.product_url || (r.product_id ? `https://www.swiggy.com/instamart/item/${r.product_id}` : '#')\n      };\n    }\n\n    function priceAcrossStores(row) {\n      const k = variantKey(row);\n      return allRows\n        .filter(r => variantKey(r) === k && r.stock === 'In stock' && r.selling_price_inr != null)\n        .map(r => ({ store: r.store_locality, price: r.selling_price_inr, stock: r.stock }))\n        .sort((a, b) => a.price - b.price);\n    }\n\n    function computeVariationKeys() {\n      const byKey = new Map();\n      for (const r of allRows) {\n        if (r.stock !== 'In stock' || r.selling_price_inr == null) continue;\n        const k = variantKey(r);\n        const price = r.selling_price_inr;\n        const e = byKey.get(k);\n        if (!e) byKey.set(k, { min: price, max: price, cheapest: r });\n        else {\n          e.min = Math.min(e.min, price);\n          e.max = Math.max(e.max, price);\n          if (price < (e.cheapest.selling_price_inr ?? 999999)) e.cheapest = r;\n        }\n      }\n      cheapestByKey = new Map([...byKey].filter(([, v]) => v.min !== v.max).map(([k, v]) => [k, v.cheapest]));\n      if (variationBtn) {\n        variationBtn.textContent = `Price varies by store (${cheapestByKey.size})`;\n      }\n    }\n\n    function buildPriceSection(prices) {\n      const min = prices[0].price, max = prices[prices.length - 1].price;\n      const toggle = `<span class=\"toggle-stores\">Show all ${prices.length} stores</span>`;\n\n      if (min === max) {\n        return `<div class=\"modal-section\"><div class=\"sec-title\">Price across stores</div>` +\n          `<div class=\"price-row\"><span class=\"store\">${prices.length} stores have the same price</span>` +\n          `<span class=\"amount\">₹${min}</span></div>${toggle}</div>`;\n      }\n\n      const cheapest = prices.filter(p => p.price === min);\n      const restCount = prices.length - cheapest.length;\n      const savings = Math.round(((max - min) / max) * 100);\n      const cheapestLabel = cheapest.length === 1 ? cheapest[0].store : `${cheapest.length} stores`;\n\n      return `<div class=\"modal-section\"><div class=\"sec-title\">Price across stores</div>` +\n        `<div class=\"price-compare\">` +\n        `<div class=\"price-card best\">` +\n        `<span class=\"pill best\">cheapest</span>` +\n        `<span class=\"pc-label\">${cheapestLabel}</span>` +\n        `<span class=\"pc-amount-row\">${savings > 0 ? `<span class=\"save-tag\">save ${savings}%</span>` : ''}<span class=\"pc-amount best\">₹${min}</span></span></div>` +\n        `<div class=\"price-card worst\">` +\n        `<span class=\"pill worst\">priciest</span>` +\n        `<span class=\"pc-label\">${restCount} other store${restCount > 1 ? 's' : ''}</span>` +\n        `<span class=\"pc-amount worst\">₹${max}</span></div>` +\n        `</div>${toggle}</div>`;\n    }\n\n    function openStoreListModal(prices) {\n      const modal = document.createElement('div');\n      modal.className = 'modal-overlay';\n      const rows = prices.map(p =>\n        `<div class=\"price-row\"><span class=\"store\">${p.store}${p.stock === 'Sold out' ? ' <span class=\"soldout\">(sold out)</span>' : ''}</span>` +\n        `<span class=\"amount\">₹${p.price}</span></div>`\n      ).join('');\n      modal.innerHTML =\n        `<div class=\"modal-card\" style=\"width:360px;\">` +\n        `<div class=\"modal-head\"><div class=\"name\">All ${prices.length} stores</div>` +\n        `<span class=\"modal-close\">✕</span></div>` +\n        `<div class=\"modal-section\" style=\"border-top:none;\">${rows}</div></div>`;\n      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\n      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\n      document.body.appendChild(modal);\n    }\n\n    function openDetail(row) {\n      const modal = document.createElement('div');\n      modal.className = 'modal-overlay';\n\n      const fields = DETAIL_COLS.map(c => {\n        let val = row[c] ?? '-';\n        if (c === 'selling_price_inr' && val !== '-') val = `<b>₹${val}</b>`;\n        if (c === 'mrp_inr' && val !== '-') val = `₹${val}`;\n        if (c === 'discount_pct' && val) val = `${val}% OFF`;\n        if (c === 'store_address' && row.maps_url) {\n          val = `${val} <br><a href=\"${row.maps_url}\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-weight:700;display:inline-block;margin-top:4px;\">📍 Open in Google Maps ↗</a>`;\n        }\n        return `<div class=\"modal-field${DETAIL_FULL_WIDTH.has(c) ? ' full' : ''}\">` +\n          `<div class=\"k\">${label(c)}</div><div class=\"v\">${val}</div></div>`;\n      }).join('');\n\n      const prices = priceAcrossStores(row);\n      const priceSection = prices.length > 1 ? buildPriceSection(prices) : '';\n\n      const img = row.image_1\n        ? `<img src=\"${row.image_1}\" alt=\"${row.name}\" onerror=\"this.style.display='none'\">`\n        : `<div style=\"width:48px;height:48px;border-radius:6px;background:var(--paper);display:flex;align-items:center;justify-content:center;font-size:20px;\">🛵</div>`;\n\n      modal.innerHTML =\n        `<div class=\"modal-card\">` +\n        `<div class=\"modal-head\">${img}` +\n        `<div class=\"name\"><a href=\"${row.product_url}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-link\" style=\"font-size:15px;\">${row.name}</a></div>` +\n        `<span class=\"modal-close\">✕</span></div>` +\n        `<div class=\"modal-grid\">${fields}</div>` +\n        priceSection + `</div>`;\n\n      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\n      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\n      const toggleEl = modal.querySelector('.toggle-stores');\n      if (toggleEl) {\n        toggleEl.addEventListener('click', () => openStoreListModal(prices));\n      }\n      document.body.appendChild(modal);\n    }\n\n    function openImage(src) {\n      if (!src) return;\n      const modal = document.createElement('div');\n      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;' +\n        'align-items:center;justify-content:center;z-index:100;cursor:zoom-out;';\n      modal.innerHTML = `<img src=\"${src}\" style=\"max-width:85vw;max-height:85vh;border-radius:8px;box-shadow:0 16px 40px rgba(0,0,0,.5);background:#fff;padding:8px;\">`;\n      modal.addEventListener('click', () => modal.remove());\n      document.body.appendChild(modal);\n    }\n\n    function cellValue(row, col) {\n      const v = row[col] ?? '';\n      if (col === 'image_1') {\n        return v\n          ? `<img src=\"${v}\" loading=\"lazy\" class=\"thumb\" data-src=\"${v}\" onerror=\"this.outerHTML='<span class=\\\\'thumb-fallback\\\\'>🛵</span>'\">`\n          : `<span class=\"thumb-fallback\">🛵</span>`;\n      }\n      if (col === 'name') {\n        return `<a href=\"${row.product_url}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-link\">${v}</a>`;\n      }\n      if (col === 'quantity') {\n        return v ? `<span class=\"qty-tag\">${v}</span>` : '-';\n      }\n      if (col === 'selling_price_inr') {\n        return v != null ? `₹${v}` : '-';\n      }\n      if (col === 'mrp_inr') {\n        return (v && v > row.selling_price_inr) ? `₹${v}` : '-';\n      }\n      if (col === 'discount_pct') {\n        return v > 0 ? `<span style=\"color:var(--crate);font-weight:700;\">${v}%</span>` : '-';\n      }\n      if (col === 'maps_url') {\n        return v ? `<a href=\"${v}\" target=\"_blank\" rel=\"noopener noreferrer\">📍 Map ↗</a>` : '-';\n      }\n      return String(v).replace(/</g, '&lt;');\n    }\n\n    function sortRows(rows) {\n      if (!sortCol) return rows;\n      const numeric = NUMERIC_COLS.has(sortCol);\n      return [...rows].sort((a, b) => {\n        let av = a[sortCol] ?? '', bv = b[sortCol] ?? '';\n        const cmp = numeric ? ((Number(av) || 0) - (Number(bv) || 0)) : String(av).localeCompare(String(bv));\n        return cmp * sortDir;\n      });\n    }\n\n    function render(rows) {\n      rows = sortRows(rows);\n      renderedRows = rows;\n      if (!rows.length) {\n        tableWrap.innerHTML = '<div id=\"empty\">No rows match your filter.</div>';\n        return;\n      }\n      const cols = COLUMN_ORDER.filter(c => c in rows[0]);\n      const head = '<thead><tr><th></th>' + cols.map(c => {\n        const arrow = sortCol === c ? (sortDir === 1 ? ' ▲' : ' ▼') : '';\n        return `<th data-col=\"${c}\">${label(c)}${arrow}</th>`;\n      }).join('') + '</tr></thead>';\n\n      const body = '<tbody>' + rows.map((r, i) => {\n        const trClass = r.stock === 'Sold out' ? 'sold-out' : 'in-stock';\n        return `<tr class=\"${trClass}\"><td class=\"nowrap\"><button data-idx=\"${i}\" class=\"view-btn\" title=\"View details\">👁</button></td>` +\n          cols.map(c => {\n            const cls = [NUMERIC_COLS.has(c) ? 'num' : '', NOWRAP_COLS.has(c) ? 'nowrap' : ''].filter(Boolean).join(' ');\n            return `<td class=\"${cls}\">${cellValue(r, c)}</td>`;\n          }).join('') + '</tr>';\n      }).join('') + '</tbody>';\n\n      tableWrap.innerHTML = `<table>${head}${body}</table>`;\n\n      tableWrap.querySelectorAll('th[data-col]').forEach(th => {\n        th.addEventListener('click', () => {\n          const col = th.dataset.col;\n          sortDir = sortCol === col ? -sortDir : 1;\n          sortCol = col;\n          applyFilter();\n        });\n      });\n\n      tableWrap.querySelectorAll('.view-btn').forEach(btn => {\n        btn.addEventListener('click', () => openDetail(renderedRows[Number(btn.dataset.idx)]));\n      });\n\n      tableWrap.querySelectorAll('.thumb').forEach(img => {\n        img.addEventListener('click', () => openImage(img.dataset.src));\n      });\n    }\n\n    function applyFilter() {\n      const q = filterEl.value.trim().toLowerCase();\n      const store = storeSel.value;\n      const brand = brandSel.value;\n      const cat = catSel.value;\n      const stock = stockSel.value;\n      const base = onlyVariation ? [...cheapestByKey.values()] : allRows;\n\n      const filtered = base.filter(r => {\n        if (store && r.store_locality !== store) return false;\n        if (brand && r.brand !== brand) return false;\n        if (cat && r.category !== cat) return false;\n        if (stock && r.stock !== stock) return false;\n        if (!q) return true;\n        return (\n          r.name + ' ' +\n          r.brand + ' ' +\n          r.quantity + ' ' +\n          r.store_locality + ' ' +\n          r.store_id + ' ' +\n          r.store_pincode + ' ' +\n          r.store_address + ' ' +\n          r.category\n        ).toLowerCase().includes(q);\n      });\n\n      render(filtered);\n    }\n\n    function updateMetaRibbon() {\n      const storesSet = new Set(allRows.map(r => r.store_locality));\n      const prices = allRows.map(r => r.selling_price_inr).filter(p => p != null);\n      const minPrice = prices.length ? Math.min(...prices) : null;\n\n      const metaEl = document.getElementById('metaCard');\n      metaEl.innerHTML =\n        `<span class=\"stat\"><b>${allRows.length}</b> rows</span>` +\n        `<span class=\"stat\"><b>${storesSet.size}</b> stores</span>` +\n        (minPrice != null ? `<span class=\"stat\">min <b>₹${minPrice}</b></span>` : '') +\n        `<span class=\"stat\">${new Date().toLocaleTimeString()}</span>`;\n    }\n\n    function fillStoreOptions() {\n      const stores = [...new Set(allRows.map(r => r.store_locality).filter(Boolean))].sort();\n      storeSel.innerHTML = '<option value=\"\">All stores (' + stores.length + ')</option>';\n      stores.forEach(s => {\n        const opt = document.createElement('option');\n        opt.value = s;\n        opt.textContent = s;\n        storeSel.appendChild(opt);\n      });\n    }\n\n    function fillBrandOptions() {\n      const brands = [...new Set(allRows.map(r => r.brand).filter(Boolean))].sort();\n      brandSel.innerHTML = '<option value=\"\">All brands (' + brands.length + ')</option>';\n      brands.forEach(b => {\n        const opt = document.createElement('option');\n        opt.value = b;\n        opt.textContent = b;\n        brandSel.appendChild(opt);\n      });\n    }\n\n    function fillCategoryOptions() {\n      const cats = [...new Set(allRows.map(r => r.category).filter(Boolean))].sort();\n      catSel.innerHTML = '<option value=\"\">All categories (' + cats.length + ')</option>';\n      cats.forEach(c => {\n        const opt = document.createElement('option');\n        opt.value = c;\n        opt.textContent = c;\n        catSel.appendChild(opt);\n      });\n    }\n\n    function exportCSV() {\n      if (!allRows.length) return alert('No data to download.');\n      const headers = ['#', 'Store_Locality', 'Store_ID', 'Store_Address', 'Store_Pincode', 'Brand', 'Product_Title', 'Quantity', 'Selling_Price_INR', 'MRP_INR', 'Discount_Pct', 'Stock', 'Category', 'Sub_Category', 'Google_Maps_URL', 'Product_URL'];\n      const rows = allRows.map((r, i) => [\n        i + 1,\n        `\"${(r.store_locality || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.store_id || ''}\"`,\n        `\"${(r.store_address || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.store_pincode || ''}\"`,\n        `\"${(r.brand || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${(r.name || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${(r.quantity || '').replace(/\"/g, '\"\"')}\"`,\n        r.selling_price_inr ?? '',\n        r.mrp_inr ?? '',\n        r.discount_pct || 0,\n        `\"${r.stock || ''}\"`,\n        `\"${(r.category || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${(r.sub_category || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.maps_url || ''}\"`,\n        `\"${r.product_url || ''}\"`\n      ]);\n      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');\n      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\n      const a = document.createElement('a');\n      a.href = URL.createObjectURL(blob);\n      a.download = `swiggy_instamart_${currentQuery || 'results'}_${Date.now()}.csv`;\n      document.body.appendChild(a);\n      a.click();\n      a.remove();\n    }\n\n    function initData(items, query) {\n      currentQuery = query || '';\n      if (document.getElementById('queryLabel')) {\n        document.getElementById('queryLabel').textContent = currentQuery ? currentQuery : 'Instamart Hunter';\n      }\n      allRows = (items || []).map(normalizeRow);\n      updateMetaRibbon();\n      fillStoreOptions();\n      fillBrandOptions();\n      fillCategoryOptions();\n      computeVariationKeys();\n      applyFilter();\n    }\n\n    // Controls listeners\n    filterEl.addEventListener('input', applyFilter);\n    storeSel.addEventListener('change', applyFilter);\n    brandSel.addEventListener('change', applyFilter);\n    catSel.addEventListener('change', applyFilter);\n    stockSel.addEventListener('change', applyFilter);\n    sortSel.addEventListener('change', () => {\n      const v = sortSel.value;\n      if (v === 'price-asc') { sortCol = 'selling_price_inr'; sortDir = 1; }\n      else if (v === 'price-desc') { sortCol = 'selling_price_inr'; sortDir = -1; }\n      else if (v === 'discount-desc') { sortCol = 'discount_pct'; sortDir = -1; }\n      else if (v === 'brand-asc') { sortCol = 'brand'; sortDir = 1; }\n      else if (v === 'title-asc') { sortCol = 'name'; sortDir = 1; }\n      else if (v === 'store-asc') { sortCol = 'store_locality'; sortDir = 1; }\n      applyFilter();\n    });\n\n    variationBtn.addEventListener('click', () => {\n      onlyVariation = !onlyVariation;\n      variationBtn.classList.toggle('active', onlyVariation);\n      applyFilter();\n    });\n\n    document.getElementById('download').addEventListener('click', exportCSV);\n\n    /* __DATA_INJECTION__ */\n\n    // Fallback: window.opener\n    try {\n      if (!allRows.length && window.opener && window.opener.swiggyResults && window.opener.swiggyResults.length) {\n        const q = window.opener.document?.getElementById('sw-h-query')?.value?.trim() || '';\n        initData(window.opener.swiggyResults, q);\n      }\n    } catch(e) {}\n\n    // Fallback: URL hash\n    try {\n      if (!allRows.length && location.hash && location.hash.length > 2) {\n        const raw = decodeURIComponent(location.hash.slice(1));\n        const parsed = JSON.parse(raw);\n        if (Array.isArray(parsed)) initData(parsed, '');\n        else if (parsed.items) initData(parsed.items, parsed.query || '');\n      }\n    } catch(e) {}\n  </script>\n</body>\n</html>\n";

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
    const nonceAttr = nonce ? ` nonce="${nonce}"` : '';
    const safeData = JSON.stringify(items).replace(/<\/script/gi, '<\\/script');
    const safeQuery = JSON.stringify(query || '');
    const injection = `DATA = ${safeData};\n    currentQuery = ${safeQuery};\n    initData(DATA, currentQuery);`;
    let html = TABLE_PAGE_HTML
      .replace('<style id="app-style">', `<style id="app-style"${nonceAttr}>`)
      .replace('<script id="app-script">', `<script id="app-script"${nonceAttr}>`)
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
      `"${(r.store_locality || '').replace(/"/g, '""')}"`,
      `"${r.store_id || ''}"`,
      `"${(r.brand || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.quantity || '').replace(/"/g, '""')}"`,
      r.selling_price_inr ?? '',
      r.mrp_inr ?? '',
      r.discount_pct || 0,
      `"${r.stock || ''}"`,
      `"${(r.category || '').replace(/"/g, '""')}"`,
      `"${(r.sub_category || '').replace(/"/g, '""')}"`,
      `"${(r.store_address || '').replace(/"/g, '""')}"`,
      `"${r.maps_url || ''}"`,
      `"${r.product_url || ''}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const q = queryInput.value.trim() || 'all_stores';
    a.download = `swiggy_instamart_${q.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

})();
