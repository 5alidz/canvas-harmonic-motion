import oscillator from './utils/oscillator.js'

export default (r, range, speed) => {
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
  frames.map(() => {
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
