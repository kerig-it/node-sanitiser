/*
	A path name sanitizer.

	Github:
	https://github.com/kerig-it/sanitize
*/


// Modules

const truncate = require('truncate-utf8-bytes');


// Sanitizer

const sanitize = (pathname, replacement) => {

	// Is `pathname` not a string?

	if (typeof(pathname) !== 'string') {

		// String conversion

		try {

			// Try to convert it to a string.

			pathname = pathname.toString();
		}
		catch (error) {

			// Throw error.

			throw new Error('Passed argument must be of type string.');
		}
	}


	// Truncate `pathname` string to 4096 bytes.

	pathname = truncate(pathname, 4096);


	// Define regular expressions.

	let

		// Illegal characters

		illegal = /[\?<>\\:\*\|"]/g,


		// Control characters

		control = /[\x00-\x1f\x80-\x9f]/g,


		// Relative paths

		relative = /^\.+$/;


	// Was a replacer not set?

	if (!replacement) {

		// Set to empty string.

		replacement = '';
	}


	// Define `sanitized` variable.

	let sanitized = '';


	// Loop over all pathname items.

	pathname.split('/').forEach(e => {

		/*
			Validate the item with previously defined regular expressions and append
			it to the `sanitized` variable.
		*/

		sanitized += '/' + e

			// Replace illegal characters.

			.replace(illegal, replacement)


			// Replace control characters. (temporarily disabled)

			.replace(control, replacement)


			// Replace attempts to make a relative path.

			.replace(relative, replacement);
	});


	// Return the modified string of the pathname.

	return sanitized;
};


// Export

module.exports = sanitize;
