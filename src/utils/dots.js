import oscillator from './oscillator.js'

export const dot = (opts, ctx) => {
  const { x, y } = opts
  ctx.strokeStyle = '#111'
  ctx.fillStyle = '#111'
  ctx.beginPath()
  ctx.arc(x, y, 5, 0, 2*Math.PI)
  ctx.stroke()
  ctx.fill()
}
const reverseDist = (n, range) => {
  const half = Math.floor(range/2)
  if(n === half){
    return 0
  }
  if(n > half) {
    return n - range
  }else{
    return range - n
  }
}

export default (ctx) => {
  const getIndex = (el, i) => i
  const spine = [...Array(10)].map(getIndex)
  let { amp, angle } = oscillator(1, 0.01)
  //const right = [...Array(Math.floor(spine.length/2))].map(getIndex)
  //let { amp: amp2, angle: angle2 } = oscillator(3, 0.04)
  return () => {
    spine.map((index) => {
      const rDist = reverseDist(index, spine.length)
      dot({
        x: 250,
        y: (200 + index*20) + (amp+rDist*Math.sin(angle+index))
      }, ctx)
    })
    /*right.map(index => {
      dot({
        x: 280 + (amp2*Math.cos(angle2 * .5)),
        y: 240 + index*20 + (amp*Math.sin(angle))
      }, ctx)
    })*/
    // angle2+= 0.09
    angle+= 0.04
  }
}

