# ⚡ Croma Mumbai Hunter — Bookmarklet & Pincode Scanner

Check one product by SKU or Croma product URL across **all 316 Mumbai & MMR pincodes** directly on [Croma.com](https://www.croma.com), with live store fulfillment, carrier details, and delivery ETAs.

---

## ✨ Key Highlights

- **🎨 Apple / Linear Glassmorphism HUD:** Deep translucent dark mode with `backdrop-filter: blur(20px)`, ambient neon glow, and `'Plus Jakarta Sans'` + `'JetBrains Mono'` typography.
- **⚡ Live 3-Column Metrics Dashboard:** Real-time counters for *Scanned*, *In-Stock Hubs*, and *Unavailable* with animated progress bar.
- **🖼️ Hero Product Showcase:** Thumbnail preview, title, price, SKU badge, and delivery SLA selector.
- **🟢 Dual-Mode Fulfilment:** Every pincode is checked for **both** Store Express (`SDEL`) and Warehouse Dispatch (`HDEL`) in a *single* request — an item with no store stock usually still ships by warehouse, so checking one mode alone under-reports availability.
- **🕒 ETAs pinned to IST:** Croma returns `HDEL` dates in UTC and `SDEL` dates in IST. All times are rendered in `Asia/Kolkata`, matching croma.com — e.g. `Oct 9, 1:13 PM IST (BlueDart - 7 Day Frieght)`.
- **🛡️ Throttle-safe:** Paced at 350 ms between requests, with retry and exponential backoff on `403` / `429` / `5xx`. A throttle widens the gap instead of killing the scan.
- **🔎 Exact-SKU Scan:** Enter a 5–7 digit SKU or paste a Croma product URL. On a Croma product page the SKU is detected automatically. Unknown SKUs are reported rather than silently substituted.
- **📊 Full CSV / clipboard export:** SKU, name, price, URL, pincode, area, zone, both modes' node + carrier + ETA, and scan timestamp.
- **📍 316 pincodes across 7 zones:** South Mumbai, Western Suburbs, Central & Eastern, Thane & Navi Mumbai, Thane & Palghar, Navi Mumbai & Raigad, Kalyan & Ambernath.

---

## 🚀 How to Use

### Method 1: Bookmarklet (CDN loader)

Create a browser bookmark with this URL. It loads the scanner with a cache-busting timestamp:

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/asad0406/asad0406.github.io@v2.1.3/croma/croma-mumbai-hunter.min.js?t='+Date.now();document.body.appendChild(s);})();
```

> ⚠️ This pins tag `v2.1.3` of the **published** `asad0406.github.io` repo. Edits to the
> local copy in this folder do **not** reach the bookmarklet until they are copied to
> `asad0406.github.io/croma/` and a new tag is pushed. Bump the tag in the URL after
> publishing, or jsDelivr will keep serving the old build from cache.

### Method 2: DevTools console (zero setup)

1. Open [https://www.croma.com](https://www.croma.com).
2. Press `F12` → **Console** tab.
3. Copy all of [`croma-mumbai-hunter.js`](./croma-mumbai-hunter.js), paste, press `Enter`.
4. The HUD appears, ready to scan.

A full 316-pincode scan runs sequentially at 350 ms per request — roughly **2 minutes**.

---

## 🐍 Terminal / Python CLI

The equivalent CLI lives in the parent folder as [`find_croma_stock.py`](../find_croma_stock.py):

```bash
# Default scope is MMR (316 pincodes), both SDEL and HDEL
python find_croma_stock.py 324530
python find_croma_stock.py "https://www.croma.com/apple-iphone-17-256gb-black-/p/324530"

# Narrower scopes / dry run
python find_croma_stock.py 324530 --region mumbai
python find_croma_stock.py 324530 --limit 10
python find_croma_stock.py --list-pincodes
```

Every run appends one row to `croma_stock_results.csv` in the parent folder. See the
[main README](../README.md) for the full flag list and the API reference.

---

## Keeping the two in sync

The bookmarklet and the Python CLI hit the same endpoints and should agree. Shared behaviour:

| Behaviour | Both implement |
| :--- | :--- |
| Fulfilment modes | `SDEL` + `HDEL` as two promise lines in one POST |
| Pincode source | MMR prefixes `400`, `401`, `410`, `421` |
| ETA timezone | Normalised to IST |
| SKU resolution | Exact match only — never fall back to the top search hit |
| Throttling | 350 ms gap, backoff on throttle, gap never narrows mid-run |
| Unfulfillable lines | A promise line with no `assignments` is not counted as available |

The JS pincode array is generated from `../pincodes_mh.csv`, preserving the 86 originally
curated area/zone labels. `croma-mumbai-hunter.min.js` is currently a byte-identical copy
of the unminified file, not an actually minified build.
