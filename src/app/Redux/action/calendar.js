'use client'
import axios from 'axios';
import { setCalendar } from '../slices/calendar';



export const upDateCalendar = (payload) => async (dispatch) => {
    console.log('entra al action actualizar calendario', payload)
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/upDateCalendar/upDateCalendar`)
    console.log(data)
    dispatch(setCalendar(data))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }