export default (index, length) => {
  const mean = length / 2
  if (index === mean) {
    return mean
  }
  if (index > mean) {
    return length - index
  }
  if (index < mean) {
    return index
  }
}

