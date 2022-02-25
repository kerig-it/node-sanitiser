/*
 * Test script for the `sanitiser` package.
 *
 * Refer to the README in the root directory of this repository for
 * more information on testing this package.
 *
 * Website: https://pkg.kerig.ee/sanitiser
 * GitHub:  https://github.com/kerig-it/sanitiser
 * npm:     https://www.npmjs.com/package/sanitiser
 *
 * Made with ❤️ by Kerig.
*/

// Node modules
const
	fs = require('fs'),
	sanitiser = require('sanitiser');

// "Buffer", represnting a string.
let buffer = '';

// Prints formatted text to the console.
const print = (...array) => {

	// Formatting variables
	let ws = '';

	for (var i = 39; i >= 0; i--) {
		ws += ' ';
	}
	
	array.forEach(element => {

		// Is the supplied string not a white space character?
		if (element.match(/[^\s]/)) {
			// Reformat the supplied string.
			element = (element + ws).slice(0, 40);
		}

		// Append the formatted string to the buffer.
		buffer += element;
	});
};

// Read the `paths` file.
let paths = fs.readFile('paths', (error, data) => {

	// Error handling
	if (error) {
		throw error;
	}

	print('Supplied', 'Sanitised', '\n');

	// Loop over all path names.
	data.toString().split('\n').forEach(pathname => {
		// Log "before" and "after" the sanitisation of the path name.
		print(pathname, sanitiser(pathname), '\n');
	});

	// Log the buffer to the console.
	console.log(buffer);
});
