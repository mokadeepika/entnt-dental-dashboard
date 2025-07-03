import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { IncidentContext } from './IncidentContext';

const PatientPortal = () => {
  const navigate = useNavigate();
  const { incidents } = useContext(IncidentContext);

  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!loggedUser || loggedUser.role !== 'Patient') {
      navigate('/');
    } else {
      setUser(loggedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const patientIncidents = incidents.filter(i => i.patientId === user.patientId);
      setAppointments(patientIncidents);
    }
  }, [user, incidents]);

  const upcoming = appointments.filter(a => new Date(a.appointmentDate) >= new Date());
  const history = appointments.filter(a => new Date(a.appointmentDate) < new Date());

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Welcome, {user?.email}</h3>

      <h5>Upcoming Appointments</h5>
      {upcoming.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map(a => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{new Date(a.appointmentDate).toLocaleString()}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h5 className="mt-5">Appointment History</h5>
      {history.length === 0 ? (
        <p>No previous appointments.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Treatment</th>
              <th>Cost</th>
              <th>Files</th>
            </tr>
          </thead>
          <tbody>
            {history.map(a => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                <td>{a.treatment || '-'}</td>
                <td>{a.cost ? `₹ ${a.cost}` : '-'}</td>
                <td>
                  {a.files && a.files.length > 0 ? (
                    a.files.map((f, idx) =>
                      typeof f === 'string' ? (
                        <span key={idx} className="me-2">{f}</span>
                      ) : (
                        <a
                          key={idx}
                          href={f.url}
                          download={f.name}
                          target="_blank"
                          rel="noreferrer"
                          className="me-2"
                        >
                          {f.name}
                        </a>
                      )
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientPortal;
