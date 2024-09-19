// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference, Payment, MercadoPago} = require('mercadopago')
// const MercadoPago = require('mercadopago')


 const consultaPago = async (req, res) => {
  const {name,amount} = req.query

 try {
    const client = new MercadoPagoConfig({ accessToken: config.MP_PUBLIC_KEY });
    const payment = new Payment(client);

    console.log('este es el pago',payment)

   const pago =  payment.get({
        id: '1319561230',
}).then(console.log).catch(console.log);

console.log('pago',pago)
console.log('pago additional info item',pago.additional_info.items)
console.log('pago card cardholder',pago.card.cardholder)
console.log('pago additional info item',pago.charges_details.accounts)
console.log('pago additional info item',pago.charges_details.amounts)

         res.json(pago)
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consultaPago}



