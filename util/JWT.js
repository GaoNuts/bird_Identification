const jsonwebtoken = require('jsonwebtoken')
const secret = "birds"
const JWT = {
    //生成
    generate(value, expires) {
        return jsonwebtoken.sign(value, secret, {expiresIn: expires})
    },
    //验证
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}
module.exports = JWT