import squares from '../utils/squares.js'
import el from '../utils/createElement.js'

export const renderUiA = () => {
  const domTarget = document.getElementById('wrapper')
  domTarget.innerHTML = ''
  const speedButton = el('button', {'class': 'btn normal-btn normal'}, '2X SPEED')
  const resetButton = el('button', {'class': 'btn normal-btn normal'}, 'RESET')
  const wrapper = el('div', {}, speedButton, resetButton)
  domTarget.appendChild(wrapper)
  return [resetButton, speedButton]
}

export default (ctx, precalc, range)=> {
  let _index = 0
  let pre = precalc
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
