// utils/eventTransformer.js

export function transformEventData(events) {
  return events.map(event => ({
    id: event.id,
    title: event.subject,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
    allDay: event.isAllDay || false,
    location: event.location.displayName || '',
    excerpt: event.bodyPreview || '',
    description: event.body.content || '',
    category: event.categories.length ? event.categories[0] : 'Uncategorized', // Default if no category
  }));
}
