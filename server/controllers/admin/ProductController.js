const ProductService = require('../../services/admin/ProductService')

const ProductController = {
    add: async function (req, res) {
        const { title, introduction, detail } = req.body
        const cover = `/productuploads/${req.file.filename}`

        // 调用service模块更新数据
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })

        res.send({
            ActionType: 'OK'
        })
    },
    list: async function (req, res) {
        // 调用service模块更新数据
        const result = await ProductService.list({ _id: req.params.id })
        
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    put: async function (req, res) {
        const { _id, title, introduction, detail, cover } = req.body
        // 调用service模块更新数据
        await ProductService.put({
             _id,
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })

        res.send({
            ActionType: 'OK'
        })
    },
    delete: async function (req, res) {
        await ProductService.delete({ _id: req.params.id })

        res.send({
            ActionType: 'OK'
        })
    }
}

module.exports = ProductController