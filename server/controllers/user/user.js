
const { models } = require('../../db')

 const getUser = async (req, res) => {

  console.log('entra al controlador get user')

  try {
    // const user = await models.User.findOne()
        models.User.create({
        user:'colo'
    })

         res.json('usuario creado')
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {getUser}
