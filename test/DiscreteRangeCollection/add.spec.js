'use strict'

const test = require('ava').default
const { mergeIt, diffIt, diff } = require('../../src/DiscreteRangeCollection')

test('merge iterator', t => {
  t.deepEqual(Array.from(mergeIt([1, 6, 7, 8], [2, 4])), [1, 6, 7, 8])
})

test('merge iterator 2', t => {
  t.deepEqual(Array.from(mergeIt([1, 3, 7, 8], [2, 4])), [1, 4, 7, 8])
})

test('diff 1', t => {
  t.deepEqual(Array
    .from(diffIt([1, 4], [2, 6])), [1, 2])
})
