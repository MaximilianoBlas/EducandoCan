'use client'
import axios from 'axios';
import { setCurrentDollar } from '../slices/currentDollar';

export const getCurrentDollar = (payload) => async (dispatch) => {
    console.log('entra al action current dollar')
    try {
    const { data } = await axios.get(`https://api.bluelytics.com.ar/v2/latest`)
    dispatch(setCurrentDollar(data.blue.value_sell))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }