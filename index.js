/*
	A path name sanitiser.

	You can find documentation on the usage of this package in the
	README file in this repository.

	Github: https://github.com/kerig-it/sanitiser
*/


// Node modules (these, among others, are added as dependancies in the
// `package.json` file, so you'd only need to run `npm i` in the
// terminal to install all dependancies).

const truncate = require('truncate-utf8-bytes');


// **The Sanitiser**

const sanitise = (pathname, replacement) => {

	// Is `pathname` not a string?

	if (typeof(pathname) !== 'string') {

		// String conversion

		try {
			// Try to convert it to a string.
			pathname = pathname.toString();
		}
		catch (error) {

			// If there was an error in converting the supplied
			// `pathname` argument to a string, throw an error.

			throw new Error('Passed argument must be of type string.');
		}
	}


	// Truncate `pathname` string to 4096 bytes.

	pathname = truncate(pathname, 4096);


	// Define regular expressions for validation.

	let
		// Illegal characters
		illegal = /[\?<>\\:\*\|"]/g,

		// Control characters
		control = /[\x00-\x1f\x80-\x9f]/g,

		// Relative paths
		relative = /^\.+$/;


	// Was a replacer not set?

	if (!replacement) {
		// Set the replacer to empty an string.
		replacement = '';
	}


	// Define the `sanitised` variable. This will eventually be
	// returned by this function and will hold the sanitised path name.

	let sanitised = '';


	// Loop over all items of the supplied path name.

	pathname.split('/').forEach(e => {

		// Validate the item with previously defined regular
		// expressions and append it to the `sanitised` variable.

		sanitised += '/' + e // <-- Current directory/file in the path.

			// Replace illegal characters.
			.replace(illegal, replacement)

			// Replace control characters.
			.replace(control, replacement)

			// Replace attempts to make a relative path.
			.replace(relative, replacement);
	});


	// Return the modified string of the pathname.

	return sanitised;
};


// Export the `sanitise` function.

module.exports = sanitise;
