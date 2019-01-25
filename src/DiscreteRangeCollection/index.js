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

function * diffIt (r1, r2) {
  let c1 = 0
  let c2 = 0

  while (c1 < r1.length || c2 < r2.length) {
    console.log(c1, c2)
    console.log([r1, r2])
    if (c1 % 2 && c1 < r1.length) { // half-open minuend
      if (c2 < r2.length) {
        if (c2 % 2) { // half-open subtrahend
          console.log(c1, c2)
          console.log([r1, r2])
          if (r2[c2] < r1[c1]) {
            yield r2[c2]
            console.log(r2[c2])
          }
          c2++
        } else { // half-closed subtrahend
          console.log(c1, c2)
          console.log([r1, r2])
          if (r2[c2] < r1[c1]) {
            yield r2[c2]
            console.log(r2[c2])
            c2++
          } else {
            yield r1[c1]
            console.log(r1[c1], [c1, c2], [r1.length, r2.length])
            c1++
          }
        }
      } else {
        c1++
      }
    } else { // half-closed mineuend
      if (c2 < r2.length) {
        if (c2 % 2) { // half-open subtrahend
          console.log(c1, c2)
          console.log([r1, r2])
          if (r1[c1] < r2[c2]) {
            yield r2[c2]
            console.log(r2[c2])
            c1++
          } else {
            c2++
          }
        } else { // half-closed subtrahend
          console.log(c1, c2)
          console.log([r1, r2])
          if (r2[c2] < r1[c1]) {
            c2++
          } else {
            yield r1[c1]
            console.log(r1[c1])
            c1++
          }
        }
      } else {
        c1++
      }
    }
  }
}

function deZero (ranges) {
  let idx
  for (idx = 0; idx < ranges.length - 1; idx++) {
    if (ranges[idx] === ranges[idx + 1]) {
      ranges.splice(idx, 2)
      idx -= 2
    }
  }
  return ranges
}

function diff (r1, r2) {
  const set = new Set([...deZero(r1), ...deZero(r2)])
  const sorted = Array.from(set.values()).sort((a, b) => a - b)

  const result = []
  let c1 = 0
  let c2 = 0
  let subtracting = false
  let adding = false

  for (let n of sorted) {
    if (n === r1[c1]) {
      adding = c1 % 2 ? false : true
      if (adding && !subtracting) {
        result.push(n)
      }
      if (!adding && !subtracting) {
        result.push(n)
      }
      c1++
    }

    if (n === r2[c2]) {
      subtracting = c2 % 2 ? false : true
      if (adding && subtracting) {
        result.push(n)
      }
      if (adding && !subtracting) {
        result.push(n)
      }
      c2++
    }
  }
  return result
}

module.exports = {
  mergeIt,
  diffIt,
  diff
}
