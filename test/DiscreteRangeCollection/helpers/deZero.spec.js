'use strict'

const test = require('ava').default
const { deZero } = require('../../../src/DiscreteRangeCollection')

test('filters zero-length intervals', t => {
  t.deepEqual(deZero([2, 2, 4, 5]), [4, 5])
})

test('filters same end and start intervals', t => {
  t.deepEqual(deZero([1, 2, 2, 4]), [1, 4])
})
