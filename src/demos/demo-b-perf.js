import miniEngine from '../utils/miniEngine.js'
import oscillator from '../utils/oscillator.js'
import line from '../utils/line.js'
import el from '../utils/createElement.js'

const init_ui = () => {
  const domTarget = document.getElementById('wrapper')
  domTarget.innerHTML = ''
  const revealButton = el('button',
    {'class': 'btn normal-btn normal'},
    'Reveal Mechanism'
  )
  domTarget.appendChild(revealButton)
  return (cb) => {
    revealButton.onclick = () => {
      cb(revealButton)
    }
  }
}

// need to precalculate for mobile perf
const fix = n => parseFloat(n.toFixed(2))
const getAngle = (angle, j) => angle + j*100
const offset = (x, y) => (x+y)/2
const gridify = (shape, cb) => shape.map((x) => shape.map((y, j) => cb(x, y, j)))
const _arr = n => [...Array(n).keys()]

const greyline = (x, y, x1, y1, ctx) => {
  ctx.save()
  ctx.strokeStyle = '#aaa'
  line(x, y, x1, y1, ctx)
  ctx.restore()
}

export default (ctx) => {
  // config.
  const r = 15 // radius of each circle
  const rows = [...Array(Math.floor(100/r))].map((el, index) => (index + 1) * 40 - r)
  let revealMechanism = false
  let revealOnclick = init_ui()
  const range = 125
  // grid config.
  const grid = gridify(rows, (x, y, j) => {
    return (angle) => {
      const calcAngle = (j, x, y) => getAngle(angle, j) + offset(x, y)
      const _x = x + r * Math.cos(fix(calcAngle(j, x,y)))
      const _y = y + r * Math.sin(fix(calcAngle(j, x,y)))
      return {x: fix(_x), y: fix(_y)}
    }
  })
  const precalc = (() => {
    let frames = _arr(range)
    let { angle } = oscillator(1, 0.0)
    const _frames = []
    frames.map(frame => {
      let arr = []
      rows.map((x, i) => {
        rows.map((y, j) => {
          const obj = {}
          const _x = grid[i][j](angle).x
          const _y = grid[i][j](angle).y
          obj.x = _x
          obj.y = _y
          if(i + 1 < rows.length && j + 1 < rows.length){
            // cross right lines
            const pxr = grid[i+1][j+1](angle).x
            const pyr = grid[i+1][j+1](angle).y
            obj.pxr = pxr
            obj.pyr = pyr
          }
          if(j-1 >= 0 && i + 1 < rows.length){
            // cross left lines
            const pxl = grid[i+1][j-1](angle).x
            const pyl = grid[i+1][j-1](angle).y
            obj.pxl = pxl
            obj.pyl = pyl
          }
          if(j+1 < rows.length) {
            // vertical lines
            const pxv = grid[i][j + 1](angle).x
            const pyv = grid[i][j + 1](angle).y
            obj.pxv = pxv
            obj.pyv = pyv
          }
          if(i+1 <= rows.length-1) {
            // horizontal lines
            const pxh = grid[i + 1][j](angle).x
            const pyh = grid[i + 1][j](angle).y
            obj.pxh = pxh
            obj.pyh = pyh
          }
          obj.rMech = {
            x, y, _x, _y,
            offset: fix(offset(x, y)),
            angle: fix(getAngle(angle, j))
          }
          arr.push(obj)
        })
      })
      angle += 0.05
      _frames.push(arr)
    })
    return _frames
  })()
  revealOnclick((button) =>{
    if(!revealMechanism) button.innerHTML = 'Hide Mechanism'
    if(revealMechanism)button.innerHTML = 'Reveal Mechanism'
    revealMechanism = !revealMechanism
  }) // dom minipulation
  let _index = 0
  return () => {
    ctx.save()
    ctx.translate(window.innerWidth/2 - 120, 120)
    precalc[_index].map(point => {
      const { x, y } = point
      if(point.pxr && point.pyr){
        const {pxr, pyr} = point
        greyline(x, y, pxr, pyr, ctx)
      }
      if(point.pxl && point.pyl){
        const {pxl, pyl} = point
        greyline(x, y, pxl, pyl, ctx)
      }
      if(point.pxv && point.pyv){
        const {pxv, pyv} = point
        line(x, y, pxv, pyv, ctx)
      }
      if(point.pxh && point.pyh){
        const {pxh, pyh} = point
        line(x, y, pxh, pyh, ctx)
      }
      if(revealMechanism){
        const {rMech: rm} = point
        greyline(rm.x, rm.y, x, y, ctx)
        miniEngine(rm.x, rm.y, r, rm.offset, rm.angle, ctx)
      }
    })
    ctx.restore()
    _index += 1
    if(_index >= range) {
      _index = _index%range
    }
  }
}

