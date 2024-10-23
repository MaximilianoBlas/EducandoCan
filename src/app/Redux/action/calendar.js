'use client'
import axios from 'axios';
import { setCalendar } from '../slices/calendar';
import { upDateBusyTime } from '../slices/calendar';



export const upDateCalendar = (payload) => async (dispatch) => {
    console.log('entra al action actualizar calendario')
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/upDateCalendar/upDateCalendar`)
    console.log(data)
    dispatch(setCalendar(data))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }

  export const setBusyTime = (payload) => async (dispatch) => {
    console.log('entra al action set busy time')
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/upDateCalendar/setBusyTime`)
    console.log(data)

    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }

  export const getBusyTime = (payload) => async (dispatch) => {
    console.log('entra al action get busy time')
    try {
    const { data } = await axios.get(`https://educandocan-production.up.railway.app/api/v1/upDateCalendar/getBusyTime`)
    console.log(data)
    dispatch(upDateBusyTime(data))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }