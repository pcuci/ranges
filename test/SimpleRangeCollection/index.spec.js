'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../src/SimpleRangeCollection')

test('instantiate', t => {
  const rc = new SimpleRangeCollection()
  t.true(rc instanceof SimpleRangeCollection)
})

test.skip('nothing', (t) => {})
