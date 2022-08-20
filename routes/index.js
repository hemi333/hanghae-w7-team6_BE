const express = require("express");
const User = require("./user");
// const Product = require("./product");
// const Cart = require("./cart")

const router = express.Router();

router.use("/user", User);
// router.use('/product', Product);
// router.use('/cart', Cart);

module.exports = router;
