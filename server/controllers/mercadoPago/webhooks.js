const { consultaPago } = require("./consultaPago")


 const webhooks = async (req, res) => {
    const {type} = req.query
    const data = req.query['data.id']
  console.log(req.query)
  console.log('type', type)
  console.log('data', req.query['data.id'])
  console.log('estamos en el webhooks backend')

  const pago = consultaPago(data)
  console.log('pago en webhooks', pago)

 try {

         res.json({response:'webhooks'})
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {webhooks}
