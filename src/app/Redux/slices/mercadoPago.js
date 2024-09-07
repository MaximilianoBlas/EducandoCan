"use client"

import { createSlice } from "@reduxjs/toolkit"

// const valorInicial= 0

export const MercadoPago = createSlice({
    name:"mercadoPago",
    initialState:{
        preference:''
    },
    reducers:{
        setPreference : (state, action) =>{
            state.preference = action.payload 
        }

    }
})

export const {setPreference} = MercadoPago.actions

export default MercadoPago.reducer