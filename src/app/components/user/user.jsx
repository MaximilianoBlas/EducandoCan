import { getUser } from '@/app/Redux/action/user'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import style from './user.module.css'


export default function User(prop) {
    const [userInput, setUserInput] = useState('')
    const dispatch = useDispatch()
    console.log(prop)

  return (
    <div>
          <h2>Acceso</h2>
          <div>
      <label htmlFor="user">Apellido</label>
      <input className={style.user} value={userInput} onChange={(e) => {setUserInput(e.target.value)}} type="password" name='user' />
        </div>
        <button className={style.button}  onClick={(e) =>{dispatch(getUser(userInput))}}>Agendar</button>
        </div>
  )
}
