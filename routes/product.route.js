const express = require('express');
const productRoute = express.Router();

// All The product route controller will call here
const { getHomePageData } = require('../controllers/product.controller');

productRoute.post('/get-home-page-data', getHomePageData);

module.exports = productRoute;
