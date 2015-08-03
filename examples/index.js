'use strict';

var invert = require( './../lib' );

// Create an array of random integers...
var arr = new Array( 1000 ),
	len = arr.length,
	keys,
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
