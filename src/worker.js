import preCalculateA from './preCalculateA.js'
import preCalculateB from './preCalculateB.js'

onmessage = e => {
  if (e.data['a']) {
    const precalc = preCalculateA(e.data['a'].mult, e.data['a'].range)
    postMessage({'a': precalc})
  }
  if(e.data['b']) {
    const precalc = preCalculateB(e.data['b'].r, e.data['b'].range, e.data['b'].speed)
    postMessage({'b': precalc})
  }
}
