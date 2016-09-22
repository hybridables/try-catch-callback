/*!
 * try-catch-callback <https://github.com/tunnckoCore/try-catch-callback>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

/**
 * > Pass a synchronous `fn` that returns some
 * result and handle completion or errors in `cb`
 * if given, otherwise it returns thunk which accepts
 * that `cb`. It's possible to not work in "async mode",
 * if that's the case try to use [try-catch-core][] for
 * your case, which guarantees that `cb` is called only
 * once and always in next tick, using [dezalgo][] and [once][].
 *
 * **Example**
 *
 * ```js
 * var tryCatch = require('try-catch-callback')
 *
 * tryCatch(function () {
 *   return 'fox qux'
 * }, function done (err, res) {
 *   if (err) return console.error(err)
 *   console.log(res) // => 'fox qux'
 * })
 * ```
 *
 * @param  {Function} `<fn>` function to be called.
 * @param  {Function} `[cb]` callback with `cb(err, res)` signature.
 * @return {Function} `thunk` if `cb` not given.
 * @throws {TypError} if `fn` not a function.
 * @throws {TypError} if no function is passed to `thunk`.
 * @api public
 */

module.exports = function tryCatchCallback (fn, cb) {
  if (typeof fn !== 'function') {
    throw new TypeError('try-catch-callback: expect `fn` to be a function')
  }
  if (typeof cb !== 'function') {
    return function thunk (done) {
      tryCatch(fn, done)
    }
  }
  tryCatch(fn, cb)
}

function tryCatch (fn, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('try-catch-callback: expect `cb` to be a function')
  }
  var ret = null

  try {
    ret = fn()
  } catch (err) {
    if (!cb.called) return cb(err)
  }

  if (!cb.called) return cb(null, ret)
}
