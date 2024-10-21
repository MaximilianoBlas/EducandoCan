'use client'
import { Children, cloneElement } from "react";
import { useEffect, useState } from 'react';
import style from './page.module.css';
import {Calendar,dayjsLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import {consultarApiMercadoPago} from '../Redux/action/mercadoPago'
import { useRouter } from 'next/navigation';
import { upDateCalendar } from '../Redux/action/calendar';
import { getCurrentDollar } from '../Redux/action/currentDollar';
import Image from 'next/image'
import presencial from '../../../public/presencial.webp'
import online from '../../../public/online.webp'




export default function Clases() {
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
  const [dateGuard, setDateGuard] = useState('')
  const [errors,setErrors] = useState({
      clientName:'',
      clientLastname:'',
      email:'',
      phone:'',
      date:'',
      description:''
  })
  const [warningSign, setWarninSing] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
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
  const {windowWidth} = useSelector((state) => state.windowWidth)
  dayjs.extend(localizedFormat); // Para formatear las fechas
  dayjs.locale('es'); // Cambiar el idioma a español
  const localizer = dayjsLocalizer(dayjs)

  // const dayjsLocalizer = dateFnsLocalizer({
  //   format: (date, format) => dayjs(date).format(format),
  //   parse: (value, format) => dayjs(value, format).toDate(),
  //   startOfWeek: () => dayjs().startOf('week').toDate(),
  //   getDay: (date) => dayjs(date).day(),
  //   locales: {
  //     es: dayjs.locale('es'),
  //   },
  // });

  if(preference)router.push(preference)

    useEffect(()=>{
  dispatch(upDateCalendar())
  dispatch(getCurrentDollar())
  },[])

  useEffect(()=>{

    let currentEvent = []
        calendar.forEach(e => {
          let month = e.startDate.split('-')[1]
          let newStart , newEnd
          if(month >= 10 && month <= 12){
            
            newStart = e.startDate.split('-')
            newStart[1] = `0${month}`
            newStart.join('-')
            newEnd = e.endDate.split('-')
            newEnd[1] = `0${month}`
            newEnd.join('-')
          } else {
            newStart = e.startDate
            newEnd = e.startDate
          }

 currentEvent.push({...e,
        title: e.name,
         start: dayjs(newStart).toDate(),
      end : dayjs(newEnd).toDate(),})
    });
    setEvent(currentEvent)
    },[calendar])


    const hourAfterClass = (hour, minute) => {
      let startClass
      let endClass
      startClass = `${Number(hour)-2}:${minute}`
      if(form.type === 'inPerson') {
        endClass = `${Number(hour)+2}:${minute}`}
      else{ if(minute > 29) {
        endClass = `${Number(hour) + 2}:${Number(minute) - 30}`}
         else {
        endClass = `${Number(hour) + 1}:${Number(minute) + 30}`}}

 

        if(startClass && startClass.length === 4)  startClass = 0 + startClass
        if(endClass && endClass.length === 4)  endClass = 0 + endClass 
        return {startClass, endClass}
    }
  



  const onView = (e) =>{
   if(view !== e) setView(e)
  }

  const onNavigate = (e)=>{
    if(view !== e) setDate(e)
  }

  const createEvent = (e) => {

    console.log('entro a creat event')
    console.log(e)

    // if(windowWidth > 400 || windowWidth < 401 && e.action === 'movilClick')
    if(!optionView && !inPersonView && !onlineView && !formView){
    if(view === 'month') {
      setDate(e.start)
      setView('day')}
      else{
        console.log('entra a donde tiene que entrar')
        setOptionView(true)
    let {start} = e
    let string = start.toString()
    let stringArray = string.split(' ')
    let date = {
      day:stringArray[0],
      month:stringArray[1],
      number:stringArray[2],
      year:stringArray[3],
      hour:stringArray[4].split(':').shift(),
      minute:stringArray[4].split(':').slice(1,2).join('')
    }

    
        const after = hourAfterClass(date.hour, date.minute)
    
    
    if(stringArray[4] === '00:00:00') date = {...date, hour:''}
    else {date = {...date, hour:stringArray[4]}  
    setHour(stringArray[4].split(':').slice(0,2).join(':'))}

    const startDate = `${date.year}-${numberMonth[date.month]}-${date.number}-${date.hour}`

    validate(e,startDate,after.endClass, after.startClass)

    setForm({...form, startDate: startDate, amount:currentDollar*50})
    setDateGuard(date)
    if(formView) {
      setForm({ startDate:'',
      endDate:'',
      clientName: '',
      clientLastname:'',
      email: '',
      phone: '',
      description: '',
      amount:'',
      type:'' })}

      }
    }
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
  }

  

  const completedForm = (e) => {
 
    if(form.startDate && e.type === 'time'){
      setHour(e.value)
      let startDate =  form.startDate.split('-')
      startDate[3] = e.value
      let newStart = startDate.join('-')

      let newHour = e.value
      let [hour,minute] = newHour.split(':')
      
      let after = hourAfterClass(hour, minute)

       startDate =  form.startDate.split('-')
      startDate[3] = after.endClass

      let newEnd = startDate.join('-')

      setErrors(validate(e, newStart, after.endClass, after.startClass))
      setForm({...form, startDate:newStart, endDate:newEnd})

    }else {
      let startDate =  form.startDate.split('-')
      let newHour = startDate[3]
      let [hour,minute] = newHour.split(':')

      let after = hourAfterClass(hour, minute)



       startDate =  form.startDate.split('-')
      startDate[3] = after.endClass
      let newEnd = startDate.join('-')
      
      setErrors(validate({...form, [e.name]: e.value}))
      setForm({...form,[e.name]:e.value,endDate:newEnd})}
  }

  const selectClass = (e) => {
    setOptionView(false)
    console.log('aca esta el tipo de clase', e)
    if(e.target.alt === 'online') {
      setForm({...form, type:'online'})
      setOnlineView(true)}
    else {
      setForm({...form, type:'inPerson'})
      setInPersonView(true)}
  }



  const validate = (input,newStart,endClass,startClass) =>{

    if(newStart){
      let dateOutOfTime = newStart.split('-').slice(0,3).join('-')
 
      let date= ''
       date = calendar.find(e  => {
        let endTime = e.startDate.split('-').slice(0,3).join('-')
        let timeOfDateChange = e.startDate.split('-').pop()
        timeOfDateChange = timeOfDateChange.split(':').slice(0,2).join(':')

        return dateOutOfTime === endTime ? timeOfDateChange >= startClass ? timeOfDateChange <= endClass ? true : false :false :false
      } )

      if(date){
        setWarninSing(true)
          setDisabledButton(true)
      } else {
        setWarninSing(false)
        setDisabledButton(false)}
      } 

    let errors = {};
    if (!input.clientName) {
        errors.clientName = "El nombre es requerido";
    } else if (/([0-9])/.test(input.clientName)) {
        errors.clientName = "Nombre invalido, solo se permiten letras";
    }
    if (!input.clientLastname) {
      errors.clientLastname = "El apellido es requerido";
  } else if (/([0-9])/.test(input.clientLastname)) {
      errors.clientLastname = "Apellido invalido, solo se permiten letras";
  }
  if (!input.email) {
    errors.email = "El mail es requerido";
} else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email))) {
    errors.email = "El formato del mail es incorrecto";
}
if (!input.phone) {
  errors.phone = "El celular es requerido";
} else if (!(/^\d{1,15}$/.test(input.phone))) {
  errors.phone = "Solo se permiten números";
}
  if(Object.keys(errors).length === 0) setDisabledButton(false)
    else setDisabledButton(true)
    return errors;

  }


  const closeInfoView = () => {
    setOnlineView(false)
     setFormView(true)
     setInPersonView(false)
  }

  let TouchCellWrapper

  if(windowWidth < 401) {
     TouchCellWrapper = ({ children, value, onSelectSlot }) =>{
      return cloneElement(Children.only(children), {
         onTouchEnd: () => onSelectSlot({ action: "movilClick", start: [value] }),
         style: {
           className: `${children}`
         }
       });
     }
  }


  const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`,
  };

  console.log(form)


  return (
    <div className={style.divContainer}>

      {windowWidth < 401 && <Calendar selectable  
   onSelectSlot={createEvent} 
    localizer={localizer} events={event} view={view} date={date}
    onView={(e)=> onView(e)}
    onNavigate={(e)=> onNavigate(e)}
    messages={messages}
   components={{
      dateCellWrapper: (props) => (
        <TouchCellWrapper {...props} onSelectSlot={createEvent} />
      )
    }}
     /> }
     { windowWidth > 400 &&
      <Calendar selectable  
      onSelectSlot={(e) => createEvent(e)} 
       localizer={localizer} events={event} view={view} date={date}
       onView={(e)=> onView(e)}
       onNavigate={(e)=> onNavigate(e)}
       messages={messages}
        />

     }
   

    {
      optionView &&
      <div  className={style.formContainer}>
        <div className={style.closeButtonContainer}>
        <button className={style.closeButton} onClick={() => setOptionView(false)}>X</button>
        </div>
        <div className={style.presentialAndOnlineButtonContainer}>


        <div className={style.presentialAndOnlineButton}>
        <button className={style.button} value={'inPerson'} onClick={(e) =>{selectClass(e)}}>
        <Image  src={presencial} style={{
          width: '83%',
          height: 'auto',
        }} alt='inPerson'></Image> 
          </button>
          <p>Clase presencial</p>
        </div>
      
      <div className={style.presentialAndOnlineButton}>
        <button className={style.button} value={'online'} onClick={(e) =>{selectClass(e)}}>
        <Image  src={online} style={{
          width: '100%',
          height: 'auto',
        }} alt='online'></Image></button>
          <p> Clase online</p>
      </div>
          </div>
      </div>
    }

{
      onlineView &&
      <div className={style.formContainer}>
      <div className={style.closeButtonContainer}>
        <button className={style.closeButton} onClick={() => setOnlineView(false)}>X</button>
        </div>

        <div className={style.pAndButton}>
        <p className={style.p}>
        ¿Qué es Lorem Ipsum?
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
        <button className={style.button}  onClick={(e) =>{closeInfoView()}}>Continuar</button>
        </div>
      </div>
    }

{
      inPersonView &&
      <div className={style.formContainer}>
        <div className={style.closeButtonContainer}>
        <button className={style.closeButton} onClick={() => setInPersonView(false)}>X</button>
        </div>
        <div className={style.pAndButton}>
        <p className={style.p}>
        ¿Qué es Lorem Ipsum?
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
     <button className={style.button}  onClick={(e) =>{closeInfoView()}}>Continuar</button>
        </div>
      </div>
    }

    {
      formView &&
        <div className={style.formContainer}>
      <div className={style.closeButtonContainer}>
        <button className={style.closeButton} onClick={() => {setFormView(false), setWarninSing(false)}}>X</button>
        </div>
        <div className={style.containerWithoutCloseButton}>

        
      <h2>Agenda de Clase</h2>
      <div className={style.inputTimeContainer}>
      <div className={style.inputContainer}>
      <div>
      <label htmlFor="start">{`${days[dateGuard.day]} ${dateGuard.number} ${months[dateGuard.month]} ${hour}`}</label>
      </div>
      <div>
      <label htmlFor="end"></label>
      <input className={style.input} value={hour} onChange={(e) => {completedForm(e.target)}} type='time'  name='endDate' />
        </div>
      </div>
      {warningSign && <p className={style.warningSignP}>Horario reservado, 
        cambiar horario por favor</p>}

      </div>
      <div className={style.inputContainer}>
      <div>
      <label htmlFor="name">Nombre</label>
      <input className={style.input}  value={form.clientName} onChange={(e) => {completedForm(e.target)}} type="text" name='clientName' />
      {errors.clientName && <p className={style.warningSignP}>{errors.clientName}</p>}
      </div>
      <div>
      <label htmlFor="lastname">Apellido</label>
      <input className={style.input} value={form.clientLastname} onChange={(e) => {completedForm(e.target)}} type="text" name='clientLastname' />
      {errors.clientLastname && <p className={style.warningSignP}>{errors.clientLastname}</p>}
        </div>
      </div>
<div className={style.inputContainer}>
        <div >
      <label htmlFor="email">Email</label>
      <input className={style.input} value={form.email} onChange={(e) => {completedForm(e.target)}} type="text" name='email' />
      {errors.email && <p className={style.warningSignP}>{errors.email}</p>}
        </div>
        <div>
      <label htmlFor="phone">Celular</label>
      <input className={style.input} value={form.phone} onChange={(e) => {completedForm(e.target)}} type="text" name='phone' />
      {errors.phone && <p className={style.warningSignP}>{errors.phone}</p>}
        </div>
</div>
        <div className={style.TextareaContainer}>
      <label htmlFor="description">Descripción</label>
      <textarea value={form.description} onChange={(e) => {completedForm(e.target)}}  minLength={10}  rows={5} type="text" name='description' />
        </div>
        {/* </div> */}
        <h4>Costo de clase {`${currentDollar*50}`}</h4>
        <button className={style.button} disabled={disabledButton} onClick={(e) =>{scheduleGuard(e)}}>Agendar</button>
        </div>
    </div>
    }
    {/* {warningSign &&
    <div className={style.warningSignContainer}>
      El horario para la clase seleccionada esta ocupado. 
      Por favor cambio el horario o el día. 
    </div>
    } */}
    </div>
  )
}
