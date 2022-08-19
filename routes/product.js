const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const productController = new ProductController();




module.exports = productRouter;