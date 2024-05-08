var express = require('express');
const NewsController = require('../../controllers/admin/NewsController')
var NewsRouter = express.Router();
// 图片上传
const multer  = require('multer')
 // 图片上传过来的存放的文件夹,要放在静态资源目录public下
const upload = multer({ dest: 'public/newsuploads/' })

/* GET news page. */
// 下面的 file 是前端传过来的File对象的key值
NewsRouter.post('/adminapi/news/add', upload.single('file'), NewsController.add)
NewsRouter.get('/adminapi/news/list', NewsController.list)
NewsRouter.get('/adminapi/news/list/:id', NewsController.list)
NewsRouter.post('/adminapi/news/list', upload.single('file'), NewsController.put)
NewsRouter.put('/adminapi/news/publish', NewsController.publish)
NewsRouter.delete('/adminapi/news/delete/:id', NewsController.delete)

module.exports = NewsRouter;