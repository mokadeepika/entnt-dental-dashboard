import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const locales = {
  'en-IN': require('date-fns/locale/en-IN'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const sampleAppointments = [
  {
    id: 1,
    title: 'Ear Infection Treatment',
    start: new Date(2025, 5, 30, 10, 0),
    end: new Date(2025, 5, 30, 11, 0),
    patientId: 'p1',
    treatment: 'Antibiotics prescribed',
  },
  {
    id: 2,
    title: 'Follow-up Checkup',
    start: new Date(2025, 6, 2, 14, 0),
    end: new Date(2025, 6, 2, 15, 0),
    patientId: 'p2',
    treatment: 'Routine evaluation',
  },
];

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'Admin') {
      navigate('/');
    } else {
      setEvents(sampleAppointments); // Replace with DB data if needed
    }
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const selectedDay = new Date(slotInfo.start).toDateString();
    const treatments = events.filter((e) => new Date(e.start).toDateString() === selectedDay);
    setSelectedDate(selectedDay);
    setFilteredEvents(treatments);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Appointment Calendar (Admin)</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        views={['month', 'week']}
      />

      {selectedDate && (
        <div className="mt-4">
          <h5>Treatments on {selectedDate}</h5>
          {filteredEvents.length === 0 ? (
            <p>No treatments scheduled.</p>
          ) : (
            <ul className="list-group">
              {filteredEvents.map((event) => (
                <li key={event.id} className="list-group-item">
                  <strong>{event.title}</strong> <br />
                  Time: {format(event.start, 'hh:mm a')} - {format(event.end, 'hh:mm a')} <br />
                  Patient ID: {event.patientId} <br />
                  Treatment: {event.treatment}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
