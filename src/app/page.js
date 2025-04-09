"use client";

import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Presentacion from "./components/presentacion";
import Servicios from "./components/servicios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWindowWidth } from "./Redux/action/windowWidth";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  dispatch(getWindowWidth(windowWidth));

  return (
    <main className={styles.mainContainer}>
      <Navbar />
      <Presentacion />
      <Servicios />
    </main>
  );
}
