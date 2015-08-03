/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	invert = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-object-inverse', function tests() {

	it( 'should export a function', function test() {
		expect( invert ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an object or array', function test() {
		var values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				invert( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				invert( {}, value );
			};
		}
	});

	it( 'should throw an error if provided a duplicates option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				invert( {}, {
					'duplicates': value
				});
			};
		}
	});

	it( 'should return an empty object if provided an empty object', function test() {
		assert.deepEqual( invert({}), {} );
	});

	it( 'should invert an object', function test() {
		var expected,
			actual,
			obj;

		obj = {
			'a': 'beep',
			'b': 'boop',
			'c': true,
			'd': null,
			'e': [1,2,3],
			'f': {'a':'b'},
			'g': 1
		};
		expected = {
			'beep': 'a',
			'boop': 'b',
			'true': 'c',
			'null': 'd',
			'1,2,3': 'e',
			'[object Object]': 'f',
			'1': 'g'
		};

		actual = invert( obj );
		assert.deepEqual( actual, expected );
	});

	it( 'should handle duplicate values', function test() {
		var expected,
			actual,
			obj;

		obj = {
			'a': 'beep',
			'b': 'beep',
			'c': 'boop',
			'd': 'boop',
			'e': 'boop'
		};
		expected = {
			'beep': ['a','b'],
			'boop': ['c','d','e']
		};
		actual = invert( obj );

		assert.deepEqual( actual, expected );
	});

	it( 'should support overriding duplicate values', function test() {
		var expected,
			actual,
			obj;

		obj = {
			'a': 'beep',
			'b': 'beep'
		};
		expected = {
			'beep': 'b'
		};
		actual = invert( obj, {
			'duplicates': false
		});

		assert.deepEqual( actual, expected );
	});

	it( 'should ignore unknown options', function test() {
		var expected,
			actual,
			obj;

		obj = {
			'a': 'beep',
			'b': 'beep'
		};
		expected = {
			'beep': ['a','b']
		};
		actual = invert( obj, {
			'bee': 'bop'
		});

		assert.deepEqual( actual, expected );
	});

});
