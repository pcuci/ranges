'use strict'

const test = require('ava').default
const { mergeIt, diffIt, diff } = require('../../src/DiscreteRangeCollection')

// test('merge iterator', t => {
//   t.deepEqual(Array.from(mergeIt([1, 6, 7, 8], [2, 4])), [1, 6, 7, 8])
// })

// test('merge iterator 2', t => {
//   t.deepEqual(Array.from(mergeIt([1, 3, 7, 8], [2, 4])), [1, 4, 7, 8])
// })

// test('diff 1', t => {
//   t.deepEqual(Array
//     .from(diffIt([1, 4], [2, 6])), [1, 2])
// })





















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
    .from(diff([3, 6], [4, 5])), [3, 4, 5, 6])
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

























// test('diff 3', t => {
//   t.deepEqual(Array
//     .from(diffIt([1, 4], [2, 6])), [1, 2])
// })

// test('diff 4', t => {
//   t.deepEqual(Array
//     .from(diffIt([1, 4], [2, 6])), [1, 2])
// })

// test('diff 5', t => {
//   t.deepEqual(Array
//     .from(diffIt([1, 4], [2, 6])), [1, 2])
// })

// test('diff iterator', t => {
//   t.deepEqual(Array.from(diffIt([1, 4, 5, 10], [2, 6, 7, 8, 9, 15])), [1, 2, 6, 7, 8, 9])
// })

// test('diff iterator 2', t => {
//   t.deepEqual(Array.from(mergeIt([1, 3, 5, 8], [2, 6])), [1, 4, 7, 8])
// })
