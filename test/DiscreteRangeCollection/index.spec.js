'use strict'

const test = require('ava').default
const { DiscreteRangeCollection } = require('../../src/DiscreteRangeCollection')

test('instantiate', t => {
  const rc = new DiscreteRangeCollection()
  t.true(rc instanceof DiscreteRangeCollection)
})
