'use strict'

const test = require('ava').default
const { DiscreteRangeCollection } = require('../../src/DiscreteRangeCollection')

test('complex requirements', t => {
  const rc = new DiscreteRangeCollection()

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
