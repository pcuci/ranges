'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../src/SimpleRangeCollection')

test('one', t => {
  const expected = '[3, 5)'
  const rc = new SimpleRangeCollection()

  rc.add([3, 5])

  t.is(rc.print(), expected)
})

test('series', t => {
  const expected = '[1, 3) [4, 10)'
  const rc = new SimpleRangeCollection()

  rc.add([1, 10])
  rc.remove([3, 4])

  t.is(rc.print(), expected)
})
