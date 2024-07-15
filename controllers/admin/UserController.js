const UserService = require('../../services/admin/UserService')
const JWT = require('../../util/JWT')

const UserController = {
    login: async (req, res) => {
        // console.log(req.body);
        var result = await UserService.login(req.body)
        if (result.length === 0) {
            res.status(403).send({
                code: -1,
                error: '用户名不匹配'
            })
        } else {
            //生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, '1d')
            res.header('Access-Controll-Allow-Origin', '*')
            res.header('Authorization', token)
            res.header('Overtimes', `${+new Date() + 86400000}`)
            res.send({
                ActionType: "OK"
            })
        }
    },
    add: async (req, res) => {
        const {
            username,
            password
        } = req.body
        var result = await UserService.login(username)
        if (result.length !== 0) {
            res.send({
                ActionType: 'Fail'
            })
            return
        }
        await UserService.add({
            username,
            password
        })
        res.send({
            ActionType: "OK"
        })
    }
}
module.exports = UserController