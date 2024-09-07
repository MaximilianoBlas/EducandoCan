'use client'

import { consultarApiMercadoPago, probarPostMercadoPago } from "./Redux/action/mercadoPago";
import { consultarApi } from "./Redux/action/paqAr";
import styles from "./page.module.css";
import ProductCards from "./productCards/productCards";
import { useDispatch, useSelector } from "react-redux";

// SDK de Mercado Pago
// import  {MercadoPago}  from '@mercadopago/sdk-react';
// import { MercadoPagoConfig, Preference } from 'mercadopago';
import { useRouter } from 'next/navigation'
import Navbar from "./components/navbar";
import Presentacion from "./components/presentacion";
import Servicios from "./components/servicios";

// import { initMercadoPago } from '@mercadopago/sdk-react';


// Agrega credenciales

//   const mp = new MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
//   const bricksBuilder = mp.bricks();



export default   function  Home () {
  // const {preference} = useSelector((state) => state.mercadoPago)
  const dispatch = useDispatch()

  // const brick = initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
  // console.log(brick)

  // const router = useRouter();
  // if(preference){ router.push(preference)}


  return (
    <main className={styles.mainContainer}>
      <Navbar/>
      <Presentacion/>
      <Servicios/>
     {/* <ProductCards/>
     <h1>Pruebas de paq.ar</h1>
     <button onClick={() => dispatch(consultarApi())}>Consultar api</button> */}

     {/* <h1>Pruebas de Mercado Pago</h1>
     <button onClick={() => dispatch(consultarApiMercadoPago())}>Rehabilitacion x 1 semana $20.000</button> */}
     {/* <button onClick={() => dispatch(probarPostMercadoPago())}>Consultar post  api Mercado Pago</button> */}
      

       {/* <button onClick={() =>{console.log('hola')} }>pagar</button>  */}
    </main>
  );
}
