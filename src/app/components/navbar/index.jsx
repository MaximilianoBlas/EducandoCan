import React from 'react'
import styles from './index.module.css'
import { motion } from "framer-motion";
import { Mogra } from 'next/font/google';

export default function Navbar() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}><img src="logoRec.webp" alt="Logo" /></div>
      <div className={styles.titleContainer}>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
      <h3>Inicio</h3>
        </motion.div>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
      <h3>Servicios</h3>
        </motion.div>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
     <h3>Instagram</h3>
        </motion.div>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
      <h3>Contacto</h3>
        </motion.div>
      </div>
    </div>
  )
}
