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

test.only('add multiple overlaps', t => {
  const rc = new SimpleRangeCollection()
  rc.add([3, 5])
  rc.add([7, 8])
  rc.add([9, 10])
  rc.add([1, 11])
  // ?rc.ranges
  t.deepEqual(rc.ranges, [1, -11], 'the largest overarching range did not cancel all inner ranges')
})

test.skip('complex sequence', t => {
  const rc = new SimpleRangeCollection()

  rc.add([1, 5])
  rc.print()
  // Should display: [1, 5)

  rc.add([10, 20])
  rc.print()
  // Should display: [1, 5) [10, 20)

  rc.add([20, 20])
  rc.print()
  // Should display: [1, 5) [10, 20)

  rc.add([20, 21])
  rc.print()
  // Should display: [1, 5) [10, 21)

  rc.add([2, 4])
  rc.print()
  // Should display: [1, 5) [10, 21)

  rc.add([3, 8])
  rc.print()
  // Should display: [1, 8) [10, 21)

  rc.remove([10, 10])
  rc.print()
  // Should display: [1, 8) [10, 21)

  rc.remove([10, 11])
  rc.print()
  // Should display: [1, 8) [11, 21)

  rc.remove([15, 17])
  rc.print()
  // Should display: [1, 8) [11, 15) [17, 21)

  rc.remove([3, 19])
  rc.print()
  // Should display: [1, 3) [19, 21)
  t.fail()
})
