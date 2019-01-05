import miniEngine from '../utils/miniEngine.js'
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

const greyline = (x, y, x1, y1, ctx) => {
  ctx.save()
  ctx.strokeStyle = '#aaa'
  line(x, y, x1, y1, ctx)
  ctx.restore()
}

export default (ctx, precalc, range) => {
  // config.
  let revealMechanism = false
  let revealOnclick = init_ui()
  let r = 15 // radius of each circle.

  revealOnclick((button) =>{
    if(!revealMechanism) button.innerHTML = 'Hide Mechanism'
    if(revealMechanism)button.innerHTML = 'Reveal Mechanism'
    revealMechanism = !revealMechanism
  })

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

