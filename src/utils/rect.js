export default (opts, ctx) => {
  const {x, y, w, h, c} = opts
  ctx.fillStyle = c
  ctx.fillRect(x, y, w, h)
}

