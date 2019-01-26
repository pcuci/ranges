'use strict'

const test = require('ava').default
const { DiscreteRangeCollection } = require('../../src/DiscreteRangeCollection')

test.skip('one', t => {
  const expected = '[3, 5)'
  const rc = new DiscreteRangeCollection()

  rc.add([3, 5])

  t.is(rc.print(), expected)
})

test.skip('series', t => {
  const expected = '[1, 3) [4, 10)'
  const rc = new DiscreteRangeCollection()

  rc.add([1, 10])
  rc.remove([3, 4])

  t.is(rc.print(), expected)
})
