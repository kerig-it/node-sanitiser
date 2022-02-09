// Sanitiser
//
// sanitiser is a path name sanitiser.
//
// You can find documentation on the usage of this package in the
// README file in this repository.
//
// GitHub: https://github.com/kerig-it/sanitiser
// npm: https://www.npmjs.com/package/sanitiser


// Node modules (these, among others, are added as dependancies in the
// `package.json` file, so you'd only need to run `npm i` in the
// terminal to install all dependancies).
const truncate = require('truncate-utf8-bytes');

// Sanitiser
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
		}
	}

	// Truncate `pathname` string to 4096 bytes.
	pathname = truncate(pathname, 4096);

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
	pathname.split('/').forEach(e => {

		// Validate the item with previously defined regular
		// expressions and append it to the `sanitised` variable.

		// Is `ignoreControl` disabled?
		if (!options?.ignoreControl) {
			// Replace control characters.
			e = e.replace(control, replacement);
		}

		// Is `ignoreIllegal` disabled?
		if (!options?.ignoreIllegal) {
			// Replace illegal characters.
			e = e.replace(illegal, replacement);
		}

		// Is `ignoreRelative` disabled?
		if (!options?.ignoreRelative) {
			// Replace attempts to make a relative path.
			e = e.replace(relative, replacement);
		}

		sanitised += `/${e}`;
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
