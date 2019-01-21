'use strict'

const test = require('ava').default
const { removeLengthZeroIntervals } = require('../../../src/SimpleRangeCollection')

test('filters', t => {
  const collection = [1, 2, -2, -3]

  removeLengthZeroIntervals(collection)

  t.deepEqual(collection, [1, -3])
})

test('reversed', t => {
  const collection = [1, -2, 2, -3]

  removeLengthZeroIntervals(collection)

  t.deepEqual(collection, [1, -3])
})
