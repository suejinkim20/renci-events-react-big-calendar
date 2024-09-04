// pages/events/[id].js
import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router';
import { getAuthorizationToken, getEvent } from '../../utils/msft-graph-api';

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const textInput = useRef(null)

  useEffect(() => {
    if (!id) return;

    const loadEvent = async () => {
      try {
        // Retrieve the token
        const token = await getAuthorizationToken();
        if (!token) {
          setError('Failed to retrieve authorization token');
          return;
        }

        // Fetch the event details
        const fetchedEvent = await getEvent(token, id);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details');
      }
    };

    loadEvent();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }
  function stripScripts(s) {
    let retVal = s
      .replace(/(<style[\w\W]+style>)/g, "")
      .split("<a")
      .join('<a target="_blank"')
    return retVal
  }
  return (
    <div>
      <h1>{event.subject}</h1>
      <p><strong>Start:</strong> {new Date(event.start.dateTime).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(event.end.dateTime).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location.displayName || 'N/A'}</p>
      <p><strong>Description:</strong> </p>
      <div
        ref={textInput}
        className="event-html"
        dangerouslySetInnerHTML={{
          __html: stripScripts(event.body.content),
        }}
      ></div>
      </div>
  );
}
