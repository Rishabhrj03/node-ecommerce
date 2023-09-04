const { parentPort, workerData } = require('worker_threads');

// Function to perform array operation
function performArrayOperation(arr) {
	// Simulate some array operation (e.g., calculating the sum)
	const result = arr.reduce((acc, current) => acc + current, 0);
	return result;
}

// Receive data from the main thread
const { arrayToProcess } = workerData;

// Perform the array operation
const result = performArrayOperation(arrayToProcess);

// Send the result back to the main thread
parentPort.postMessage(result);
