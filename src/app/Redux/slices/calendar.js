"use client"

import { createSlice } from "@reduxjs/toolkit"

export const Calendar = createSlice({
    name:"calendar",
    initialState:{
        calendar:[]
    },
    reducers:{
        setCalendar : (state, action) =>{
            state.calendar = action.payload           
        }

    }
})

export const {setCalendar} = Calendar.actions

export default Calendar.reducer