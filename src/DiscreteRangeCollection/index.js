'use strict'

const RangeCollection = require('../RangeCollection')

class DiscreteRangeCollection extends RangeCollection {
  constructor (ranges = []) {
    super()
    validate(ranges)
    this.ranges = ranges
  }

  /**
   * Adds a range to the collection
   * @param {Array<number>} ranges - Array of two integers that specify beginning and end of range.
   */
  add (ranges) {
    this.ranges = union(this.ranges, ranges)
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} ranges - Array of two integers that specify beginning and end of range.
   */
  remove (ranges) {
    this.ranges = diff(this.ranges, ranges)
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print () {
    return `TODO`
  }
}

function isNumbers (ranges) {
  return [...ranges].every((element, idx, arr) => {
    if (typeof element !== 'number') {
      throw new Error('ranges must be numbers')
    }
    return true
  })
}

function hasEvenLength (ranges) {
  if (ranges.length % 2 === 1) {
    throw new Error('ranges array length not even')
  }
  return true
}

function isMonotonic (ranges) {
  return [...ranges].every((element, idx, arr) => {
    if (idx && element < arr[idx - 1]) {
      throw new Error('ranges array must be sorted')
    }
    return true
  })
}

function validate (ranges) {
  isNumbers(ranges)
  console.log(ranges)
  hasEvenLength(ranges)
  isMonotonic(ranges)
  return ranges
}

function deZero (ranges) {
  validate(ranges)
  const result = [...ranges]
  let idx
  for (idx = 0; idx < result.length - 1; idx++) {
    if (result[idx] === result[idx + 1]) {
      result.splice(idx, 2)
      idx -= 2
    }
  }
  return result
}

function diff (range1, range2) {
  const r1 = deZero(validate(range1))
  const r2 = deZero(validate(range2))

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

  return validate(deZero(result)) // clean and sanity re-check
}

function union (range1, range2) {
  const r1 = deZero(validate(range1))
  const r2 = deZero(validate(range2))

  const set = new Set([...deZero(r1), ...deZero(r2)])
  const sorted = Array.from(set.values()).sort((a, b) => a - b)

  const result = []
  let c1 = 0
  let c2 = 0
  let seconding = false
  let adding = false

  for (let n of sorted) {
    if (n === r1[c1]) {
      console.log(c1)
      console.log(c2)
      console.log(r1)
      console.log(r2)
      console.log(adding)
      console.log(seconding)
      adding = c1 % 2 ? false : true
      if (adding && !seconding) {
        console.log(n)
        result.push(n)
      }
      if (!adding && !seconding) {
        console.log(n)
        result.push(n)
      }
      c1++
    }

    if (n === r2[c2]) {
      seconding = c2 % 2 ? false : true
      if (!adding && seconding) {
        console.log(n)
        result.push(n)
      }
      if (!adding && !seconding) {
        console.log(n)
        result.push(n)
      }
      c2++
    }
  }

  return validate(deZero(result)) // clean and sanity re-check
}

module.exports = {
  diff,
  union,
  deZero,
  isNumbers,
  isMonotonic,
  hasEvenLength,
  validate,
  DiscreteRangeCollection
}
