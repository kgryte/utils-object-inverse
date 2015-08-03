'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// INVERT //

/**
* FUNCTION: invert( obj, opts )
*	Inverts an object, such that keys are values and values are keys.
*
* @param {Object|Array} obj - input object
* @param {Object} [opts] - function options
* @param {Boolean} [opts.duplicates=true] - boolean indicating whether to store duplicate keys
* @returns {Object} inverted object
*/
function invert( obj, opts ) {
	var allowDupes = true,
		keys,
		len,
		key,
		val,
		out,
		v, i;
	if ( !isObject( obj ) && !isArray( obj ) ) {
		throw new TypeError( 'invert()::invalid input argument. First argument must be either a plain object or an array. Value: `' + obj + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'invert()::invalid input argument. Options arguments must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'duplicates' ) ) {
			allowDupes = opts.duplicates;
			if ( !isBoolean( allowDupes ) ) {
				throw new TypeError( 'invert()::invalid input argument. Duplicates option must be a boolean primitive. Option: `' + allowDupes + '`.' );
			}
		}
	}
	keys = Object.keys( obj );
	len = keys.length;
	out = {};
	if ( allowDupes ) {
		for ( i = 0; i < len; i++ ) {
			key = keys[ i ];
			val = obj[ key ];
			v = out[ val ];
			if ( v === void 0 ) {
				out[ val ] = key;
			}
			else if ( isArray( v ) ) {
				out[ val ].push( key );
			}
			else {
				out[ val ] = [ v, key ];
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			key = keys[ i ];
			out[ obj[ key ] ] = key;
		}
	}
	return out;
} // end FUNCTION invert()


// EXPORTS //

module.exports = invert;
