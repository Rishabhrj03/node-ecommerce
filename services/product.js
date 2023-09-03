const { Sequelize, Op } = require('sequelize');

const { sequelize } = require('../db');
const TopBanner = require('../models/topBanner.model');
const Wishlist = require('../models/Wishlist.model');
const Cart = require('../models/Cart.model');
const { Product, Inventory } = require('../models/associations');
const Category = require('../models/category.model');

const slider = TopBanner.findAll({
	attributes: [
		'bottom_id',
		'image_name',
		'img_url',
		'status',
		'added_on',
		'date_modified',
		'fk_lang_id',
		'product_id',
		'relatable_products',
		'active_inactive',
		[Sequelize.literal(`CONCAT("${process.env.APP_URL}", img_url)`), 'img_url'],
	],
	where: {
		status: 1,
		active_inactive: 1,
		// bottom_id: 19999,
	},
});

async function getAllProductData(fk_lang_id, limit, start) {
	try {
		const products = await Product.findAll({
			include: [
				{
					model: Inventory,
					attributes: ['qty'],
					where: {
						used_status: '1',
					},
					required: false,
				},
			],
			where: {
				status: '1',
				product_status: '1',
				category_type: {
					[Sequelize.Op.not]: 'Gift Card',
				},
			},
			order: [['product_id', 'DESC']],
			limit: limit,
			offset: start,
		});

		return products;
	} catch (error) {
		throw error;
	}
}

const wishlistDataCountByUserID = (user_id) =>
	Wishlist.count({
		where: { user_id },
	});
const wishlistDataByID = (product_id, user_id) => {
	console.log(product_id, user_id);
	return Wishlist.findOne({
		where: { product_id, user_id },
		attributes: ['id'],
	});
};
const cartDataCountByUserID = (user_id) =>
	Cart.count({
		where: { user_id },
	});
const cartDataByID = (product_id, user_id) => {
	console.log(user_id);
	return Cart.findOne({
		where: { product_id, user_id },
		attributes: ['cart_id'],
	});
};

// Create the raw SQL query
async function getAllPopularProductData(
	fk_lang_id = '',
	limit = null,
	offset = 0
) {
	try {
		const query = `
      SELECT product.*, inventory.qty as quantity, GROUP_CONCAT(product_gallery.img_url) as img_url
      FROM product
      LEFT JOIN inventory ON inventory.product_id = product.product_id
      LEFT JOIN product_gallery ON product_gallery.product_id = product.product_id
      WHERE product.popular = '1'
      AND product.status = '1'
      AND product.product_status = '1'
      AND inventory.used_status = '1'
      GROUP BY product_gallery.product_id
      ORDER BY product.product_id DESC
      ${limit ? 'LIMIT :limit' : ''} OFFSET :offset;
    `;

		const results = await sequelize.query(query, {
			type: Sequelize.QueryTypes.SELECT,
			replacements: {
				limit: limit,
				offset: offset,
			},
		});

		return results;
	} catch (error) {
		throw error;
	}
}

async function getFeaturedProducts(fk_lang_id = '', limit = null, offset = 0) {
	try {
		const query = `
      SELECT product.*, inventory.qty as quantity, GROUP_CONCAT(product_gallery.img_url) as img_url
      FROM product
      LEFT JOIN inventory ON inventory.product_id = product.product_id
      LEFT JOIN product_gallery ON product_gallery.product_id = product.product_id
      WHERE product.featured = '1'
      AND product.status = '1'
      AND product.product_status = '1'
      AND inventory.used_status = '1'
      GROUP BY product_gallery.product_id
      ORDER BY product.product_id DESC
      ${limit ? 'LIMIT :limit' : ''} OFFSET :offset;
    `;

		const results = await sequelize.query(query, {
			type: Sequelize.QueryTypes.SELECT,
			replacements: {
				limit: limit,
				offset: offset,
			},
		});

		return results;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function getBestSellingProducts(
	fk_lang_id = '',
	limit = null,
	offset = 0
) {
	try {
		const query = `
      SELECT product.*, inventory.qty as quantity, GROUP_CONCAT(product_gallery.img_url) as img_url
      FROM product
      LEFT JOIN inventory ON inventory.product_id = product.product_id
      LEFT JOIN product_gallery ON product_gallery.product_id = product.product_id
      WHERE product.best_selling = 1
      AND product.status = '1'
      AND product.product_status = '1'
      AND inventory.used_status = '1'
      GROUP BY product_gallery.product_id
      ORDER BY product.product_id DESC
      ${limit !== null ? 'LIMIT :limit' : ''} ${
			offset !== null ? 'OFFSET :offset' : ''
		};
    `;

		const results = await sequelize.query(query, {
			type: Sequelize.QueryTypes.SELECT,
			replacements: {
				limit: limit !== null ? limit : undefined,
				offset: offset !== null ? offset : undefined,
			},
		});

		return results;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function selectWhereData(
	model,
	whereData,
	fields = '*',
	row = true,
	order_by = '',
	group_by = ''
) {
	try {
		let queryOptions = {
			attributes: fields,
			where: whereData,
		};

		if (order_by) {
			queryOptions.order = [[order_by[0], order_by[1]]];
		}

		if (group_by) {
			queryOptions.group = group_by;
		}

		const result = await model.findAll(queryOptions);

		if (result.length > 0) {
			if (row) {
				return result[0].get({ plain: true });
			} else {
				return result.map((row) => row.get({ plain: true }));
			}
		} else {
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

const categoryData = () => {
	// Example usage
	const whereData = {
		status: 1,
		active_inactive: 1,
		category_type: { [Op.ne]: 'Gift Card' }, // Not equal to 'Gift Card'
	};

	const order_by = [['sort_order', 'ASC']];

	return Category.findAll({
		where: whereData,
		order: order_by,
	});
	// return selectWhereData(Category, whereData, '*', false, order_by);
};

module.exports = {
	slider,
	getAllProductData,
	wishlistDataByID,
	cartDataByID,
	getAllPopularProductData,
	getFeaturedProducts,
	getBestSellingProducts,
	categoryData,
	cartDataCountByUserID,
	wishlistDataCountByUserID,
};
