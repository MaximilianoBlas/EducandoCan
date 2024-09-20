// Public Key TEST-39b7347e-3e15-4d92-bd81-28099b45dc3c 
// Access Token TEST-6911095786828805-012920-ea489eceb452b4f44e83a2dd96191b83-594195943

// 5031 7557 3453 0604
// 123
// 11/25
// Visa
// 4509 9535 6623 3704
// 123
// 11/25
// American Express
// 3711 803032 57522
// 1234
// 11/25


// APRO
// Pago aprobado
// (DNI) 12345678
// OTHE
// Rechazado por error general
// (DNI) 12345678


'use client'
import axios from 'axios';
import { instance } from './config';
import { setPreference } from '../slices/mercadoPago';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const accessToken = 'TEST-6911095786828805-012920-ea489eceb452b4f44e83a2dd96191b83-594195943'


export const probarPostMercadoPago = (payload) => async (dispatch) => {
    try {
      console.log('entra al action del proceso de pago', payload)
      const { data } = await axios.post('https://api.mercadopago.com/v1/payments',{
        "additional_info": {
          "items": [
            {
              "id": "MLB2907679857",
              "title": "Point Mini",
              "description": "Point product for card payments via Bluetooth.",
              "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
              "category_id": "electronics",
              "quantity": 1,
              "unit_price": 58.8,
              "type": "electronics",
              "event_date": "2023-12-31T09:37:52.000-04:00",
              "warranty": false,
              "category_descriptor": {
                "passenger": {},
                "route": {}
              }
            }
          ],
          "payer": {
            "first_name": "Test",
            "last_name": "Test",
            "phone": {
              "area_code": 11,
              "number": "987654321"
            },
            "address": {
              "street_number": null
            }
          },
          "shipments": {
            "receiver_address": {
              "zip_code": "12312-123",
              "state_name": "Rio de Janeiro",
              "city_name": "Buzios",
              "street_name": "Av das Nacoes Unidas",
              "street_number": 3003
            },
        
          }
        },
        "application_fee": null,
        "binary_mode": false,
        "campaign_id": null,
        "capture": false,
        "coupon_amount": null,
        "description": "Payment for product",
        "differential_pricing_id": null,
        "external_reference": "MP0001",
        "installments": 1,
        "metadata": null,
        "payer": {
          "entity_type": "individual",
          "type": "customer",
          "email": "test_user_123@testuser.com",
          "identification": {
            "type": "CPF",
            "number": "95749019047"
          }
        },
        "payment_method_id": "visa",
        "token": "ff8080814c11e237014c1ff593b57b4d",
        "transaction_amount": 58.8
      },{
        headers:{
          Authorization: `Bearer ${accessToken}`,
         'Content-Type': 'application/json',
          'X-Idempotency-Key': 'intento1'
        }
      })
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  export const crearCliente = (payload) => async (dispatch) => {
    try {
      console.log('entra al action del proceso de pago', payload)
      const { data } = await axios.post('https://api.mercadopago.com/v1/payments',{
          "address": {
            "id": "123123",
            "zip_code": "01234567",
            "street_name": "Rua Exemplo",
            "street_number": 123,
            "city": {}
          },
          "date_registered": "2021-10-20T11:37:30.000-04:00",
          "default_address": "Home",
          "default_card": "None",
          "description": "Description del user",
          "email": "jhon@doe.com",
          "first_name": "Jhon",
          "identification": {
            "type": "CPF",
            "number": "12345678900"
          },
          "last_name": "Doe",
          "phone": {
            "area_code": "55",
            "number": "991234567"
          }
      },{
        headers:{
          Authorization: `Bearer ${accessToken}`,
         'Content-Type': 'application/json',
          'X-Idempotency-Key': 'intento1'
        }
      })
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  export const changeSubscription = (payload) => async (dispatch) => {
    try {
      dispatch(setSubscription(payload))
    } catch (error) {
      throw new Error(error)
    }
  }

  export const consultarApiMercadoPago = (payload) => async (dispatch) => {
    // const router = useRouter()
    console.log('entra al action consultar backend')
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/consultas/consulta?name=${payload.clientLastname} ${payload.clientName}&amount=${payload.amount}&description=${payload.description}&email=${payload.email}`)
    console.log(data)
    // RedirectPage(data)
    dispatch(setPreference(data))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }

  export const webhooks = (payload) => async (dispatch) => {
    // const router = useRouter()
    console.log('entra al action webhooks')
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/consultas/consultaPago`)
    console.log(data)
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }

  // export default function RedirectPage({ url }) {
  //   console.log(url)
  //   const router = useRouter();
  
  //   useEffect(() => {
  //     if (url) {
  //       router.push(url); // Redirige automáticamente a la URL
  //     }
  //   }, [url, router]);
  
  //   return <div>Redirigiendo...</div>;
  // }



