

 const webhooks = async (req, res) => {
  console.log(req.query)

 try {

         res.json({response:'webhooks'})
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {webhooks}
