/**
 * Builds the share cards.
 *
 * Every project's cover is hung on the gallery ground at 1200x630, contained
 * rather than cropped: cropping a portrait board to a 1.91:1 slot shows a sliver
 * of a drawing and nothing else. The site card is the drawing the home page
 * opens on, and the Apple touch icon is rasterised from `app/icon.svg`.
 *
 * Run `npm run og` after adding work to `content/projects.ts`. Cards already on
 * disk are left alone unless --force is passed.
 *
 * Node 24 strips the types out of the .ts import, so the archive is read from
 * the same module the site reads.
 */
import sharp from 'sharp'
import { access, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../content/projects.ts'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FORCE = process.argv.includes('--force')

const W = 1200
const H = 630
const PAD = 44
const GROUND = { r: 250, g: 250, b: 250 } // --color-ground, oklch(0.985 0 0)

const exists = (p) => access(p).then(() => true, () => false)

async function card(srcRel, outAbs) {
  if (!FORCE && (await exists(outAbs))) return false

  const art = await sharp(path.join(ROOT, 'public', srcRel))
    .resize({ width: W - PAD * 2, height: H - PAD * 2, fit: 'inside', withoutEnlargement: true })
    .toBuffer()
  const { width, height } = await sharp(art).metadata()

  await sharp({ create: { width: W, height: H, channels: 3, background: GROUND } })
    .composite([{ input: art, left: Math.round((W - width) / 2), top: Math.round((H - height) / 2) }])
    .jpeg({ quality: 82, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(outAbs)
  return true
}

await mkdir(path.join(ROOT, 'public', 'og'), { recursive: true })

let made = 0
for (const p of projects) {
  if (await card(p.cover, path.join(ROOT, 'public', 'og', `${p.slug}.jpg`))) {
    made += 1
    console.log('og    ', p.slug)
  }
}

if (await card('/images/healing-garden/concept-sketch.jpg', path.join(ROOT, 'app', 'opengraph-image.jpg'))) {
  made += 1
  console.log('og     (site)')
}

// Apple wants a raster, and applies its own rounding, so the field runs full bleed.
const appleIcon = path.join(ROOT, 'app', 'apple-icon.png')
if (FORCE || !(await exists(appleIcon))) {
  await sharp(await readFile(path.join(ROOT, 'app', 'icon.svg')), { density: 720 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(appleIcon)
  made += 1
  console.log('       apple-icon.png')
}

console.log(made ? `\n${made} written.` : 'Everything is up to date.')
