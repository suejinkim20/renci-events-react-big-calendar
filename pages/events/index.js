// pages/events.js
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAuthorizationToken, fetchEvents } from '../../utils/msft-graph-api';
import { transformEventData } from '../../utils/eventTransformer';
import { useRouter } from 'next/router';
import { EventDialog } from '../../components/calendar/eventDialog'
import { Page } from '../../components/layout/page'
import { Dialog, Box } from '@mui/material';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define colors for each category
const categoryColors = {
  'Purple category': '#FF6347', 
  'Green category': '#32CD32', 
  'Yellow category': '#FFBF00',
  'Uncategorized': '#D3D3D3', // LightGray
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const router = useRouter();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const token = await getAuthorizationToken();
        if (!token) {
          console.error('Token not found');
          return;
        }

        const fetchedEvents = await fetchEvents(token);
        const formattedEvents = transformEventData(fetchedEvents);
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    loadEvents();
  }, []);

  // Handle event click to open dialog
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  // Navigate to the event's detailed page
  const handleSeeMore = () => {
    if (selectedEvent) {
      router.push(`/events/${selectedEvent.id}`);
    }
  };
  // Function to style events by category
  const eventStyleGetter = (event) => {
    const backgroundColor = categoryColors[event.category] || '#D3D3D3'; // Default to gray if no category color is defined
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <Page title="HEAL Event Calendar">
      <Box sx={{ padding: 2 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter} // Apply colors based on categories

        />
        <br/><br/>

        {/* MUI Dialog for Event Details */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="event-dialog-title"
        >
          <EventDialog 
            selectedEvent={selectedEvent}
            handleSeeMore={handleSeeMore}
            handleCloseDialog={handleCloseDialog}
          />
        </Dialog>
      </Box>
    </Page>

  );
}