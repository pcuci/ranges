'use strict'

const test = require('ava').default
const { SimpleRangeCollection } = require('../../../src/SimpleRangeCollection')

test('complex sequence', t => {
  const rc = new SimpleRangeCollection()

  rc.add([-5, -1])
  t.is(rc.print(), '[-5, -1)')

  rc.add([-20, -10])
  t.is(rc.print(), '[-20, -10) [-5, -1)')

  rc.add([-20, -20])
  t.is(rc.print(), '[-20, -10) [-5, -1)')

  rc.add([-21, -20])
  t.is(rc.print(), '[-21, -10) [-5, -1)')

  rc.add([-4, -2])
  t.is(rc.print(), '[-21, -10) [-5, -1)')

  rc.add([-8, -3])
  t.is(rc.print(), '[-21, -10) [-8, -1)')

  rc.remove([-10, -10])
  t.is(rc.print(), '[-21, -10) [-8, -1)')

  rc.remove([-11, -10])
  t.is(rc.print(), '[-21, -11) [-8, -1)')

  rc.remove([-17, -15])
  t.is(rc.print(), '[-21, -17) [-15, -11) [-8, -1)')

  rc.remove([-19, -3])
  t.is(rc.print(), '[-21, -19) [-3, -1)')
})
