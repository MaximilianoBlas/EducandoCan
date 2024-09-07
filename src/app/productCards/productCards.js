import React from 'react'
import Card from './card/card'
import styles from './productsCards.module.css'

export default function ProductCards() {
  return (
    <div className={styles.main} >
    <Card/>
    </div>
  )
}
