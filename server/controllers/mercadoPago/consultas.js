// const { models } = require('../../database/connection/database')
const config = require('../../config')
const {MercadoPagoConfig, Preference} = require('mercadopago')

 const consulta = async (req, res) => {
  const {name,amount} = req.query
  const playerName = name
 try {
    const client = new MercadoPagoConfig({ accessToken: config.MP_PUBLIC_KEY });

    const preference = await new Preference(client).create({
       body : {
        items: [
          {
            id: '35131389',
            title: 'educando can',
            description: 'Guarda',
            picture_url: '',
            category_id: '',
            quantity: 1,
            currency_id: 'ARG',
            unit_price: Number(amount),
          },
        ],
        marketplace_fee: 0,
        payer: {
          name: playerName,
          surname: '',
          email: 'silvamaxiblas@gmail.com',
          phone: {
            area_code: '341',
            number: '6297919',
          },
          identification: {
            type: 'DNI',
            number: '35131389',
          },
          address: {
            zip_code: '2121',
            street_name: 'Moreno',
            street_number: 1152,
          },
        },
        back_urls: {
          success: 'http://test.com/success',
          failure: 'http://test.com/failure',
          pending: 'http://test.com/pending',
        },
        differential_pricing: {
          id: 1,
        },
        expires: false,
        additional_info: 'Discount: 12.00',
        auto_return: 'all',
        binary_mode: true,
        external_reference: '1643827245',
        marketplace: 'marketplace',
        notification_url: 'http://notificationurl.com',
        operation_type: 'regular_payment',
        payment_methods: {
          default_payment_method_id: '',
          excluded_payment_types: [
            {
              id: 'ticket',
            },
          ],
          excluded_payment_methods: [
            {
              id: '',
            },
          ],
          installments: 5,
          default_installments: 1,
        },
        shipments: {
          mode: 'custom',
          local_pickup: false,
          default_shipping_method: null,
          free_methods: [
            {
              id: 1,
            },
          ],
          cost: 10,
          free_shipping: false,
          dimensions: '10x10x20,500',
          receiver_address: {
            zip_code: '',
            street_number: 0,
            street_name: '',
            floor: '',
            apartment: '1',
          },
        },
        statement_descriptor: 'Educando Can',
      }
      })
      const url = preference.sandbox_init_point

         res.json(url)
        } catch (error) {
            console.log(error)
        }
       
        
         
        }
        
 module.exports = {consulta}

//  body: {
//   items: [
//     {id: "educando can",
//       title: name,
//       quantity: 1,
//       unit_price: Number(amount)
//     },
//   ],
// },



