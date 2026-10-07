/**
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

  let STORES = [["1403454","Aaram Nagar Part 2",19.133278,72.813,"Aram Nagar Part 2, Jeet Nagar, Versova, Andheri West, Mumbai, Maharashtra 400061, India","400061"],["1404877","AG Nagar",19.26767,72.878021,"MIDC, Mira Road East, Mira Bhayandar, Maharashtra, India","401107"],["810366","Andheri East",19.1198744,72.861152,"Gundavali, Andheri East, Mumbai, Maharashtra, India","400093"],["1398452","Andheri West",19.137528,72.833722,"Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra, India","400053"],["1113109","Antop Hill",19.0450204,72.8680399,"Sion East, Sion, Mumbai, Maharashtra, India","400022"],["1402264","Apex Mulund",19.184767,72.948677,"Kamgar Colony, Mulund West, Mumbai, Maharashtra, India","400080"],["1405161","Balkum / Majiwada North",19.225,73.01,"Kasheli, Maharashtra, India","421302"],["1404984","Bandra Hill Road",19.056,72.83,"Bandra West, Mumbai, Maharashtra, India","400050"],["969383","Bandra West",19.047184,72.833307,"India",""],["1084119","Belapur",19.0216017,73.028307,"Sector 23, Nerul, Navi Mumbai, Maharashtra, India","400614"],["1404771","Bethany Hospital",19.218496,72.953194,"Upvan, Thane West, Thane, Maharashtra 400606, India","400606"],["788745","Bhandup",19.158428,72.941495,"Industrial Area, Bhandup West, Mumbai, Maharashtra, India","400078"],["1388687","Bhayander",19.300099,72.85513,"Bhayandar, Vikas Industrial Estate, Bhayandar East, Mira Bhayandar, Maharashtra, India","401105"],["1405215","Bhayanderpada / Owala Village",19.268,72.955,"Owale, Thane West, Thane, Maharashtra 400615, India","400615"],["1237261","Borivali East",19.231257,72.860731,"Jestaram Kapadia Road, Chinchpada, Borivali, Mumbai, Maharashtra 400066, India","400066"],["1404796","Borivali East (Magathane)",19.245,72.865,"Ashok Van, Dahisar East, Mumbai, Maharashtra, India","400068"],["1396283","Byculla East",18.975889,72.838389,"Mustafa Bazar, Byculla, Mumbai, Maharashtra, India","400010"],["1384969","Chandivali",19.114,72.894,"Chandivali Farm Road, Chandivali, Powai, Mumbai, Maharashtra 400072, India","400072"],["1390223","Chikan Ghar",19.25444,73.139913,"Bhoirwadi, Kalyan, Maharashtra 421301, India","421301"],["1405185","Colaba / Churchgate",18.925,72.84,"Fort, Mumbai, Maharashtra, India",""],["1404448","Colaba Police Colony",18.915,72.82,"GD Somani Road, Cuffe Parade, Mumbai, Maharashtra 400005, India","400005"],["1402806","Container Yard - MP",19.139512,72.928823,"Ganesh Nagar, Bhandup West, Mumbai, Maharashtra 400078, India","400078"],["1062418","Dahisar West",19.251583,72.858646,"Mhatre Wadi, Dahisar West, Mumbai, Maharashtra 400068, India","400068"],["1399706","Devicha Pada",19.226694,73.083389,"Bhoir Wadi, Dombivli West, Kalyan, Maharashtra 421202, India","421202"],["1383130","Dhobi Talao",18.936506,72.838211,"Ballard Estate, Fort, Mumbai, Maharashtra 400001, India","400001"],["1403051","Eksar",19.236029,72.837357,"Gorai 3, Borivali West, Mumbai, Maharashtra 400091, India","400091"],["1400554","Elymus",19.2053419,73.1158054,"Dombivli, Kalyan, Maharashtra 421203, India","421203"],["1389632","Gaothan (Airoli)",19.165497,72.996665,"Sector 1A, Airoli, Navi Mumbai, Maharashtra 400708, India","400708"],["1385645","Ghansoli",19.112493,73.007007,"CIDCO Resesve Plots, Ghansoli, Navi Mumbai, Maharashtra, India","400701"],["1405232","Ghatkopar East / Tilak Nagar",19.075,72.925,"Mumbai, Maharashtra 400043, India","400043"],["1405210","Girgaon",18.945,72.828,"Navajeevan Wadi, Sonapur, Marine Lines, Mumbai, Maharashtra 400002, India","400002"],["1135722","Girgaon Chowpatty",18.955,72.818,"Charni Road East, Opera House, Girgaon, Mumbai, Maharashtra, India","400004"],["1402064","Goregaon West",19.178824,72.874072,"Malad, Sankalp Colony, Malad East, Mumbai, Maharashtra 400097, India","400097"],["1404958","Goregaon West (Link Road)",19.17,72.85,"Pandurang Wadi, Goregaon East, Mumbai, Maharashtra 400063, India","400063"],["1381561","Hawaiian Village",19.2761339,72.9602383,"Owale, Thane West, Thane, Maharashtra 400615, India","400615"],["1396296","Hiranandani MBC Park",19.265951,72.965698,"Ghodbunder Road, Kasarwadawali, Thane, Mumbai, Maharashtra 400615, India","400615"],["1381966","Indira Nagar",19.0662856,72.8918191,"Dr Mandakini Parihar Marg, Tilak Nagar, Mumbai, Maharashtra 400089, India","400089"],["1239162","Inorbit Mall Malad West",19.17681,72.83422,"Vibgyor School Rd, Miindspace, Malad West, Mumbai, Maharashtra 400064, India","400064"],["1135721","Jogeshwari West Station Road",19.14,72.842,"Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra, India","400102"],["1295148","Juhu / Vile Parle West",19.11,72.835,"MHADA Colony, Juhu, Mumbai, Maharashtra, India","400056"],["1238358","JVLR (Jogeshwari East)",19.138,72.86,"Samarth Nagar, Jogeshwari East, Mumbai, Maharashtra 400060, India","400060"],["1403030","Kalina",19.071075,72.864707,"Santacruz-chembur link Rd, Santacruz East, Mumbai, Maharashtra 400098, India","400098"],["1401485","Kalpataru Parkcity",19.222,72.982,"Kailash Nagar, Thane West, Thane, Maharashtra, India","400607"],["1400553","Kalwa",19.200708,72.999932,"Kharegaon, Kalwa, Thane, Maharashtra, India","400605"],["1388387","Kalyan East",19.226485,73.133177,"Shivaji Colony, Kalyan, Maharashtra 421306, India","421306"],["1402062","Kalyan West",19.22,73.12,"Dombivli, Tata Power Company Limited, Dombivli East, Kalyan, Maharashtra, India","421203"],["1400552","Kalyan-Dombivli North",19.24,73.16,"Bhim Nagar, Sidhi Vinayak Nagar, Ulhasnagar, Maharashtra 421002, India","421002"],["1401265","Kamothe",19.017364,73.101226,"Jawahar Co-op Ind, Kamothe, Panvel, Maharashtra 410209, India","410209"],["1400231","Kandivali",19.208417,72.825028,"Sector 3, Charkop, Charkop Industrial Estate, Kandivali West, Mumbai, Maharashtra 400067, India","400067"],["1190779","Kandivali East (Thakur Complex)",19.2,72.865,"Kandivali, Hanuman Nagar, Kandivali East, Mumbai, Maharashtra, India","400101"],["1405158","Kasarvadavali / Waghbil",19.27,73.01,"Dive, Maharashtra, India","421302"],["1386534","Katai Pipeline Road",19.1641535,73.1165815,"Khoni Pagadyacha Pada, Maharashtra 421204, India","421204"],["1395728","Katai Village",19.163778,73.076,"Nilaje, Casa Bella Gold, Katai Village, Kalyan, Maharashtra 421204, India","421204"],["1082435","Kharghar",19.05184,73.081064,"Central Park Rd, Sector 19, Kharghar, Navi Mumbai, Maharashtra 410210, India","410210"],["1404760","Kharghar - MP",19.041431,73.071152,"Block G, Sector 12, Kharghar, Panvel, Maharashtra 410210, India","410210"],["1405053","Kurla West / BKC",19.075,72.88,"Hallow Pul, Kurla West, Mumbai, Maharashtra 400070, India","400070"],["1403034","Lodha Amara",19.2326343,72.9937873,"Kolshet Industrial Area, Thane West, Thane, Maharashtra, India","400607"],["1392531","Lower Parel",19.000903,72.830223,"Lower Parel, Mumbai, Maharashtra, India","400013"],["1404993","Lower Parel / Worli",19,72.855,"Comed Rambhau Dev Ji Patil Rd, Gandhi Nagar, Parel, Mumbai, Maharashtra 400015, India","400015"],["1381967","Mahim",19.0361932,72.8467828,"New Dinkar Co Operative Housing Society, Mahim, Mumbai, Maharashtra 400016, India","400016"],["1404681","Majiwada - MP",19.215929,72.976555,"Subhash Nagar, Thane West, Thane, Maharashtra 400601, India","400601"],["1398760","Marathi Patrakar / Matunga East",19.014972,72.844694,"Madhavwadi, Dadar, Mumbai, Maharashtra 400014, India","400014"],["1404907","Marathon Nexzone",18.970366,73.131569,"Palaspe Phata, Panvel, Navi Mumbai, Maharashtra 410221, India","410221"],["1399809","Marol",19.110389,72.887194,"Krishanlal Marwah Rd, Saki Vihar, Andheri East, Mumbai, Maharashtra 400072, India","400072"],["1398759","Millennium Avanish / Rabale",19.1426207,72.9913945,"Diva Nagar Road, Sector-10A  Airoli, Mumbai, Maharashtra 400708, India","400708"],["1346590","Mira Hubtown",19.285109,72.876539,"Chandan Shanti, Mira Road East, Mira Bhayandar, Maharashtra 401107, India","401107"],["1404642","Mira Road - MP",19.280079,72.877907,"Hatkesh Udhog Nagar, Mira Road East, Mira Bhayandar, Maharashtra 401107, India","401107"],["1390224","Model Colony Mumbai",19.142508,72.809449,"Yari Rd, Yagna Nagar, Andheri West, Mumbai, Maharashtra 400061, India","400061"],["1278165","Mulund West",19.170386,72.953872,"Asha Nagar, Mulund West, Mumbai, Maharashtra 400080, India","400080"],["1404751","Naupada",19.1846431,72.9675317,"Shivaji Nagar, Thane West, Thane, Maharashtra, India","400602"],["1404757","Nerul - MP",19.039675,73.009544,"Sector 14, Nerul, Navi Mumbai, Maharashtra 400706, India","400706"],["1402784","Nilaje Gaon",19.155699,73.074898,"Maduban Society, Nilaje, Kalyan, Maharashtra 421204, India","421204"],["1230883","Oberoi Mall",19.173818,72.856488,"Malad, Dindoshipada, Malad East, Mumbai, Maharashtra, India","400063"],["1402785","Owala Naka",19.265,72.965,"Anand Nagar, Thane West, Thane, Maharashtra 400615, India","400615"],["1319696","Pali Hill / 14th Road Khar",19.065,72.831,"Bandra West, Mumbai, Maharashtra, India","400050"],["1404645","Park Road",19.105726,72.851463,"Paranjape Nagar, Vile Parle, Mumbai, Maharashtra 400057, India","400057"],["1391897","Postal Colony Chembur",19.0588409,72.8907382,"Eastern Express Highway, Postal Colony, Chembur, Mumbai, Maharashtra 400071, India","400071"],["1135720","Powai 2",19.1188,72.9052,"MHADA Colony 19, Powai, Mumbai, Maharashtra 400076, India","400076"],["1388686","Pragati Nagar",19.410025,72.830872,"Nala Sopara, Ambawadi, Nalasopara East, Vasai-Virar, Maharashtra, India","401209"],["1298955","R City Mall, Ghatkopar West",19.0950627,72.9176548,"Lal Bahadur Shastri Rd, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra 400086, India","400086"],["1403842","Relief Road",19.165392,72.846725,"Jawahar Nagar, Goregaon West, Mumbai, Maharashtra 400104, India","400104"],["1387703","RK Studios",19.047268,72.90815,"Ghatla, Chembur, Mumbai, Maharashtra, India","400071"],["1403216","RoadPali",19.043961,73.098068,"Roadpali, Kalamboli, Panvel, Maharashtra, India","410218"],["1401266","Runwal Garden",19.188412,73.094688,"Mangaon, Sonar Pada, Dombivli East, Kalyan, Maharashtra 421204, India","421204"],["1238357","Sagarli Gaon",19.207338,73.098347,"Dombivli, MIDC, Dombivli East, Kalyan, Maharashtra, India","421203"],["1405018","Saki Naka",19.098,72.888,"Ashok Nagar, Saki Naka, Mumbai, Maharashtra, India","400072"],["1404964","Sangharsh Nagar Chandivali",19.108,72.896,"GM Colony, Yadav Nagar, Chandivali, Powai, Mumbai, Maharashtra 400072, India","400072"],["1405089","Sanpada Carshed",19.065,73.01,"Sector 3, Sanpada, Navi Mumbai, Maharashtra 400705, India","400705"],["1335483","Seawoods (Navi Mumbai)",19.017979,73.012567,"Karave Link Road, Sector 38, Seawoods, Navi Mumbai, Maharashtra 400706, India","400706"],["1403032","Sec 11 Belapur",19.015339,73.042534,"Sector 11, CBD Belapur, Navi Mumbai, Maharashtra, India","400614"],["1405076","Sector 14 Kopar Khairane",19.102,73.008,"Kopar Khairane, Navi Mumbai, Maharashtra, India","400709"],["1396295","Sion East",19.022056,72.86825,"Vidyalankar College Road, Antop Hill, Mumbai, Maharashtra 400037, India","400037"],["1400977","Takka Naka",18.980835,73.113323,"Old Panvel, Panvel, Navi Mumbai, Maharashtra, India","410206"],["1386846","Taloja Jail Road",19.069468,73.074544,"Utsav Chowk - CISF Road, Sector 35, Panvel, Navi Mumbai, Maharashtra 410210, India","410210"],["1402459","Taloja Phase 2",19.071998,73.095683,"Taloja Phase 2, Taloja, Panvel, Maharashtra 410208, India","410208"],["1396282","Tardeo Police Station",18.969984,72.814278,"Janata Nagar, Tardeo, Mumbai, Maharashtra, India","400034"],["1381500","Telecom Factory",19.0499236,72.9165793,"Govandi Station Rd, Deonar, Govandi East, Mumbai, Maharashtra 400088, India","400088"],["1382439","Thakur Village",19.20579,72.8741,"ठाकुर, कांदिवली ईस्ट, मुंबई, महाराष्ट्र 400101, India","400101"],["1336659","Thane West",19.2280146,72.9756959,"Manpada, Thane West, Thane, Maharashtra, India","400601"],["1402458","Ulwe",18.969516,73.023393,"Jai Bhavani Road, Sector 18, Ulwe, Navi Mumbai, Maharashtra 410206, India","410206"],["1381643","Uthalsar",19.2083033,72.9773984,"Lal Bahadur Shastri Marg, Azad Nagar, Thane West, Thane, Maharashtra 400601, India","400601"],["1403211","Vadale Lake - MP",18.998722,73.111639,"Sector 15, Khanda Colony, Panvel, Maharashtra 410206, India","410206"],["1314371","Vasai Virar",19.384573,72.830382,"Shastri Nagar, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202, India","401202"],["810367","Vikhroli",19.118084,72.922486,"HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra, India","400083"],["1190780","Vile Parle West (Cooper Hosp)",19.0866481,72.8374707,"VM Bhargav Road, Santacruz West, Mumbai, Maharashtra 400054, India","400054"],["1397051","Vile Parle West (Irla Lane)",19.104799,72.838066,"Indira Nagar, Vile Parle West, Mumbai, Maharashtra 400056, India","400056"],["1295147","Vile Parle East",19.1147357,72.8502962,"Professor NS Phadke Road, Vijay Nagar, Andheri East, Mumbai, Maharashtra 400053, India","400053"],["1404876","Virar Carshed",19.424294,72.811562,"Zero Road, Sriprastha, Nalasopara West, Nala Sopara, Maharashtra 401203, India","401203"],["1402063","Virar East",19.470556,72.808861,"Evershine Globle City, Dongarpada, Rustomjee Global City, Virar West, Vasai-Virar, Maharashtra, India","401303"],["1404646","Waghbil Naka",19.2501102,72.9740743,"Patlipada Village, Thane West, Thane, Maharashtra, India","400615"],["1405057","Worli",19.016,72.817,"Koliwada, Worli, Mumbai, Maharashtra 400030, India","400030"],["929911","Yojit Estates",19.1932313,72.956769,"Ambika Nagar No 3, Thane West, Thane, Maharashtra 400604, India","400604"]];

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
    return json;
  }

  async function checkStoreStatusViaApi(store) {
    const [podId, loc, lat, lng, defaultAddress, defaultPin] = store;
    const label = loc || `${lat}, ${lng}`;
    
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
        maps_url: `https://www.google.com/maps?q=${lat},${lng}`,
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
        maps_url: `https://www.google.com/maps?q=${lat},${lng}`,
        status: res.status === 400 ? 'Unserviceable' : 'Error',
        status_type: res.status === 400 ? 'unserviceable' : 'error',
        eta: '-',
        message: `HTTP ${res.status}`,
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
        maps_url: `https://www.google.com/maps?q=${lat},${lng}`,
        status: 'Unserviceable',
        status_type: 'unserviceable',
        eta: '-',
        message: 'Out of Swiggy delivery coverage',
        is_health: true
      };
    }

    const pageConfigs = json.data?.configs?.IM_PAGE_CONFIGS;
    const toolbarConfigs = json.data?.configs?.IM_TOOL_BAR;
    const podDetail = pageConfigs?.configInfo?.[0]?.card?.podDetailsList?.[0];
    const tbSla = toolbarConfigs?.configInfo?.[0]?.card?.sla;

    const servStatus = podDetail?.serviceabilityDetails?.serviceabilityStatus;
    const isServiceable = (servStatus === 'SERVICEABILITY_STATUS_SERVICEABLE');
    const isNonServiceable = (servStatus === 'SERVICEABILITY_STATUS_NON_SERVICEABLE');
    const resolvedPodId = podDetail?.podId || podId || '';

    // Direct SLA extraction from Swiggy's config objects
    const slaVal = tbSla?.value || podDetail?.serviceabilityDetails?.sla?.value;
    const slaUnit = tbSla?.unit || podDetail?.serviceabilityDetails?.sla?.unit || 'Mins';
    let realEta = (isServiceable && slaVal) ? `${slaVal} ${slaUnit}` : (isServiceable ? 'Active' : '-');

    const cards = (json.data && json.data.cards) || [];
    let isClosed = false;
    let isComingSoon = isNonServiceable;
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
    }

    let status = 'Live & Active';
    let statusType = 'live';

    if (isComingSoon || isNonServiceable) {
      status = 'Coming Soon';
      statusType = 'coming_soon';
      realEta = '-';
    } else if (isClosed) {
      status = 'Temporarily Closed';
      statusType = 'closed';
      realEta = '-';
    }

    return {
      store_id: resolvedPodId,
      store_locality: loc || '',
      store_address: defaultAddress || '',
      store_pincode: defaultPin || '',
      maps_url: `https://www.google.com/maps?q=${lat},${lng}`,
      status: status,
      status_type: statusType,
      eta: realEta,
      message: statusMsg || (statusType === 'live' ? 'Delivering now' : (statusType === 'closed' ? 'Store temporarily paused' : 'Coming soon to area')),
      is_health: true
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
  let healthResults = [];
  let currentMode = 'search'; // 'search' | 'health'
  let resultsOpenedForScan = false;

  // 1. Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'sw-hunter-styles';
  styleEl.textContent = `
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
  `;
  document.head.appendChild(styleEl);

  // 2. Inject HTML Overlay
  const overlay = document.createElement('div');
  overlay.id = 'sw-hunter-overlay';
  overlay.innerHTML = `
    <div class="sw-h-header">
      <div class="sw-h-title">
        <span style="font-size: 16px;">🛵</span>
        <span>Swiggy Instamart Hunter</span>
        <span class="sw-h-badge" id="sw-h-badge">
          <span class="sw-h-badge-dot"></span>
          <span>${STORES.length} Pods</span>
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
            <option value="all">All ${STORES.length} Stores</option>
            ${STORES.map((s, i) => `<option value="${i}">${s[1]}</option>`).join('')}
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
      <button class="sw-h-tool-btn" id="sw-h-csv">⬇ CSV</button>
      <a href="https://asad0406.github.io/swiggy-instamart/map.html" target="_blank" rel="noopener noreferrer" class="sw-h-tool-btn" style="text-decoration:none;display:inline-flex;align-items:center;gap:3px;" title="View all 112 dark stores on interactive map">🗺️ Map</a>
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
            p.pincode || (p.primaryServingAddress?.match(/\b(4\d{5})\b/) || [''])[0] || ''
          ]);
        }
        STORES = parsed;
        badgeEl.innerHTML = `<span class="sw-h-badge-dot"></span><span>${STORES.length} Pods</span>`;
        storeSelect.innerHTML = `<option value="all">All ${STORES.length} Stores</option>` +
          STORES.map((s, i) => `<option value="${i}">${s[1]}</option>`).join('');
        alert(`Successfully loaded ${STORES.length} dark stores from custom JSON!`);
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
        pageBtn.innerHTML = `📊 View Health Report (${count} Stores) ↗`;
      } else {
        pageBtn.className = 'sw-h-page-btn';
        pageBtn.innerHTML = '📊 View Health Report (Not run yet)';
      }
    } else {
      if (count > 0) {
        pageBtn.className = 'sw-h-page-btn ready';
        pageBtn.innerHTML = `📊 Open Results Table (${count.toLocaleString()} Items) ↗`;
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
      banner.innerHTML = `
        <span>✨ <b>${items.length.toLocaleString()}</b> ${noun} ready! Table opened in new tab ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">View Again</button>
      `;
    } else {
      banner.className = 'sw-h-banner blocked';
      banner.innerHTML = `
        <span>🛵 <b>${items.length.toLocaleString()}</b> ${noun} ready! Click to open report ↗</span>
        <button id="sw-h-banner-btn" class="sw-h-banner-btn">Open Report</button>
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
      pbar.style.width = `${pct}%`;
      livePct.textContent = `${pct}%`;
      liveStoreTitle.textContent = `[${i + 1}/${targetStores.length}] ${loc}`;
      liveStoreSub.textContent = 'Checking store health & serviceability...';

      try {
        // 1. Pre-check store health & serviceability in real time
        const health = await checkStoreStatusViaApi(store);
        store.status = health.status;
        store.status_type = health.status_type;
        store.eta = health.eta;

        if (inStockOnly && health.status_type !== 'live') {
          liveStoreSub.textContent = `📍 ${loc} • [${health.status}] ${health.message} (Skipped)`;
          if (i < targetStores.length - 1 && !abortScan) await sleep(200);
          continue;
        }

        liveStoreSub.textContent = `🟢 ${health.status} (${health.eta}) • Searching "${query}"...`;

        // 2. Search products for this active store
        let products = [];
        try {
          products = await searchViaApi(query);
        } catch (err) {
          if (err.rateLimited) {
            liveStoreSub.textContent = `Rate limit reached for ${loc}. Using DOM fallback...`;
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
            ? `<img src="${row.image_1}" class="sw-h-thumb" onerror="this.outerHTML='<span style=\\'font-size:15px;\\'>🛵</span>'">`
            : `<span style="font-size:15px;">🛵</span>`;
          tr.innerHTML = `
            <td>
              <div class="sw-h-td-prod">
                ${imgTag}
                <span class="sw-h-prod-title">${row.name}</span>
              </div>
            </td>
            <td><span class="sw-h-loc-pill">${row.store_locality}</span></td>
            <td class="sw-h-price">${price ? '₹' + price : '-'}</td>
            <td><span class="sw-h-stock ${row.stock === 'In stock' ? 'sw-h-in' : 'sw-h-out'}">${row.stock === 'In stock' ? 'In Stock' : 'Out'}</span></td>
          `;
          tableBody.appendChild(tr);
          if (tableBody.children.length > 50) {
            tableBody.removeChild(tableBody.firstElementChild);
          }
        }

        if (storeAdded) storesWithItems++;

        sumVal1.textContent = searchResults.length.toLocaleString();
        sumVal2.textContent = `${storesWithItems}/${targetStores.length}`;
        sumVal3.textContent = minPriceFound < 999999 ? `₹${minPriceFound}` : '-';
        updateResultsButton(searchResults.length);

      } catch (err) {
        console.warn('Scan error for', loc, err);
        liveStoreSub.textContent = `${loc} skipped (${err.message})`;
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
      ? `Scan stopped (${searchResults.length} items found)`
      : `✓ Scan completed! (${searchResults.length} items found)`;
    liveStoreSub.textContent = `Found products across ${storesWithItems} of ${targetStores.length} stores.`;
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
      pbar.style.width = `${pct}%`;
      livePct.textContent = `${pct}%`;
      liveStoreTitle.textContent = `[${i + 1}/${targetStores.length}] ${loc}`;
      liveStoreSub.textContent = 'Checking real-time serviceability...';

      try {
        const auditRes = await checkStoreStatusViaApi(store);
        healthResults.push(auditRes);

        if (auditRes.status_type === 'live') liveCount++;
        else if (auditRes.status_type === 'closed') closedCount++;
        else comingCount++;

        liveStoreSub.textContent = `${auditRes.status} • ${auditRes.eta !== '-' ? 'ETA: ' + auditRes.eta : auditRes.message}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><b>${auditRes.store_locality}</b></td>
          <td><span class="sw-h-health-pill ${auditRes.status_type}">${auditRes.status}</span></td>
          <td>${auditRes.eta !== '-' ? '⚡ ' + auditRes.eta : '-'}</td>
          <td><span class="sw-h-loc-pill">${auditRes.store_pincode || '-'}</span></td>
        `;
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
        liveStoreSub.textContent = `${loc} skipped (${err.message})`;
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
      ? `Audit stopped (${healthResults.length} stores checked)`
      : `✓ Audit Complete! (${liveCount} Live, ${closedCount} Closed, ${comingCount} Coming Soon)`;
    liveStoreSub.textContent = `Checked ${healthResults.length} of ${targetStores.length} dark stores in real time.`;
    window.swiggyHealthResults = healthResults;
    updateResultsButton(healthResults.length);

    if (healthResults.length > 0 && !resultsOpenedForScan) {
      resultsOpenedForScan = true;
      openBlankResultsTable(healthResults, 'Store Health Audit', true);
    }
  };

  const TABLE_PAGE_HTML = "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n  <title>🛵 Swiggy Instamart — Results</title>\r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap\" rel=\"stylesheet\">\r\n  <style id=\"app-style\">\r\n    :root {\r\n      --ink: #1f1b16;\r\n      --paper: #edebdf;\r\n      --card: #ffffff;\r\n      --crate: #2b5235;\r\n      --crate-tint: #e4ede3;\r\n      --brick: #a6402b;\r\n      --brick-tint: #f4e5e0;\r\n      --swiggy: #ff7a1a;\r\n      --swiggy-dim: #e5660a;\r\n      --stone: #5b5648;\r\n      --line: #dcd8c8;\r\n      --display: \"Space Grotesk\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, system-ui, sans-serif;\r\n      --body: \"IBM Plex Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, system-ui, sans-serif;\r\n    }\r\n    * { box-sizing: border-box; }\r\n    body {\r\n      margin: 0;\r\n      font: 400 13px/1.5 var(--body);\r\n      background: var(--paper);\r\n      color: var(--ink);\r\n    }\r\n\r\n    header {\r\n      position: sticky;\r\n      top: 0;\r\n      z-index: 10;\r\n      background: var(--paper);\r\n      border-bottom: 2px solid var(--ink);\r\n      padding: 14px 20px 12px;\r\n    }\r\n    .top-row {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      gap: 14px;\r\n      flex-wrap: wrap;\r\n    }\r\n    .title-row {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n    }\r\n    .title-logo {\r\n      font-size: 24px;\r\n      line-height: 1;\r\n      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));\r\n    }\r\n    .query-tag {\r\n      font-family: var(--display);\r\n      font-weight: 700;\r\n      font-size: 19px;\r\n      letter-spacing: -.01em;\r\n      background: var(--ink);\r\n      color: var(--paper);\r\n      padding: 5px 14px 6px;\r\n      border-radius: 3px;\r\n      transform: rotate(-.6deg);\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 6px;\r\n    }\r\n    .query-tag .q-mark {\r\n      color: var(--swiggy);\r\n    }\r\n\r\n    #metaCard {\r\n      flex: none;\r\n      display: flex;\r\n      gap: 6px;\r\n      flex-wrap: wrap;\r\n    }\r\n    #metaCard .stat {\r\n      font-family: var(--display);\r\n      border: 1.5px solid var(--ink);\r\n      border-radius: 3px;\r\n      padding: 5px 11px;\r\n      color: var(--ink);\r\n      font-size: 11.5px;\r\n      font-weight: 600;\r\n      white-space: nowrap;\r\n      background: var(--card);\r\n    }\r\n    #metaCard .stat b {\r\n      color: var(--swiggy-dim);\r\n      font-weight: 700;\r\n    }\r\n\r\n    .toolbar {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      margin-top: 12px;\r\n      flex-wrap: nowrap;\r\n      overflow-x: auto;\r\n      white-space: nowrap;\r\n      padding-bottom: 2px;\r\n    }\r\n    .toolbar::-webkit-scrollbar {\r\n      height: 4px;\r\n    }\r\n    .toolbar::-webkit-scrollbar-thumb {\r\n      background: var(--line);\r\n      border-radius: 4px;\r\n    }\r\n    .toolbar .spacer {\r\n      flex: 1;\r\n      min-width: 8px;\r\n    }\r\n    input#filter, select.filter-select {\r\n      padding: 6px 11px;\r\n      border: 1.5px solid var(--line);\r\n      border-radius: 20px;\r\n      font-size: 12px;\r\n      background: var(--card);\r\n      color: var(--ink);\r\n      flex: 0 0 auto;\r\n      font-family: var(--body);\r\n      outline: none;\r\n      white-space: nowrap;\r\n    }\r\n    select.filter-select {\r\n      max-width: 140px;\r\n      cursor: pointer;\r\n    }\r\n    input#filter {\r\n      width: 160px;\r\n      flex: 0 1 auto;\r\n    }\r\n    input#filter:focus, select.filter-select:focus {\r\n      border-color: var(--swiggy);\r\n    }\r\n    button.tool-btn {\r\n      padding: 6px 13px;\r\n      border: 1.5px solid var(--line);\r\n      border-radius: 20px;\r\n      background: var(--card);\r\n      color: var(--ink);\r\n      font-size: 12px;\r\n      font-weight: 600;\r\n      cursor: pointer;\r\n      flex: 0 0 auto;\r\n      white-space: nowrap;\r\n      font-family: var(--body);\r\n      transition: all 0.15s;\r\n    }\r\n    button.tool-btn:hover {\r\n      border-color: var(--swiggy);\r\n    }\r\n    button.tool-btn.active {\r\n      background: var(--crate);\r\n      border-color: var(--crate);\r\n      color: #fff;\r\n    }\r\n    button.btn-primary {\r\n      background: var(--swiggy);\r\n      border: none;\r\n      color: #ffffff;\r\n      font-family: var(--display);\r\n      font-weight: 700;\r\n      padding: 7px 16px;\r\n      flex: 0 0 auto;\r\n      white-space: nowrap;\r\n    }\r\n    button.btn-primary:hover {\r\n      background: var(--swiggy-dim);\r\n    }\r\n\r\n    #tableWrap {\r\n      overflow: auto;\r\n      max-height: calc(100vh - 128px);\r\n      padding: 0 20px 20px;\r\n    }\r\n    table {\r\n      border-collapse: collapse;\r\n      width: 100%;\r\n      font-size: 12.5px;\r\n    }\r\n    thead th {\r\n      position: sticky;\r\n      top: 0;\r\n      background: var(--paper);\r\n      text-align: left;\r\n      padding: 10px 10px 8px;\r\n      border-bottom: 2px solid var(--ink);\r\n      font-weight: 600;\r\n      font-family: var(--display);\r\n      color: var(--ink);\r\n      white-space: nowrap;\r\n      cursor: pointer;\r\n      user-select: none;\r\n    }\r\n    thead th:hover {\r\n      color: var(--swiggy);\r\n    }\r\n    tbody td {\r\n      padding: 9px 10px;\r\n      border-bottom: 1px solid var(--line);\r\n      font-weight: 400;\r\n      max-width: 280px;\r\n      white-space: normal;\r\n      overflow-wrap: break-word;\r\n      vertical-align: middle;\r\n    }\r\n    tbody tr {\r\n      border-left: 4px solid transparent;\r\n      transition: background 0.1s;\r\n    }\r\n    tbody td.nowrap {\r\n      max-width: none;\r\n      white-space: nowrap;\r\n    }\r\n    tbody tr:hover {\r\n      background: #ffffff;\r\n    }\r\n    tbody tr.sold-out {\r\n      background: var(--brick-tint);\r\n      border-left-color: var(--brick);\r\n    }\r\n    tbody tr.sold-out:hover {\r\n      background: #efd6cf;\r\n    }\r\n    tbody tr.in-stock {\r\n      background: var(--crate-tint);\r\n      border-left-color: var(--crate);\r\n    }\r\n    tbody tr.in-stock:hover {\r\n      background: #d6e5d4;\r\n    }\r\n    td.num {\r\n      text-align: right;\r\n      font-variant-numeric: tabular-nums;\r\n      font-family: var(--display);\r\n      font-weight: 600;\r\n    }\r\n    td a {\r\n      color: var(--swiggy-dim);\r\n      text-decoration: none;\r\n      font-weight: 600;\r\n    }\r\n    td a:hover {\r\n      text-decoration: underline;\r\n    }\r\n\r\n    .prod-link {\r\n      color: var(--ink);\r\n      font-weight: 600;\r\n      line-height: 1.35;\r\n      display: -webkit-box;\r\n      -webkit-line-clamp: 2;\r\n      -webkit-box-orient: vertical;\r\n      overflow: hidden;\r\n    }\r\n    .prod-link:hover {\r\n      color: var(--swiggy-dim);\r\n    }\r\n    .brand-tag {\r\n      font-size: 10px;\r\n      font-weight: 700;\r\n      color: var(--stone);\r\n      text-transform: uppercase;\r\n      letter-spacing: 0.03em;\r\n      margin-bottom: 2px;\r\n    }\r\n    .qty-tag {\r\n      font-size: 11px;\r\n      font-weight: 600;\r\n      color: var(--stone);\r\n    }\r\n    .thumb {\r\n      height: 36px;\r\n      width: 36px;\r\n      object-fit: contain;\r\n      border-radius: 4px;\r\n      vertical-align: middle;\r\n      cursor: zoom-in;\r\n      background: #ffffff;\r\n      border: 1px solid var(--line);\r\n    }\r\n    .thumb-fallback {\r\n      height: 36px;\r\n      width: 36px;\r\n      border-radius: 4px;\r\n      background: var(--card);\r\n      border: 1px solid var(--line);\r\n      display: inline-flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      font-size: 16px;\r\n      color: var(--stone);\r\n      vertical-align: middle;\r\n    }\r\n\r\n    .view-btn {\r\n      border: 1.5px solid var(--line);\r\n      background: var(--card);\r\n      border-radius: 5px;\r\n      width: 26px;\r\n      height: 26px;\r\n      cursor: pointer;\r\n      font-size: 13px;\r\n      display: inline-flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      transition: all 0.15s;\r\n    }\r\n    .view-btn:hover {\r\n      border-color: var(--swiggy);\r\n      transform: scale(1.08);\r\n    }\r\n\r\n    /* Store Health Pill Styles */\r\n    .health-pill {\r\n      font-size: 11.5px;\r\n      font-weight: 700;\r\n      padding: 3px 9px;\r\n      border-radius: 6px;\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 5px;\r\n      white-space: nowrap;\r\n    }\r\n    .health-pill.live { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }\r\n    .health-pill.closed { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }\r\n    .health-pill.coming_soon, .health-pill.coming { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }\r\n    .health-pill.unserviceable, .health-pill.error { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }\r\n    .eta-pill {\r\n      font-size: 11px;\r\n      font-weight: 700;\r\n      color: #059669;\r\n      background: #f0fdf4;\r\n      padding: 3px 8px;\r\n      border-radius: 5px;\r\n      border: 1px solid #bbf7d0;\r\n      white-space: nowrap;\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 4px;\r\n    }\r\n\r\n    #empty {\r\n      padding: 60px 20px;\r\n      text-align: center;\r\n      color: var(--stone);\r\n      font-family: var(--display);\r\n      font-size: 15px;\r\n      font-weight: 600;\r\n    }\r\n\r\n    /* Modals */\r\n    .modal-overlay {\r\n      position: fixed;\r\n      inset: 0;\r\n      background: rgba(31, 27, 22, .55);\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      z-index: 100;\r\n      padding: 20px;\r\n    }\r\n    .modal-card {\r\n      background: var(--card);\r\n      border-radius: 4px;\r\n      width: 490px;\r\n      max-width: 100%;\r\n      max-height: 88vh;\r\n      overflow-y: auto;\r\n      box-shadow: 0 24px 60px rgba(31,27,22,.4);\r\n      position: relative;\r\n    }\r\n    .modal-card::before {\r\n      content: \"\";\r\n      position: absolute;\r\n      top: -10px;\r\n      left: 50%;\r\n      transform: translateX(-50%);\r\n      width: 20px;\r\n      height: 20px;\r\n      background: radial-gradient(circle, transparent 60%, var(--card) 61%);\r\n    }\r\n    .modal-head {\r\n      display: flex;\r\n      gap: 12px;\r\n      align-items: center;\r\n      padding: 20px 20px 16px;\r\n      border-bottom: 2px dashed var(--line);\r\n      position: sticky;\r\n      top: 0;\r\n      background: var(--card);\r\n      z-index: 2;\r\n    }\r\n    .modal-head img {\r\n      width: 48px;\r\n      height: 48px;\r\n      border-radius: 6px;\r\n      object-fit: contain;\r\n      flex: none;\r\n      background: var(--paper);\r\n      border: 1px solid var(--line);\r\n    }\r\n    .modal-head .name {\r\n      font-family: var(--display);\r\n      font-weight: 600;\r\n      font-size: 14.5px;\r\n      line-height: 1.3;\r\n      flex: 1;\r\n    }\r\n    .modal-close {\r\n      cursor: pointer;\r\n      color: var(--stone);\r\n      font-size: 14px;\r\n      line-height: 1;\r\n      flex: none;\r\n      width: 26px;\r\n      height: 26px;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      border-radius: 50%;\r\n      background: var(--paper);\r\n      user-select: none;\r\n    }\r\n    .modal-close:hover {\r\n      background: var(--line);\r\n      color: var(--ink);\r\n    }\r\n\r\n    .modal-grid {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n      gap: 14px;\r\n      padding: 16px 20px;\r\n    }\r\n    .modal-grid .full {\r\n      grid-column: 1 / -1;\r\n    }\r\n    .modal-field .k {\r\n      font-family: var(--display);\r\n      font-size: 10.5px;\r\n      font-weight: 600;\r\n      color: var(--stone);\r\n      margin-bottom: 3px;\r\n      border-left: 2px solid var(--swiggy);\r\n      padding-left: 6px;\r\n    }\r\n    .modal-field .v {\r\n      font-size: 12.5px;\r\n      line-height: 1.45;\r\n      word-break: break-word;\r\n      padding-left: 8px;\r\n    }\r\n\r\n    .modal-section {\r\n      padding: 14px 20px 18px;\r\n      border-top: 2px dashed var(--line);\r\n    }\r\n    .modal-section .sec-title {\r\n      font-family: var(--display);\r\n      font-size: 11px;\r\n      font-weight: 600;\r\n      color: var(--ink);\r\n      border-left: 2px solid var(--swiggy);\r\n      padding-left: 6px;\r\n    }\r\n    .price-row {\r\n      display: flex;\r\n      justify-content: space-between;\r\n      align-items: center;\r\n      gap: 10px;\r\n      padding: 8px 10px;\r\n      border-radius: 4px;\r\n      font-size: 12.5px;\r\n      margin-bottom: 4px;\r\n    }\r\n    .price-row .store {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 6px;\r\n      flex: 1;\r\n      min-width: 0;\r\n      flex-wrap: wrap;\r\n    }\r\n    .price-row .amount {\r\n      font-family: var(--display);\r\n      font-weight: 600;\r\n      font-variant-numeric: tabular-nums;\r\n      flex: none;\r\n      white-space: nowrap;\r\n    }\r\n    .price-row.best {\r\n      background: var(--crate-tint);\r\n    }\r\n    .price-row.worst {\r\n      background: var(--brick-tint);\r\n    }\r\n    .price-row .amount.best {\r\n      color: var(--crate);\r\n    }\r\n    .price-row .amount.worst {\r\n      color: var(--brick);\r\n    }\r\n    .pill {\r\n      font-family: var(--display);\r\n      font-size: 9.5px;\r\n      font-weight: 700;\r\n      padding: 2px 7px;\r\n      border-radius: 3px;\r\n      display: inline-block;\r\n      width: fit-content;\r\n      color: #fff;\r\n    }\r\n    .pill.best {\r\n      background: var(--crate);\r\n    }\r\n    .pill.worst {\r\n      background: var(--brick);\r\n    }\r\n    .price-row .soldout {\r\n      color: var(--stone);\r\n      font-size: 11px;\r\n    }\r\n\r\n    .price-compare {\r\n      display: flex;\r\n      gap: 8px;\r\n      margin-bottom: 6px;\r\n    }\r\n    .price-card {\r\n      flex: 1 1 0;\r\n      min-width: 0;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: flex-start;\r\n      gap: 3px;\r\n      padding: 10px 12px;\r\n      border-radius: 4px;\r\n    }\r\n    .price-card.best {\r\n      background: var(--crate-tint);\r\n    }\r\n    .price-card.worst {\r\n      background: var(--brick-tint);\r\n    }\r\n    .price-card .pc-label {\r\n      font-size: 11.5px;\r\n      color: var(--stone);\r\n      margin-top: 3px;\r\n    }\r\n    .pc-amount-row {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 6px;\r\n      margin-top: 2px;\r\n    }\r\n    .price-card .pc-amount {\r\n      font-family: var(--display);\r\n      font-size: 17px;\r\n      font-weight: 700;\r\n      font-variant-numeric: tabular-nums;\r\n    }\r\n    .price-card .pc-amount.best {\r\n      color: var(--crate);\r\n    }\r\n    .price-card .pc-amount.worst {\r\n      color: var(--brick);\r\n    }\r\n    .save-tag {\r\n      font-family: var(--body);\r\n      font-size: 10.5px;\r\n      font-weight: 600;\r\n      color: #fff;\r\n      padding: 2px 7px;\r\n      border-radius: 10px;\r\n      background: var(--crate);\r\n    }\r\n\r\n    .toggle-stores {\r\n      display: inline-block;\r\n      cursor: pointer;\r\n      color: var(--swiggy-dim);\r\n      font-family: var(--display);\r\n      font-weight: 600;\r\n      font-size: 11.5px;\r\n      margin: 6px 0 0 8px;\r\n      user-select: none;\r\n    }\r\n    .toggle-stores:hover {\r\n      color: var(--ink);\r\n      text-decoration: underline;\r\n    }\r\n\r\n    .table-status-bar {\r\n      text-align: center;\r\n      padding: 16px 20px 24px;\r\n      font-size: 12px;\r\n      color: var(--stone);\r\n      font-family: var(--display);\r\n      font-weight: 600;\r\n    }\r\n    #empty {\r\n      text-align: center;\r\n      padding: 60px 20px;\r\n      font-size: 15px;\r\n      color: var(--stone);\r\n      font-family: var(--display);\r\n      font-weight: 600;\r\n    }\r\n\r\n    @media (max-width: 800px) {\r\n      header { padding: 12px 14px; }\r\n      .toolbar { gap: 6px; }\r\n      #tableWrap { padding: 0 10px 14px; }\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n\r\n  <header>\r\n    <div class=\"top-row\">\r\n      <div class=\"title-row\">\r\n        <span class=\"title-logo\">🛵</span>\r\n        <span class=\"query-tag\" id=\"titleTag\">\r\n          <span class=\"q-mark\">#</span><span id=\"queryLabel\">Instamart Hunter</span>\r\n        </span>\r\n      </div>\r\n      <div id=\"metaCard\"></div>\r\n    </div>\r\n    <div class=\"toolbar\">\r\n      <select id=\"filterStore\" class=\"filter-select\">\r\n        <option value=\"\">All stores</option>\r\n      </select>\r\n      <select id=\"filterBrand\" class=\"filter-select\">\r\n        <option value=\"\">All brands</option>\r\n      </select>\r\n      <select id=\"filterCategory\" class=\"filter-select\">\r\n        <option value=\"\">All categories</option>\r\n      </select>\r\n      <select id=\"filterStock\" class=\"filter-select\">\r\n        <option value=\"\">All stock</option>\r\n        <option value=\"In stock\">In stock</option>\r\n        <option value=\"Sold out\">Sold out</option>\r\n      </select>\r\n      <select id=\"sortSelect\" class=\"filter-select\">\r\n        <option value=\"price-asc\">💵 Price: Low to High</option>\r\n        <option value=\"price-desc\">💎 Price: High to Low</option>\r\n        <option value=\"discount-desc\">🔥 Highest Discount %</option>\r\n        <option value=\"brand-asc\">🏷️ Brand: A to Z</option>\r\n        <option value=\"title-asc\">🔤 Product: A to Z</option>\r\n        <option value=\"store-asc\">📍 Store: A to Z</option>\r\n      </select>\r\n      <input id=\"filter\" type=\"text\" placeholder=\"Search product, brand, store...\">\r\n      <button id=\"filterVariation\" class=\"tool-btn\">Price varies by store</button>\r\n      <div class=\"spacer\"></div>\r\n      <button id=\"download\" class=\"tool-btn btn-primary\">Download CSV</button>\r\n    </div>\r\n  </header>\r\n\r\n  <div id=\"tableWrap\"></div>\r\n\r\n  <script id=\"app-script\">\r\n    const tableWrap = document.getElementById('tableWrap');\r\n    const filterEl = document.getElementById('filter');\r\n    const storeSel = document.getElementById('filterStore');\r\n    const brandSel = document.getElementById('filterBrand');\r\n    const catSel = document.getElementById('filterCategory');\r\n    const stockSel = document.getElementById('filterStock');\r\n    const sortSel = document.getElementById('sortSelect');\r\n    const variationBtn = document.getElementById('filterVariation');\r\n\r\n    let isHealthMode = false;\r\n\r\n    const COLUMN_ORDER_PRODUCTS = [\r\n      'store_locality',\r\n      'delivery_eta',\r\n      'name',\r\n      'brand',\r\n      'quantity',\r\n      'stock',\r\n      'mrp_inr',\r\n      'selling_price_inr',\r\n      'discount_pct',\r\n      'category',\r\n      'image_1',\r\n      'maps_url'\r\n    ];\r\n\r\n    const COLUMN_ORDER_HEALTH = [\r\n      'store_locality',\r\n      'status',\r\n      'eta',\r\n      'store_id',\r\n      'store_pincode',\r\n      'store_address',\r\n      'maps_url'\r\n    ];\r\n\r\n    const COLUMN_LABELS = {\r\n      store_locality: 'Store / Locality',\r\n      name: 'Product',\r\n      brand: 'Brand',\r\n      quantity: 'Quantity',\r\n      stock: 'Stock',\r\n      mrp_inr: 'MRP (₹)',\r\n      selling_price_inr: 'Price (₹)',\r\n      discount_pct: 'Discount %',\r\n      category: 'Category',\r\n      image_1: 'Image',\r\n      maps_url: 'Map',\r\n      store_id: 'Pod ID',\r\n      store_pincode: 'Pincode',\r\n      store_address: 'Store Address',\r\n      sub_category: 'Sub-category',\r\n      product_id: 'Product ID',\r\n      status: 'Live Status',\r\n      eta: 'Delivery ETA',\r\n      delivery_eta: 'Delivery ETA',\r\n      store_status: 'Store Status'\r\n    };\r\n\r\n    const DETAIL_COLS = ['store_locality', 'delivery_eta', 'store_status', 'store_id', 'store_pincode', 'brand', 'quantity', 'selling_price_inr', 'mrp_inr', 'discount_pct', 'stock', 'category', 'sub_category', 'store_address'];\r\n    const DETAIL_COLS_HEALTH = ['store_locality', 'store_id', 'status', 'eta', 'store_pincode', 'store_address', 'message'];\r\n    const DETAIL_FULL_WIDTH = new Set(['store_address']);\r\n    const NUMERIC_COLS = new Set(['mrp_inr', 'selling_price_inr', 'discount_pct']);\r\n    const NOWRAP_COLS = new Set(['stock', 'quantity', 'image_1', 'maps_url', 'status', 'eta', 'delivery_eta', 'store_status']);\r\n\r\n    const label = c => COLUMN_LABELS[c] || c;\r\n\r\n    let DATA = [];\r\n    let allRows = [];\r\n    let filteredRows = [];\r\n    let renderedCount = 0;\r\n    const PAGE_CHUNK = 80;\r\n    let currentQuery = '';\r\n    let sortCol = null, sortDir = 1;\r\n    let onlyVariation = false;\r\n    let cheapestByKey = new Map();\r\n    let variantsMap = new Map();\r\n\r\n    const variantKey = r => `${r.name || ''}__${r.brand || ''}__${r.quantity || ''}`.trim().toLowerCase();\r\n\r\n    function isHealthRow(r) {\r\n      if (!r) return false;\r\n      if (r.is_health === true) return true;\r\n      if (!r.name && !r.title && !r.product_id && (r.status || r.eta || r.status_type)) return true;\r\n      return false;\r\n    }\r\n\r\n    function normalizeRow(r) {\r\n      if (isHealthRow(r)) {\r\n        const loc = r.store_locality || r.locality || '-';\r\n        const storeId = r.store_id || r.podId || '-';\r\n        const pin = r.store_pincode || r.pincode || '';\r\n        const addr = r.store_address || r.address || '';\r\n        const status = r.status || 'Live & Active';\r\n        const eta = r.eta || '-';\r\n        const msg = r.message || '';\r\n        const maps = r.maps_url || r.mapsUrl || `https://www.google.com/maps?q=${r.latitude || ''},${r.longitude || ''}`;\r\n        const stType = r.status_type || (String(status).includes('Live') ? 'live' : String(status).includes('Closed') ? 'closed' : String(status).includes('Coming') ? 'coming_soon' : 'unserviceable');\r\n        return {\r\n          is_health: true,\r\n          store_locality: loc,\r\n          status: status,\r\n          status_type: stType,\r\n          eta: eta,\r\n          store_id: storeId,\r\n          store_pincode: pin,\r\n          store_address: addr,\r\n          message: msg,\r\n          maps_url: maps,\r\n          _search: `${loc} ${storeId} ${pin} ${addr} ${status} ${eta} ${msg}`.toLowerCase()\r\n        };\r\n      }\r\n\r\n      const avail = (r.stock === 'In stock' || r.inStock === true || r.availability === 'IN_STOCK') ? 'In stock' : 'Sold out';\r\n      const title = (r.name || r.title || r.titles?.title || '-').trim();\r\n      const loc = r.store_locality || r.locality || '-';\r\n      const storeId = r.store_id || r.podId || r.storeId || '-';\r\n      const pin = r.store_pincode || r.pincode || '';\r\n      const addr = r.store_address || r.deliveryLocation || '';\r\n      const brand = r.brand || '';\r\n      const qty = r.quantity || '';\r\n      const cat = r.category || '';\r\n      const subCat = r.sub_category || '';\r\n      const eta = r.delivery_eta || r.eta || '-';\r\n      const storeStatus = r.store_status || r.status || 'Live & Active';\r\n\r\n      const searchStr = `${title} ${brand} ${qty} ${loc} ${storeId} ${pin} ${addr} ${cat} ${subCat} ${eta}`.toLowerCase();\r\n\r\n      return {\r\n        store_locality: loc,\r\n        store_id: storeId,\r\n        store_pincode: pin,\r\n        store_address: addr,\r\n        store_status: storeStatus,\r\n        delivery_eta: eta,\r\n        maps_url: r.maps_url || r.mapsUrl || '',\r\n        name: title,\r\n        brand: brand,\r\n        quantity: qty,\r\n        stock: avail,\r\n        mrp_inr: r.mrp_inr != null ? Number(r.mrp_inr) : (r.mrp != null ? Number(r.mrp) : null),\r\n        selling_price_inr: r.selling_price_inr != null ? Number(r.selling_price_inr) : (r.price != null ? Number(r.price) : null),\r\n        discount_pct: r.discount_pct != null ? Number(r.discount_pct) : (r.discount != null ? Number(r.discount) : 0),\r\n        category: cat,\r\n        sub_category: subCat,\r\n        product_id: r.product_id || r.productId || '',\r\n        image_1: r.image_1 || r.imageUrl || '',\r\n        product_url: r.product_url || (r.product_id ? `https://www.swiggy.com/instamart/item/${r.product_id}` : '#'),\r\n        _search: searchStr\r\n      };\r\n    }\r\n\r\n    function priceAcrossStores(row) {\r\n      const k = variantKey(row);\r\n      const group = variantsMap.get(k) || [];\r\n      return group\r\n        .filter(r => r.stock === 'In stock' && r.selling_price_inr != null)\r\n        .map(r => ({ store: r.store_locality, price: r.selling_price_inr, stock: r.stock }))\r\n        .sort((a, b) => a.price - b.price);\r\n    }\r\n\r\n    function computeVariationKeys() {\r\n      const byKey = new Map();\r\n      variantsMap = new Map();\r\n\r\n      for (let i = 0; i < allRows.length; i++) {\r\n        const r = allRows[i];\r\n        const k = variantKey(r);\r\n        let group = variantsMap.get(k);\r\n        if (!group) {\r\n          group = [];\r\n          variantsMap.set(k, group);\r\n        }\r\n        group.push(r);\r\n\r\n        if (r.stock !== 'In stock' || r.selling_price_inr == null) continue;\r\n        const price = r.selling_price_inr;\r\n        const e = byKey.get(k);\r\n        if (!e) byKey.set(k, { min: price, max: price, cheapest: r });\r\n        else {\r\n          e.min = Math.min(e.min, price);\r\n          e.max = Math.max(e.max, price);\r\n          if (price < (e.cheapest.selling_price_inr ?? 999999)) e.cheapest = r;\r\n        }\r\n      }\r\n      cheapestByKey = new Map([...byKey].filter(([, v]) => v.min !== v.max).map(([k, v]) => [k, v.cheapest]));\r\n      if (variationBtn) {\r\n        variationBtn.textContent = `Price varies by store (${cheapestByKey.size})`;\r\n      }\r\n    }\r\n\r\n    function buildPriceSection(prices) {\r\n      const min = prices[0].price, max = prices[prices.length - 1].price;\r\n      const toggle = `<span class=\"toggle-stores\">Show all ${prices.length} stores</span>`;\r\n\r\n      if (min === max) {\r\n        return `<div class=\"modal-section\"><div class=\"sec-title\">Price across stores</div>` +\r\n          `<div class=\"price-row\"><span class=\"store\">${prices.length} stores have the same price</span>` +\r\n          `<span class=\"amount\">₹${min}</span></div>${toggle}</div>`;\r\n      }\r\n\r\n      const cheapest = prices.filter(p => p.price === min);\r\n      const restCount = prices.length - cheapest.length;\r\n      const savings = Math.round(((max - min) / max) * 100);\r\n      const cheapestLabel = cheapest.length === 1 ? cheapest[0].store : `${cheapest.length} stores`;\r\n\r\n      return `<div class=\"modal-section\"><div class=\"sec-title\">Price across stores</div>` +\r\n        `<div class=\"price-compare\">` +\r\n        `<div class=\"price-card best\">` +\r\n        `<span class=\"pill best\">cheapest</span>` +\r\n        `<span class=\"pc-label\">${cheapestLabel}</span>` +\r\n        `<span class=\"pc-amount-row\">${savings > 0 ? `<span class=\"save-tag\">save ${savings}%</span>` : ''}<span class=\"pc-amount best\">₹${min}</span></span></div>` +\r\n        `<div class=\"price-card worst\">` +\r\n        `<span class=\"pill worst\">priciest</span>` +\r\n        `<span class=\"pc-label\">${restCount} other store${restCount > 1 ? 's' : ''}</span>` +\r\n        `<span class=\"pc-amount worst\">₹${max}</span></div>` +\r\n        `</div>${toggle}</div>`;\r\n    }\r\n\r\n    function openStoreListModal(prices) {\r\n      const modal = document.createElement('div');\r\n      modal.className = 'modal-overlay';\r\n      const rows = prices.map(p =>\r\n        `<div class=\"price-row\"><span class=\"store\">${p.store}${p.stock === 'Sold out' ? ' <span class=\"soldout\">(sold out)</span>' : ''}</span>` +\r\n        `<span class=\"amount\">₹${p.price}</span></div>`\r\n      ).join('');\r\n      modal.innerHTML =\r\n        `<div class=\"modal-card\" style=\"width:360px;\">` +\r\n        `<div class=\"modal-head\"><div class=\"name\">All ${prices.length} stores</div>` +\r\n        `<span class=\"modal-close\">✕</span></div>` +\r\n        `<div class=\"modal-section\" style=\"border-top:none;\">${rows}</div></div>`;\r\n      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\r\n      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\r\n      document.body.appendChild(modal);\r\n    }\r\n\r\n    function openDetail(row) {\r\n      const modal = document.createElement('div');\r\n      modal.className = 'modal-overlay';\r\n\r\n      if (isHealthMode) {\r\n        const fields = DETAIL_COLS_HEALTH.map(c => {\r\n          let val = row[c] ?? '-';\r\n          if (c === 'status') {\r\n            const st = row.status_type || 'live';\r\n            val = `<span class=\"health-pill ${st}\">${row.status}</span>`;\r\n          }\r\n          if (c === 'eta') {\r\n            val = row.eta && row.eta !== '-' ? `<span class=\"eta-pill\">⚡ ${row.eta}</span>` : 'Not available';\r\n          }\r\n          if (c === 'store_address' && row.maps_url) {\r\n            val = `${val} <br><a href=\"${row.maps_url}\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-weight:700;display:inline-block;margin-top:6px;\">📍 Open in Google Maps ↗</a>`;\r\n          }\r\n          return `<div class=\"modal-field${DETAIL_FULL_WIDTH.has(c) ? ' full' : ''}\">` +\r\n            `<div class=\"k\">${label(c)}</div><div class=\"v\">${val}</div></div>`;\r\n        }).join('');\r\n\r\n        modal.innerHTML =\r\n          `<div class=\"modal-card\">` +\r\n          `<div class=\"modal-head\"><div style=\"font-size:24px;\">🏪</div>` +\r\n          `<div class=\"name\" style=\"font-size:16px;\">${row.store_locality} (Pod #${row.store_id})</div>` +\r\n          `<span class=\"modal-close\">✕</span></div>` +\r\n          `<div class=\"modal-grid\">${fields}</div></div>`;\r\n\r\n        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\r\n        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\r\n        document.body.appendChild(modal);\r\n        return;\r\n      }\r\n\r\n      const fields = DETAIL_COLS.map(c => {\r\n        let val = row[c] ?? '-';\r\n        if (c === 'selling_price_inr' && val !== '-') val = `<b>₹${val}</b>`;\r\n        if (c === 'mrp_inr' && val !== '-') val = `₹${val}`;\r\n        if (c === 'discount_pct' && val) val = `${val}% OFF`;\r\n        if (c === 'store_address' && row.maps_url) {\r\n          val = `${val} <br><a href=\"${row.maps_url}\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-weight:700;display:inline-block;margin-top:4px;\">📍 Open in Google Maps ↗</a>`;\r\n        }\r\n        return `<div class=\"modal-field${DETAIL_FULL_WIDTH.has(c) ? ' full' : ''}\">` +\r\n          `<div class=\"k\">${label(c)}</div><div class=\"v\">${val}</div></div>`;\r\n      }).join('');\r\n\r\n      const prices = priceAcrossStores(row);\r\n      const priceSection = prices.length > 1 ? buildPriceSection(prices) : '';\r\n\r\n      const img = row.image_1\r\n        ? `<img src=\"${row.image_1}\" alt=\"${row.name}\" onerror=\"this.style.display='none'\">`\r\n        : `<div style=\"width:48px;height:48px;border-radius:6px;background:var(--paper);display:flex;align-items:center;justify-content:center;font-size:20px;\">🛵</div>`;\r\n\r\n      modal.innerHTML =\r\n        `<div class=\"modal-card\">` +\r\n        `<div class=\"modal-head\">${img}` +\r\n        `<div class=\"name\"><a href=\"${row.product_url}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-link\" style=\"font-size:15px;\">${row.name}</a></div>` +\r\n        `<span class=\"modal-close\">✕</span></div>` +\r\n        `<div class=\"modal-grid\">${fields}</div>` +\r\n        priceSection + `</div>`;\r\n\r\n      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\r\n      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\r\n      const toggleEl = modal.querySelector('.toggle-stores');\r\n      if (toggleEl) {\r\n        toggleEl.addEventListener('click', () => openStoreListModal(prices));\r\n      }\r\n      document.body.appendChild(modal);\r\n    }\r\n\r\n    function openImage(src) {\r\n      if (!src) return;\r\n      const modal = document.createElement('div');\r\n      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;' +\r\n        'align-items:center;justify-content:center;z-index:100;cursor:zoom-out;';\r\n      modal.innerHTML = `<img src=\"${src}\" style=\"max-width:85vw;max-height:85vh;border-radius:8px;box-shadow:0 16px 40px rgba(0,0,0,.5);background:#fff;padding:8px;\">`;\r\n      modal.addEventListener('click', () => modal.remove());\r\n      document.body.appendChild(modal);\r\n    }\r\n\r\n    function cellValue(row, col) {\r\n      const v = row[col] ?? '';\r\n      if (col === 'store_status' || col === 'status') {\r\n        const val = row.store_status || row.status || v || 'Live';\r\n        const st = row.status_type || (String(val).includes('Live') ? 'live' : String(val).includes('Closed') ? 'closed' : String(val).includes('Coming') ? 'coming_soon' : 'unserviceable');\r\n        return `<span class=\"health-pill ${st}\">${val}</span>`;\r\n      }\r\n      if (col === 'delivery_eta' || col === 'eta') {\r\n        const val = row.delivery_eta || row.eta || v;\r\n        return (val && val !== '-') ? `<span class=\"eta-pill\">⚡ ${val}</span>` : '-';\r\n      }\r\n      if (col === 'image_1') {\r\n        return v\r\n          ? `<img src=\"${v}\" loading=\"lazy\" class=\"thumb\" data-src=\"${v}\" onerror=\"this.outerHTML='<span class=\\\\'thumb-fallback\\\\'>🛵</span>'\">`\r\n          : `<span class=\"thumb-fallback\">🛵</span>`;\r\n      }\r\n      if (col === 'name') {\r\n        return `<a href=\"${row.product_url}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-link\">${v}</a>`;\r\n      }\r\n      if (col === 'quantity') {\r\n        return v ? `<span class=\"qty-tag\">${v}</span>` : '-';\r\n      }\r\n      if (col === 'selling_price_inr') {\r\n        return v != null ? `₹${v}` : '-';\r\n      }\r\n      if (col === 'mrp_inr') {\r\n        return (v && v > row.selling_price_inr) ? `₹${v}` : '-';\r\n      }\r\n      if (col === 'discount_pct') {\r\n        return v > 0 ? `<span style=\"color:var(--crate);font-weight:700;\">${v}%</span>` : '-';\r\n      }\r\n      if (col === 'maps_url') {\r\n        return v ? `<a href=\"${v}\" target=\"_blank\" rel=\"noopener noreferrer\">📍 Map ↗</a>` : '-';\r\n      }\r\n      return String(v).replace(/</g, '&lt;');\r\n    }\r\n\r\n    function sortRows(rows) {\r\n      if (!sortCol) return rows;\r\n      const numeric = NUMERIC_COLS.has(sortCol);\r\n      return [...rows].sort((a, b) => {\r\n        let av = a[sortCol] ?? '', bv = b[sortCol] ?? '';\r\n        const cmp = numeric ? ((Number(av) || 0) - (Number(bv) || 0)) : String(av).localeCompare(String(bv));\r\n        return cmp * sortDir;\r\n      });\r\n    }\r\n\r\n    function renderRowHtml(r, i) {\r\n      let trClass = 'in-stock';\r\n      if (isHealthMode) {\r\n        trClass = r.status_type === 'live' ? 'in-stock' : (r.status_type === 'closed' ? 'sold-out' : 'sold-out');\r\n      } else {\r\n        trClass = r.stock === 'Sold out' ? 'sold-out' : 'in-stock';\r\n      }\r\n      const order = isHealthMode ? COLUMN_ORDER_HEALTH : COLUMN_ORDER_PRODUCTS;\r\n      const cols = order.filter(c => c in r);\r\n      return `<tr class=\"${trClass}\"><td class=\"nowrap\"><button data-idx=\"${i}\" class=\"view-btn\" title=\"View details\">👁</button></td>` +\r\n        cols.map(c => {\r\n          const cls = [NUMERIC_COLS.has(c) ? 'num' : '', NOWRAP_COLS.has(c) ? 'nowrap' : ''].filter(Boolean).join(' ');\r\n          return `<td class=\"${cls}\">${cellValue(r, c)}</td>`;\r\n        }).join('') + '</tr>';\r\n    }\r\n\r\n    function updateTableStatus() {\r\n      const statusEl = document.getElementById('tableStatus');\r\n      if (!statusEl) return;\r\n      const total = filteredRows.length;\r\n      const noun = isHealthMode ? 'stores' : 'products';\r\n      if (total === 0) {\r\n        statusEl.textContent = '';\r\n      } else if (renderedCount >= total) {\r\n        statusEl.textContent = `✓ Showing all ${total.toLocaleString()} ${noun}`;\r\n      } else {\r\n        statusEl.textContent = `Showing ${renderedCount.toLocaleString()} of ${total.toLocaleString()} ${noun} • Scroll down to load more`;\r\n      }\r\n    }\r\n\r\n    function appendNextChunk() {\r\n      if (renderedCount >= filteredRows.length) return;\r\n      const tbody = document.getElementById('tableBody');\r\n      if (!tbody) return;\r\n\r\n      const nextBatch = filteredRows.slice(renderedCount, renderedCount + PAGE_CHUNK);\r\n      let html = '';\r\n      for (let i = 0; i < nextBatch.length; i++) {\r\n        html += renderRowHtml(nextBatch[i], renderedCount + i);\r\n      }\r\n      tbody.insertAdjacentHTML('beforeend', html);\r\n      renderedCount += nextBatch.length;\r\n      updateTableStatus();\r\n    }\r\n\r\n    function renderInitialTable() {\r\n      if (!filteredRows.length) {\r\n        tableWrap.innerHTML = `<div id=\"empty\">No ${isHealthMode ? 'stores' : 'products'} match your filter criteria.</div>`;\r\n        return;\r\n      }\r\n      const order = isHealthMode ? COLUMN_ORDER_HEALTH : COLUMN_ORDER_PRODUCTS;\r\n      const cols = order.filter(c => c in filteredRows[0]);\r\n      const head = '<thead><tr><th></th>' + cols.map(c => {\r\n        const arrow = sortCol === c ? (sortDir === 1 ? ' ▲' : ' ▼') : '';\r\n        return `<th data-col=\"${c}\">${label(c)}${arrow}</th>`;\r\n      }).join('') + '</tr></thead>';\r\n\r\n      renderedCount = Math.min(PAGE_CHUNK, filteredRows.length);\r\n      let bodyHtml = '';\r\n      for (let i = 0; i < renderedCount; i++) {\r\n        bodyHtml += renderRowHtml(filteredRows[i], i);\r\n      }\r\n\r\n      tableWrap.innerHTML = `<table>${head}<tbody id=\"tableBody\">${bodyHtml}</tbody></table><div id=\"tableStatus\" class=\"table-status-bar\"></div>`;\r\n      updateTableStatus();\r\n      tableWrap.scrollTop = 0;\r\n    }\r\n\r\n    function applyFilter() {\r\n      const q = filterEl.value.trim().toLowerCase();\r\n      const store = storeSel.value;\r\n      const brand = brandSel.value;\r\n      const cat = catSel.value;\r\n      const stock = stockSel.value;\r\n      const base = (!isHealthMode && onlyVariation) ? [...cheapestByKey.values()] : allRows;\r\n\r\n      const qTokens = q ? q.split(/\\s+/).filter(Boolean) : [];\r\n\r\n      const filtered = base.filter(r => {\r\n        if (store && r.store_id !== store && r.store_locality !== store) return false;\r\n        if (!isHealthMode && brand && r.brand !== brand) return false;\r\n        if (!isHealthMode && cat && r.category !== cat) return false;\r\n        if (!isHealthMode && stock && r.stock !== stock) return false;\r\n        if (isHealthMode && stock && r.status !== stock && r.status_type !== stock) return false;\r\n        if (qTokens.length > 0) {\r\n          const search = r._search;\r\n          for (let i = 0; i < qTokens.length; i++) {\r\n            if (!search.includes(qTokens[i])) return false;\r\n          }\r\n        }\r\n        return true;\r\n      });\r\n\r\n      filteredRows = sortRows(filtered);\r\n      renderInitialTable();\r\n      updateMetaRibbon();\r\n    }\r\n\r\n    // Event delegation on tableWrap for high performance (zero per-row event listeners)\r\n    tableWrap.addEventListener('click', (e) => {\r\n      const th = e.target.closest('th[data-col]');\r\n      if (th) {\r\n        const col = th.dataset.col;\r\n        sortDir = sortCol === col ? -sortDir : 1;\r\n        sortCol = col;\r\n        applyFilter();\r\n        return;\r\n      }\r\n\r\n      const viewBtn = e.target.closest('.view-btn');\r\n      if (viewBtn) {\r\n        const idx = Number(viewBtn.dataset.idx);\r\n        if (filteredRows[idx]) openDetail(filteredRows[idx]);\r\n        return;\r\n      }\r\n\r\n      const thumb = e.target.closest('.thumb');\r\n      if (thumb) {\r\n        openImage(thumb.dataset.src);\r\n        return;\r\n      }\r\n    });\r\n\r\n    // Infinite scroll listener throttled by rAF\r\n    let scrollScheduled = false;\r\n    tableWrap.addEventListener('scroll', () => {\r\n      if (scrollScheduled) return;\r\n      scrollScheduled = true;\r\n      requestAnimationFrame(() => {\r\n        scrollScheduled = false;\r\n        if (renderedCount >= filteredRows.length) return;\r\n        const scrollBottom = tableWrap.scrollHeight - tableWrap.scrollTop - tableWrap.clientHeight;\r\n        if (scrollBottom < 600) {\r\n          appendNextChunk();\r\n        }\r\n      });\r\n    }, { passive: true });\r\n\r\n    function updateMetaRibbon() {\r\n      const metaEl = document.getElementById('metaCard');\r\n      if (!metaEl) return;\r\n\r\n      if (isHealthMode) {\r\n        const total = allRows.length;\r\n        const liveCount = allRows.filter(r => r.status_type === 'live' || r.status?.includes('Live')).length;\r\n        const closedCount = allRows.filter(r => r.status_type === 'closed' || r.status?.includes('Closed')).length;\r\n        const comingCount = allRows.filter(r => r.status_type === 'coming_soon' || r.status?.includes('Coming')).length;\r\n\r\n        const rowCountStr = (filteredRows.length < total)\r\n          ? `<b>${filteredRows.length}</b> / ${total} pods`\r\n          : `<b>${total}</b> Dark Stores Audited`;\r\n\r\n        metaEl.innerHTML =\r\n          `<span class=\"stat\">${rowCountStr}</span>` +\r\n          `<span class=\"stat\" style=\"color:#065f46;\">🟢 <b>${liveCount}</b> Live</span>` +\r\n          `<span class=\"stat\" style=\"color:#92400e;\">🟡 <b>${closedCount}</b> Closed</span>` +\r\n          `<span class=\"stat\" style=\"color:#991b1b;\">🔴 <b>${comingCount}</b> Coming Soon</span>` +\r\n          `<span class=\"stat\">${new Date().toLocaleTimeString()}</span>`;\r\n        return;\r\n      }\r\n\r\n      const allStoresSet = new Set(allRows.map(r => r.store_id || r.store_locality));\r\n      const filteredStoresSet = new Set(filteredRows.map(r => r.store_id || r.store_locality));\r\n      const prices = (filteredRows.length ? filteredRows : allRows).map(r => r.selling_price_inr).filter(p => p != null);\r\n      const minPrice = prices.length ? Math.min(...prices) : null;\r\n\r\n      const isFiltered = (filteredRows.length < allRows.length) || (filterEl.value.trim() !== '') || (storeSel.value !== '') || (brandSel.value !== '') || (catSel.value !== '') || (stockSel.value !== '') || onlyVariation;\r\n\r\n      const rowCountStr = isFiltered\r\n        ? `<b>${filteredRows.length.toLocaleString()}</b> / ${allRows.length.toLocaleString()} rows`\r\n        : `<b>${allRows.length.toLocaleString()}</b> rows`;\r\n\r\n      const storeCountStr = isFiltered\r\n        ? `<b>${filteredStoresSet.size}</b> / ${allStoresSet.size} stores`\r\n        : `<b>${allStoresSet.size}</b> stores`;\r\n\r\n      metaEl.innerHTML =\r\n        `<span class=\"stat\">${rowCountStr}</span>` +\r\n        `<span class=\"stat\">${storeCountStr}</span>` +\r\n        (minPrice != null ? `<span class=\"stat\">min <b>₹${minPrice}</b></span>` : '') +\r\n        `<span class=\"stat\">${new Date().toLocaleTimeString()}</span>`;\r\n    }\r\n\r\n    function fillStoreOptions() {\r\n      const storeMap = new Map();\r\n      allRows.forEach(r => {\r\n        const id = r.store_id || r.store_locality;\r\n        if (!storeMap.has(id)) {\r\n          storeMap.set(id, {\r\n            id: id,\r\n            locality: r.store_locality,\r\n            count: 0\r\n          });\r\n        }\r\n        storeMap.get(id).count++;\r\n      });\r\n\r\n      const stores = [...storeMap.values()].sort((a, b) => a.locality.localeCompare(b.locality));\r\n      storeSel.innerHTML = '<option value=\"\">All stores (' + stores.length + ')</option>';\r\n      stores.forEach(s => {\r\n        const opt = document.createElement('option');\r\n        opt.value = s.id;\r\n        opt.textContent = `${s.locality} (${s.count})`;\r\n        storeSel.appendChild(opt);\r\n      });\r\n    }\r\n\r\n    function fillBrandOptions() {\r\n      const brandCount = new Map();\r\n      allRows.forEach(r => {\r\n        if (r.brand) brandCount.set(r.brand, (brandCount.get(r.brand) || 0) + 1);\r\n      });\r\n      const brands = [...brandCount.keys()].sort((a, b) => a.localeCompare(b));\r\n      brandSel.innerHTML = '<option value=\"\">All brands (' + brands.length + ')</option>';\r\n      brands.forEach(b => {\r\n        const opt = document.createElement('option');\r\n        opt.value = b;\r\n        opt.textContent = `${b} (${brandCount.get(b)})`;\r\n        brandSel.appendChild(opt);\r\n      });\r\n    }\r\n\r\n    function fillCategoryOptions() {\r\n      const catCount = new Map();\r\n      allRows.forEach(r => {\r\n        if (r.category) catCount.set(r.category, (catCount.get(r.category) || 0) + 1);\r\n      });\r\n      const cats = [...catCount.keys()].sort((a, b) => a.localeCompare(b));\r\n      catSel.innerHTML = '<option value=\"\">All categories (' + cats.length + ')</option>';\r\n      cats.forEach(c => {\r\n        const opt = document.createElement('option');\r\n        opt.value = c;\r\n        opt.textContent = `${c} (${catCount.get(c)})`;\r\n        catSel.appendChild(opt);\r\n      });\r\n    }\r\n\r\n    function exportCSV() {\r\n      const rowsToExport = filteredRows.length ? filteredRows : allRows;\r\n      if (!rowsToExport.length) return alert('No data to download.');\r\n\r\n      if (isHealthMode) {\r\n        const headers = ['#', 'Store_Locality', 'Store_ID', 'Status', 'Delivery_ETA', 'Status_Message', 'Store_Address', 'Store_Pincode', 'Google_Maps_URL'];\r\n        const rows = rowsToExport.map((r, i) => [\r\n          i + 1,\r\n          `\"${(r.store_locality || '').replace(/\"/g, '\"\"')}\"`,\r\n          `\"${r.store_id || ''}\"`,\r\n          `\"${r.status || ''}\"`,\r\n          `\"${r.eta || ''}\"`,\r\n          `\"${(r.message || '').replace(/\"/g, '\"\"')}\"`,\r\n          `\"${(r.store_address || '').replace(/\"/g, '\"\"')}\"`,\r\n          `\"${r.store_pincode || ''}\"`,\r\n          `\"${r.maps_url || ''}\"`\r\n        ]);\r\n        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');\r\n        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\r\n        const a = document.createElement('a');\r\n        a.href = URL.createObjectURL(blob);\r\n        a.download = `swiggy_store_health_${Date.now()}.csv`;\r\n        document.body.appendChild(a);\r\n        a.click();\r\n        a.remove();\r\n        return;\r\n      }\r\n\r\n      const headers = ['#', 'Store_Locality', 'Store_ID', 'Store_Status', 'Delivery_ETA', 'Store_Address', 'Store_Pincode', 'Brand', 'Product_Title', 'Quantity', 'Selling_Price_INR', 'MRP_INR', 'Discount_Pct', 'Stock', 'Category', 'Sub_Category', 'Google_Maps_URL', 'Product_URL'];\r\n      const rows = rowsToExport.map((r, i) => [\r\n        i + 1,\r\n        `\"${(r.store_locality || '').replace(/\"/g, '\"\"')}\"`,\r\n        `\"${r.store_id || ''}\"`,\r\n        `\"${r.store_status || 'Live & Active'}\"`,\r\n        `\"${r.delivery_eta || '-'}\"`,\r\n        `\"${(r.store_address || '').replace(/\"/g, '\"\"')}\"`,\r\n        `\"${r.store_pincode || ''}\"`,\r\n        `\"${(r.brand || '').replace(/\"/g, '\"\"')}\"`,\r\n        `\"${(r.name || '').replace(/\"/g, '\"\"')}\"`,\r\n        `\"${(r.quantity || '').replace(/\"/g, '\"\"')}\"`,\r\n        r.selling_price_inr ?? '',\r\n        r.mrp_inr ?? '',\r\n        r.discount_pct || 0,\r\n        `\"${r.stock || ''}\"`,\r\n        `\"${(r.category || '').replace(/\"/g, '\"\"')}\"`,\r\n        `\"${(r.sub_category || '').replace(/\"/g, '\"\"')}\"`,\r\n        `\"${r.maps_url || ''}\"`,\r\n        `\"${r.product_url || ''}\"`\r\n      ]);\r\n      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');\r\n      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\r\n      const a = document.createElement('a');\r\n      a.href = URL.createObjectURL(blob);\r\n      a.download = `swiggy_instamart_${currentQuery || 'results'}_${Date.now()}.csv`;\r\n      document.body.appendChild(a);\r\n      a.click();\r\n      a.remove();\r\n    }\r\n\r\n    function initData(items, query) {\r\n      currentQuery = query || '';\r\n      isHealthMode = (query === 'Store Health Audit') || (items && items.length > 0 && isHealthRow(items[0]));\r\n\r\n      if (document.getElementById('queryLabel')) {\r\n        document.getElementById('queryLabel').textContent = currentQuery ? currentQuery : (isHealthMode ? 'Store Health Audit' : 'Instamart Hunter');\r\n      }\r\n      allRows = (items || []).map(normalizeRow);\r\n\r\n      if (isHealthMode) {\r\n        brandSel.style.display = 'none';\r\n        catSel.style.display = 'none';\r\n        variationBtn.style.display = 'none';\r\n        stockSel.innerHTML = '<option value=\"\">All Statuses</option><option value=\"Live & Active\">🟢 Live & Active</option><option value=\"Temporarily Closed\">🟡 Temporarily Closed</option><option value=\"Coming Soon\">🔴 Coming Soon</option><option value=\"Unserviceable\">⚪ Unserviceable</option>';\r\n        sortSel.innerHTML = '<option value=\"store-asc\">📍 Locality: A to Z</option><option value=\"status-asc\">🟢 Status</option><option value=\"eta-asc\">⏱ Delivery ETA</option>';\r\n        filterEl.placeholder = 'Search locality, address, pincode, status...';\r\n      }\r\n\r\n      updateMetaRibbon();\r\n      fillStoreOptions();\r\n      if (!isHealthMode) {\r\n        fillBrandOptions();\r\n        fillCategoryOptions();\r\n        computeVariationKeys();\r\n      }\r\n      applyFilter();\r\n    }\r\n\r\n    // Debounced text filter\r\n    let filterDebounce = null;\r\n    filterEl.addEventListener('input', () => {\r\n      clearTimeout(filterDebounce);\r\n      filterDebounce = setTimeout(applyFilter, 120);\r\n    });\r\n\r\n    storeSel.addEventListener('change', applyFilter);\r\n    brandSel.addEventListener('change', applyFilter);\r\n    catSel.addEventListener('change', applyFilter);\r\n    stockSel.addEventListener('change', applyFilter);\r\n    sortSel.addEventListener('change', () => {\r\n      const v = sortSel.value;\r\n      if (v === 'price-asc') { sortCol = 'selling_price_inr'; sortDir = 1; }\r\n      else if (v === 'price-desc') { sortCol = 'selling_price_inr'; sortDir = -1; }\r\n      else if (v === 'discount-desc') { sortCol = 'discount_pct'; sortDir = -1; }\r\n      else if (v === 'brand-asc') { sortCol = 'brand'; sortDir = 1; }\r\n      else if (v === 'title-asc') { sortCol = 'name'; sortDir = 1; }\r\n      else if (v === 'store-asc') { sortCol = 'store_locality'; sortDir = 1; }\r\n      else if (v === 'status-asc') { sortCol = 'status'; sortDir = 1; }\r\n      else if (v === 'eta-asc') { sortCol = 'eta'; sortDir = 1; }\r\n      applyFilter();\r\n    });\r\n\r\n    variationBtn.addEventListener('click', () => {\r\n      onlyVariation = !onlyVariation;\r\n      variationBtn.classList.toggle('active', onlyVariation);\r\n      applyFilter();\r\n    });\r\n\r\n    document.getElementById('download').addEventListener('click', exportCSV);\r\n\r\n    /* __DATA_INJECTION__ */\r\n\r\n    // Fallback: window.opener\r\n    try {\r\n      if (!allRows.length && window.opener && window.opener.swiggyResults && window.opener.swiggyResults.length) {\r\n        const q = window.opener.document?.getElementById('sw-h-query')?.value?.trim() || '';\r\n        initData(window.opener.swiggyResults, q);\r\n      }\r\n    } catch(e) {}\r\n\r\n    // Fallback: URL hash\r\n    try {\r\n      if (!allRows.length && location.hash && location.hash.length > 2) {\r\n        const raw = decodeURIComponent(location.hash.slice(1));\r\n        const parsed = JSON.parse(raw);\r\n        if (Array.isArray(parsed)) initData(parsed, '');\r\n        else if (parsed.items) initData(parsed.items, parsed.query || '');\r\n      }\r\n    } catch(e) {}\r\n  </script>\r\n</body>\r\n</html>\r\n";

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
        `"${(r.store_locality || '').replace(/"/g, '""')}"`,
        `"${r.store_id || ''}"`,
        `"${r.status || ''}"`,
        `"${r.eta || ''}"`,
        `"${(r.message || '').replace(/"/g, '""')}"`,
        `"${(r.store_address || '').replace(/"/g, '""')}"`,
        `"${r.store_pincode || ''}"`,
        `"${r.maps_url || ''}"`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `swiggy_store_health_audit_${Date.now()}.csv`;
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
      `"${(r.store_locality || '').replace(/"/g, '""')}"`,
      `"${r.store_id || ''}"`,
      `"${r.store_status || 'Live & Active'}"`,
      `"${r.delivery_eta || '-'}"`,
      `"${(r.store_address || '').replace(/"/g, '""')}"`,
      `"${r.store_pincode || ''}"`,
      `"${(r.brand || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.quantity || '').replace(/"/g, '""')}"`,
      r.selling_price_inr ?? '',
      r.mrp_inr ?? '',
      r.discount_pct || 0,
      `"${r.stock || ''}"`,
      `"${(r.category || '').replace(/"/g, '""')}"`,
      `"${(r.sub_category || '').replace(/"/g, '""')}"`,
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

  // Expose checkStoreStatusViaApi for Map Store Finder & Child Windows
  window.checkStoreStatusViaApi = checkStoreStatusViaApi;

  // Listen for Store Discovery queries from Map Window
  window.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'SWIGGY_DISCOVER_POD') {
      const { lat, lng, address, reqId } = event.data;
      try {
        const res = await checkStoreStatusViaApi([null, address || `${lat}, ${lng}`, lat, lng, '', '']);
        if (event.source) {
          event.source.postMessage({ type: 'SWIGGY_DISCOVER_POD_RES', reqId, data: res }, '*');
        }
      } catch (err) {
        if (event.source) {
          event.source.postMessage({ type: 'SWIGGY_DISCOVER_POD_RES', reqId, data: { status: 'Unserviceable', status_type: 'unserviceable', message: err.message } }, '*');
        }
      }
    }
  });

})();
