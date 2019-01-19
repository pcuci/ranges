'use strict'

const test = require('ava').default
const { removeDotRanges } = require('../../../src/SimpleRangeCollection')

test('filters', t => {
  t.deepEqual(removeDotRanges([1, 2, -2, -3]), [1, -3])
})

test('reversed', t => {
  t.deepEqual(removeDotRanges([1, -2, 2, -3]), [1, -3])
})
