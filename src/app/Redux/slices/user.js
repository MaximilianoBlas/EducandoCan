"use client"

import { createSlice } from "@reduxjs/toolkit"

export const User = createSlice({
    name:"user",
    initialState:{
        user:false,
    },
    reducers:{
        setUser : (state, action) =>{
            state.user = action.payload           
        }

    }
})

export const {setUser} = User.actions

export default User.reducer