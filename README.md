Object Inverse
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Inverts an object, such that keys are values and values are keys.


## Installation

``` bash
$ npm install utils-object-inverse
```


## Usage

``` javascript
var invert = require( 'utils-object-inverse' );
```

#### invert( obj[, opts] )

Inverts an `object`, such that keys are values and values are keys.

``` javascript
var out = invert({
	'a': 'beep',
	'b': 'boop'
});
// returns {'beep':'a','boop':'b'}
```

The function accepts the following options:

*	__duplicates__: `boolean` indicating whether to store keys mapped to duplicate values in `arrays`. Default: `true`.

By default, keys mapped to duplicate values are stored in `arrays`.

``` javascript
var out = invert({
	'a': 'beep',
	'b': 'beep'
});
// returns {'beep':['a','b']}
```

To __not__ allow duplicates, set the `duplicates` option to `false`. The output `key-value` pair will be the `key` most recently inserted into the input `object`.

``` javascript
var obj = {};
obj.a = 'beep';
obj.b = 'boop';
obj.c = 'beep'; // inserted after `a`

var out = invert( obj, {
	'duplicates': false
});
// returns {'beep':'c','boop':'b'}
```

## Notes

*	Insertion order is not guaranteed, as `object` keys are unsorted according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an `object`'s keys, thus allowing for deterministic inversion.
*	Beware when providing `objects` having values which are themselves `objects`. This implementation relies on native `object` serialization (`#toString`) when converting values to keys.
	
	``` javascript
	var obj = {
		'a': [1,2,3],
		'b': {'c':'d'}
	};

	var out = invert( obj );
	// returns {'1,2,3':'a','[object Object]':'b'}
	```


## Examples

``` javascript
var invert = require( 'utils-object-inverse' );

// Create an array of random integers...
var arr = new Array( 1000 ),
	len = arr.length,
	out,
	i;

for ( i = 0; i < len; i++ ) {
	arr[ i ] = Math.round( Math.random()*100 );
}
// Invert the array to determine value frequency...
out = invert( arr );
keys = Object.keys( out );
len = keys.length;
for ( i = 0; i < len; i++ ) {
	out[ i ] = out[ i ].length;
}
console.dir( out );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-object-inverse.svg
[npm-url]: https://npmjs.org/package/utils-object-inverse

[travis-image]: http://img.shields.io/travis/kgryte/utils-object-inverse/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-object-inverse

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-object-inverse/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-object-inverse?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-object-inverse.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-object-inverse

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-object-inverse.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-object-inverse

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-object-inverse.svg
[github-issues-url]: https://github.com/kgryte/utils-object-inverse/issues
