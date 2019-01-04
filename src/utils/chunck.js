export const chunck = (list, batch_size) => {
  return list.reduce((agg, curr, idx) => {
    if (idx % batch_size === 0) {
      agg.push([curr])
    } else {
      const lastbatch = agg.length - 1
      agg[lastbatch].push(curr)
    }
    return agg
  }, [])
}
