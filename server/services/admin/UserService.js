const UserModal = require('../../models/UserModel')

const UserService = {
    login: async ({ username, password }) => {
        return UserModal.find({ username, password })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        return UserModal.updateOne(
            { _id },
            { username, introduction, gender, avatar}
        )
    },
    add: async ({ username, password, gender, role, introduction, avatar }) => {
        return UserModal.create({
            username,
            password,
            gender,
            role,
            introduction,
            avatar
        })
    },
    list: async ({ id }) => {
        /**
         * 下面find第二个参数是一个数组，数组里面的数据表示要查询出来的字段，
         * password字段我们不需要返回给前端，所以要过滤掉
         * */ 
        return id ?
        UserModal.find({ _id: id }, ['username', 'password', 'role', 'gender', 'introduction'])
        :
        UserModal.find({}, ['username', 'role', 'avatar', 'gender', 'introduction'])
    },
    delete: async ({ _id }) => {
        return UserModal.deleteOne({ _id })
    },
    put: async body => {
        return UserModal.updateOne({ _id: body._id }, body)
    }
}

module.exports = UserService