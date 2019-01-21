'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('one', t => {
  const expected = '[-5, -3)'
  const rc = new SimpleRangeCollection()

  rc.add([-5, -3])

  t.is(rc.print(), expected)
})

test('series', t => {
  const expected = '[-10, -4) [-3, -1)'
  const rc = new SimpleRangeCollection()

  rc.add([-10, -1])
  rc.remove([-4, -3])
  // ?rc.negativeRanges
  t.is(rc.print(), expected)
})

test('zero interval', t => {
  const expected = '[-5, -3)'
  const rc = new SimpleRangeCollection()

  rc.add([-5, -3])
  rc.add([-4, -4])

  t.is(rc.print(), expected)
})
