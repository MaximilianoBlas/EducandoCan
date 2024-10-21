import React from 'react'
import styles from './index.module.css'
import { motion } from "framer-motion";
import { Mogra } from 'next/font/google';
import { useRouter } from 'next/navigation'

export default function Navbar() {

  const router = useRouter();

  const redireccion = (enlace) =>{
      router.push(enlace)
  }

  const botonIg = () => {
      router.push('https://www.instagram.com/educandocan/')
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}><img className={styles.logo}  src="logoRec.webp" alt="Logo" /></div>
      <div className={styles.titleContainer}>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
          <button style={{all:'unset'}} onClick={() => redireccion('/')}>
      <h3>Inicio</h3>
          </button>
        </motion.div>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
          <button style={{all:'unset'}} onClick={() => redireccion('/clases')}>
      <h3>Clases</h3>
          </button>
        </motion.div>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
          <button style={{all:'unset'}} onClick={() => redireccion('/admin')}>
     <h3>Comunidad</h3>
          </button>
        </motion.div>
        <motion.div 
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}>
          <button style={{all:'unset'}} onClick={() => redireccion('https://www.instagram.com/educandocan/')}>
      <h3>Instagram</h3>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
