const { consultaPago } = require("./consultaPago")


 const webhooks = async (req, res) => {
    const {data} = req.query
  console.log(req.query)
  console.log('data', data)
  console.log('data.id', data.id)
  console.log('estamos en el webhooks backend')

  const pago = consultaPago(data.id)
  console.log('pago en webhooks', pago)

 try {

         res.json({response:'webhooks'})
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {webhooks}
