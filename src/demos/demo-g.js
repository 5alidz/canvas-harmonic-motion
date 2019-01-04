import oscillator from '../utils/oscillator.js'
import circle from '../utils/circle.js'
import line from '../utils/line.js'
import redCircle from '../utils/redCircle.js'
import el from '../utils/createElement.js'


const series = n => [...Array(Math.floor(n/2) + 1)]
  .map((el, i) => i)
  .reduce((agg, curr) => agg.push(curr * 2 + 1) && agg, [])

const fourier = (_x, _y, _n, ctx) => {
  let {angle} = oscillator(1, 0)
  const wave = []
  const _series = series(_n)
  return () => {
    let [x, y, parentR] = [_x, _y, 30]
    _series.map((n) => {
      let [prevx, prevy, r] = [x, y, parentR * (4 / (n * Math.PI))]
      x += r * Math.cos(n * angle)
      y += r * Math.sin(n * angle)
      circle(prevx, prevy, r, ctx)
      redCircle(x, y, 3, ctx)
      line(prevx, prevy, x, y, ctx)
    })
    // add wave
    wave.unshift(y)
    // draw wave
    wave.map((_wave, i, arr) =>{
      const prevWave = arr[i - 1]
      if(prevWave) {
        line(i+180, _wave, i-1+180, prevWave, ctx)
        //circle(i + 180, _wave, 1, ctx)
      }else{
        circle(i + 180, _wave, 3, ctx)
      }
    })
    // clean waves array
    if(wave.length > 305) wave.pop()
    line(x, y, 180, y, ctx)
    line(180, 0, 180, 500, ctx)
    angle += 0.1
  }
}
export default (ctx) => {
  const domTarget = document.getElementById('wrapper')
  domTarget.innerHTML = ''
  const demo = 'fourier'
  const double = el('button', {'class': 'btn normal-btn', 'id': 'double'}, 'x2')
  const reset = el('button', {'class': 'btn normal-btn', 'id': 'reset'}, 'reset')
  const decrease = el('button', {'class': 'btn normal-btn', 'id': 'dec'}, '▼')
  const increase = el('button', {'class': 'btn normal-btn', 'id': 'inc'}, '▲')

  const wrapper = el('div',
    {'id': `wrapper-${demo}`},
    double, reset, decrease, increase
  )
  domTarget.appendChild(wrapper)

  let mult = 1
  let initialCount = 6
  const calcArr = (initialCount, mult, initialY = 80) => {
    const isFirst = i => i === 0
    return series(initialCount).map((n, i) => isFirst(i)
      ? fourier(80, initialY, n*mult, ctx)
      : fourier(80, initialY += 110, n*mult, ctx)
    )
  }
  let arr = calcArr(initialCount, mult)

  double.onclick = () => {
    mult += 2
    arr = calcArr(initialCount, mult)
  }
  reset.onclick = () => {
    mult = 1
    arr = calcArr(initialCount, mult)
  }
  decrease.onclick = () => {
    if(initialCount === 0) {return}
    initialCount -= 2
    arr = calcArr(initialCount, mult)
  }
  increase.onclick = () => {
    if(initialCount === 6) {return}
    initialCount += 2
    arr = calcArr(initialCount, mult)
  }
  return ()=> {
    ctx.save()
    ctx.translate(window.innerWidth/2 - 200, 0)
    arr.map(fn => fn())
    ctx.restore()
  }
}
