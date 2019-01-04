import circle from './circle.js'

export default (x, y, r, ctx) => {
  ctx.save()
  ctx.strokeStyle = 'red'
  circle(x, y, r, ctx)
  ctx.restore()
}

