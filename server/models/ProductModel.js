const mongoose = require('mongoose')
const Schema = mongoose.Schema

// product模型 ===> product集合
const ProductType = {
    title: String,
    introduction: String, // 产品简介
    detail: String, // 产品详细介绍
    cover: String, // 封面
    editTime: Date, // 编辑时间
}
const ProductModel = mongoose.model('product', new Schema(ProductType))

module.exports = ProductModel