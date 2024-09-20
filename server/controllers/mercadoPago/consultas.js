// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference} = require('mercadopago')

 const consulta = async (req, res) => {
  console.log('entra en creación de pago')
  console.log('req.query', req.query)
  const {name,description,email,phone,amount} = req.query
  const playerName = name

  try {

   console.log('esto es description', description, 'esta es email', email, 'esto es phone', phone)

    const client = new MercadoPagoConfig({ accessToken: config.MP_PUBLIC_KEY });

    const preference = await new Preference(client).create({

 body: {
  items: [
    {id: `Clases ${name}`,
      title: 'Clases Educando Can',
      description: "esta es la descripcion",
      quantity: 1,
      unit_price: Number(amount)
    },
  ],
  payer: {
        name: playerName,
        surname: name,
        email: 'esteEsDePrueba@gmail.com',
        phone: {
          area_code:'341',
          number: '6297919'
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

         res.json(url)
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consulta}




