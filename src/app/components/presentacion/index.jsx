import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import presentImage from '../../../../public/ninaConPerro.webp'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';

export default function Presentacion() {
const {windowWidth} = useSelector((state) => state.windowWidth)

  return (

  
    <div className={styles.main}>
      <motion.div className={styles.titleAndTextContainer}   
      >
         {windowWidth < 401 &&  <motion.div className={styles.titleContainer}
        initial={{ opacity: 0, scale:0 }}
        animate={{ opacity: 1, scale:1}}
        transition={{ delay:0, duration: 1 }}
        exit={{ opacity: 0 }}
        > <h1>Asi comenzo todo</h1></motion.div>}
{windowWidth > 400 &&  <motion.div className={styles.titleContainer}
        initial={{ opacity: 0, scale:0 }}
        animate={{ opacity: 1, scale:1}}
        transition={{ delay:0, duration: 1 }}
        exit={{ opacity: 0 }}
        > <h1>Asi comenzo todo</h1></motion.div>}

        {windowWidth < 401 &&
        <motion.div className={styles.textContainer}
        initial={{ opacity: 0, scale:0 }}
        whileInView={{ opacity: 1, scale:1}}
        transition={{ delay:0, duration: 1 }}
        exit={{ opacity: 0 }}
        >
            <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.

Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo xvi.1​ Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.

El texto en sí no tiene sentido aparente, aunque no es aleatorio, sino que deriva de un texto de Cicerón en lengua latina, a cuyas palabras se les han eliminado sílabas o letras. El significado del mismo no tiene importancia, ya que solo es una demostración o prueba. El texto procede de la obra De finibus bonorum et malorum (Sobre los límites del bien y del mal) que comienza con:</p>
        </motion.div>
        }

{windowWidth > 400 &&
        <motion.div className={styles.textContainer}
        initial={{ opacity: 0, scale:0 }}
        whileInView={{ opacity: 1, scale:1}}
        transition={{ delay:1.5, duration: 1 }}
        exit={{ opacity: 0 }}
        >
            <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.

Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo xvi.1​ Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.

El texto en sí no tiene sentido aparente, aunque no es aleatorio, sino que deriva de un texto de Cicerón en lengua latina, a cuyas palabras se les han eliminado sílabas o letras. El significado del mismo no tiene importancia, ya que solo es una demostración o prueba. El texto procede de la obra De finibus bonorum et malorum (Sobre los límites del bien y del mal) que comienza con:</p>
        </motion.div>
        }

        
      </motion.div>
     
      <motion.div className={styles.imageContainer}
      initial={{ opacity: 0, scale:0 }}
      animate={{ opacity: 1, scale:1}}
      transition={{ delay:0, duration: 1 }}
      exit={{ opacity: 0 }}
      >
        <Image src={presentImage} style={{
          width: '100%',
          height: 'auto',
        }} alt='foto'></Image>
        {/* <img src="ninaConPerro.webp" alt="Foto" /> */}
      </motion.div>

    </div>
  )
}
