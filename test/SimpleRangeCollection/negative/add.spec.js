'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('throws when inclusive limit is larger than the open limit', t => {
  const rc = new SimpleRangeCollection()

  const error = t.throws(() => {
    rc.add([3, -2])
  }, Error)

  t.is(error.message, 'Second half-open interval argument must be larger than the first')
})

test('does not throw if start same as end', t => {
  const rc = new SimpleRangeCollection()

  rc.add([0, 0])
  rc.add([-1, -1])
  rc.add([1, 1])
  rc.add([0, -0])

  t.deepEqual(rc.ranges, [])
})

test('add to empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-1, -5])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-1, -5])
  rc.add([-3, -3])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add empty at far edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-1, -5])
  rc.add([-5, -5])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add empty at near edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-1, -5])
  rc.add([-1, -1])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add inside', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-1, -5])
  rc.add([-2, -4])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-1, -5])
  rc.add([-3, -8])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -8])
})

test('add preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-1, -5])
  rc.add([-0, -2])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [0, -5])
})

test('add multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-3, -5])
  rc.add([-7, -8])
  rc.add([-9, -10])
  rc.add([-1, -11])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -11], 'the largest overarching range did not cancel all inner ranges')
})
