const Product = require('./product.model');
const Inventory = require('./inventory.model');

// Define associations here
Product.hasOne(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { Product, Inventory };
