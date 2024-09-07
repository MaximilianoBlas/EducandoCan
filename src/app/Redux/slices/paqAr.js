"use client"

import { createSlice } from "@reduxjs/toolkit"

// const valorInicial= 0

export const PaqAr = createSlice({
    name:"paqAr",
    initialState:{
        contador: 0
    },
    reducers:{
        sumar : (state) =>{
            state.contador += 1
        },
        restar : (state) =>{
            state.contador -= 1
        },
        sumaEspecifica : (state,action) =>{
            state.contador += action.payload 
        }

    }
})

export const {sumar, restar, sumaEspecifica} = PaqAr.actions

export default PaqAr.reducer