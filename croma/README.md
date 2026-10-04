# ⚡ Croma Mumbai Hunter — Bookmarklet & Pincode Scanner

Check one product by SKU or Croma product URL across **86+ Mumbai & MMR Pincodes** directly on [Croma.com](https://www.croma.com), with live store fulfillment, carrier details, and delivery ETAs.

---

## ✨ Key Highlights & Redesigned UI

- **🎨 Apple / Linear Glassmorphism HUD:** Deep translucent dark mode with `backdrop-filter: blur(20px)`, ambient neon glow, and `'Plus Jakarta Sans'` + `'JetBrains Mono'` typography.
- **⚡ Live 3-Column Metrics Dashboard:** Real-time counters for *Scanned*, *In-Stock Hubs*, and *Unavailable* with animated progress bar.
- **🖼️ Hero Product Showcase:** Clean thumbnail preview, title, price, SKU badge, and delivery SLA selector.
- **🟢 Pulsating Status Badges:** Live green status indicators for in-stock stores and human-readable delivery ETAs (e.g. `Oct 5, 1:00 PM (Express)`).
- **🍞 Non-Intrusive Toast Notifications:** Elegant floating toast banners instead of intrusive browser alerts.
- **🔎 Single-Product Scan:** Enter one 5–7 digit SKU or paste a Croma product URL. On a Croma product page, the SKU is detected automatically.
- **📊 Complete Product Details on Export:** Exports CSV and clipboard reports with SKU, name, price, product URL, delivery mode, pincode, area, zone, store, carrier, and ETA.
- **📍 86+ Mumbai & MMR Pincodes:** Comprehensive coverage across South Mumbai, Western Suburbs, Central & Eastern Suburbs, Thane, and Navi Mumbai.

---

## 🚀 How to Use the Bookmarklet

### Method 1: Bookmarklet (Fetch Loader — Just like Minutes Hunter)

Create a browser bookmark with the URL below. It follows the `main` branch and adds a cache-busting timestamp, so after the bookmark is installed once, updates pushed to `main` load through the same bookmark:

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/asad0406/asad0406.github.io@main/croma/croma-mumbai-hunter.min.js?t='+Date.now();s.onerror=function(){alert('Failed to load Croma Hunter script.');};document.body.appendChild(s);})();
```

### Method 2: Instant DevTools Console Execution (Zero Setup)

1. Open [https://www.croma.com](https://www.croma.com).
2. Press `F12` (or Right-Click -> **Inspect**) and navigate to the **Console** tab.
3. Open [`bookmarklet/croma-mumbai-hunter.js`](file:///C:/Users/Om%20Computers/Pictures/croma/bookmarklet/croma-mumbai-hunter.js), copy all its contents, paste into the console, and hit `Enter`.
4. The **Croma Mumbai Hunter** HUD will instantly appear on your screen ready for your search!

---

## 🐍 Terminal / Python CLI Tool

If you prefer to run scans directly from the command line without opening a browser:

```bash
# 1. Search by product query across all Mumbai pincodes (Store Express Delivery)
python search_mumbai_pincodes.py --query "iphone 16" --type SDEL

# 2. Search by SKU code
python search_mumbai_pincodes.py --sku 300684 --type SDEL

# 3. Check warehouse delivery (HDEL)
python search_mumbai_pincodes.py --sku 300684 --type HDEL
```

Results are printed live to the terminal with progress indicators and automatically exported to `croma_mumbai_stock_<SKU>.json`.
