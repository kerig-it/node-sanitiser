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
	path = require('path'),
	sanitiser = require('sanitiser');

// A string, representing a "buffer".
let buffer = '';

// Prints formatted text to the console.
const print = (...array) => {

	// Column print
	if (array[0]) {
		// Formatting white space
		let whitespace = '';

		// 40, because that's just above the longest path name from
		// `./paths`.
		let wsCount = 40;

		for (var i = wsCount; i > 0; i--) {
			whitespace += ' ';
		}
		
		array.forEach(element => {

			// Is the supplied string not a white space character?
			if (!element.match(/\s/)) {
				// Reformat the supplied string.
				element = (element + whitespace).slice(0, wsCount);
			}

			// Append the formatted string to the "buffer".
			buffer += element;
		});
	}

	// Normal print
	else {
		buffer += array[1];
	}
};

// Read the `./paths` file.
let paths = fs.readFile(path.join(__dirname, 'paths'), (error, data) => {

	// Error handling
	if (error) {
		throw error;
	}

	print('Supplied', 'Sanitised', '\n\n');

	// Loop over all path names.
	data.toString().split('\n').forEach(pathname => {
		// Log "before" and "after" the sanitisation of the path name.
		print(pathname, sanitiser(pathname), '\n');
	});

	print('\n', 'Supplied', 'Sanitised', '\n\n');

	// Declare the start and end timestamps.
	let start, end;

	// Assign the start timestamp.
	start = new Date().valueOf();

	// Loop over all path names.
	data.toString().split('\n').forEach(pathname => {
		// Dummy function call.
		sanitiser(pathname);
	});

	// Assign the end timestamp.
	end = new Date().valueOf();

	// Define time strings.
	let
		d = new Date(end - start),
		time =
			d.getMinutes() + ' min ' +
			d.getSeconds() + ' sec ' +
			d.getMilliseconds() + ' ms';

	// Log the stats.
	print('-----', '\n');
	print(false, `Looped over ${data.toString().split('\n').length} path names in ${time}.`);

	// Log the "buffer" to the console.
	console.log(buffer);
});
