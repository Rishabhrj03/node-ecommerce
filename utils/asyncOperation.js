module.exports = function asyncOperation(operation, timer = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const result = operation; // Example processing
			resolve(result);
		}, timer); // Simulated async operation
	});
};

// Eg -> operation = array.map((item) => item * 2)
