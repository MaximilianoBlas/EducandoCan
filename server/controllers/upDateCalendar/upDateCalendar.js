
const { models } = require('../../db')

 const upDateCalendar = async (req, res) => {

  console.log('entra en up date Calendar')

  try {
    const currentClass = await models.Calendar.findAll({
        where: {
            payment: 'accepted'}})

         res.json(currentClass)
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {upDateCalendar}




