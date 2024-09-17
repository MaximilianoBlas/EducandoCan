const Router = require("express")
const routerConsultas = Router()

const {consulta} = require('../../controllers/mercadoPago/consultas')
const {webhooks} = require('../../controllers/mercadoPago/webhooks')

//  routerConsultas.get('/consulta', (req, res) => {
//     res.json({message:"Hello World!"})
// })

// console.log(typeof consulta)

routerConsultas.get('/consulta', consulta)
routerConsultas.post('/webhooks', webhooks)



module.exports = routerConsultas