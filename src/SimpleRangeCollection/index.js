'use strict'
const RangeCollection = require('../RangeCollection')

class SimpleRangeCollection extends RangeCollection {
  constructor () {
    super()
    this.positiveRanges = []
    this.negativeRanges = []
  }
  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add ([start, end]) {
    const positiveIntervalsAdd = mutableAdd(this.positiveRanges, (x) => x)
    const negativeIntervalsAdd = mutableAdd(this.negativeRanges, (x) => -x)

    if (start < 0 && end >= 0) {
      positiveIntervalsAdd(0, end)
      negativeIntervalsAdd(start, 0)
    } else if (start >= 0 && end >= 0) {
      positiveIntervalsAdd(start, end)
    } else if (start < 0 && end < 0) {
      negativeIntervalsAdd(start, end)
    } else {
      throw new Error('Second half-open interval argument must be larger than the first')
    }
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove ([start, end]) {
    this.positiveRanges = [...this.positiveRanges, -start, end] // fliped signs!
    this.positiveRanges.sort(absoluteSort)

    let idx
    for (idx = 0; idx < this.positiveRanges.length - 1; idx++) {
      if (!(idx % 2) && this.positiveRanges[idx] <= 0 && this.positiveRanges[idx + 1] > 0) {
        // remove all flipped sign pairs
        this.positiveRanges.splice(idx, 2)
        idx -= 2 // since we just removed two consecutive elements
      }
    }
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print () {
    return this.positiveRanges.reduce((acc, cur, idx) => {
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
    return a - b // reorder [x, -x] to [-x, x] as convention, used later to filter out this "dot" range
  } else {
    return Math.abs(a) - Math.abs(b)
  }
}

function removeLengthZeroIntervals (ranges) {
  let idx
  for (idx = 0; idx < ranges.length - 1; idx++) {
    if (ranges[idx] === -ranges[idx + 1]) {
      ranges.splice(idx, 2)
      idx -= 2
    }
  }
}

function mutableAdd (collection = [], transform) {
  return (start, end) => {
    if (start !== end) {
      collection.push(transform(start))
      collection.push(-transform(end))

      collection.sort(absoluteSort)
      removeLengthZeroIntervals(collection)

      let inRange = false
      let idx

      for (idx = 0; idx < collection.length - 1; idx++) {
        console.log(collection)
        if (inRange && collection[idx] >= 0 && collection[idx + 1] < 0) {
          // we can now safely remove the inner range
          collection.splice(idx, 2)
          idx -= 2 // since we just removed two consecutive element
          inRange = false
        }

        if (collection[idx] >= 0) {
          inRange = true
        } else {
          inRange = false
        }
      }
    }
  }
}

module.exports = {
  SimpleRangeCollection,
  absoluteSort,
  removeLengthZeroIntervals,
  mutableAdd
}
