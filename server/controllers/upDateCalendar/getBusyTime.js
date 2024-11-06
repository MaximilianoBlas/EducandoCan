
const { models } = require('../../db')

 const getBusyTime = async (req, res) => {

  try {
    // const user = await models.BusyTime.findOne()
   const user =  models.BusyTime.create({
      user:'colo'
  })

         res.json(busyTime)
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {getBusyTime}
