import createCanvas from './utils/createCanvas.js'
import background from './utils/background.js'
import el from './utils/createElement.js'

import demoA from './demos/demo-a-perf.js'
import demoB from './demos/demo-b-perf.js'
//import demoE from './demos/demo-e.js'
import demoG from './demos/demo-g.js'


const {ctx}= createCanvas({ width: window.innerWidth, height: 500 })
const demos = [demoA, demoB, demoG]

let currentDemo = 0
let demo = demos[currentDemo](ctx)

const next = el('button', {'class': `btn normal-btn ${currentDemo === demos.length-1 ? 'disabled-btn': ''}`,
}, 'Next')
const prev = el('button', {'class': 'btn normal-btn disabled-btn',
}, 'Previous')

prev.onclick = () => {
  if(currentDemo === 0) return
  if(currentDemo <= 1) {
    currentDemo -= 1
    demo = demos[currentDemo](ctx)
    prev.style.color = '#aaa'
    return
  }
  next.style.color = '#222'
  prev.style.color = '#222'
  currentDemo -= 1
  demo = demos[currentDemo](ctx)
}
next.onclick = () => {
  if(currentDemo === demos.length-1) return
  if(currentDemo >= demos.length-2) {
    currentDemo += 1
    demo = demos[currentDemo](ctx)
    next.style.color = '#aaa'
    return
  }
  next.style.color = '#222'
  prev.style.color = '#222'
  currentDemo += 1
  demo = demos[currentDemo](ctx)
}

const wrapper = document.getElementById('wrapper-demos')
wrapper.appendChild(prev)
wrapper.appendChild(next)

const draw = () => {
  background('#eee', ctx)
  demo()
  window.requestAnimationFrame(draw)
}
draw()
