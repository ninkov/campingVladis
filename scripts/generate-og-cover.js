const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const root = path.resolve(__dirname, '..');
  const inputPath = path.join(root, 'img', 'wall.jpeg');
  const outDir = path.join(root, 'public');
  const outPath = path.join(outDir, 'og-cover.png');

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const overlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.68"/>
          <stop offset="52%" stop-color="#000000" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.58"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#shade)"/>
      <text x="72" y="368" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="700">Camping Vladis</text>
      <text x="76" y="438" fill="#f8d9b0" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="600">Паркинг за каравани и кемпери в Ахелой</text>
      <text x="78" y="508" fill="#ffffff" fill-opacity="0.9" font-family="Arial, Helvetica, sans-serif" font-size="28">Спокойствие, природа и удобна база край морето</text>
    </svg>
  `);

  await sharp(inputPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png({ quality: 90 })
    .toFile(outPath);

  console.log('Wrote', outPath);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
