/*
 * Sanitiser—A path name sanitiser.
 *
 * You can find documentation on the usage of this package in the
 * README file in the root directory of this repository.
 *
 * Website: https://pkg.kerig.ee/sanitiser
 * GitHub:  https://github.com/kerig-it/sanitiser
 * npm:     https://www.npmjs.com/package/sanitiser
 *
 * Made with ❤️ by Kerig.
*/

// Node modules (these are added as dependencies in the `package.json`
// file, so you'd only need to run `npm i` in the terminal to install
// all dependancies).
const
	path = require('path'),
	truncate = require('truncate-utf8-bytes');

// Sanitises path names.
const sanitise = (pathname, options, callback) => {

	// Define custom internal error.
	let internalError = false;

	// Are `options` not supplied but `callback` is?
	if ((typeof(options) === 'function' && !callback)) {
		// Reassign arguments.
		callback = options;
		options = {};
	}

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
			internalError = new Error('\`pathname\` must be of type string.');

			// Is there a callback supplied?
			if (callback) {
				// Return the callback with the internal error passed
				// as an argument.
				return callback(internalError);
			}

			// Throw the internal error.
			throw internalError;
		}
	}

	// Is `noTruncation` disabled?
	if (!options?.noTruncation) {
		// Truncate `pathname` string to 4096 bytes.
		pathname = truncate(pathname, 4096);
	}

	// Define regular expressions for validation.
	let
		// Control characters
		control = /[\x00-\x1f\x80-\x9f]/g,

		// Illegal characters
		illegal = /[\?<>:\*\|"]/g,

		// Relative paths
		relative = /^\.+$/;

	// Define a replacer.
	let replacement = '';

	// Was a replacer not set?
	if (options && options.replacement) {
		// Set the replacer to empty an string.
		replacement = options.replacement;
	}

	// Define the `sanitised` variable. This will eventually be
	// returned by this function and will hold the sanitised path name.
	let sanitised = '';

	// Loop over all items of the supplied path name.
	pathname.split(path.sep).forEach(item => {

		// Is the item not an empty string?
		if (item) {

			// Validate the item with previously defined regular
			// expressions and append it to the `sanitised` variable.

			// Is `ignoreControl` disabled?
			if (!options?.ignoreControl) {
				// Replace control characters.
				item = item.replace(control, replacement);
			}

			// Is `ignoreIllegal` disabled?
			if (!options?.ignoreIllegal) {
				// Replace illegal characters.
				item = item.replace(illegal, replacement);
			}

			// Is `ignoreRelative` disabled?
			if (!options?.ignoreRelative) {
				// Replace attempts to make a relative path.
				item = item.replace(relative, replacement);
			}

			// Is the resulting item not an empty string?
			if (item) {
				// Append the item with a prefixed directory separator.
				sanitised += path.sep + item;
			}
		}
	});

	// Is there a callback?
	if (callback) {
		// Call the callback function with 2 arguments.
		return callback(internalError, sanitised);
	}

	// Return the modified string of the pathname.
	return sanitised;
};

// Export the `sanitise` function.
module.exports = sanitise;
