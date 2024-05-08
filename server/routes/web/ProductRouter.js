var express = require('express');
const ProductController = require('../../controllers/web/ProductController')
var ProductRouter = express.Router();

/* GET Product page. */
ProductRouter.get('/webapi/product/list', ProductController.list)

module.exports = ProductRouter;