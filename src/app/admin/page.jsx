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
import { useRouter } from 'next/navigation';
import { getBusyTime, setBusyTime, upDateCalendar } from '../Redux/action/calendar';
import { getCurrentDollar } from '../Redux/action/currentDollar';


export default function Admin() {
  const dispatch = useDispatch()
  const {preference} = useSelector((state) => state.mercadoPago)
  const {calendar} = useSelector((state) => state.calendar)
  const router = useRouter()
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())
  const [event, setEvent] = useState([])
  const [eventView, setEventView] = useState(false)
  const [eventSaved, setEventSaved] = useState()
  const {windowWidth} = useSelector((state) => state.windowWidth)
  dayjs.extend(localizedFormat); // Para formatear las fechas
  dayjs.locale('es'); // Cambiar el idioma a español
  const localizer = dayjsLocalizer(dayjs)


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

  const onView = (e) =>{
   if(view !== e) setView(e)
  }

  const onNavigate = (e)=>{
    if(view !== e) setDate(e)
  }

  const createEvent = (e) => {

    if(view === 'month' && e.start.getDay() !== 0 && e.start.getDay() !== 6) {
      setDate(e.start)
      setView('day')}
      else if(e.start.getDay() !== 0 && e.start.getDay() !== 6){
        dispatch(setBusyTime(e.start))
        dispatch(getBusyTime())
      }
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


  const openEvent = (e)=>{
    let {startDate} = e
    let startHour = startDate.split('-').pop().split(':').slice(0,2).join(':') + 'hs a '
    let {endDate}  = e
    let endHour = endDate.split('-').pop() + 'hs'

    let day = e.start.toDateString()
    let arrayDay = day.split(' ')
    let dia = `${days[arrayDay[0]]} ${arrayDay[2]} de ${months[arrayDay[1]]} del ${arrayDay[3]} de `

    setEventSaved({...e, startClass: dia + startHour + endHour})
    setEventView(true)
  }


  const slotPropGetter = (date) => {
    const disabledDates = [new Date(2024, 9, 21, 14), new Date(2024, 9, 21, 15)];  // Fechas deshabilitadas
    
    if (date && disabledDates.some(d => d.toDateString() === date.toDateString() && d.getHours() === date.getHours() && d.getMinutes() === date.getMinutes() ) ){
      return {
        style: {
          backgroundColor: '#f0f0f0',
          pointerEvents: 'none', 
        }
      };
    }
    return {};
  }

  const dayPropGetter = (date) => {
    const day = date.getDay();
    if (day === 0 || day === 6) { // 0 = Domingo, 6 = Sábado
      return {
        className: style.weekendCell
      };
    }
    return {};
  };

 

  return (
    <div className={style.divContainer}>

      {windowWidth < 401 && <Calendar selectable  
    onSelectSlot={createEvent} 
    onSelectEvent={e => openEvent(e)}
    localizer={localizer} events={event} view={view} date={date}
    onView={(e)=> onView(e)}
    onNavigate={(e)=> onNavigate(e)}
    excludedDays={[0, 6]}
    min={new Date(2024, 10, 18, 9, 0)} 
    max={new Date(2024, 10, 18, 19, 0)} 
    slotPropGetter={slotPropGetter}
    dayPropGetter={dayPropGetter}
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
      onSelectEvent={e => openEvent(e)}
       localizer={localizer} events={event} view={view} date={date}
       onView={(e)=> onView(e)}
       onNavigate={(e)=> onNavigate(e)}
       excludedDays={[0, 6]}
    min={new Date(2024, 10, 18, 9, 0)}  
      max={new Date(2024, 10, 18, 19, 0)} 
      slotPropGetter={slotPropGetter}
      dayPropGetter={dayPropGetter}
       messages={messages}
        />
     }

{
      eventView &&
        <div className={style.formContainer}>
      <div className={style.closeButtonContainer}>
        <button className={style.closeButton} onClick={() => setEventView(false)}>X</button>
        </div>
        <div className={style.containerWithoutCloseButton}>

      <h2>Clase Agendada</h2>
      {/* <div className={style.inputTimeContainer}> */}
      <div className={style.inputContainer}>
      <div>
      <h5 >{`Clase: ${eventSaved.startClass}`}</h5>
      <h5></h5>
      </div>
      {/* <div>
      <h5 >{`Fin de clase: ${eventSaved.endClass}`}</h5>
        </div> */}
      </div>
      {/* </div> */}
      <div className={style.inputContainer}>
      <h5 >{`Nombre: ${eventSaved.name}`}</h5>
      <h5>Tipo de clase: {eventSaved.type === 'inPerson'? 'Presencial':'Online'}</h5>
      </div>
<div className={style.inputContainer}>
        <div >
      <h5 >{`Email: ${eventSaved.email}`}</h5>
        </div>
        <div>
      <h5 >Celular: {eventSaved.phone}</h5>
        </div>
</div>
        <div className={style.TextareaContainer}>
      <h5>{`Descripción: ${eventSaved.description}`}</h5>
        </div>
        
        </div>
    </div>
    }
    </div>
  )
}
