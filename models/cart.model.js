const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import your DataTypes instance

const Cart = sequelize.define(
	'cart',
	{
		cart_id: {
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
		qty: {
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
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			field: 'updated_at',
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: 'cart', // Set the table name if different from the model name
	}
);

Cart.sync();
module.exports = Cart;
