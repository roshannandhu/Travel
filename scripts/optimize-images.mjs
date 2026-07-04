/**
 * Converts the raw destination PNGs (src/assets/destinations/raw) into
 * optimized WebP renditions used by the site:
 *   <slug>.webp        1920w  — hero backgrounds / package banner
 *   <slug>-card.webp    960w  — destinations grid
 *   <slug>-thumb.webp   480w  — hero card rail / instagram tiles
 * Run: npm run optimize-images
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const RAW = 'src/assets/destinations/raw';
const OUT = 'src/assets/destinations';

const sizes = [
  { suffix: '', width: 1920, quality: 78 },
  { suffix: '-card', width: 960, quality: 75 },
  { suffix: '-thumb', width: 480, quality: 70 },
];

await mkdir(OUT, { recursive: true });
const files = (await readdir(RAW)).filter((f) => f.toLowerCase().endsWith('.png'));

for (const file of files) {
  const slug = path.basename(file, path.extname(file));
  for (const { suffix, width, quality } of sizes) {
    const dest = path.join(OUT, `${slug}${suffix}.webp`);
    await sharp(path.join(RAW, file)).resize({ width }).webp({ quality }).toFile(dest);
  }
  console.log(`optimized ${slug}`);
}
console.log(`done — ${files.length} images × ${sizes.length} sizes`);
