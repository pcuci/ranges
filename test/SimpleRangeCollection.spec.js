'use strict'

const test = require('ava').default
const SimpleRangeCollection = require('../src/SimpleRangeCollection')

test.before((t) => {
})

test('instantiate', t => {
  const rc = new SimpleRangeCollection()
  t.true(rc instanceof SimpleRangeCollection)
})

test('add to empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add empty', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([3, 3])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add empty at far edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([5, 5])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add empty at near edge', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.add([1, 1])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add inside', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.add([2, 4])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -5])
})

test('add overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.add([3, 8])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -8])
})

test('add preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.add([0, 2])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [0, -5])
})

test('add multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([3, 5])
  rc.add([7, 8])
  rc.add([9, 10])
  rc.add([1, 11])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -11], 'the largest overarching range did not cancel all inner ranges')
})

test('remove same', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.remove([1, 5])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [])
})

test('remove all', t => {
  const rc = new SimpleRangeCollection()

  rc.add([3, 4])
  rc.remove([1, 5])

  // ?rc.ranges
  t.deepEqual(rc.ranges, [])
})

test('remove inside', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 10])
  rc.remove([2, 4])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -2, 4, -10])
})

test('remove overflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([1, 5])
  rc.remove([3, 8])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -3])
})

test('remove preflow', t => {
  const rc = new SimpleRangeCollection()
  rc.add([2, 5])
  rc.remove([1, 3])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [3, -5])
})

test('remove preflow - zero case', t => {
  const rc = new SimpleRangeCollection()
  rc.add([2, 5])
  rc.remove([0, 3])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [3, -5])
})

test('remove multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([3, 5])
  rc.add([7, 8])
  rc.add([9, 11])
  rc.remove([4, 10])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [3, -4, 10, -11], 'the largest overarching range did not cancel all inner ranges')
})

test('print', t => {
  const expected = '[3, 5)'
  const rc = new SimpleRangeCollection()

  rc.add([3, 5])

  t.is(rc.print(), expected)
})

test('print series', t => {
  const expected = '[1, 3) [4, 10)'
  const rc = new SimpleRangeCollection()

  rc.add([1, 10])
  rc.remove([3, 4])

  t.is(rc.print(), expected)
})

test('complex sequence', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  t.is(rc.print(), '[1, 5)')

  rc.add([10, 20])
  t.is(rc.print(), '[1, 5) [10, 20)')

  rc.add([20, 20])
  t.is(rc.print(), '[1, 5) [10, 20)')

  rc.add([20, 21])
  t.is(rc.print(), '[1, 5) [10, 21)')

  rc.add([2, 4])
  t.is(rc.print(), '[1, 5) [10, 21)')

  rc.add([3, 8])
  t.is(rc.print(), '[1, 8) [10, 21)')

  rc.remove([10, 10])
  t.is(rc.print(), '[1, 8) [10, 21)')

  rc.remove([10, 11])
  t.is(rc.print(), '[1, 8) [11, 21)')

  rc.remove([15, 17])
  t.is(rc.print(), '[1, 8) [11, 15) [17, 21)')

  rc.remove([3, 19])
  t.is(rc.print(), '[1, 3) [19, 21)')
})
