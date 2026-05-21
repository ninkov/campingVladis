const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

async function generate() {
  const root = path.resolve(__dirname, '..')
  const imgDir = path.join(root, 'img')
  const outDir = path.join(root, 'src', 'data')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const files = fs.readdirSync(imgDir).filter((f) => /\.(jpe?g|png)$/i.test(f))
  const result = {}
  for (const file of files) {
    try {
      const p = path.join(imgDir, file)
      const buf = await sharp(p).resize(24).blur(1).toBuffer()
      const ext = path.extname(file).toLowerCase().replace('.', '')
      const mime = ext === 'png' ? 'image/png' : 'image/jpeg'
      result[file] = `data:${mime};base64,${buf.toString('base64')}`
      console.log('Generated placeholder for', file)
    } catch (err) {
      console.error('Failed for', file, err.message)
    }
  }
  const outPath = path.join(outDir, 'placeholders.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8')
  console.log('Wrote', outPath)
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
