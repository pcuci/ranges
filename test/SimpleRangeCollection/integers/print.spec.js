'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('crosses zero', t => {
  const expected = '[-3, 4)'
  const rc = new SimpleRangeCollection()

  rc.add([-3, 4])

  t.is(rc.print(), expected)
})
