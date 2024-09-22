const Router = require("express")
const routerMercadoPago = Router()

const {pagar} = require('../../controllers/mercadoPago/pagar')
const {consultaPago} = require('../../controllers/mercadoPago/consultaPago')
const {webhooks} = require('../../controllers/mercadoPago/webhooks')

//  routerConsultas.get('/consulta', (req, res) => {
//     res.json({message:"Hello World!"})
// })

// console.log(typeof consulta)

routerMercadoPago.get('/pagar', pagar)
routerMercadoPago.get('/consultaPago', consultaPago)

routerMercadoPago.post('/webhooks', webhooks)



module.exports = routerMercadoPago