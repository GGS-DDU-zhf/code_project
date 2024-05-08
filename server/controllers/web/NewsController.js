const NewsService = require('../../services/web/NewsService')

const NewsController = {
    list: async function (req, res) {
        const result = await NewsService.list({ id: req.params.id })
        
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    topList: async function (req, res) {
        const result = await NewsService.topList({ limit: req.query.limit })
        
        res.send({
            ActionType: 'OK',
            data: result
        })
    }
}

module.exports = NewsController