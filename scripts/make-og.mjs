/**
 * Builds everything derived from a project's cover.
 *
 * 1. The share card, 1200x630. The cover is hung on the gallery ground and
 *    contained rather than cropped: cropping a portrait board to a 1.91:1 slot
 *    shows a sliver of a drawing and nothing else.
 * 2. The index thumb, 640x640. `/work` shows each project as a circle about
 *    240px across, and `next.config.ts` sets `images.unoptimized`, so without
 *    these the page would pull down every full-size cover, several hundred KB
 *    each, to draw them the size of a coin.
 *
 * Also the site card, from the drawing the home page opens on, and the Apple
 * touch icon rasterised from `app/icon.svg`.
 *
 * Run `npm run og` after adding work to `content/projects.ts`. Files already on
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

/**
 * A square crop for the circular index.
 *
 * Centre by default, and a project can name a different region with
 * `thumbFocus`. Sharp's `attention` strategy was tried first and is wrong for
 * this archive: it chases contrast, so on a book page it locks onto the column
 * of body type and crops the drawing off. These pages put the artwork in
 * different places and no heuristic finds it, so the choice is made by eye and
 * written down.
 *
 * Note the axis: a square crop keeps the short side whole, so `left`/`right`
 * only bite on a landscape cover and `top`/`bottom` only on a portrait one.
 * The other axis is a no-op, which is why not every off-centre board has an
 * override: some of them cannot have one.
 */
async function thumb(srcRel, outAbs, focus) {
  if (!FORCE && (await exists(outAbs))) return false
  await sharp(path.join(ROOT, 'public', srcRel))
    .resize(640, 640, { fit: 'cover', position: focus ?? 'centre' })
    .jpeg({ quality: 80, chromaSubsampling: '4:2:0', mozjpeg: true })
    .toFile(outAbs)
  return true
}

await mkdir(path.join(ROOT, 'public', 'og'), { recursive: true })
await mkdir(path.join(ROOT, 'public', 'thumbs'), { recursive: true })

let made = 0
for (const p of projects) {
  if (await card(p.cover, path.join(ROOT, 'public', 'og', `${p.slug}.jpg`))) {
    made += 1
    console.log('og    ', p.slug)
  }
  if (await thumb(p.cover, path.join(ROOT, 'public', 'thumbs', `${p.slug}.jpg`), p.thumbFocus)) {
    made += 1
    console.log('thumb ', p.slug)
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
