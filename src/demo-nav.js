import el from './utils/createElement.js'

export default (demosLength, onPrev, onNext) => {
  let currentDemo = 0
  const wrapper = document.getElementById('wrapper-demos')
  const next = el('button', {
    'class': `btn normal-btn ${currentDemo === demosLength ? 'disabled-btn': ''}`,
  }, 'Next')
  const prev = el('button', {
    'class': `btn normal-btn ${currentDemo === 0 ? 'disabled-btn': ''}`
  }, 'Previous')

  prev.onclick = () => {
    if(currentDemo === 0) return
    onPrev()
    prev.classList.add('disabled-btn')
    next.classList.remove('disabled-btn')
    currentDemo -= 1
  }
  next.onclick = () => {
    if(currentDemo === demosLength) return
    onNext()
    prev.classList.remove('disabled-btn')
    next.classList.add('disabled-btn')
    currentDemo += 1
  }
  wrapper.appendChild(prev)
  wrapper.appendChild(next)
}

