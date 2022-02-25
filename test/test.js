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

// Read the `paths` file.
let paths = fs.readFile('paths', (error, data) => {

	// Error handling
	if (error) {
		throw error;
	}

	// Loop over all path names.
	data.toString().split('\n').forEach(pathname => {
		// Log "before" and "after" the sanitisation of the path name.
		console.log(`Supplied:  ${pathname}`);
		console.log(`Sanitised: ${sanitiser(pathname)}\n`);
	});
});
