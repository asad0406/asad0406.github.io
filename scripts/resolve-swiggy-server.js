const http = require('http');
const fs = require('fs');
const path = require('path');

const podsFile = 'C:\\Users\\Om Computers\\Pictures\\swiggy_new\\mumbai_pods_primary_addresses.json';
const outputFile = 'C:\\Users\\Om Computers\\Pictures\\swiggy_new\\mumbai_pods_with_live_swiggy_addresses.json';

const rawPods = JSON.parse(fs.readFileSync(podsFile, 'utf8'));
console.log(`Loaded ${rawPods.length} stores to resolve.`);

const stores = rawPods.map(p => ({
  podId: p.podId,
  locality: p.locality,
  seller: p.seller || '',
  primaryServingAddress: p.primaryServingAddress || '',
  landmark: p.landmark || '',
  lat: p.coordinates?.latitude || 0,
  lng: p.coordinates?.longitude || 0,
  mapsUrl: p.mapsUrl || `https://www.google.com/maps?q=${p.coordinates?.latitude},${p.coordinates?.longitude}`
}));

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/stores') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stores));
    return;
  }

  if (req.url === '/save-addresses' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const resolvedData = JSON.parse(body);
        fs.writeFileSync(outputFile, JSON.stringify(resolvedData, null, 2), 'utf8');
        console.log(`\n🎉 SUCCESS! Saved ${resolvedData.length} resolved stores to:`);
        console.log(outputFile);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: resolvedData.length }));
      } catch (e) {
        console.error('Error saving data:', e.message);
        res.writeHead(500);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(8099, () => {
  console.log('Address Resolver Server running on http://localhost:8099');
});
