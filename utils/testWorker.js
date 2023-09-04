// main.js

const { Worker, isMainThread, parentPort } = require('worker_threads');

// Sample arrays to process (you can replace these with your own arrays)
const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9, 10];

if (isMainThread) {
	// Create a new worker thread for array1
	const worker1 = new Worker('./arrayOperationsWorker.js', {
		workerData: { arrayToProcess: array1 },
	});

	// Create a new worker thread for array2
	const worker2 = new Worker('./arrayOperationsWorker.js', {
		workerData: { arrayToProcess: array2 },
	});

	// Listen for messages from worker1
	worker1.on('message', (result1) => {
		console.log('Result from worker1:', result1);
	});

	// Listen for messages from worker2
	worker2.on('message', (result2) => {
		console.log('Result from worker2:', result2);
	});

	// You can continue processing in the main thread while workers run concurrently
	console.log('Main thread continues processing...');
} else {
	// Worker thread code is defined in arrayOperationsWorker.js
}
