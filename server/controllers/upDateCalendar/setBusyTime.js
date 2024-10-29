
const { models } = require('../../db')

 const setBusyTime = async (req, res) => {

  try {
    const busyTime = await models.BusyTime.findAll()

    if(busyTime.length > 0){
       const find =  busyTime[0].busyTime.find(e => e.date === req.body.date && e.hour === req.body.hour && e.minute === req.body.minute)
        if(find){
         const filter = busyTime[0].busyTime.filter(e => e.date !== req.body.date || e.hour !== req.body.hour || e.minute !== req.body.minute)
            busyTime[0].busyTime = filter
            busyTime[0].save()
        } else {
            busyTime[0].busyTime = [... busyTime[0].busyTime, req.body]
            busyTime[0].save()
        }
    }
    else{
        await models.BusyTime.create({
            busyTime:[req.body]
        })
    }
         res.json(busyTime)
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {setBusyTime}
