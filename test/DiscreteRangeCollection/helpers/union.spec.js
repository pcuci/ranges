'use strict'

const test = require('ava').default
const { union } = require('../../../src/DiscreteRangeCollection')

test('union 2', t => {
  t.deepEqual(Array
    .from(union([1, 4], [3, 6])), [1, 6])
})

test('union 322', t => {
  t.deepEqual(Array
    .from(union([3, 6], [1, 4])), [1, 6])
})

test('union 3122', t => {
  t.deepEqual(Array
    .from(union([3, 6], [1, 14])), [1, 14])
})

test('union 32122', t => {
  t.deepEqual(Array
    .from(union([3, 6], [1, 2])), [1, 2, 3, 6])
})

test('union 321242', t => {
  t.deepEqual(Array
    .from(union([3, 6], [10, 12])), [3, 6, 10, 12])
})

test('union 3231242', t => {
  t.deepEqual(Array
    .from(union([3, 6.1], [4, 5])), [3, 6.1])
})

test('union doght', t => {
  t.deepEqual(Array
    .from(union([6, 6], [2, 8])), [2, 8])
})

test('union dot', t => {
  t.deepEqual(Array
    .from(union([3, 6], [4, 4])), [3, 6])
})

test('union dogt', t => {
  t.deepEqual(Array
    .from(union([3, 6], [2, 3])), [2, 6])
})

test('union 4dogt', t => {
  t.deepEqual(Array
    .from(union([3, 6], [6, 9])), [3, 9])
})

test('union 4doght', t => {
  t.deepEqual(Array
    .from(union([1, 3, 4, 5, 6, 8], [2, 7])), [1, 8])
})

test('union 4dhoght', t => {
  t.deepEqual(Array
    .from(union([-5, 5], [-9, -8, -6, -4, -1, 1, 4, 6, 8, 9])), [-9, -8, -6, 6, 8, 9])
})

test('union 4gdhoght', t => {
  t.deepEqual(Array
    .from(union([-7, 7], [-9, -8, -6, -4, -1, 1, 4, 6, 8, 9])), [-9, -8, -7, 7, 8, 9])
})
