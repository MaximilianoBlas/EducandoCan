const Router = require("express")

const routerApi = Router()

const ruoterMercadoPago = require("./entities/mercadoPago")
const ruoterUpDateCalendar = require("./entities/upDateCalendar")

routerApi.use('/mercadoPago', ruoterMercadoPago)
routerApi.use('/upDateCalendar', ruoterUpDateCalendar)

// routerApi.get('/consultas', (req, res) => {
//     res.json({message:"Hello World!"})
// })

module.exports = routerApi