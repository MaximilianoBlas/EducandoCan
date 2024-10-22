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
import { upDateCalendar } from '../Redux/action/calendar';
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
    if(view === 'month') {
      setDate(e.start)
      setView('day')}
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
    console.log(e)
    setEventSaved(e)
    setEventView(true)
  }

  return (
    <div className={style.divContainer}>

      {windowWidth < 401 && <Calendar selectable  
   onSelectSlot={createEvent} 
   onSelectEvent={e => openEvent(e)}
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
      onSelectEvent={e => openEvent(e)}
       localizer={localizer} events={event} view={view} date={date}
       onView={(e)=> onView(e)}
       onNavigate={(e)=> onNavigate(e)}
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
      <div className={style.inputTimeContainer}>
      <div className={style.inputContainer}>
      <div>
      <h4 >{`Inicio de clase: ${eventSaved.startDate}`}</h4>
      </div>
      <div>
      <h4 >{`Fin de clase: ${eventSaved.endDate}`}</h4>
        </div>
      </div>
      </div>
      <div className={style.inputContainer}>
      <div>
      <h4 >{`Nombre: ${eventSaved.name}`}</h4>
      </div>
      <div>
      <h4 >{``}</h4>
        </div>
      </div>
<div className={style.inputContainer}>
        <div >
      <h4 >{`Email: ${eventSaved.email}`}</h4>
        </div>
        <div>
      <h4 >{eventSaved.phone}</h4>
        </div>
</div>
        <div className={style.TextareaContainer}>
      <h4>{`Descripción: ${eventSaved.description}`}</h4>
        </div>
        <h4>Tipo de clase {eventSaved.type}</h4>
        </div>
    </div>
    }
    </div>
  )
}