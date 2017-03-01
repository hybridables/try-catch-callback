<p align="center">
  <a href="https://github.com/hybridables">
    <img height="250" width="250" src="https://avatars1.githubusercontent.com/u/10666022?v=3&s=250">
  </a>
</p>

# try-catch-callback [![NPM version](https://img.shields.io/npm/v/try-catch-callback.svg?style=flat)](https://www.npmjs.com/package/try-catch-callback) [![NPM monthly downloads](https://img.shields.io/npm/dm/try-catch-callback.svg?style=flat)](https://npmjs.org/package/try-catch-callback) [![npm total downloads][downloads-img]][downloads-url]

> try/catch block with a callback, used in [try-catch-core][]. Use it when you don't care about asyncness so much and don't want guarantees. If you care use [try-catch-core][].

[![codeclimate][codeclimate-img]][codeclimate-url] 
[![codestyle][standard-img]][standard-url] 
[![linux build][travis-img]][travis-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![codecov][coverage-img]][coverage-url] 
[![dependency status][david-img]][david-url]

## Install
```
npm i try-catch-callback --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const tryCatchCallback = require('try-catch-callback')
```

### [tryCatchCallback](index.js#L47)
> Pass a synchronous `fn` that returns some result and handle completion or errors in `cb` if given, otherwise it returns thunk which accepts that `cb`. It's possible to not work in "async mode", if that's the case try to use [try-catch-core][] for your case, which guarantees that `cb` is called only once and always in next tick, using [dezalgo][] and [once][].

**Params**

* `<fn>` **{Function}**: function to be called.    
* `[opts]` **{Object}**: optional options, such as `context` and `args`    
* `[opts.context]` **{Object}**: context to be passed to `fn`    
* `[opts.args]` **{Array}**: custom argument(s) to be pass to `fn`, given value is arrayified    
* `[opts.passCallback]` **{Boolean}**: pass `true` if you want `cb` to be passed to `fn` args    
* `[opts.return]` **{Boolean}**: if `true` returns error/value and does not calls `cb`    
* `[cb]` **{Function}**: callback with `cb(err, res)` signature.    
* `returns` **{Function}** `thunk`: if `cb` not given.  

**Example**

```js
var tryCatch = require('try-catch-callback')

tryCatch(function () {
  return 'fox qux'
}, function done (err, res) {
  if (err) return console.error(err)
  console.log(res) // => 'fox qux'
})
```

**passing custom context**

```js
const tryCatch = require('try-catch-callback')

tryCatch(function () {
  console.log(this.foo) // => 'bar'
  console.log(this.baz) // => 'qux'
  return `${this.foo}/${this.baz}`
}, {
  context: { foo: 'bar', baz: 'qux' }
}, function done (err, res) {
  if (err) return console.error(err)
  console.log(res) // => 'bar/qux'
})
```

**passing custom arguments**

```js
const tryCatchCallback = require('try-catch-callback')
const done = (err, res) => console.log(res) // => 'zzz123'
const opts = {
  args: [ { foo: 'zzz' }, 123 ]
}

tryCatchCallback((ctx, qux) => {
  return ctx.foo + qux
}, opts, done)

```

**returning a thunk**

```js
const tryCatch = require('try-catch-callback')
const thunk = tryCatch((a, b) => {
  return a + b + 3
}, { args: [1, 2] })

thunk((err, res) => {
  console.log(res) // => 6
})
```

## Related
- [catchup](https://www.npmjs.com/package/catchup): Graceful error handling. Because core `domain` module is deprecated. This share almost the same API. | [homepage](https://github.com/tunnckocore/catchup#readme "Graceful error handling. Because core `domain` module is deprecated. This share almost the same API.")
- [gana-compile](https://www.npmjs.com/package/gana-compile): Pretty small synchronous template engine built on ES2015 Template Strings, working on `node@0.10` too. No RegExps, support for helpers and… [more](https://github.com/tunnckocore/gana-compile#readme) | [homepage](https://github.com/tunnckocore/gana-compile#readme "Pretty small synchronous template engine built on ES2015 Template Strings, working on `node@0.10` too. No RegExps, support for helpers and what you want. Use [gana][] if you wanna both async and sync support.")
- [gana](https://www.npmjs.com/package/gana): Small and powerful template engine with only sync and async compile. The mid-level between [es6-template][] and [gana-compile][]. | [homepage](https://github.com/tunnckocore/gana#readme "Small and powerful template engine with only sync and async compile. The mid-level between [es6-template][] and [gana-compile][].")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")
- [try-require-please](https://www.npmjs.com/package/try-require-please): Try to require the given module, failing loudly with default message if module does not exists. | [homepage](https://github.com/tunnckocore/try-require-please#readme "Try to require the given module, failing loudly with default message if module does not exists.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/try-catch-callback/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2016-2017, [Charlike Mike Reagent](http://www.tunnckocore.tk). MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.2, on March 01, 2017._  
_Project scaffolded using [charlike][] cli._

[dezalgo]: https://github.com/npm/dezalgo
[es6-template]: https://github.com/tunnckocore/es6-template
[gana-compile]: https://github.com/tunnckocore/gana-compile
[gana]: https://github.com/tunnckocore/gana
[once]: https://github.com/isaacs/once
[try-catch-core]: https://github.com/hybridables/try-catch-core

[downloads-url]: https://www.npmjs.com/package/try-catch-callback
[downloads-img]: https://img.shields.io/npm/dt/try-catch-callback.svg

[codeclimate-url]: https://codeclimate.com/github/hybridables/try-catch-callback
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/try-catch-callback.svg

[travis-url]: https://travis-ci.org/hybridables/try-catch-callback
[travis-img]: https://img.shields.io/travis/hybridables/try-catch-callback/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/try-catch-callback
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/try-catch-callback/master.svg?label=windows

[coverage-url]: https://codecov.io/gh/hybridables/try-catch-callback
[coverage-img]: https://img.shields.io/codecov/c/github/hybridables/try-catch-callback/master.svg

[david-url]: https://david-dm.org/hybridables/try-catch-callback
[david-img]: https://img.shields.io/david/hybridables/try-catch-callback.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[always-done]: https://github.com/hybridables/always-done
[charlike]: https://github.com/tunnckocore/charlike
[commitizen]: https://github.com/commitizen/cz-cli
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb