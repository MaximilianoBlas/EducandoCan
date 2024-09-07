'use server'
import React from 'react'

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.MP_PUBLIC_KEY });


export default async function Preferences()  {
      
          const preference = await new  Preference(client);
          console.log(preference)
        
        preference.create({
          body: {
            items: [
              {
                title: 'Mi producto',
                quantity: 1,
                unit_price: 15
              }
            ],
          }
        })
        .then(console.log)
        .catch(console.log);
        
        return preference
}
