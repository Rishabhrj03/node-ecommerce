const { DataTypes } = require('sequelize');

const { sequelize } = require('../db'); // Import your DataTypes instance

const Product = sequelize.define(
	'product',
	{
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		search_unique_id: {
			type: DataTypes.STRING(80),
			collate: 'utf8mb3_unicode_ci',
		},
		fk_lang_id: {
			type: DataTypes.INTEGER,
		},
		category_id: {
			type: DataTypes.INTEGER,
		},
		sub_category_id: {
			type: DataTypes.INTEGER,
		},
		child_category_id: {
			type: DataTypes.INTEGER,
		},
		unit_id: {
			type: DataTypes.INTEGER,
		},
		product_name: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		product_code: {
			type: DataTypes.STRING(100),
			collate: 'utf8mb3_unicode_ci',
		},
		product_name_ar: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		product_in_marathi: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		image_name: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		pack_size: {
			type: DataTypes.STRING(50),
			collate: 'utf8mb3_unicode_ci',
		},
		product_price: {
			type: DataTypes.STRING(45),
			collate: 'utf8mb3_unicode_ci',
		},
		max_sell_limit: {
			type: DataTypes.STRING(45),
			collate: 'utf8mb3_unicode_ci',
		},
		product_offer_price: {
			type: DataTypes.STRING(20),
			collate: 'utf8mb3_unicode_ci',
		},
		product_purchase_price: {
			type: DataTypes.STRING(20),
			collate: 'utf8mb3_unicode_ci',
		},
		listed_in_super_deal: {
			type: DataTypes.ENUM('0', '1'),
			collate: 'utf8mb3_unicode_ci',
			defaultValue: '1',
			comment: '1:listed,0:not listed',
		},
		description: {
			type: DataTypes.TEXT,
			collate: 'utf8mb3_unicode_ci',
		},
		description_ar: {
			type: DataTypes.TEXT,
			collate: 'utf8mb3_unicode_ci',
		},
		relatable_products: {
			type: DataTypes.STRING(200),
			collate: 'utf8mb3_unicode_ci',
		},
		video_url: {
			type: DataTypes.STRING(300),
			collate: 'utf8mb3_unicode_ci',
		},
		product_barcode: {
			type: DataTypes.STRING(200),
			collate: 'utf8mb3_unicode_ci',
		},
		status: {
			type: DataTypes.STRING(2),
			collate: 'utf8mb3_unicode_ci',
			defaultValue: '1',
			comment: '1:active,0 inactive',
		},
		unit: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		mrp: {
			type: DataTypes.INTEGER,
		},
		stock_status: {
			type: DataTypes.STRING(5),
			collate: 'utf8mb3_unicode_ci',
			allowNull: false,
			defaultValue: '1',
			comment: '1: InStock ,0: Out of Stock',
		},
		added_on: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		date_modified: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		popular: {
			type: DataTypes.INTEGER,
		},
		featured: {
			type: DataTypes.INTEGER,
		},
		best_selling: {
			type: DataTypes.INTEGER,
		},
		new_arrival: {
			type: DataTypes.INTEGER,
		},
		qty: {
			type: DataTypes.INTEGER,
		},
		supplier_id: {
			type: DataTypes.INTEGER,
		},
		currency_in_english: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		currency_in_arabic: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		product_offer: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
		product_status: {
			type: DataTypes.ENUM('1', '0'),
			collate: 'utf8mb3_unicode_ci',
			allowNull: false,
		},
		category_type: {
			type: DataTypes.STRING(100),
			collate: 'utf8mb3_unicode_ci',
		},
		gift_card_stock: {
			type: DataTypes.ENUM('1', '0'),
			collate: 'utf8mb3_unicode_ci',
			allowNull: false,
			defaultValue: '1',
		},
		uniq_code: {
			type: DataTypes.TEXT,
			collate: 'utf8mb3_unicode_ci',
		},
		brand_id: {
			type: DataTypes.STRING(255),
			collate: 'utf8mb3_unicode_ci',
		},
	},
	{
		timestamps: false, // Set to true if you want createdAt and updatedAt fields
		tableName: 'product', // Set the table name
	}
);

Product.sync();
module.exports = Product;
