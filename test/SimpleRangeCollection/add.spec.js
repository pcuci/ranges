'use strict'

const test = require('ava').default
const { SimpleRangeCollection, mutableAdd } = require('../../src/SimpleRangeCollection')

test('collection', t => {
  let array = [1, -4]
  const addToArray = mutableAdd(array, x => x)
  addToArray(5, 8)
  t.deepEqual(array, [1, -4, 5, -8])
})

test('add to empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])

  t.deepEqual(rc.positiveRanges, [1, -5])
})

test('add empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([3, 3])

  t.deepEqual(rc.positiveRanges, [1, -5])
})

test('add empty at far edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([5, 5])

  t.deepEqual(rc.positiveRanges, [1, -5])
})

test('add empty at near edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([1, 1])

  t.deepEqual(rc.positiveRanges, [1, -5])
})

test('add inside', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([2, 4])

  t.deepEqual(rc.positiveRanges, [1, -5])
})

test('add overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.add([3, 8])

  t.deepEqual(rc.positiveRanges, [1, -8])
})

test('add preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.add([0, 2])

  t.deepEqual(rc.positiveRanges, [0, -5])
})

test('add multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([3, 5])
  rc.add([7, 8])
  rc.add([9, 10])
  rc.add([1, 11])

  t.deepEqual(rc.positiveRanges, [1, -11], 'the largest overarching range did not cancel all inner ranges')
})
