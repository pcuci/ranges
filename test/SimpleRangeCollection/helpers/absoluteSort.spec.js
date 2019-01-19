'use strict'

const test = require('ava').default
const { absoluteSort } = require('../../../src/SimpleRangeCollection')

test('positives', t => {
  t.deepEqual([3, 2, 1].sort(absoluteSort), [1, 2, 3])
})

test('negatives sorted in absolute order', t => {
  t.deepEqual([-3, -2, -1].sort(absoluteSort), [-1, -2, -3])
})

test('mixed', t => {
  t.deepEqual([-3, 2, 2, -1].sort(absoluteSort), [-1, 2, 2, -3])
})

test('absolute duplicates', t => {
  t.deepEqual([-3, 2, -2, -1].sort(absoluteSort), [-1, -2, 2, -3], '-2 after 2')
})
