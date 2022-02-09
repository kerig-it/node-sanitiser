// Tester of `sanitiser`.

// Node modules
const
	fs = require('fs'),
	sanitiser = require('sanitiser');

// Read `paths.list`.
let paths = fs.readFile('paths.list',(error, data) => {

	// Loop over all entries.
	data.toString().split('\n').forEach(e => {
		// Log sanitisation.
		console.log(`Path     : ${e}`);
		console.log(`Sanitised: ${sanitiser(e)}\n`);
	});
});
