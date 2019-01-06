import oscillator from './utils/oscillator.js'
import normalDist from './utils/normalDist.js'

export default (mult, range) => {
  let {amp, angle} = oscillator(1, 0)
  const arr = n => [...Array(n).keys()]
  const all = arr(6).map(() => arr(20))
  range *= mult === 1 ? mult : mult / 2
  const frames = arr(range)
  const calculatedFrames = frames.map(() => {
    const _singleCalc = all.map((_squares, i) => {
      return _squares.map(square => {
        if (i === 0) {
          const c = (amp + 12) * Math.sin(angle + square * 3)
          return parseFloat(c.toFixed(2))
        }
        if (i === 1) {
          const _ = normalDist(square, 20)
          const c = amp * _ * 2 * Math.sin(angle + square * 3)
          return parseFloat(c.toFixed(2))
        }
        if (i === 2) {
          const _ = normalDist(square, 20)
          const c = amp * _ * Math.sin(angle + _)
          return parseFloat(c.toFixed(2))
        }
        if (i === 3) {
          const _ = normalDist(square, 20)
          const c = amp * _ * Math.sin(angle + square + 0.3)
          return parseFloat(c.toFixed(2))
        }
        if (i === 4) {
          const c = (amp + square / 2) * Math.sin(angle + square)
          return parseFloat(c.toFixed(2))
        }
        if (i === 5) {
          const c = amp * 10 * Math.sin(angle + square)
          return parseFloat(c.toFixed(2))
        }
        return square
      })
    })
    angle += 0.08 * mult
    return _singleCalc
  })
  return calculatedFrames
}
