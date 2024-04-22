const jsonwebtoken = require('jsonwebtoken')

const secret = 'zhfeng'

const JWT = {
    generate (value, expires) {
        return jsonwebtoken.sign(value, secret, { expiresIn: expires })
    },
    verify (token) {
        // jwt过期后会直接报错，所以我们需要try...catch包裹下
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (error) {
            return false
        }
        
    }
}

// jwt测试
// const token = JWT.generate({ name: 'zhfeng'}, '1d')
// console.log('token', JWT.verify(token))
// setTimeout(() => {
//     console.log('token', JWT.verify(token))
// }, 11000)
module.exports = JWT