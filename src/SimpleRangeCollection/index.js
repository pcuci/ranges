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
    // TODO: implement this
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
