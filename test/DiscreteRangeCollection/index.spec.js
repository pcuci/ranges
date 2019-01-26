'use strict'

const test = require('ava').default
const { DiscreteRangeCollection } = require('../../src/DiscreteRangeCollection')

test('instantiate', t => {
  const rc = new DiscreteRangeCollection()
  t.true(rc instanceof DiscreteRangeCollection)
})

test('new non-empty', t => {
  const rc = new DiscreteRangeCollection([1, 3])
  t.deepEqual(rc.ranges, [1, 3])
})

test('new throws', t => {
  let rc
  const error = t.throws(() => {
    rc = new DiscreteRangeCollection([1, 3, 'dsg', false])
  }, Error)

  t.is(error.message, 'ranges must be numbers')
  t.is(rc, undefined)
})

test('dezeroes', t => {
  const rc = new DiscreteRangeCollection([1, 2, 2, 3])
  t.deepEqual(rc.ranges, [1, 3])
})
