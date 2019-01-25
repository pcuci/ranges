'use strict'

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

function union (r1, r2) {
  const set = new Set([...deZero(r1), ...deZero(r2)])
  const sorted = Array.from(set.values()).sort((a, b) => a - b)

  const result = []
  let c1 = 0
  let c2 = 0
  let seconding = false
  let adding = false

  for (let n of sorted) {
    if (n === r1[c1]) {
      adding = c1 % 2 ? false : true
      if (adding && !seconding) {
        result.push(n)
      }
      if (!adding && !seconding) {
        result.push(n)
      }
      c1++
    }

    if (n === r2[c2]) {
      seconding = c2 % 2 ? false : true
      if (!adding && seconding) {
        result.push(n)
      }
      if (!adding && !seconding) {
        result.push(n)
      }
      c2++
    }
  }
  console.log(result)
  return deZero(result)
}

module.exports = {
  diff,
  union
}
