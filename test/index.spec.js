'use strict'

const test = require('ava').default
const RangeCollection = require('../index')

test.before((t) => {
  // Example run
  t.context.rc = new RangeCollection()
})

test('complex sequence', t => {
  t.context.rc.add([1, 5])
  t.context.rc.print()
  // Should display: [1, 5)

  t.context.rc.add([10, 20])
  t.context.rc.print()
  // Should display: [1, 5) [10, 20)

  t.context.rc.add([20, 20])
  t.context.rc.print()
  // Should display: [1, 5) [10, 20)

  t.context.rc.add([20, 21])
  t.context.rc.print()
  // Should display: [1, 5) [10, 21)

  t.context.rc.add([2, 4])
  t.context.rc.print()
  // Should display: [1, 5) [10, 21)

  t.context.rc.add([3, 8])
  t.context.rc.print()
  // Should display: [1, 8) [10, 21)

  t.context.rc.remove([10, 10])
  t.context.rc.print()
  // Should display: [1, 8) [10, 21)

  t.context.rc.remove([10, 11])
  t.context.rc.print()
  // Should display: [1, 8) [11, 21)

  t.context.rc.remove([15, 17])
  t.context.rc.print()
  // Should display: [1, 8) [11, 15) [17, 21)

  t.context.rc.remove([3, 19])
  t.context.rc.print()
  // Should display: [1, 3) [19, 21)
  t.fail()
})