import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function PatientDashboard() {
  const { user } = useSelector((s) => s.auth);
  const incidents = useSelector((s) => s.incidents.list);
  const [myIncidents, setMyIncidents] = useState([]);

  useEffect(() => {
    if (user?.role === "Patient") {
      setMyIncidents(incidents.filter((i) => i.patientId === user.patientId));
    }
  }, [user, incidents]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.name}</h2>
      <h3 className="text-lg font-semibold">Your Appointments</h3>
      <ul className="mt-2 space-y-2">
        {myIncidents.map((inc) => (
          <li key={inc.id} className="border p-4 rounded shadow">
            <strong>{inc.title}</strong>
            <br />
            Date: {new Date(inc.appointmentDate).toLocaleString()}
            <br />
            Status: {inc.status}
            <br />
            Cost: ${inc.cost}
          </li>
        ))}
      </ul>
    </div>
  );
}
