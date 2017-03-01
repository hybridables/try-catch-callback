/*!
 * try-catch-callback <https://github.com/hybridables/try-catch-callback>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var extend = require('extend-shallow')

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
 * @param  {Object} `[opts]` optional options, such as `context` and `args`
 * @param  {Object} `[opts.context]` context to be passed to `fn`
 * @param  {Array} `[opts.args]` custom argument(s) to be pass to `fn`, given value is arrayified
 * @param  {Boolean} `[opts.passCallback]` pass `true` if you want `cb` to be passed to `fn` args
 * @param  {Boolean} `[opts.return]` if `true` returns error/value and does not calls `cb`
 * @param  {Function} `[cb]` callback with `cb(err, res)` signature.
 * @return {Function} `thunk` if `cb` not given.
 * @throws {TypError} if `fn` not a function.
 * @throws {TypError} if no function is passed to `thunk`.
 * @api public
 */

module.exports = function tryCatchCallback (fn, opts, cb) {
  if (typeof fn !== 'function') {
    throw new TypeError('try-catch-callback: expect `fn` to be a function')
  }
  if (typeof opts === 'function') {
    cb = opts
    opts = false
  }
  opts = extend({}, opts)

  if (opts.return || typeof cb === 'function') {
    return tryCatch.call(this, fn, opts, cb)
  }
  return function thunk (done) {
    opts.thunk = true
    tryCatch.call(this, fn, opts, done)
  }
}

function tryCatch (fn, opts, cb) {
  if (opts.thunk && typeof cb !== 'function') {
    throw new TypeError('try-catch-callback: expect `cb` to be a function')
  }
  var args = arrayify(opts.args)
  var ctx = opts.context || this
  var ret = null

  try {
    ret = fn.apply(ctx, opts.passCallback ? args.concat(cb) : args)
  } catch (err) {
    return opts.return ? err : cb(err)
  }

  if (opts.return) return ret
  if (!opts.passCallback) cb(null, ret)
}

function arrayify (val) {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}
