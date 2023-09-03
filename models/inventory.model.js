const { DataTypes } = require('sequelize');

const { sequelize } = require('../db'); // Import your DataTypes instance

const Inventory = sequelize.define(
	'inventory',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		supplier_id: {
			type: DataTypes.STRING(255),
		},
		product_id: {
			type: DataTypes.STRING(255),
		},
		add_qty: {
			type: DataTypes.BIGINT,
		},
		deduct_qty: {
			type: DataTypes.BIGINT,
		},
		qty: {
			type: DataTypes.BIGINT,
		},
		used_status: {
			type: DataTypes.STRING(100),
		},
		update_from: {
			type: DataTypes.STRING(100),
		},
		date: {
			type: DataTypes.STRING(100),
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		modified_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
			onUpdate: DataTypes.NOW,
		},
		status: {
			type: DataTypes.STRING(10),
			defaultValue: '1',
		},
	},
	{
		timestamps: false, // Set to true if you want createdAt and updatedAt fields
		tableName: 'inventory', // Set the table name
	}
);

Inventory.sync();
module.exports = Inventory;
