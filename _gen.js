const sharp = require('sharp');
const size = 256;
const padding = 40;
const logoSize = size - padding * 2;
const radius = 48;

const bgSvg = Buffer.from(
  `<svg width="${size}" height="${size}">` +
  `<rect width="${size}" height="${size}" rx="${radius}" fill="#0A0A0A"/>` +
  `</svg>`
);

async function main() {
  const logo = await sharp('favicon-src.png')
    .resize(logoSize, logoSize, { fit: 'inside' })
    .toBuffer();

  await sharp(bgSvg)
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toFile('favicon.png');

  await sharp('favicon.png').resize(32, 32).png().toFile('favicon-32.png');
  await sharp('favicon.png').resize(180, 180).png().toFile('apple-touch-icon.png');

  console.log('Done');
}
main().catch(console.error);
