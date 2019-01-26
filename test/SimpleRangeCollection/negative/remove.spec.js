'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('same', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -1])
  rc.remove([-5, -1])

  t.deepEqual(rc.negativeRanges, [])
})

test('all', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-4, -3])
  rc.remove([-5, -1])

  t.deepEqual(rc.negativeRanges, [])
})

test('inside', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-10, -1])
  rc.remove([-4, -2])

  t.deepEqual(rc.negativeRanges, [1, -2, 4, -10])
})

test('overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -1])
  rc.remove([-8, -3])

  t.deepEqual(rc.negativeRanges, [1, -3])
})

test('preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -2])
  rc.remove([-3, -1])

  t.deepEqual(rc.negativeRanges, [3, -5])
})

test('preflow - zero case', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -2])
  rc.remove([-3, 0])

  t.deepEqual(rc.negativeRanges, [3, -5])
})

test('multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([-5, -3])
  rc.add([-8, -7])
  rc.add([-11, -9])
  rc.remove([-10, -4])

  t.deepEqual(rc.negativeRanges, [3, -4, 10, -11], 'the largest overarching range did not cancel all inner ranges')
})
