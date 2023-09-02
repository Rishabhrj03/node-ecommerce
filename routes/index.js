const express = require('express');
const router = express.Router();

// All the routes import will be here
const productRoute = require('./product.route');

// All the routes will be calling from here
router.use('/Ecommerce_api', productRoute);

module.exports = router;
