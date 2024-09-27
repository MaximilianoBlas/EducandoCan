`use client`;

import { configureStore } from "@reduxjs/toolkit";
import { PaqAr } from "./slices/paqAr";
import { MercadoPago } from "./slices/mercadoPago";
import { Calendar } from "./slices/calendar";


export default configureStore ({
    reducer: {
       paqAr: PaqAr.reducer,
       mercadoPago: MercadoPago.reducer,
       calendar: Calendar.reducer
    }
}) 

