import polygon from '../utils/polygon.js'
import oscillator from '../utils/oscillator.js'

export default (ctx) => {
  const domTarget = document.getElementById('wrapper')
  domTarget.innerHTML = ''
  let { amp, angle } = oscillator(1, 0.0)
  return () => {
    polygon(250, (amp * 4)*Math.sin(angle) + 250, 80, 4, ctx)
    polygon(260, (amp * 5)*Math.sin(angle) + 250, 80, 5, ctx)
    polygon(270, (amp * 6)*Math.sin(angle) + 250, 80, 6, ctx)
    polygon(280, (amp * 7)*Math.sin(angle) + 250, 80, 7, ctx)
    angle += 0.05
  }
}

