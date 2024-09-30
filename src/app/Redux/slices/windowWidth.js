"use client"

import { createSlice } from "@reduxjs/toolkit"

export const WindowWidth = createSlice({
    name:"windowWidth",
    initialState:{
        windowWidth:0
    },
    reducers:{
        setWindowWidth : (state, action) =>{
            state.windowWidth = action.payload           
        }

    }
})

export const {setWindowWidth} = WindowWidth.actions

export default WindowWidth.reducer