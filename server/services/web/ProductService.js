const ProductModel = require('../../models/ProductModel')

const ProductService = {
    list: async ({ id }) => {
        return id ?
        ProductModel.find({ _id: id }) :
        ProductModel.find()
    }
}

module.exports = ProductService