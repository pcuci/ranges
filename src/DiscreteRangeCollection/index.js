'use strict'

function * mergeIt (r1, r2) {
  let c1 = 0
  let c2 = 0

  let win

  while (c1 < r1.length || c2 < r2.length) {
    if (win === r1 && c1 < r1.length) {
      win = undefined
      yield Math.max(r1[c1], r2[c2])
      c1++
      c2++
    }

    if (win === r2 && c2 < r2.length) {
      win = undefined
      yield Math.max(r1[c1], r2[c2])
      c1++
      c2++
    }

    if (r1[c1] <= r2[c2]) {
      win = r1
      if (c1 < r1.length) {
        yield r1[c1]
        c1++
      } else {
        yield r2[c2]
        c2++
      }
      c2++
    } else {
      win = r2
      if (c2 < r2.length) {
        yield r2[c2]
        c2++
      } else {
        yield r1[c1]
        c1++
      }
    }
  }
}

module.exports = {
  mergeIt
}
