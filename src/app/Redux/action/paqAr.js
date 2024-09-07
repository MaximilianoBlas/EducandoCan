'use client'
import axios from 'axios';


export const enviarTokenDePago = (payload) => async (dispatch) => {
    try {
      console.log('entra al action del proceso de pago', payload)
      const { data } = await axios.post('/v1/stripe/procesar-pago', payload)
      if (data.data.success) {
        dispatch(setErrorType(false))
        console.log('respuesta del backend en enviar token', data)
      }
    } catch ({ response }) {
      dispatch(setErrorType(response.data.message))
      console.log(response)
    }
  }
  
  export const changeSubscription = (payload) => async (dispatch) => {
    try {
      dispatch(setSubscription(payload))
    } catch (error) {
      throw new Error(error)
    }
  }

  export const consultarApi = (payload) => async (dispatch) => {
    console.log('entra al action consultar api', payload)
  
    try {
    const { data } = await axios.get('https://apitest.correoargentino.com.ar/paqar/v1/auth', {
        params: {
          authorization: `Apikey fsgfdf65d1f651d6f51g`,
          agreement: '18017',
        }
      }
    )
    console.log(data.data)
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }
