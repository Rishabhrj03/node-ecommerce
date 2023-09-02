const { Sequelize } = require('sequelize');

const TopBanner = require('../models/topBanner.model');

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
	},
});

module.exports = {
	slider,
};
