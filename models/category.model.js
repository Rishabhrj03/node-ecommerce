const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import your DataTypes instance

const Category = sequelize.define(
	'category',
	{
		category_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		fk_lang_id: {
			type: DataTypes.INTEGER,
		},
		category_name: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		category_name_ar: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		image_path: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sort_order: {
			type: DataTypes.INTEGER,
		},
		stauts: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		active_inactive: {
			type: DataTypes.ENUM('1', '0'),
		},
		createdAt: {
			field: 'created_at',
			type: DataTypes.DATE,
		},
		date_modeified: {
			field: 'created_at',
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		category_type: {
			type: DataTypes.STRING,
		},
	},
	{
		updatedAt: false,
		tableName: 'category', // Set the table name if different from the model name
	}
);

Category.sync();
module.exports = Category;
