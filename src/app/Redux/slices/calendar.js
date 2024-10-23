"use client"

import { createSlice } from "@reduxjs/toolkit"

export const Calendar = createSlice({
    name:"calendar",
    initialState:{
        calendar:[],
        busyTime:[]
    },
    reducers:{
        setCalendar : (state, action) =>{
            state.calendar = action.payload           
        },
        upDateBusyTime :(state, action) => {
            state.busyTime = action.payload
        }

    }
})

export const {setCalendar, upDateBusyTime} = Calendar.actions

export default Calendar.reducer