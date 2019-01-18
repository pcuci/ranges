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
      if (inRange && this.ranges[idx] + this.ranges[idx + 1] <= 0) {
        // remove both consecutive elements
        this.ranges.splice(idx, 2)
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
  remove (range) {
    // TODO: implement this
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print () {
    // TODO: implement this
  }
}

module.exports = SimpleRangeCollection
