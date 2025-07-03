import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const sampleIncidents = [
  {
    id: 'i1',
    patientId: 'p1',
    patientName: 'Rohit Sharma',
    title: 'Ear Pain',
    appointmentDate: '2025-06-30T10:00',
    status: 'Pending',
    cost: 500,
  },
  {
    id: 'i2',
    patientId: 'p2',
    patientName: 'Neha Singh',
    title: 'Throat Checkup',
    appointmentDate: '2025-07-01T12:00',
    status: 'Completed',
    cost: 700,
  },
  {
    id: 'i3',
    patientId: 'p1',
    patientName: 'Rohit Sharma',
    title: 'Follow-up',
    appointmentDate: '2025-07-02T09:30',
    status: 'Completed',
    cost: 400,
  },
  {
    id: 'i4',
    patientId: 'p1',
    patientName: 'Rohit Sharma',
    title: 'Follow-up',
    appointmentDate: '2025-07-09T09:30',
    status: 'Pending',
    cost: 1000,
  },
  {
    id: 'i5',
    patientId: 'p3',
    patientName: 'Rahul',
    title: 'Follow-up',
    appointmentDate: '2025-07-10T10:30',
    status: 'Completed',
    cost: 800,
  },
  {
    id: 'i6',
    patientId: 'p3',
    patientName: 'Rahul',
    title: 'Follow-up',
    appointmentDate: '2025-07-11T10:30',
    status: 'Completed',
    cost: 800,
  },
  {
    id: 'i7',
    patientId: 'p3',
    patientName: 'Rahul',
    title: 'Follow-up',
    appointmentDate: '2025-07-12T10:30',
    status: 'Completed',
    cost: 800,
  },
  {
    id: 'i8',
    patientId: 'p3',
    patientName: 'Rahul',
    title: 'Follow-up',
    appointmentDate: '2025-07-13T10:30',
    status: 'Completed',
    cost: 800,
  },
  {
    id: 'i9',
    patientId: 'p3',
    patientName: 'Rahul',
    title: 'Follow-up',
    appointmentDate: '2025-07-14T10:30',
    status: 'Completed',
    cost: 800,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'Admin') {
      navigate('/incident-manager');
    } else {
      setIncidents(sampleIncidents); // Replace with API call later
    }
  }, []);

  // --- KPI logic ---
  const upcomingAppointments = [...incidents]
    .filter(i => new Date(i.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const patientStats = incidents.reduce((acc, i) => {
    const name = i.patientName.trim();
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const topPatients = Object.entries(patientStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const pending = incidents.filter(i => i.status === 'Pending').length;
  const completed = incidents.filter(i => i.status === 'Completed').length;

  const totalRevenue = incidents
    .filter(i => i.status === 'Completed')
    .reduce((sum, i) => sum + i.cost, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Treatments</h5>
              <p className="fs-4">{pending}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Completed Treatments</h5>
              <p className="fs-4">{completed}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-dark shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="fs-4">₹ {totalRevenue}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Top Patients</h5>
              {topPatients.length === 0 ? (
                <p>No data</p>
              ) : (
                topPatients.map(([name, count]) => (
                  <p key={name} className="mb-1">{name}: {count} visits</p>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="text-end mb-3">
  <button
    className="btn btn-outline-primary"
    onClick={() => navigate('/incident-manager')}
  >
    New Patient Details
  </button>
  <button
    className="btn btn-outline-primary"
    onClick={() => navigate('/Calendar')}
  >
    Calendar
  </button>
</div>
      </div>

      
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title mb-3">Next 10 Appointments</h4>
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming appointments</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Title</th>
                  <th>Appointment</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.patientName}</td>
                    <td>{app.title}</td>
                    <td>{new Date(app.appointmentDate).toLocaleString()}</td>
                    <td>{app.status}</td>
                    <td>₹ {app.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
