
const { models } = require('../../db')

 const setBusyTime = async (req, res) => {

  console.log('entra al controlador busy time')

  try {
    const busyTime = await models.BusyTime.findAll()

    if(busyTime){

    }
    else{
        await models.BusyTime.create({
            busyTime:['req.algo']
        })
    }

         res.json(busyTime)
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {setBusyTime}
