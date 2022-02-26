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

	// Was a path name supplied?
	if (pathname) {

		// Define a custom internal error.
		let internalError;

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
				internalError = new Error('The supplied path must be of type string.');

				// Is there a callback supplied?
				if (callback) {
					// Return the callback with the internal error
					// passed as an argument.
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
		if (options?.replacement) {
			// Set the replacer to empty an string.
			replacement = options.replacement;
		}

		// Define a directory separator.
		let separator;

		// Was a separator supplied in the options?
		if (options?.separator) {

			// Is the separator set to 'system'?
			if (options.separator === 'system') {
				// Assign a system separator.
				separator = path.sep;
			}

			// Is a custom separator supplied?
			else {
				// Assign a custom separator.
				separator = options.separator;
			}
		}

		// Was no separator supplied in the options?
		else {

			// Does the path name contain the Windows directory separator?
			if (pathname.match(/\\/)) {
				// Assign the Windows directory separator.
				separator = '\\';
			}

			// For all other cases...
			else {
				// Assign the Unix directory separator.
				separator = '/';
			}
		}

		// Define the `sanitised` variable. This will eventually be
		// returned by this function and will hold the sanitised path
		// name.
		let sanitised = '';

		// Loop over all items of the supplied path name.
		pathname.split(separator).forEach((item, index, array) => {

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
					// Append the item with the prefixed directory separator.
					sanitised += separator + item;
				}

				// Is this iteration a trailing slash?
				else if (index === array.length - 1 && !item) {
					// Append the trailing slash.
					sanitised += separator;
				}
			}
		});

		// Is there a callback?
		if (callback) {
			// Call the callback function with two arguments.
			return callback(internalError, sanitised);
		}

		// Return the modified string of the path name.
		return sanitised;
	}

	// Was no path name supplied?
	else {
		// Throw an error.
		throw new Error('No arguments were supplied.');
	}
};

// Export the `sanitise` function.
module.exports = sanitise;
