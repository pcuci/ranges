'use strict'

const test = require('ava').default
const { mergeIt } = require('../../src/DiscreteRangeCollection')

test('merge iterator', t => {
  t.deepEqual(Array.from(mergeIt([1, 6, 7, 8], [2, 4])), [1, 6, 7, 8])
})

test('merge iterator 2', t => {
  t.deepEqual(Array.from(mergeIt([1, 3, 7, 8], [2, 4])), [1, 4, 7, 8])
})
