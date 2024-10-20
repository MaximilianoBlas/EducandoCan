`use client`;

import { configureStore } from "@reduxjs/toolkit";
import { PaqAr } from "./slices/paqAr";
import { MercadoPago } from "./slices/mercadoPago";
import { Calendar } from "./slices/calendar";
import { CurrentDollar } from "./slices/currentDollar";
import { WindowWidth } from "./slices/windowWidth";



export default configureStore ({
    reducer: {
       paqAr: PaqAr.reducer,
       mercadoPago: MercadoPago.reducer,
       calendar: Calendar.reducer,
       currentDollar: CurrentDollar.reducer,
       windowWidth: WindowWidth.reducer
    }
}) 

