var express = require('express');
const NewsController = require('../../controllers/web/NewsController')
var NewsRouter = express.Router();

/* GET news page. */
NewsRouter.get('/webapi/news/list', NewsController.list)
NewsRouter.get('/webapi/news/list/:id', NewsController.list)
NewsRouter.get('/webapi/news/toplist', NewsController.topList)

module.exports = NewsRouter;