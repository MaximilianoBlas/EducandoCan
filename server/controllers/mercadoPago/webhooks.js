

 const webhooks = async (req, res) => {
  console.log(req.query)
  console.log('estamos en el webhooks backend')

 try {

         res.json({response:'webhooks'})
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {webhooks}
