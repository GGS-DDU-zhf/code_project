const NewsModel = require('../../models/NewsModel')

const NewsService = {
    add: async ({ title, content, category, cover, isPublish, editTime }) => {
        return NewsModel.create({
            title,
            content,
            category,
            cover,
            isPublish,
            editTime
        })
    },
    list: async ({ id }) => {
        return id ?
        NewsModel.find({ _id: id }) :
        NewsModel.find()
    },
    put: async ({ _id, ...rest }) => {
        return NewsModel.updateOne({ _id }, { ...rest })
    },
    publish: async ({ _id, isPublish, editTime }) => {
        return NewsModel.updateOne({ _id }, { isPublish, editTime })
    },
    delete: async ({ _id }) => {
        return NewsModel.deleteOne({ _id })
    }
}

module.exports = NewsService