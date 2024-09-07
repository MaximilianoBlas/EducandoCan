const Router = require("express")

const routerApi = Router()

const routerConsultas = require("./entities/consultas")

routerApi.use('/consultas', routerConsultas)

// routerApi.get('/consultas', (req, res) => {
//     res.json({message:"Hello World!"})
// })

module.exports = routerApi