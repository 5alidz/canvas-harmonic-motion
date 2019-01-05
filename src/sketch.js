import createCanvas from './utils/createCanvas.js'
import background from './utils/background.js'
import el from './utils/createElement.js'

import demoA from './demos/demo-a-perf.js'
import { renderUiA } from './demos/demo-a-perf.js'
import demoB from './demos/demo-b-perf.js'
//import demoE from './demos/demo-e.js'
//import demoG from './demos/demo-g.js'

const worker = new Worker('worker.js')

const {ctx}= createCanvas({ width: window.innerWidth, height: 500 })
const demos = [demoA, demoB]
let demo
let frames = []
let currentDemo = 0

const preDemoA = {'a': { mult: 1, range: 80 }}
const preDemoB = {'b': { r: 15, range: 125, speed: 0.05 }}

worker.postMessage(preDemoA)
worker.onmessage = (e) => {
  if(e.data['a']){
    const [resetButton, speedButton] = renderUiA()
    resetButton.onclick = () => {
      preDemoA['a'].mult = 1
      worker.postMessage(preDemoA)
    }
    speedButton.onclick = () => {
      preDemoA['a'].mult += 1
      worker.postMessage(preDemoA)
    }
    frames = e.data['a']
    demo = demos[0](ctx, frames, preDemoA['a'].range)
  }
  if(e.data['b']){
    frames = e.data['b']
    demo = demos[1](ctx, frames, preDemoB['b'].range)
  }
}

const wrapper = document.getElementById('wrapper-demos')
const next = el('button', {'class': `btn normal-btn ${currentDemo === demos.length-1 ? 'disabled-btn': ''}`,
}, 'Next')
const prev = el('button', {'class': 'btn normal-btn disabled-btn',
}, 'Previous')
prev.onclick = () => {
  if(currentDemo === 0) return
  worker.postMessage(preDemoA)
  prev.classList.add('disabled-btn')
  next.classList.remove('disabled-btn')
  currentDemo -= 1
}
next.onclick = () => {
  if(currentDemo === demos.length-1) return
  worker.postMessage(preDemoB)
  prev.classList.remove('disabled-btn')
  next.classList.add('disabled-btn')
  currentDemo += 1
}
wrapper.appendChild(prev)
wrapper.appendChild(next)

const draw = () => {
  background('#eee', ctx)
  if(demo) {
    demo()
  }
  window.requestAnimationFrame(draw)
}
draw()
