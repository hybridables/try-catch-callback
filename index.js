/*!
 * try-catch-callback <https://github.com/tunnckoCore/try-catch-callback>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

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
