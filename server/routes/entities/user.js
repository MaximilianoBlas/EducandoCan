const Router = require("express")
const routerUser = Router()

const { getUser } = require("../../controllers/user/user")

routerUser.post('/', getUser)

module.exports = routerUser