import circle from './circle.js'

const blackCircle = (x, y, r, ctx) => {
  ctx.save()
  ctx.fillStyle = '#333'
  circle(x, y, r, ctx)
  ctx.fill()
  ctx.restore()
}

export default (x, y, r, offset, angle, ctx) => {
  const _r = r / 3
  ctx.save()
  ctx.strokeStyle = 'rgba(0,0,0,0.1)'
  circle(x, y, r, ctx)
  blackCircle(
    x + r * Math.cos(angle + offset),
    y + r * Math.sin(angle + offset),
    _r*0.7,
    ctx
  )
  ctx.restore()
}

