
const { models } = require('../../db')

 const getBusyTime = async (req, res) => {

  try {
    const busyTime = await models.BusyTime.findOne()

         res.json(busyTime)
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {getBusyTime}
