'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../src/SimpleRangeCollection')

test('same', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.remove([1, 5])

  t.deepEqual(rc.positiveRanges, [])
})

test('all', t => {
  const rc = new SimpleRangeCollection()

  rc.add([3, 4])
  rc.remove([1, 5])

  t.deepEqual(rc.positiveRanges, [])
})

test('inside', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 10])
  rc.remove([2, 4])
  t.deepEqual(rc.positiveRanges, [1, -2, 4, -10])
})

test('overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.remove([3, 8])
  t.deepEqual(rc.positiveRanges, [1, -3])
})

test('preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([2, 5])
  rc.remove([1, 3])
  t.deepEqual(rc.positiveRanges, [3, -5])
})

test('preflow - zero case', t => {
  const rc = new SimpleRangeCollection()
  rc.add([2, 5])
  rc.remove([0, 3])
  t.deepEqual(rc.positiveRanges, [3, -5])
})

test('multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([3, 5])
  rc.add([7, 8])
  rc.add([9, 11])
  rc.remove([4, 10])
  t.deepEqual(rc.positiveRanges, [3, -4, 10, -11], 'the largest overarching range did not cancel all inner ranges')
})
