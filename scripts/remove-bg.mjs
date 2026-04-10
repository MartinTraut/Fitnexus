/**
 * Remove dark background from FITNEXUS logo PNG
 * Creates a version with true alpha transparency
 */
import { createCanvas, loadImage } from '@napi-rs/canvas'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const INPUT = resolve('public/logo.png')
const OUTPUT = resolve('public/logo-clean.png')

async function removeBg() {
  const img = await loadImage(INPUT)
  const w = img.width
  const h = img.height
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, w, h)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Calculate brightness/luminance
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114)

    // Check if pixel is "dark background" - low brightness and low saturation
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const saturation = max === 0 ? 0 : (max - min) / max

    // Very aggressive: nuke everything that's dark/desaturated
    if (brightness < 100 && saturation < 0.5) {
      data[i + 3] = 0
    } else if (brightness < 130 && saturation < 0.45) {
      const alpha = Math.round(((brightness - 80) / 50) * 255)
      data[i + 3] = Math.max(0, Math.min(255, alpha))
    }
  }

  ctx.putImageData(imageData, 0, 0)
  const buffer = canvas.toBuffer('image/png')
  writeFileSync(OUTPUT, buffer)
  console.log(`✓ Saved transparent logo to ${OUTPUT} (${buffer.length} bytes)`)
}

removeBg().catch(console.error)
