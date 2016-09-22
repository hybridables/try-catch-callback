/*!
 * try-catch-callback <https://github.com/tunnckoCore/try-catch-callback>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var test = require('mukla')
var tryCatch = require('./index')

test('should throw TypeError if `fn` not a function', function (done) {
  function fixture () {
    tryCatch(123)
  }
  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `fn` to be a function/)
  done()
})

test('should throw TypeError if no function passed to the thunk', function (done) {
  var thunk = tryCatch(function () {
    return 'qux'
  })
  function fixture () {
    thunk(123)
  }
  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `cb` to be a function/)
  done()
})

test('should get error in `cb` if `fn` throws', function (done) {
  tryCatch(function () {
    throw new Error('foo qux')
  }, function (err) {
    test.ifError(!err)
    test.strictEqual(err.name, 'Error')
    test.strictEqual(err.message, 'foo qux')
    done()
  })
})

test('should get result in `cb` if `fn` returns', function (done) {
  tryCatch(function () {
    return 'foo bar'
  }, function (err, res) {
    test.ifError(err)
    test.strictEqual(res, 'foo bar')
    done()
  })
})

test('should return thunk if no `cb` passed', function (done) {
  var thunk = tryCatch(function () {
    return 123
  })
  thunk(function (err, res) {
    test.ifError(err)
    test.strictEqual(res, 123)
    done()
  })
})
