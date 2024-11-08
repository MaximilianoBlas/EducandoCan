'use client'
import axios from 'axios';
import { setUser } from '../slices/user';

  export const getUser = (payload) => async (dispatch) => {
    console.log('entra al action de get user')
    console.log('este es el payload', payload)
    try {
    const { data } = await axios.post(`https://educandocan-production.up.railway.app/api/v1/user`,payload)
    console.log(data)
    dispatch(setUser(data))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }