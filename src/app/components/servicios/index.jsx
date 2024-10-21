import Card from './card'
import styles from './index.module.css'
import { motion } from "framer-motion";



export default function Servicios() {
  return (
    <div className={styles.mainContainer}>
      <motion.div
initial={{ opacity: 0, scale:0 }}
animate={{ opacity: 1, scale:1}}
transition={{ delay:1.5, duration: 1 }}
exit={{ opacity: 0 }}
  whileInView="visible"
  viewport={{ once: true }}
></motion.div>
      <Card servicio='Clases' enlace='/clases'/>
      {/* <Card servicio='Rehabilitación' enlace='/rehabilitacion'/> */}
      <Card servicio='comunidad' enlace='/comunidad'/>
    </div>
  )
}
