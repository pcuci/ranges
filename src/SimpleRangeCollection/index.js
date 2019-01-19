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
    this.ranges.sort((a, b) => (Math.abs(a) - Math.abs(b)))

    let inRange = false
    let idx

    for (idx = 0; idx < this.ranges.length - 1; idx++) {
      if (inRange && this.ranges[idx] >= 0 && this.ranges[idx + 1] < 0) {
        // when signs flip sequentially,
        // we can safely remove the inner range
        // sinde ranges addition is transitive, i.e.:
        // the order in which we add ranges doesn't matter
        // note: subtracting ranges on the other hand are not transitive: the order matters
        this.ranges.splice(idx--, 2)
        idx-- // since we just removed two consecutive element
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
    this.ranges.sort((a, b) => {
      if (Math.abs(a) === Math.abs(b)) {
        return a - b // reorder [x, -x] to [-x, x]: negative value first cancels range
      } else {
        return Math.abs(a) - Math.abs(b)
      }
    })

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

module.exports = SimpleRangeCollection
