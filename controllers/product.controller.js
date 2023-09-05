const { Worker, isMainThread } = require('worker_threads');

const {
	slider: sliderService,
	getAllProductData,
	wishlistDataByID,
	cartDataByID,
	getAllPopularProductData,
	categoryData,
	getFeaturedProducts,
	cartDataCountByUserID,
	wishlistDataCountByUserID,
	getBestSellingProducts,
} = require('../services/product');

const getHomePageData = async (req, res, next) => {
	try {
		let response = { code: -1, status: false, message: '' };
		// Validate token here
		const {
			fk_lang_id,
			user_id,
			all_product,
			limit = 20,
			start = 0,
		} = req.body;
		if (user_id) {
			if (!fk_lang_id) {
				response.message = 'Language Name is required';
				response.code = 201;
			} else {
				promiseArrayList = [
					sliderService,
					getAllPopularProductData(fk_lang_id, limit, start),
					getFeaturedProducts(fk_lang_id, limit, start),
					getBestSellingProducts(fk_lang_id, limit, start),
					categoryData(),
					cartDataCountByUserID(user_id),
					wishlistDataCountByUserID(user_id),
					[],
				];
				if (all_product != 1) {
					promiseArrayList[promiseArrayList.length - 1] = getAllProductData(
						fk_lang_id,
						limit,
						start
					);
					// product_data = await getAllProductData(fk_lang_id, limit, start);
					// for (const product of productData) {
					// 	const [wishlist_data, cart_data] = await Promise.all([
					// 		wishlistDataByID(product['product_id'], user_id),
					// 		cartDataByID(product['product_id'], user_id),
					// 	]);

					// 	if (wishlist_data) {
					// 		product.wishlist_data = true;
					// 		product.wishlist_id = wishlist_data.id;
					// 	} else {
					// 		product.wishlist_data = false;
					// 		product.wishlist_id = '';
					// 	}

					// 	if (cart_data) {
					// 		product.cart_data = true;
					// 		product.cart_id = cart_data.id;
					// 	} else {
					// 		product.cart_data = false;
					// 		product.cart_id = '';
					// 	}

					// 	if (fk_lang_id === 1) {
					// 		product.add_to_cart = 'Add to Cart';
					// 		product.label = 'NEW';
					// 		product['font-size'] = '';
					// 		product['label-font-size'] = '';
					// 	} else {
					// 		product.product_name = product.product_name_ar;
					// 		product.currency_in_english = product.currency_in_arabic;
					// 		product.add_to_cart = 'إضافة الى السلة';
					// 		product['font-size'] = "style='font-size:15px;'";
					// 		product['label-font-size'] = "style='font-size:20px;'";
					// 		product.label = 'جديد';
					// 	}
					// }
				}
				let [
					slider,
					popular,
					featured,
					best_selling,
					category,
					cart_count,
					wishlist_count,
					product_data,
				] = await Promise.all(promiseArrayList);
				if (isMainThread) {
					let promises = [];
					// Create a worker for array1
					const worker1 = new Worker('./utils/arrayOperationsWorker.js', {
						workerData: { arrayToProcess: popular, user_id },
					});

					// Create a worker for array2
					const worker2 = new Worker('./utils/arrayOperationsWorker.js', {
						workerData: { arrayToProcess: featured, user_id },
					});

					// Create a worker for array3
					const worker3 = new Worker('./utils/arrayOperationsWorker.js', {
						workerData: { arrayToProcess: best_selling, user_id },
					});

					// Create a worker for array4
					const worker4 = new Worker('./utils/arrayOperationsWorker.js', {
						workerData: { arrayToProcess: product_data, user_id },
					});

					// Promisify the worker threads
					const worker1Promise = new Promise((resolve) => {
						worker1.on('message', (result) => {
							resolve(result);
						});
					});

					const worker2Promise = new Promise((resolve) => {
						worker2.on('message', (result) => {
							resolve(result);
						});
					});

					const worker3Promise = new Promise((resolve) => {
						worker3.on('message', (result) => {
							resolve(result);
						});
					});

					const worker4Promise = new Promise((resolve) => {
						worker4.on('message', (result) => {
							resolve(result);
						});
					});

					promises.push(
						worker1Promise,
						worker2Promise,
						worker3Promise,
						worker4Promise
					);
					// promises.push(worker1Promise);

					// Wait for all worker tasks to complete
					let results = await Promise.all(promises);
					popular = results[0];
					featured = results[1];
					best_selling = results[2];
					product_data = results[3];
				}

				response = {
					code: 200, // HTTP_OK
					status: true,
					message: 'success',
					slider: slider,
					popular: popular,
					featured: featured,
					best_selling: best_selling,
					category: category,
					cart_count: cart_count,
					wishlist_count: wishlist_count,
				};

				if (all_product !== 1) {
					response.product_data = product_data;
				}

				// Send the JSON response
				res.json(response);
			}
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getHomePageData,
};
