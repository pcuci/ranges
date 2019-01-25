'use strict'

const test = require('ava').default
const { diff } = require('../../../src/DiscreteRangeCollection')

test('diff 2', t => {
  t.deepEqual(Array
    .from(diff([1, 4], [3, 6])), [1, 3])
})

test('diff 322', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [1, 4])), [4, 6])
})

test('diff 3122', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [1, 14])), [])
})

test('diff 32122', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [1, 2])), [3, 6])
})

test('diff 321242', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [10, 12])), [3, 6])
})

test('diff 3231242', t => {
  t.deepEqual(Array
    .from(diff([3, 6.1], [4, 5])), [3, 4, 5, 6.1])
})

test('diff doght', t => {
  t.deepEqual(Array
    .from(diff([6, 6], [2, 8])), [])
})

test('diff dot', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [4, 4])), [3, 6])
})

test('diff dogt', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [2, 3])), [3, 6])
})

test('diff 4dogt', t => {
  t.deepEqual(Array
    .from(diff([3, 6], [6, 9])), [3, 6])
})

test('diff 4doght', t => {
  t.deepEqual(Array
    .from(diff([1, 3, 4, 5, 6, 8], [2, 7])), [1, 2, 7, 8])
})

test('diff 4dhoght', t => {
  t.deepEqual(Array
    .from(diff([-5, 5], [-9, -8, -6, -4, -1, 1, 4, 6, 8, 9])), [-4, -1, 1, 4])
})
