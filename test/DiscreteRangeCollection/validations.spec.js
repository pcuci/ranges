'use strict'

const test = require('ava').default
const { isNumbers } = require('../../src/DiscreteRangeCollection')

test('has numbers only', t => {
  t.is(isNumbers([2, 2, 4, 5]), true)
})

test('not numbers throws', t => {
  const error = t.throws(() => {
    isNumbers([2, 2, 4, 'string'])
  }, Error)

  t.is(error.message, 'ranges must be numbers')
})

// TODO add hasEvenLength and isMonotonic tests
