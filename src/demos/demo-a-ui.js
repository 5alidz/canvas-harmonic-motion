import el from '../utils/createElement.js'

export default (conf, cb) => {
  const domTarget = document.getElementById('wrapper')
  domTarget.innerHTML = ''
  const speedButton = el('button', {'class': 'btn normal-btn normal'}, '2X SPEED')
  const resetButton = el('button', {'class': 'btn normal-btn normal'}, 'RESET')
  const wrapper = el('div', {}, speedButton, resetButton)
  domTarget.appendChild(wrapper)
  resetButton.onclick = () => {
    if(conf.mult === 1) return
    conf.mult = 1
    cb()
  }
  speedButton.onclick = () => {
    conf.mult += 1
    cb()
  }
}
