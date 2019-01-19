'use strict'
const RangeCollection = require('../RangeCollection')

class SimpleRangeCollection extends RangeCollection {
  constructor () {
    super()
    this.ranges = []
  }
  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add ([start, end]) {
    this.ranges = [...this.ranges, start, -end]
    this.ranges.sort(absoluteSort)
    this.ranges = removeFlippedSigns(this.ranges)

    let inRange = false
    let idx

    for (idx = 0; idx < this.ranges.length - 1; idx++) {
      if (inRange && this.ranges[idx] >= 0 && this.ranges[idx + 1] < 0) {
        // we can now safely remove the inner range
        this.ranges.splice(idx, 2)
        idx -= 2 // since we just removed two consecutive element
        inRange = false
      }

      if (this.ranges[idx] >= 0) {
        inRange = true
      } else {
        inRange = false
      }
    }
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove ([start, end]) {
    this.ranges = [...this.ranges, -start, end] // fliped signs!
    this.ranges.sort(absoluteSort)

    let idx
    for (idx = 0; idx < this.ranges.length - 1; idx++) {
      if (!(idx % 2) && this.ranges[idx] <= 0 && this.ranges[idx + 1] > 0) {
        // remove all flipped sign pairs
        this.ranges.splice(idx, 2)
        idx -= 2 // since we just removed two consecutive elements
      }
    }
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print () {
    return this.ranges.reduce((acc, cur, idx) => {
      if (idx % 2) {
        acc += `${-cur}) `
      } else {
        acc += `[${cur}, `
      }
      return acc
    }, '').trim()
  }
}

function absoluteSort (a, b) {
  if (Math.abs(a) === Math.abs(b)) {
    return a - b // reorder [x, -x] to [-x, x]: negative value first cancels range
  } else {
    return Math.abs(a) - Math.abs(b)
  }
}

function removeFlippedSigns (ranges) {
  const result = [...ranges]
  let idx
  for (idx = 0; idx < result.length - 1; idx++) {
    if (result[idx] === -result[idx + 1]) {
      result.splice(idx, 2)
      idx -= 2
    }
  }
  return result
}

module.exports = SimpleRangeCollection
