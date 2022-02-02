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

// Define allowed options.
let allowedOptions = [
	'ignoreControl',
	'ignoreIllegal',
	'ignoreRelative'
];

// Options validator
const checkOptions = object => {

	// Is `object` an object?
	if (typeof(object) === 'object') {
		
		// Loop over all object properties.
		for (const property in object) {

			// Is the property not one of the allowed options?
			if (!allowedOptions.includes(property)) {
				// Throw an error.
				throw new Error(`The ${property} property is invalid.`);
			}
		}

		// Return a successful status.
		return true;
	}

	// Throw an error.
	throw new Error('The \`options\` argument must of type object.');
};


// Sanitiser
const sanitise = (pathname, replacement, options) => {

	// Are any options supplied?
	if (options || (typeof(replacement) === 'object' && !options)) {

		// Is the `replacement` not supplied but `options` are?
		if (typeof(replacement) === 'object' && !options) {
			// Reassign arguments.
			options = replacement;
			replacement = '';
		}

		// Validate the supplied options.
		checkOptions(options);
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
			throw new Error('Passed argument must be of type string.');
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

		// Is `ignoreControl` disabled?
		if (!options.ignoreControl) {
			// Replace control characters.
			sanitised += '/' + e.replace(control, replacement);
		}

		// Is `ignoreIllegal` disabled?
		if (!options.ignoreIllegal) {
			// Replace illegal characters.
			sanitised += '/' + e.replace(illegal, replacement);
		}

		// Is `ignoreRelative` disabled?
		if (!options.ignoreRelative) {
			// Replace attempts to make a relative path.
			sanitised += '/' + e.replace(relative, replacement);
		}
	});

	// Return the modified string of the pathname.
	return sanitised;
};

// Export the `sanitise` function.
module.exports = sanitise;
