import rect from './rect.js'

export default (opts, callback, ctx) => {
  let { count, x, y, w, h, c } = opts
  let _ = [...Array(count)].map((el, i) => i)
  return _.map(index => {
    rect(
      {
        x: x + index * w,
        y: callback ? callback(index, _.length) + y : y,
        w: w,
        h: h,
        c: c,
      },
      ctx,
    )
  })
}

