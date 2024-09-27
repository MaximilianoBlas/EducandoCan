'use client'
import axios from 'axios';
import { setPreference } from '../slices/mercadoPago';

  export const consultarApiMercadoPago = (payload) => async (dispatch) => {
    console.log('entra al action consultar backend', payload)
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/mercadoPago/pagar?name=${payload.clientLastname} ${payload.clientName}&amount=${payload.amount}&description=${payload.description}&email=${payload.email}&phone=${payload.phone}&startDate=${payload.startDate}&endDate=${payload.endDate}`)
    console.log(data)
    dispatch(setPreference(data))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }

 

  export const webhooks = (payload) => async (dispatch) => {
    console.log('entra al action webhooks')
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/mercadoPago/consultaPago`)
    console.log(data)
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }



