'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('throws when inclusive limit is larger than the open limit', t => {
  const rc = new SimpleRangeCollection()

  const error = t.throws(() => {
    rc.add([3, 1])
  }, Error)

  t.is(error.message, 'Second half-open interval argument must be larger than the first')
})

test('does not throw if start same as end', t => {
  const rc = new SimpleRangeCollection()

  rc.add([0, 0])
  rc.add([-1, -1])
  rc.add([1, 1])
  rc.add([0, -0])

  t.deepEqual(rc.negativeRanges, [])
})

test('add to empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, -1])
  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -5])
})

test('add empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, -1])
  rc.add([-3, -3])

  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -5])
})

test('add empty at far edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, -1])
  rc.add([-5, -5])

  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -5])
})

test('add empty at near edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, -1])
  rc.add([-1, -1])

  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -5])
})

test('add inside', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -1])
  rc.add([-4, -2])
  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -5])
})

test('add overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -1])
  rc.add([-8, -3])
  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -8])
})

test.skip('add preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -1])
  rc.add([-2, 0])
  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [0, -5])
})

test('add zero postflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -1])
  rc.add([-20, -10])
  rc.add([-20, -20])
  t.deepEqual(rc.negativeRanges, [1, -5, 10, -20])
})

test('add multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -3])
  rc.add([-8, -7])
  rc.add([-10, -9])
  rc.add([-11, -1])
  // ?rc.negativeRanges
  t.deepEqual(rc.negativeRanges, [1, -11], 'the largest overarching range did not cancel all inner ranges')
})
