
const { models } = require('../../db')

 const setBusyTime = async (req, res) => {

  console.log('entra al controlador busy time')
  console.log('esto es query',req.body)
//   console.log('esto es param', req.param)

  try {
    const busyTime = await models.BusyTime.findAll()

    console.log('esto es el resultado de la bd', busyTime)

    if(busyTime.length > 0){
        console.log('tiene algo')
    }
    else{
        await models.BusyTime.create({
            busyTime:[{param:'req.algo'}]
        })
    }

         res.json(busyTime)
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {setBusyTime}
