const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const resultsHtmlPath = path.join(repoRoot, 'flipkart-minutes', 'results.html');
const hunterJsPath = path.join(repoRoot, 'flipkart-minutes', 'minutes-hunter.js');
const hunterMinJsPath = path.join(repoRoot, 'flipkart-minutes', 'minutes-hunter.min.js');

const rawHtml = fs.readFileSync(resultsHtmlPath, 'utf8');
const js = fs.readFileSync(hunterJsPath, 'utf8');

let idxStart = js.indexOf('const TABLE_PAGE_HTML = ');
if (idxStart === -1) {
  idxStart = js.indexOf('  function openBlankResultsTable(items, query) {');
}
const markerEnd = "  document.getElementById('fk-h-page').onclick = () => {";
const idxEnd = js.indexOf(markerEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Could not find function markers in minutes-hunter.js', { idxStart, idxEnd });
  process.exit(1);
}

const tableHtmlJson = JSON.stringify(rawHtml);

const newFunction = [
  'const TABLE_PAGE_HTML = ' + tableHtmlJson + ';',
  '',
  '  function openBlankResultsTable(items, query) {',
  "    const win = window.open('', '_blank');",
  "    if (!win) return alert('Popup blocked! Please allow popups for flipkart.com to view results.');",
  '    window.fkResults = items;',
  "    const nonce = document.querySelector('script[nonce]')?.nonce || document.querySelector('script[nonce]')?.getAttribute('nonce') || '';",
  '    const nonceAttr = nonce ? ` nonce="${nonce}"` : \'\';',
  "    const safeData = JSON.stringify(items).replace(/<\\/script/gi, '<\\\\/script');",
  "    const safeQuery = JSON.stringify(query || '');",
  '    const injection = `DATA = ${safeData};\\n    currentQuery = ${safeQuery};\\n    initData(DATA, currentQuery);`;',
  '    let html = TABLE_PAGE_HTML',
  "      .replace('<style id=\"app-style\">', `<style id=\"app-style\"${nonceAttr}>`)",
  "      .replace('<script id=\"app-script\">', `<script id=\"app-script\"${nonceAttr}>`)",
  "      .replace('/* __DATA_INJECTION__ */', injection);",
  '    win.document.open();',
  '    win.document.write(html);',
  '    win.document.close();',
  '  }',
  '',
  '  '
].join('\n');

const updatedJs = js.slice(0, idxStart) + newFunction + js.slice(idxEnd);
fs.writeFileSync(hunterJsPath, updatedJs, 'utf8');
fs.writeFileSync(hunterMinJsPath, updatedJs, 'utf8');

console.log('Build completed! Total file size:', updatedJs.length);
