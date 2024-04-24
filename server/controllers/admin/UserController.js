const { put } = require('../../routes/admin/UserRouter')
const UserService = require('../../services/admin/UserService')
const JWT = require('../../util/JWT')

const UserController = {
    login: async (req, res) => {
        const result = await UserService.login(req.body)
        // console.log('result', result);
        // {
        //     _id: new ObjectId('661f942f47610ec5335da55d'),
        //     username: 'admin',
        //     password: '123456',
        //     role: 1
        // }
        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名密码不匹配'
            })
        } else {
            // 生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, '1d')

            res.header('Authorization', token)
            res.send({
                ActionType: 'OK',
                data: {
                    username: result[0].username,
                    gender: result[0].gender || 0, // 性别：0：保密 1 男 2女
                    introduction: result[0].introduction || '', // 简介
                    avatar: result[0].avatar || '',
                    role: result[0].role, // 权限：1 管理员 2 可编辑
                }
            })
        }
    },
    upload: async function (req, res) {
        /**
         * express是默认不支持前端传过来的FormData格式的，
         * 需要使用第三方工具 multer 转换。multer在UserRouter文件中使用。
         * */ 
        // console.log(req.body, req.file);
        const { username, introduction, gender, avatar: temp } = req.body;
        const token = req.headers['authorization'].split(' ')[1]
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : temp
        const payload = JWT.verify(token)
        // 调用service模块更新数据
        await UserService.upload({
            _id: payload._id,
            username,
            introduction,
            gender: Number(gender),
            avatar
        })

        res.send({
            ActionType: 'OK',
            data: {
                username,
                introduction,
                gender: Number(gender),
                avatar
            }
        })
    },
    add: async function (req, res) {
        const { username, password, introduction, role, gender } = req.body
        const avatar = `/avataruploads/${req.file.filename}`

        // 调用service模块更新数据
        await UserService.add({
            username,
            password,
            gender: Number(gender),
            introduction,
            role: Number(role),
            avatar
        })

        res.send({
            ActionType: 'OK'
        })
    },
    list: async function (req, res) {
        const result = await UserService.list(req.params)

        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    delete: async function (req, res) {
        // console.log(req.params.id)
        await UserService.delete({ _id: req.params.id })

        res.send({
            ActionType: 'OK'
        })
    },
    put: async function (req, res) {
        await UserService.put(req.body)

        res.send({
            ActionType: 'OK'
        })
    }
}

module.exports = UserController