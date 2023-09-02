const fs = require('fs');
const path = require('path');

// Get the current directory where this script is located
const directoryPath = __dirname;

// Read all files in the current directory
fs.readdir(directoryPath, (err, files) => {
	if (err) {
		console.error('Error reading directory:', err);
		return;
	}

	// Loop through the files
	files.forEach((file) => {
		// Check if it's a JavaScript file
		if (path.extname(file) === '.js') {
			const fileName = path.basename(file, '.js'); // Remove the .js extension
			const filePath = path.join(directoryPath, file);
			const fileContent = require(filePath);
			const str = fileName.split('.')[0];
			// Export the content with the file name as the export name
			module.exports[str.charAt(0).toUpperCase() + str.slice(1)] = fileContent;
			// console.log(fileName);
		}
	});
});
