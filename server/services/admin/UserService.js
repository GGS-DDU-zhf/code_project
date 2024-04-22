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
    }
}

module.exports = UserService