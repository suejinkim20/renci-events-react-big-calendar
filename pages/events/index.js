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

// MUI Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

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

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Calendar
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
      />

      {/* MUI Dialog for Event Details */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="event-dialog-title"
      >
        {selectedEvent && (
          <>
            <DialogTitle id="event-dialog-title">{selectedEvent.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1">
                <strong>Date:</strong> {new Date(selectedEvent.start).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                {`${selectedEvent.excerpt} ...` || 'No description available.'}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSeeMore} color="primary" variant="contained">
                See More
              </Button>
              <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}