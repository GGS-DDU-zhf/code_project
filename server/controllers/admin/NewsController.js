const NewsService = require('../../services/admin/NewsService')

const NewsController = {
    add: async function (req, res) {
        const { title, content, category, isPublish } = req.body
        const cover = `/newsuploads/${req.file.filename}`

        // 调用service模块更新数据
        await NewsService.add({
            title,
            content,
            category: Number(category),
            cover,
            isPublish,
            editTime: new Date()
        })

        res.send({
            ActionType: 'OK'
        })
    },
    list: async function (req, res) {
        const result = await NewsService.list({ id: req.params.id })
        
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    put: async function (req, res) {
        const { _id, title, content, category, cover, isPublish } = req.body

        await NewsService.put({ _id, title, content, category: Number(category), cover, isPublish, editTime: new Date() })

        res.send({
            ActionType: 'OK'
        })
    },
    publish: async function (req, res) {
        const { _id, isPublish } = req.body

        await NewsService.publish({ _id, isPublish: Number(isPublish), editTime: new Date() })

        res.send({
            ActionType: 'OK'
        })
    },
    delete: async function (req, res) {
        await NewsService.delete({ _id: req.params.id })

        res.send({
            ActionType: 'OK'
        })
    }
}

module.exports = NewsController