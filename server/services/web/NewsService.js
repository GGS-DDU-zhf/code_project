const NewsModel = require('../../models/NewsModel')

const NewsService = {
    list: async ({ id }) => {
        return id ?
        NewsModel.find({ _id: id, isPublish: 1 }) :
        NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 })
    },
    topList: async ({ limit }) => {
        return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
    },
}

module.exports = NewsService