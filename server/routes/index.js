const Router = require("express")

const routerApi = Router()

const ruoterMercadoPago = require("./entities/mercadoPago")

routerApi.use('/mercadoPago', ruoterMercadoPago)

// routerApi.get('/consultas', (req, res) => {
//     res.json({message:"Hello World!"})
// })

module.exports = routerApi