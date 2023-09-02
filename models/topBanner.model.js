const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import your Sequelize instance

const TopBanner = sequelize.define(
	'top_banner',
	{
		bottom_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		image_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		img_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		added_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		date_modified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		fk_lang_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		relatable_products: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false, // Disable createdAt and updatedAt columns
		tableName: 'top_banner', // Set the table name if different from the model name
	}
);
TopBanner.sync();
module.exports = TopBanner;
