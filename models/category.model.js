const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import your DataTypes instance

// Define the Category model
const Category = sequelize.define(
	'Category',
	{
		category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		fk_lang_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		category_name: {
			type: DataTypes.STRING(100), // Adjust the length as needed
			allowNull: true,
			collate: 'utf8mb3_general_ci', // Adjust the collation as needed
		},
		category_name_ar: {
			type: DataTypes.STRING(100), // Adjust the length as needed
			defaultValue: '', // Default value
			collate: 'utf8mb3_general_ci', // Adjust the collation as needed
		},
		image_path: {
			type: DataTypes.STRING(100), // Adjust the length as needed
			allowNull: true,
			collate: 'utf8mb3_general_ci', // Adjust the collation as needed
		},
		sort_order: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING(10), // Adjust the length as needed
			defaultValue: '1',
			comment: '0:disabled, 1:enabled',
		},
		active_inactive: {
			type: DataTypes.ENUM('1', '0'),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		date_modeified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		category_type: {
			type: DataTypes.STRING(255), // Adjust the length as needed
			allowNull: true,
		},
	},
	{
		tableName: 'category', // Set the table name explicitly if it's different from the model name
		timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt columns
		underscored: true, // Use snake_case for column names
	}
);

Category.sync();
module.exports = Category;
