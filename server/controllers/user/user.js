
const { models } = require('../../db')

 const getUser = async (req, res) => {

  console.log('entra al controlador get user')

  try {
    const user = await models.User.findOne()

    console.log(user)
    console.log(user.user)
    console.log(user.dataValues)
    console.log(user.dataValues.user)


         res.json('')
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {getUser}
