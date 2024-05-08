const ProductModel = require('../../models/ProductModel')

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({
            title,
            introduction,
            detail,
            cover,
            editTime
        })
    },
    list: async ({ _id }) => {
        return _id ? ProductModel.find({ _id }) : ProductModel.find()
    },
    put: async ({ _id, title, introduction, detail, cover, editTime }) => {
        return ProductModel.updateOne({ _id }, { title, introduction, detail, cover, editTime })
    },
    delete: async ({ _id }) => {
        return ProductModel.deleteOne({ _id })
    }
}

module.exports = ProductService