
const { models } = require('../../db')

 const getUser = async (req, res) => {

  const input = req.body.payload

  console.log('entra al controlador get user')

  try {
    const user = await models.User.findOne()
    console.log('bd',user.user)
    console.log('front', input)


    if(input === user.user)res.json('match')
      else  res.json('no')


        
         
        } catch (error) {
            console.log(error)}}
        
 module.exports = {getUser}
