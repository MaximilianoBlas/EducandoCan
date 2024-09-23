// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference} = require('mercadopago')
const { models } = require('../../db')

 const pagar = async (req, res) => {
  console.log('entra en creación de pago')
  console.log('req.query', req.query)
  const {name,description,email,phone,amount} = req.query
  const playerName = name
  const today = new Date()
  const milliseconds = today.getTime()

  try {

   console.log('esto es description', description, 'esta es email', email, 'esto es phone', phone)

    const client = new MercadoPagoConfig({ accessToken: config.MP_PUBLIC_KEY });

    const preference = await new Preference(client).create({


 body: {
  items: [
    {id: `Clases${name}${milliseconds}`,
      title: 'Clases Educando Can',
      description,
      quantity: 1,
      unit_price: Number(amount)
    },
  ],
  payer: {
        name: playerName,
        surname: name,
        email,
        phone: {
          area_code:'',
          number: phone
        },
        // identification: {
        //   type: '',
        //   number: '',
        // },
        // address: {
        //   zip_code: '',
        //   street_name: '',
        //   street_number: 0
        // },
      },
},

      })
      const url = preference.sandbox_init_point

      await models.Calendar.create({
        // where: {},
        // tuncate: true
        name,
        email, 
        description,
        startDate:'ponele de acá',
        endDate:'ponele hasta acá',
      })

         res.json(url)
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {pagar}




