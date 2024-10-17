// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference, Payment, MercadoPago} = require('mercadopago')
const { models } = require('../../db')
const { InPersonClassForClient } = require('../../middlewares/mails/client/inPersonClass')
const { InPersonClassForUser } = require('../../middlewares/mails/user/inPersonClass')
const { onlineClassForClient } = require('../../middlewares/mails/client/onlineClass')
const { onlineClassForUser } = require('../../middlewares/mails/user/onlineClass')
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


console.log('pago',pago.date_approved)


if(pago.date_approved){

const currentClass = await models.Calendar.findOne({
    where: {
        paymentId: pago.additional_info.items[0].id
    }
  })

  currentClass.payment = 'accepted'
  currentClass.save()
  
  const ClientInfo = {
    name:currentClass.name,
    email:currentClass.email,
    start:currentClass.startDate,
    type:currentClass.type
  }


  if(currentClass.type === 'inPerson' ){
    InPersonClassForClient(ClientInfo)
    InPersonClassForUser(ClientInfo)
  } else{
    onlineClassForClient(ClientInfo)
    onlineClassForUser(ClientInfo)
  }


        return pago
}
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consultaPago}



