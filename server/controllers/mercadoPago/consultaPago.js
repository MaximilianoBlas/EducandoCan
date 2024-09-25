// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference, Payment, MercadoPago} = require('mercadopago')
// const MercadoPago = require('mercadopago')


 const consultaPago = async (param) => {
//   const {name,amount} = req.query

    console.log('entro a consulta de pago backend')

  console.log('estos son los params', param)

 try {
    const client = new MercadoPagoConfig({ accessToken: config.MP_PUBLIC_KEY });
    const payment = new Payment(client);

    console.log('este es el pago',payment)

   const pago = await payment.get({
        id: param,
})


console.log('pago',pago)
console.log('pago additional info item',pago.additional_info)
console.log('id que viene de mercado pago', pago.additional_info.items[0].id)
console.log('pago card cardholder',pago.card.cardholder)

const currentClass = await models.Calendar.findOne({
    where: {
        paymentId: pago.additional_info.items[0].id
    }
  })

  currentClass.payment = accepted
  currentClass.save()


        return pago
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consultaPago}



