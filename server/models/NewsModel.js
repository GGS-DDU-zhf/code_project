const mongoose = require('mongoose')
const Schema = mongoose.Schema

// news模型 ===> news集合
const NewsType = {
    title: String,
    content: String,
    category: Number, // 类别 1 最新动态 2 典型案例 3 通知公告
    cover: String, // 封面
    isPublish: Number, // 0 未发布 1 已发布
    editTime: Date, // 编辑时间
}
const NewsModel = mongoose.model('news', new Schema(NewsType))

module.exports = NewsModel