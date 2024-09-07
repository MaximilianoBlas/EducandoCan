`use client`;

import { configureStore } from "@reduxjs/toolkit";
import { PaqAr } from "./slices/paqAr";
import { MercadoPago } from "./slices/mercadoPago";


export default configureStore ({
    reducer: {
       paqAr: PaqAr.reducer,
       mercadoPago: MercadoPago.reducer
    }
}) 

