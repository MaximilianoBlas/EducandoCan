const Router = require("express")

const routerApi = Router()

const ruoterMercadoPago = require("./entities/mercadoPago")
const ruoterUpDateCalendar = require("./entities/upDateCalendar")
const routerUser = require("./entities/user")

routerApi.use('/mercadoPago', ruoterMercadoPago)
routerApi.use('/upDateCalendar', ruoterUpDateCalendar)
routerApi.use('/user', routerUser)

// routerApi.get('/consultas', (req, res) => {
//     res.json({message:"Hello World!"})
// })

module.exports = routerApi