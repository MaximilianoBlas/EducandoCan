'use client'
import { useEffect, useState } from 'react';
import style from './page.module.css';
import {Calendar, dayjsLocalizer,momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs';
import moment from'moment'
import { Chela_One } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import {consultarApiMercadoPago, webhooks} from '../Redux/action/mercadoPago'
import { useRouter } from 'next/navigation';
import { upDateCalendar } from '../Redux/action/calendar';
import { getCurrentDollar } from '../Redux/action/currentDollar';


export default function Guardas() {
  const dispatch = useDispatch()
  const {preference} = useSelector((state) => state.mercadoPago)
  const {calendar} = useSelector((state) => state.calendar)
  const {currentDollar} = useSelector((state) => state.currentDollar)
  const router = useRouter()
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())
  const [optionView, setOptionView] = useState(false)
  const [inPersonView, setInPersonView] = useState(false)
  const [onlineView, setOnlineView] = useState(false)
  const [formView, setFormView] = useState(false)
  const [typeClass, setTypeClass] = useState('')
  const [dateGuard, setDateGuard] = useState('')
  const [form, setForm] = useState({
    startDate:'',
    endDate:'',
    clientName: '',
    clientLastname:'',
    email: '',
    phone: '',
    description: '', 
    amount:'',
    type:''
  })
  const [event, setEvent] = useState([])
  const [hour, setHour] = useState('')

  if(preference)router.push(preference)

    useEffect(()=>{
  dispatch(upDateCalendar())
  dispatch(getCurrentDollar())
  },[])


  useEffect(()=>{
    let currentEvent = []
        calendar.forEach(e => {
      let start = e.startDate
      let end = e.endDate
 currentEvent.push({...e,
        title: e.name,
         start: dayjs(start).toDate(),
      end : dayjs(start).toDate(),})
    });
    setEvent(currentEvent)
    },[calendar])

  const localizer = dayjsLocalizer(dayjs)

  const onView = (e) =>{
   if(view !== e) setView(e)
  }

  const onNavigate = (e)=>{
    if(view !== e) setDate(e)
  }

  const createEvent = (e) => {
    setOptionView(!optionView)
    let {start} = e
    let string = start.toString()
    let stringArray = string.split(' ')
    let date = {
      day:stringArray[0],
      month:stringArray[1],
      number:stringArray[2],
      year:stringArray[3],
      hour:stringArray[4],
    }
    console.log(stringArray[4].split(':').shift())
    console.log(stringArray[4] === '00:00:00')
  if(stringArray[4] === '00:00:00') date = {...date, hour:''} 
  else {date = {...date, hour:stringArray[4]}
    setHour(stringArray[4].split(':').slice(0,2).join(':'))}
  
    console.log(date.hour)
    setForm({...form, startDate: `${date.year}-${numberMonth[date.month]}-${date.number}-${date.hour}`, amount:currentDollar*50})
    setDateGuard(date)
    if(formView) {
      setForm({ startDate:'',
      endDate:'',
      clientName: '',
      clientLastname:'',
      email: '',
      phone: '',
      description: '', 
      amount:''})}
  }




  

  const days = {
    Sun:'Domingo',
    Mon:'Lunes',
    Tue:'Martes',
    Wed:'Miercoles',
    Thu:'Jueves',
    Fri:'Viernes',
    Sat:'Sabado'
  }

  const months = {
    Jan: 'Enero',
    Feb: 'Febrero',
    Mar: 'Marzo',
    Apr: 'Abril',
    May: 'Mayo',
    Jun: 'Junio',
    Jul: 'Julio',
    Aug: 'Agosto',
    Sep: 'Septiembre',
    Oct: 'Octubre',
    Nov: 'Noviembre',
    Dec: 'Diciembre'
  }

  const extensionMonth = {
    Jan: 31,
    Feb: 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sep: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31
  }

  const numberMonth = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  }



  const scheduleGuard = () => {
    dispatch(consultarApiMercadoPago(form))
    
    // dispatch(webhooks())
  }

  const completedForm = (e) => {
    if(form.startDate && e.type === 'time'){      
      setHour(e.value)
      console.log('startDate', form.startDate)
      let startDate =  form.startDate.split('-')
      startDate[3] = e.value
      let newStart = startDate.join('-')

      console.log('startDate', newStart)
      setForm({...form, startDate:newStart})


      // if(startDate[1]*1 === endDate[1]*1){
      //   let amount = Number(endDate[2]) - Number(startDate[2])
      //   setForm({...form,[e.name]:e.value, amount:amount*10000})
      // } else{
      //   let numberMonth = extensionMonth[dateGuard.month]
      //   let amount = numberMonth - Number(startDate[2]) + Number(endDate[2])
      //   setForm({...form,[e.name]:e.value, amount:amount*10000})
      // }
    }else setForm({...form,[e.name]:e.value})
  }

  const selectClass = (e) => {
    console.log(e.target.value)
    // setTypeClass('a ver')
    setOnlineView(false)
    if(e.target.value === 'online') {
      setForm({...form, type:'online'})
      setOnlineView(true)}
    else {
      setForm({...form, type:'inPerson'})
      setInPersonView(true)}
  }



  return (
    <div className={style.divContainer}>
      {/* <button onClick={()=>onView()} style={{width:'10vw', height:'5vh'}}>view change</button> */}
   <Calendar selectable
   onSelectSlot={(e) => {createEvent(e)}}
    localizer={localizer} events={event} view={view} date={date} 
    onView={(e)=> onView(e)} 
    onNavigate={(e)=> onNavigate(e)} />

    {
      optionView &&
      <div className={style.formContainer}>
        <button value={'inPerson'} onClick={(e) =>{selectClass(e)}}>Clase presencial</button>
        <button value={'online'} onClick={(e) =>{selectClass(e)}}>Clase online</button>
      </div>
    }

{
      onlineView &&
      <div className={style.formContainer}>
        <div className={style.pAndButton}>
        <p className={style.p}>
        ¿Qué es Lorem Ipsum?
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
        <button  onClick={(e) =>{setOnlineView(false), setFormView(true)}}>Continuar</button>
        </div>
      </div>
    }

{
      inPersonView &&
      <div className={style.formContainer}>
        <div className={style.pAndButton}>
        <p className={style.p}>
        ¿Qué es Lorem Ipsum?
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
     <button  onClick={(e) =>{setInPersonView(false), setFormView(true)}}>Continuar</button>
        </div>
      </div>
    }



    {
      formView &&
    <div className={style.formContainer}>
      {/* <div className={style.inputContainer}> */}
      <h3>Agenda de Clase</h3>
      
      <div className={style.inputContainer}>
      <div>
      <label htmlFor="start">{`${days[dateGuard.day]} ${dateGuard.number} ${months[dateGuard.month]} ${hour}`}</label>
      </div>
      <div>
      <label htmlFor="end"></label>
      <input value={hour} onChange={(e) => {completedForm(e.target)}} type='time'  name='endDate' />
        </div>
      </div>
      <div className={style.inputContainer}>
      <div>
      <label htmlFor="name">Nombre</label>
      <input  value={form.clientName} onChange={(e) => {completedForm(e.target)}} type="text" name='clientName' />
      </div>
      <div>
      <label htmlFor="lastname">Apellido</label>
      <input value={form.clientLastname} onChange={(e) => {completedForm(e.target)}} type="text" name='clientLastname' />
        </div>
      </div>
<div className={style.inputContainer}>
        <div >
      <label htmlFor="email">Email</label>
      <input value={form.email} onChange={(e) => {completedForm(e.target)}} type="text" name='email' />
        </div>
        <div>
      <label htmlFor="phone">Celular</label>
      <input value={form.phone} onChange={(e) => {completedForm(e.target)}} type="text" name='phone' />
        </div>
</div>
        <div className={style.TextareaContainer}>
      <label htmlFor="description">Descripción</label>
      <textarea value={form.description} onChange={(e) => {completedForm(e.target)}}  minLength={10}  rows={5} type="text" name='description' />
        </div>
        {/* </div> */}
        <h6>Costo de clase {`${currentDollar*50}`}</h6>
        <button onClick={(e) =>{scheduleGuard(e)}}>Agendar</button>
    </div>
    }
    </div>
  )
}
