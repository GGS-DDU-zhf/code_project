const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user模型 ===> users集合
const UserType = {
    username: String,
    password: String,
    gender: String, // 性别：0：保密 1 男 2女
    introduction: String, // 简介
    avatar: String,
    role: Number, // 权限：1 管理员 2 可编辑
}
const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel