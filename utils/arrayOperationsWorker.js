const { parentPort, workerData } = require('worker_threads');
const { wishlistDataByID, cartDataByID } = require('../services/product');

// Function to perform array operation
async function performArrayOperation(arr, user_id) {
	try {
		let promiseArray = [];
		for (const item of arr) {
			promiseArray.push(wishlistDataByID(item['product_id'], user_id));
			promiseArray.push(cartDataByID(item['product_id'], user_id));
		}
		const promiseResult = await Promise.all(promiseArray);
		const lengthOfArray = arr.length;
		let item = {};
		for (let i = 0; i < lengthOfArray; i++) {
			item = arr[i];
			// For wishlist_data;
			if (promiseResult[i * 2]) {
				// 0 2 4
				item.wishlist_data = true;
				item.wishlist_id = promiseResult[i].id;
			} else {
				item.wishlist_data = false;
				item.wishlist_id = '';
			}
			// For Cart data;
			if (promiseResult[i * 2 + 1]) {
				// 1 3 5
				item.cart_data = true;
				item.cart_id = [promiseResult[i] * 2 + 1].id;
			} else {
				item.cart_data = false;
				item.cart_id = '';
			}
		}
		// Send the result back to the main thread
		parentPort.postMessage(arr);
	} catch (error) {
		console.trace(error);
		next(error);
	}
}

// Receive data from the main thread
const { arrayToProcess, user_id } = workerData;

// Perform the array operation
performArrayOperation(arrayToProcess, user_id);
