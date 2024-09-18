// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference, Payment} = require('mercadopago')
const MercadoPago = require('mercadopago')


 const consultaPago = async (req, res) => {
  const {name,amount} = req.query

 try {
    const client = new MercadoPago({ accessToken: config.MP_PUBLIC_KEY });
    const payment = new Payment(client);

   const pago =  payment.get({
        id: '1319561230',
}).then(console.log).catch(console.log);
   

         res.json(pago)
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consultaPago}



