export default (x, y, radius, sides, ctx) => {
  const angle = 360 / sides
  const range = count => Array.from(Array(count).keys())
  const degToRad = angleInDeg => (Math.PI * angleInDeg) / 180
  const vertices = range(sides).map(index => ({
    theta: degToRad(angle * index),
    r: radius,
  }))
  ctx.beginPath()
  ctx.save()
  ctx.translate(x, y)
  ctx.moveTo(radius, 0)
  vertices.map(point => {
    const {r, theta} = point
    ctx.lineTo(r * Math.cos(theta), r * Math.sin(theta))
  })
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

