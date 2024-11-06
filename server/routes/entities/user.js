const Router = require("express")
const routerUser = Router()

const { getUser } = require("../../controllers/user/user")

routerUser.get('/', getUser)

module.exports = routerUser