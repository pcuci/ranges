'use strict'

const test = require('ava').default
const { isNumbers, isMonotonic, hasEvenLength, hasLengthTwo, validate } = require('../../../src/DiscreteRangeCollection')

test('has numbers only', t => {
  t.is(isNumbers([2, 2, 4, 5]), true)
})

test('not numbers throws', t => {
  const error = t.throws(() => {
    // @ts-ignore
    isNumbers([2, 2, 4, 'string'])
  }, Error)

  t.is(error.message, 'ranges must be numbers')
})

test('monotonic', t => {
  t.is(isMonotonic([1, 2, 4, 5]), true)
})

test('throws non-monotonic', t => {
  const error = t.throws(() => {
    isMonotonic([1, 2, 2, 4, 2])
  }, Error)

  t.is(error.message, 'ranges array must be sorted')
})

test('even length', t => {
  t.is(hasEvenLength([1, 2, 4, 5]), true)
})

test('throws odd length', t => {
  const error = t.throws(() => {
    hasEvenLength([1, 2, 2, 4, 2])
  }, Error)

  t.is(error.message, 'ranges array length not even')
})

test('2 elements length', t => {
  t.is(hasLengthTwo([1, 2]), true)
})

test('throws when less than 2', t => {
  const error = t.throws(() => {
    hasLengthTwo([1])
  }, Error)

  t.is(error.message, 'ranges array not 2 elements long')
})

test('throws when larger than 2', t => {
  const error = t.throws(() => {
    hasLengthTwo([1, 2, 5])
  }, Error)

  t.is(error.message, 'ranges array not 2 elements long')
})

test('validate returns ranges', t => {
  const ranges = [1, 2, 4, 5]
  t.deepEqual(validate(ranges), ranges)
})
