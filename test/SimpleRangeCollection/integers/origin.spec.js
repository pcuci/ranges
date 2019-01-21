'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('crosses positive zero', t => {
  const rc = new SimpleRangeCollection()

  rc.add([0, 5])
  rc.add([0, 4])

  t.deepEqual(rc.positiveRanges, [0, -5])
})

test('crosses negative zero', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, 0])
  rc.add([-4, 0])

  t.deepEqual(rc.negativeRanges, [0, -5])
})

test('crosses zero', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, 5])
  rc.add([-4, 4])

  t.deepEqual(rc.positiveRanges, [0, -5])
  t.deepEqual(rc.negativeRanges, [0, -5])
})
