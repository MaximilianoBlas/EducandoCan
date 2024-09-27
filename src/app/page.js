'use client'

import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Presentacion from "./components/presentacion";
import Servicios from "./components/servicios";

export default   function  Home () {

  return (
    <main className={styles.mainContainer}>
      <Navbar/>
      <Presentacion/>
      <Servicios/>
    </main>
  );
}
