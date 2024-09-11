// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference} = require('mercadopago')

 const consulta = async (req, res) => {
  const {name,amount} = req.query

 try {
    const client = new MercadoPagoConfig({ accessToken: config.MP_PUBLIC_KEY });

    const preference = await new Preference(client).create({
        body: {
          items: [
            {id: "educando can",
              title: name,
              quantity: 1,
              unit_price: Number(amount)
            },
          ],
        },
      })
      const url = preference.sandbox_init_point

         res.json(url)
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consulta}
