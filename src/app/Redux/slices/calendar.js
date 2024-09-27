"use client"

import { createSlice } from "@reduxjs/toolkit"
import dayjs from 'dayjs';

// const valorInicial= 0

export const Calendar = createSlice({
    name:"calendar",
    initialState:{
        calendar:[]
    },
    reducers:{
        setCalendar : (state, action) =>{
            state.calendar = action.payload
            // console.log(action.payload)
            // let cal = action.payload
            // let calendar = cal.forEach(e => {
            //     let start = e.startDate
            //     let end = e.endDate
            //     return {...e,
            //       title: e.name,
            //        start: dayjs(start).toDate(),
            //     end : dayjs(end).toDate(),}
            //   });
            //   console.log('calendar',calendar)
            //   console.log('cal',cal)
              

        }

    }
})

export const {setCalendar} = Calendar.actions

export default Calendar.reducer