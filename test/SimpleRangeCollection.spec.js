'use strict'

const test = require('ava').default
const SimpleRangeCollection = require('../src/SimpleRangeCollection')

test.before((t) => {
  // @ts-ignore
  t.context.rc = new SimpleRangeCollection()
})

test('instantiate', t => {
  // @ts-ignore
  t.true(t.context.rc instanceof SimpleRangeCollection)
})

test('add to empty', t => {
  // @ts-ignore
  t.context.rc.add([1, 5])
  console.log(t.context.rc.ranges)
  t.deepEqual(t.context.rc.ranges.length, 2)
})

test.skip('complex sequence', t => {
  // @ts-ignore
  t.context.rc.add([1, 5])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 5)

  // @ts-ignore
  t.context.rc.add([10, 20])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 5) [10, 20)

  // @ts-ignore
  t.context.rc.add([20, 20])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 5) [10, 20)

  // @ts-ignore
  t.context.rc.add([20, 21])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 5) [10, 21)

  // @ts-ignore
  t.context.rc.add([2, 4])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 5) [10, 21)

  // @ts-ignore
  t.context.rc.add([3, 8])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 8) [10, 21)

  // @ts-ignore
  t.context.rc.remove([10, 10])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 8) [10, 21)

  // @ts-ignore
  t.context.rc.remove([10, 11])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 8) [11, 21)

  // @ts-ignore
  t.context.rc.remove([15, 17])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 8) [11, 15) [17, 21)

  // @ts-ignore
  t.context.rc.remove([3, 19])
  // @ts-ignore
  t.context.rc.print()
  // Should display: [1, 3) [19, 21)
  t.fail()
})
