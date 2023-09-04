// main.js

const { Worker, isMainThread } = require('worker_threads');

const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9, 10];

if (isMainThread) {
	async function processArrays() {
		// Create a Promise for each array processing task
		const promises = [];

		// Create a worker for array1
		const worker1 = new Worker('./arrayOperationsWorker.js', {
			workerData: { arrayToProcess: array1 },
		});

		// Create a worker for array2
		const worker2 = new Worker('./arrayOperationsWorker.js', {
			workerData: { arrayToProcess: array2 },
		});

		// Handle worker responses and store them in an array
		// const results = [];

		// worker1.on('message', (result1) => {
		// 	results.push(result1);
		// });

		// worker2.on('message', (result2) => {
		// 	results.push(result2);
		// });

		// Promisify the worker threads
		const worker1Promise = new Promise((resolve) => {
			worker1.on('message', (result1) => {
				resolve(result1);
			});
		});

		const worker2Promise = new Promise((resolve) => {
			worker2.on('message', (result2) => {
				resolve(result2);
			});
		});

		promises.push(worker1Promise, worker2Promise);

		// Wait for all worker tasks to complete
		let results = await Promise.all(promises);

		// Now you have all the results, and you can send the response to the user
		console.log(
			'All worker tasks are completed. Sending the response to the user.'
		);
		console.log('Results:', results);

		// You can send the response to the user here
	}

	// Call the function to process arrays and send the response
	processArrays();
}
