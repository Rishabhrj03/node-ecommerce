const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import your DataTypes instance

const Wishlist = sequelize.define(
	'wishlist',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		stauts: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		createdAt: {
			field: 'created_at',
			type: DataTypes.DATE,
		},
		updatedAt: {
			field: 'updated_at',
			type: DataTypes.DATE,
		},
	},
	{
		tableName: 'wishlist', // Set the table name if different from the model name
	}
);

Wishlist.sync();
module.exports = Wishlist;
