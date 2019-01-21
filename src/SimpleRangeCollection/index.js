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
   * @param {Array<number>} ranges - Array of two integers that specify beginning and end of range.
   */
  add (ranges) {
    splitAndMutateProcess(this.positiveRanges, this.negativeRanges, ranges, mutableAdd)
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} ranges - Array of two integers that specify beginning and end of range.
   */
  remove (ranges) {
    splitAndMutateProcess(this.positiveRanges, this.negativeRanges, ranges, mutableRemove)
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print () {
    return [...this.negativeRanges.reverse(), ...this.positiveRanges].reduce((acc, cur, idx) => {
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
    if (ranges[idx] === -ranges[idx + 1] && ranges[idx] !== 0) {
      ranges.splice(idx, 2)
      idx -= 2
    }
  }
}

function splitAndMutateProcess (positiveRanges, negativeRanges, [start, end], mutation) {
  if (end < start) {
    throw new Error('Second half-open interval argument must be larger than the first')
  }

  const mutatePositiveRanges = mutation(positiveRanges, (x) => x)
  const mutateNegativeRanges = mutation(negativeRanges, (x) => {
    if (x === 0) { // strange -0 case creates problems, ref: http://2ality.com/2012/03/signedzero.html
      return 0
    }
    return -x
  })
  console.log(start, end)

  if (start < 0 && end >= 0) {
    mutatePositiveRanges(0, end)
    mutateNegativeRanges(0, start)
  } else if (start <= end) {
    if (start >= 0 && end >= 0) {
      mutatePositiveRanges(start, end)
    } else if (start < 0 && end < 0) {
      mutateNegativeRanges(end, start)
    }
  }
}

function mutableAdd (collection, transform) {
  return (start, end) => {
    collection.push(transform(start))
    collection.push(-transform(end)) // negative sign encode open end of half-interval

    collection.sort(absoluteSort)

    removeLengthZeroIntervals(collection)
    let inRange = false
    let idx

    for (idx = 0; idx < collection.length - 1; idx++) {
      if (inRange && collection[idx] >= 0 && collection[idx + 1] < 0) {
        // we can now safely remove the inner range
        collection.splice(idx, 2)
        idx -= 2 // since we just removed two consecutive element
        inRange = false
      }
      console.log(collection)

      if (collection[idx] >= 0) {
        inRange = true
      } else {
        inRange = false
      }
    }
  }
}

function mutableRemove (collection = [], transform) {
  return (start, end) => {
    // flip signs to use similar algorithm
    collection.push(-transform(start))
    collection.push(transform(end))
    collection.sort(absoluteSort)

    let idx
    for (idx = 0; idx < collection.length - 1; idx++) {
      if (!(idx % 2) && collection[idx] <= 0 && collection[idx + 1] > 0) {
        // remove all flipped sign pairs
        collection.splice(idx, 2)
        idx -= 2 // since we just removed two consecutive elements
      }
    }
  }
}

module.exports = {
  SimpleRangeCollection,
  absoluteSort,
  removeLengthZeroIntervals,
  mutableAdd,
  mutableRemove
}
