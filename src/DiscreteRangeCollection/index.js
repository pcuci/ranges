'use strict'

const RangeCollection = require('../RangeCollection')

/**
 * Manipulates a collection of half-open intervals, a set-based implementation.
 *
 * @class DiscreteRangeCollection
 * @extends {RangeCollection}
 */
class DiscreteRangeCollection extends RangeCollection {
  constructor (ranges = []) {
    super()
    this.ranges = deZero(validate(ranges))
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
    return this.ranges.reduce((acc, cur, idx) => {
      if (idx % 2) {
        acc += `${cur}) `
      } else {
        acc += `[${cur}, `
      }
      return acc
    }, '').trim()
  }
}

/**
 * Verifies all array elements are numbers
 *
 * @param {Number[]} ranges The array whose elements to check that are all numbers
 * @returns {boolean} The result of the check
 * @throws {Error} Ranges must be numbers
 */
function isNumbers (ranges) {
  return [...ranges].every((element, idx, arr) => {
    if (typeof element !== 'number') {
      throw new Error('ranges must be numbers')
    }
    return true
  })
}

/**
 * Verifies the array has an even number of elements
 *
 * @param {*[]} ranges Array to verify the length of
 * @returns {boolean} Result of even length check
 * @throws {Error} Ranges array length not even
 */
function hasEvenLength (ranges) {
  if (ranges.length % 2 === 1) {
    throw new Error('ranges array length not even')
  }
  return true
}

/**
 * Verifies the array is sorted, values increase monotonically
 *
 * @param {*[]} ranges The array whose sort order is verified
 * @returns {boolean} Monotonicity check result
 * @throws {Error} Ranges array must be sorted
 */
function isMonotonic (ranges) {
  return [...ranges].every((element, idx, arr) => {
    if (idx && element < arr[idx - 1]) {
      throw new Error('ranges array must be sorted')
    }
    return true
  })
}

/**
 * Verifies the array is only numbers, is even in length,
 * and its elements are monotonically increasing
 *
 * @param {*[]} ranges The array to validate
 * @returns {*[]} The original array parameter
 * @throws {Error} Ranges array must be sorted
 * @throws {Error} Ranges array length not even
 * @throws {Error} Ranges must be numbers
 */
function validate (ranges) {
  isNumbers(ranges)
  hasEvenLength(ranges)
  isMonotonic(ranges)
  return ranges
}

/**
 * Removes zero-length intervals, e.g.: [3, 3), or
 * fuzes two intervals, e.g.: [1, 2) + [2, 3) = [1, 3)
 *
 * @param {*[]} ranges The array of intervals to clean
 * @returns {*[]} A modified shorter copy of the original parameter
 * @throws {Error} Validation errors
 */
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

/**
 * Subtracts two collections of ranges from each other
 *
 * @param {*[]} range1 The range to subtract from
 * @param {*[]} range2 The range to subtract
 * @returns {*[]} The difference collection
 * @throws {Error} Validation errors
 */
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
      adding = !(c1 % 2)
      if (adding && !subtracting) {
        result.push(n)
      }
      if (!adding && !subtracting) {
        result.push(n)
      }
      c1++
    }

    if (n === r2[c2]) {
      subtracting = !(c2 % 2)
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

/**
 * Adds two collections of ranges to one another resulting
 * in a new collection, the union of the inputs
 *
 * @param {*[]} range1 The first range to add
 * @param {*[]} range2 The second range to add
 * @returns {*[]} The union collection
 * @throws {Error} Validation errors
 */
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
      adding = !(c1 % 2) // true on start of interval (even index)
      if (adding && !seconding) {
        result.push(n)
      }
      if (!adding && !seconding) {
        result.push(n)
      }
      c1++
    }

    if (n === r2[c2]) {
      seconding = !(c2 % 2)
      if (!adding && seconding) {
        result.push(n)
      }
      if (!adding && !seconding) {
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
