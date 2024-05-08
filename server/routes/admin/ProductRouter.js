var express = require('express');
const ProductController = require('../../controllers/admin/ProductController')
var ProductRouter = express.Router();
// 图片上传
const multer  = require('multer')
 // 图片上传过来的存放的文件夹,要放在静态资源目录public下
const upload = multer({ dest: 'public/productuploads/' })

/* GET product page. */
// 下面的 file 是前端传过来的File对象的key值
ProductRouter.post('/adminapi/product/add', upload.single('file'), ProductController.add)
ProductRouter.get('/adminapi/product/list', ProductController.list)
ProductRouter.get('/adminapi/product/list/:id', ProductController.list)
ProductRouter.post('/adminapi/product/list', upload.single('file'), ProductController.put)
ProductRouter.delete('/adminapi/product/delete/:id', ProductController.delete)

module.exports = ProductRouter;