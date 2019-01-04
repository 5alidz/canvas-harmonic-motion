export default (type, attr = {}, ...children) => {
  const element = document.createElement(type)
  Object.entries(attr).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  })
  return element
}
