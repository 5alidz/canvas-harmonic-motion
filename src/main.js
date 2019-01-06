import createCanvas from './utils/createCanvas.js'
import background from './utils/background.js'

import demoNav from './demo-nav.js'
import demoA from './demos/demo-a-perf.js'
import demoB from './demos/demo-b-perf.js'

import demoA_ui from './demos/demo-a-ui.js'

const worker = new Worker('worker.js')
const { ctx } = createCanvas({ width: window.innerWidth, height: 500 })
const demos = [demoA, demoB]

let demo = null
let frames = []

const preDemoA = {a: { mult: 1, range: 80 }}
const preDemoB = {b: { r: 15, range: 125, speed: 0.05 }}

worker.postMessage(preDemoA)
worker.onmessage = (e) => {
  if(e.data.a){
    demoA_ui(preDemoA.a, () => worker.postMessage(preDemoA))
    frames = e.data.a
    demo = demos[0](ctx, frames, preDemoA.a.range)
  }
  if(e.data.b){
    frames = e.data.b
    demo = demos[1](ctx, frames, preDemoB.b.range)
  }
}
const onNext = () => worker.postMessage(preDemoB)
const onPrev = () => worker.postMessage(preDemoA)
demoNav(demos.length, onPrev, onNext)

const draw = () => {
  background('#eee', ctx)
  if(demo) demo()
  window.requestAnimationFrame(draw)
}
draw()
