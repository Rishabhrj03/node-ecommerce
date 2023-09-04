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
				const [
					slider,
					popular,
					featured,
					best_selling,
					category,
					cart_count,
					wishlist_count,
					product_data,
				] = await Promise.all(promiseArrayList);

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
