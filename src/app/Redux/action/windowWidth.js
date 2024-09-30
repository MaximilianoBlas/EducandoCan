'use client'
import axios from 'axios';
import { setWindowWidth } from '../slices/windowWidth';




export const getWindowWidth = (payload) => async (dispatch) => {
    console.log('entra al action ancho de ventana')
    try {
    dispatch(setWindowWidth(payload))
    } catch (error) {
        console.log(error)
      throw new Error(error)
    }
  }