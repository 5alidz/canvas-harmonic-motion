import squares from '../utils/squares.js'
import normalDist from '../utils/normalDist.js'
import oscillator from '../utils/oscillator.js'
import el from '../utils/createElement.js'

export default ctx => {
  const domTarget = document.getElementById('wrapper')
  domTarget.innerHTML = ''

  const speedButton = el('button', {'class': 'btn normal-btn normal'}, '2X SPEED')
  const resetButton = el('button', {'class': 'btn normal-btn normal'}, 'RESET')
  const wrapper = el('div', {}, speedButton, resetButton)
  const msg = el('div', {}, 'pre-calculating...')
  // setup
  const initial = {
    count: 20,
    x: -100,
    y: -140,
    w: 10,
    h: 10,
    c: 'rgb(250, 30, 50)',
  }
  const {y} = initial
  const conf2 = {...initial, y: y + 50, c: 'rgb(250,30,80)'}
  const conf3 = {...initial, y: y + 100, c: 'rgb(250,30,100)'}
  const conf4 = {...initial, y: y + 150, c: 'rgb(200,30,100)'}
  const conf5 = {...initial, y: y + 200, c: 'rgb(100,30,200)'}
  const conf6 = {...initial, y: y + 250, c: 'rgb(100,30,250)'}
  let range = 80
  let _index = 0
  const preCalculate = (mult) => {
    let {amp, angle} = oscillator(1, 0)
    const arr = n => [...Array(n).keys()]
    const all = arr(6).map(_ => arr(20))
    range *= mult === 1 ? mult : mult / 2
    const frames = arr(range)
    const calculatedFrames = frames.map(frame => {
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
          if(i === 5) {
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
  let initialMult = 1
  let pre = preCalculate(initialMult)

  resetButton.onclick = () => {
    pre = preCalculate(initialMult = 1)
  }
  speedButton.onclick = () => {
    pre = preCalculate(initialMult+=1)
  }
  domTarget.appendChild(wrapper)
  // side-effect
  return () => {
    ctx.save()
    ctx.translate(Math.floor(window.innerWidth / 2), 250)
    squares(initial, index => pre[_index][0][index], ctx)
    squares(conf2, index => pre[_index][1][index], ctx)
    squares(conf3, index => pre[_index][2][index], ctx)
    squares(conf4, index => pre[_index][3][index], ctx)
    squares(conf5, index => pre[_index][4][index], ctx)
    squares(conf6, index => pre[_index][5][index], ctx)
    _index += 1
    if(_index >= range) _index = _index%range
    ctx.restore()
  }
}
