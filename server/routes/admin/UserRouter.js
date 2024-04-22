var express = require('express');
const UserController = require('../../controllers/admin/UserController')
var UserRouter = express.Router();
// 图片上传
const multer  = require('multer')
 // 图片上传过来的存放的文件夹,要放在静态资源目录public下
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
UserRouter.post('/adminapi/user/login', UserController.login)
// 下面的 file 是前端传过来的File对象的key值
UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.upload)

module.exports = UserRouter;
