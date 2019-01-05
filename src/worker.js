import oscillator from './utils/oscillator.js'
import normalDist from './utils/normalDist.js'

const preCalculateA = (mult, range) => {
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

const preCalculateB = (r, range, speed) => {
  const fix = n => parseFloat(n.toFixed(2))
  const getAngle = (angle, j) => angle + j * 100
  const offset = (x, y) => (x + y) / 2
  const gridify = (shape, cb) =>
    shape.map(x => shape.map((y, j) => cb(x, y, j)))
  const _arr = n => [...Array(n).keys()]

  const rows = [...Array(Math.floor(100 / r))].map(
    (el, index) => (index + 1) * 40 - r,
  )
  // grid config.
  const grid = gridify(rows, (x, y, j) => {
    return angle => {
      const calcAngle = (j, x, y) => getAngle(angle, j) + offset(x, y)
      const _x = x + r * Math.cos(fix(calcAngle(j, x, y)))
      const _y = y + r * Math.sin(fix(calcAngle(j, x, y)))
      return {x: fix(_x), y: fix(_y)}
    }
  })
  let frames = _arr(range)
  let {angle} = oscillator(1, 0.0)
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
        if (i + 1 < rows.length && j + 1 < rows.length) {
          // cross right lines
          const pxr = grid[i + 1][j + 1](angle).x
          const pyr = grid[i + 1][j + 1](angle).y
          obj.pxr = pxr
          obj.pyr = pyr
        }
        if (j - 1 >= 0 && i + 1 < rows.length) {
          // cross left lines
          const pxl = grid[i + 1][j - 1](angle).x
          const pyl = grid[i + 1][j - 1](angle).y
          obj.pxl = pxl
          obj.pyl = pyl
        }
        if (j + 1 < rows.length) {
          // vertical lines
          const pxv = grid[i][j + 1](angle).x
          const pyv = grid[i][j + 1](angle).y
          obj.pxv = pxv
          obj.pyv = pyv
        }
        if (i + 1 <= rows.length - 1) {
          // horizontal lines
          const pxh = grid[i + 1][j](angle).x
          const pyh = grid[i + 1][j](angle).y
          obj.pxh = pxh
          obj.pyh = pyh
        }
        obj.rMech = {
          x,
          y,
          _x,
          _y,
          offset: fix(offset(x, y)),
          angle: fix(getAngle(angle, j)),
        }
        arr.push(obj)
      })
    })
    angle += speed
    _frames.push(arr)
  })
  return _frames
}
onmessage = e => {
  if (e.data['a']) {
    const precalc = preCalculateA(e.data['a'].mult, e.data['a'].range)
    postMessage({'a': precalc})
  }
  if(e.data['b']) {
    const precalc = preCalculateB(e.data['b'].r, e.data['b'].range, e.data['b'].speed)
    postMessage({'b': precalc})
  }
}
