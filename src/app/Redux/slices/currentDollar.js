"use client"

import { createSlice } from "@reduxjs/toolkit"

export const CurrentDollar = createSlice({
    name:"currentDollar",
    initialState:{
        currentDollar:0
    },
    reducers:{
        setCurrentDollar : (state, action) =>{
            state.currentDollar = action.payload           
        }

    }
})

export const {setCurrentDollar} = CurrentDollar.actions

export default CurrentDollar.reducer