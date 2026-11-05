import { CanvasTexture, SRGBColorSpace } from 'three'

function toTexture(canvas) {
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

export function createLabelTexture(text, background) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = background
  ctx.beginPath()
  ctx.roundRect(0, 0, canvas.width, canvas.height, 32)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const label = text.toUpperCase()
  let fontSize = 64
  do {
    ctx.font = `800 ${fontSize}px system-ui, sans-serif`
    fontSize -= 2
  } while (ctx.measureText(label).width > canvas.width - 64 && fontSize > 20)
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 4)
  return toTexture(canvas)
}

export function createSignTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.textBaseline = 'middle'
  ctx.shadowColor = '#38bdf8'
  ctx.shadowBlur = 24
  ctx.font = '900 120px system-ui, sans-serif'
  const techWidth = ctx.measureText('TECH').width
  const startX = (canvas.width - techWidth - ctx.measureText('STORE').width) / 2
  ctx.textAlign = 'left'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('TECH', startX, 105)
  ctx.fillStyle = '#38bdf8'
  ctx.fillText('STORE', startX + techWidth, 105)
  ctx.shadowBlur = 0
  ctx.textAlign = 'center'
  ctx.fillStyle = '#bae6fd'
  ctx.font = '600 34px system-ui, sans-serif'
  ctx.fillText('D I S P O S I T I V O S   E L E C T R Ó N I C O S', canvas.width / 2, 200)
  return toTexture(canvas)
}
