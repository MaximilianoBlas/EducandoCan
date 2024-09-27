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


export default function Guardas() {
  const dispatch = useDispatch()
  const {preference} = useSelector((state) => state.mercadoPago)
  const {calendar} = useSelector((state) => state.calendar)
  const router = useRouter()
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())
  const [formView, setFormView] = useState(false)
  const [dateGuard, setDateGuard] = useState('')
  const [form, setForm] = useState({
    startDate:'',
    endDate:'',
    clientName: '',
    clientLastname:'',
    email: '',
    phone: '',
    description: '', 
    amount:''
  })
  const [event, setEvent] = useState([])
  if(preference)router.push(preference)
    useEffect(()=>{
  dispatch(upDateCalendar())
  },[])

  useEffect(()=>{
    let currentEvent = []
        calendar.forEach(e => {
      let start = e.startDate
      let end = e.endDate
 currentEvent.push({...e,
        title: e.name,
         start: dayjs(start).toDate(),
      end : dayjs(end).toDate(),})
    });
    setEvent(currentEvent)
    },[calendar])

  // const [event, setEvent] = useState()

  const localizer = dayjsLocalizer(dayjs)
  // const localizer = momentLocalizer(moment)

//  calendar.forEach(e => {
//       let start = e.startDate
//       let end = e.endDate
//       return {...e,
//         title: e.name,
//          start: dayjs(start).toDate(),
//       end : dayjs(end).toDate(),}
//     });

  // const event = [
  //   {
  //     start:dayjs('2024-08-17').toDate(),
  //     end:dayjs('2024-08-24').toDate(),
  //     title:'Guarda de Rocco'
  //   }
  // ]

  const onView = (e) =>{
   if(view !== e) setView(e)
  }

  const onNavigate = (e)=>{
    if(view !== e) setDate(e)
  }

  const createEvent = (e)=>{
    setFormView(!formView)
 
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
    setForm({...form, startDate: `${date.year}-${numberMonth[date.month]}-${date.number}`})
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
    if(form.startDate && e.type === 'date'){
      let startDate =  form.startDate.split('-')
      let endDate = e.value.split('-')
      if(startDate[1]*1 === endDate[1]*1){
        let amount = Number(endDate[2]) - Number(startDate[2])
        setForm({...form,[e.name]:e.value, amount:amount*10000})
      } else{
        let numberMonth = extensionMonth[dateGuard.month]
        let amount = numberMonth - Number(startDate[2]) + Number(endDate[2])
        setForm({...form,[e.name]:e.value, amount:amount*10000})
      }
    }else setForm({...form,[e.name]:e.value})
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
      formView &&
    <div className={style.formContainer}>
      {/* <div className={style.inputContainer}> */}
      <h3>Agenda una guarda</h3>
      
      <div className={style.inputContainer}>
      <div>
      <label htmlFor="start">Inicio: {`${days[dateGuard.day]} ${dateGuard.number} ${months[dateGuard.month]}`}</label>
      </div>
      <div>
      <label htmlFor="end">Fin</label>
      <input value={form.endDate} onChange={(e) => {completedForm(e.target)}} type='date' name='endDate' />
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
        <h6>Costo de estadía {`${form.amount}`}</h6>
        <button onClick={(e) =>{scheduleGuard(e)}}>Agendar</button>
    </div>
    }
    </div>
  )
}
