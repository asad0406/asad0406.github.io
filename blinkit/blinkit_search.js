/**
 * Blinkit: change lat/lng, then search and extract products.
 * Run in the browser console while on https://blinkit.com (same-origin, so
 * cookies and CORS just work).
 *
 *   await blinkitSearch({ lat: 19.2340372, lng: 72.8399487, query: "milk" })
 *   await blinkitSearch({ lat: 28.6139, lng: 77.2090, query: "eggs", persist: true })
 *
 * persist:false (default) only sends lat/lon headers for these calls and does
 * not touch your saved address. persist:true also writes the gr_1_lat /
 * gr_1_lon cookies the site reads, so the page itself switches location on
 * the next reload.
 */
(() => {
  const getCookie = (k) =>
    (document.cookie.split("; ").find((c) => c.startsWith(k + "=")) || "").split("=")[1];

  const setCookie = (k, v) => {
    document.cookie = `${k}=${encodeURIComponent(v)}; path=/; max-age=31536000; domain=.blinkit.com`;
    if (getCookie(k) !== encodeURIComponent(v)) {
      document.cookie = `${k}=${encodeURIComponent(v)}; path=/; max-age=31536000`;
    }
  };

  const headersFor = (lat, lng) => ({
    "Content-Type": "application/json",
    lat: String(lat),
    lon: String(lng),
    app_client: "consumer_web",
  });

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
      image: d?.image?.url ?? null,
    };
  };

  async function searchPage(query, offset, pageSize, hdrs) {
    const p = new URLSearchParams({
      offset, limit: pageSize, q: query, actual_query: query,
      search_type: "type_to_search", search_method: "basic",
      page_index: offset / pageSize, tab_position: 0,
    });
    if (offset) {
      p.set("last_snippet_type", "product_card_snippet_type_2");
      p.set("last_widget_type", "listing_container");
    }
    const r = await fetch(`/v1/layout/search?${p}`, {
      method: "POST", credentials: "include", headers: hdrs, body: "{}",
    });
    if (!r.ok) throw new Error(`search failed: HTTP ${r.status}`);
    const j = await r.json();
    return (j.response?.snippets || [])
      .filter((s) => s.widget_type === "product_card_snippet_type_2")
      .map((s) => parseProduct(s.data));
  }

  window.blinkitSearch = async function ({
    lat, lng, query, maxItems = 60, pageSize = 12, persist = false,
  }) {
    if (lat == null || lng == null || !query) {
      throw new Error("lat, lng and query are required");
    }
    if (persist) {
      setCookie("gr_1_lat", lat);
      setCookie("gr_1_lon", lng);
    }
    const hdrs = headersFor(lat, lng);
    const seen = new Set();
    const products = [];
    for (let offset = 0; offset < maxItems; offset += pageSize) {
      const batch = await searchPage(query, offset, pageSize, hdrs);
      if (!batch.length) break;
      let added = 0;
      for (const p of batch) {
        if (!seen.has(p.product_id)) { seen.add(p.product_id); products.push(p); added++; }
      }
      if (!added) break; // results repeating -> real matches exhausted
    }
    console.log(`lat=${lat} lng=${lng} "${query}": ${products.length} products`);
    console.table(products.map(({ image, ...rest }) => rest));
    return products;
  };

  window.blinkitDownload = (products, name = "blinkit_products.json") => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(products, null, 2)], { type: "application/json" }));
    a.download = name;
    a.click();
  };

  console.log("Ready: await blinkitSearch({lat, lng, query}) ; blinkitDownload(result)");
})();
