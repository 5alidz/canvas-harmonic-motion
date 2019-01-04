export default (opts) => {
  const canvas = document.createElement('canvas')
  const container = document.getElementById('canvas-container')
  canvas.width = opts.width
  canvas.height = opts.height
  canvas.style = 'box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.2)'
  container.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  return {canvas, ctx }
}

