
const { models } = require('../../db')

 const getUser = async (req, res) => {

  const input = req.body.payload

  try {
    const user = await models.User.findOne()
    if(input === user.user)res.json('match')
      else  res.json('no')
        } catch (error) {
            console.log(error)}}
        
 module.exports = {getUser}
