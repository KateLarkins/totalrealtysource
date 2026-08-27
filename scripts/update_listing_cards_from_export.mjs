import fs from 'node:fs';

const [csvPath = '/Users/katharinelarkins/Downloads/textexport-6.csv', htmlPath = 'forsale.html'] = process.argv.slice(2);

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift();
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ''])));
}

const legacyModalMls = {
  wakefieldModal: '2600665', '16860Modal': '2601110', '1555ShortRoadModal': '2602353',
  tickleStreetModal: '2601721', '620LambuthBoulevardModal': '2602326', miffModal: '2602869',
  '66BearTraceDriveModal': '2601705', turkeyModal: '2601789', '306WileyParkerRoadModal': '2602281',
  redfieldModal: '2601038', '74PowellModal': '2601468', '344AlamoHighwayModal': '2602736',
  rollingModal: '2601171', ncentralModal: '2506001', '79InnsdaleCoveModal': '2602132',
  '2324ChanningWayModal': '2602050', lotfiveModal: '2600728', '0ClaytonDriveModal': '2602344',
  '0CarriageHouseModal': '2602345', Lot70Modal: '2603120', Lot66Modal: '2603119',
  coopModal: '2505069', '1110Modal': '2602794', fedModal: '2602947'
};

// Keep intentionally chosen exterior lead photos when the MLS export's first
// photo is an interior shot. This affects cards, map previews, social pages,
// and modal lead images without discarding the rest of the MLS gallery.
const leadPhotoOverrides = {
  '2603840': 'https://cdn1.photos.sparkplatform.com/ctn/20260813174217292676000000-o.jpg'
};

const rows = parseCsv(fs.readFileSync(csvPath, 'latin1'));
const byMls = new Map(rows.map(row => [row['List Number'], row]));
let html = fs.readFileSync(htmlPath, 'utf8');
const starts = [...html.matchAll(/<div class="card"/g)].map(m => m.index);
if (!starts.length) throw new Error('No listing cards found; refusing to modify the page.');
const pieces = [];
let cursor = 0;

for (let i = 0; i < starts.length; i += 1) {
  const start = starts[i], end = starts[i + 1] ?? html.length;
  pieces.push(html.slice(cursor, start));
  let segment = html.slice(start, end);
  const modal = segment.match(/^<div class="card"[^>]*data-modal="([^"]+)"/)?.[1];
  const embedded = modal?.match(/^listing(\d+)Modal$/)?.[1];
  const mls = embedded || legacyModalMls[modal];
  const row = byMls.get(mls);
  if (row) {
    const fullPhoto = leadPhotoOverrides[mls] || row['Photo URL'].replace(/^http:/, 'https:').replace(/\.jpg$/i, '-o.jpg');
    const price = Number(row['List Price']);
    const displayPrice = row['Property Type'] === 'Rental' ? `$${price.toLocaleString('en-US')}/month` : `$${price.toLocaleString('en-US')}`;
    segment = segment.replace(/^<div class="card"([^>]*)>/, (all, attrs) => {
      attrs = attrs.replace(/\sdata-dom="[^"]*"/, '').replace(/\sdata-mls="[^"]*"/, '');
      return `<div class="card" data-mls="${mls}" data-dom="${row['Days on Market']}"${attrs}>`;
    });
    segment = segment.replace(/(<div class="card"[^>]*>[\s\S]*?<img\s+[^>]*src=")[^"]+/, `$1${fullPhoto}`);
    const modalPos = segment.indexOf(`id="${modal}"`);
    if (modalPos >= 0) {
      const before = segment.slice(0, modalPos), after = segment.slice(modalPos)
        .replace(/(class="slide"[^>]*src=")[^"]+/, (_, prefix) => `${prefix}${fullPhoto}`)
        .replace(/(<p[^>]*style="[^"]*font-size:\s*23px[^"]*"[^>]*>)\$[\d,]+(?:\/month)?(<\/p>)/, (_, open, close) => `${open}${displayPrice}${close}`);
      segment = before.replace(/(<p class="price">)[^<]+(<\/p>)/, (_, open, close) => `${open}${displayPrice}${close}`) + after;
    }
  }
  pieces.push(segment);
  cursor = end;
}
html = pieces.join('');
fs.writeFileSync(htmlPath, html);
const displayExclusions = new Set(['2603131']); // duplicate property record for 16860 Highland Drive
const activeMls = new Set(rows.filter(row => row.Status === 'A' && !displayExclusions.has(row['List Number'])).map(row => row['List Number']));
const siteMls = new Set([...html.matchAll(/<div class="card"[^>]*data-mls="(\d+)"/g)].map(match => match[1]));
const missingActive = [...activeMls].filter(mls => !siteMls.has(mls));
const noLongerActive = [...siteMls].filter(mls => !activeMls.has(mls));
console.log(`Updated ${starts.length} listing cards from ${rows.length} MLS rows.`);
console.log(`Active MLS records missing from the page: ${missingActive.join(', ') || 'none'}`);
console.log(`Displayed page records no longer active: ${noLongerActive.join(', ') || 'none'}`);
