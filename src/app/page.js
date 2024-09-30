'use client'

import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Presentacion from "./components/presentacion";
import Servicios from "./components/servicios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWindowWidth } from "./Redux/action/windowWidth";

export default   function  Home () {

  const [windowWidth, setWindowWidth] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    // Obtener el ancho de la ventana cuando el componente se monta
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Ejecutar al cargar la página
    handleResize();

    // Agregar un listener para escuchar cuando la ventana cambia de tamaño
    window.addEventListener('resize', handleResize);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    dispatch(getWindowWidth(windowWidth))

  return (
    <main className={styles.mainContainer}>
      <Navbar/>
      <Presentacion/>
      <Servicios/>
    </main>
  );
}
