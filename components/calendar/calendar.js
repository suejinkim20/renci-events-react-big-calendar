import React, { useState, useEffect, useMemo } from "react";
import { Calendar, dateFnsLocalizer, Views, Navigate } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, startOfWeek, getDay, format } from "date-fns";
import EventDetails from "./eventDetails";
import { events } from '../../data/events'
// import { CalendarSkeleton } from './CalendarSkeleton'
import styles from '../../styles/CustomComponent.module.scss';
import CustomWeekView from './customViews/customWeekView'


const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomBigCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [delayedEvents, setDelayedEvents] = useState([]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  const {views, ...otherProps} = useMemo(() => ({
    views: {
      month: true,
      week: CustomWeekView,
      day: true
    },
    // ... other props
  }), [])

  useEffect(() => {
    setTimeout(() => {

      setDelayedEvents(events);
      setLoading(false);
    }, 1000);
  }, [events]);

  // if (loading) {
  //   return <CalendarSkeleton />
  // }



  return (
    <div className={styles.customContainer} 
      // style={{
      //   height: 600,
      // }}
    >

      <Calendar
        views={views} 
        localizer={localizer}
        events={delayedEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}

      />
      {selectedEvent && <EventDetails event={selectedEvent} />}
      <br/><br/>
    </div>

  );
};

export default CustomBigCalendar;
