import { useSelector } from "react-redux";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

export default function CalendarView() {
  const [date, set] = useState(new Date());
  const inc = useSelector((s) => s.incidents.list).filter((i) =>
    dayjs(i.appointmentDate).isSame(dayjs(date), "day")
  );
  return (
    <div className="p-6 grid lg:grid-cols-2 gap-8">
      <Calendar value={date} onChange={set} />
      <div>
        <h2 className="font-semibold mb-2">
          {dayjs(date).format("MMM DD, YYYY")} – Appointments
        </h2>
        {inc.length === 0 && <p>No appointments.</p>}
        <ul className="space-y-2">
          {inc.map((i) => (
            <li key={i.id} className="border p-2 rounded">
              <p className="font-medium">{i.title}</p>
              <p className="text-sm">
                {dayjs(i.appointmentDate).format("HH:mm")}
              </p>
              <p className="text-sm text-gray-600">{i.patientName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
