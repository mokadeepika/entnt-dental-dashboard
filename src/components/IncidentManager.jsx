import React, { useState, useContext } from 'react';
import { IncidentContext } from './IncidentContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const IncidentManager = () => {
  const { incidents, addIncident } = useContext(IncidentContext);

  const [form, setForm] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: '',
    nextDate: '',
    files: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'files') {
      const fileArray = Array.from(files);
      const readers = fileArray.map(file =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ name: file.name, url: reader.result, type: file.type });
          };
          reader.readAsDataURL(file);
        })
      );

      Promise.all(readers).then((base64Files) => {
        setForm(prev => ({ ...prev, files: base64Files }));
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = { ...form, id: Date.now().toString() };
    addIncident(newIncident);

    setForm({
      patientId: '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: '',
      nextDate: '',
      files: [],
    });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Admin: Incident/Appointment Management</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label className="form-label">Patient ID</label>
          <input type="text" name="patientId" className="form-control" required value={form.patientId} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" required value={form.title} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" required value={form.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Comments</label>
          <input type="text" name="comments" className="form-control" value={form.comments} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Date & Time</label>
          <input type="datetime-local" name="appointmentDate" className="form-control" required value={form.appointmentDate} onChange={handleChange} />
        </div>

        <hr />

        <div className="mb-3">
          <label className="form-label">Treatment Cost</label>
          <input type="number" name="cost" className="form-control" value={form.cost} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Treatment</label>
          <input type="text" name="treatment" className="form-control" value={form.treatment} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={form.status} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Next Appointment Date</label>
          <input type="date" name="nextDate" className="form-control" value={form.nextDate} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Files</label>
          <input type="file" name="files" multiple className="form-control" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Save Incident</button>
      </form>

      <div>
        <h4>All Incidents</h4>
        {incidents.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="card mb-3 p-3 shadow-sm">
              <h5>{incident.title}</h5>
              <p><strong>Patient ID:</strong> {incident.patientId}</p>
              <p><strong>Description:</strong> {incident.description}</p>
              <p><strong>Comments:</strong> {incident.comments}</p>
              <p><strong>Appointment:</strong> {new Date(incident.appointmentDate).toLocaleString()}</p>
              <p><strong>Cost:</strong> ₹{incident.cost}</p>
              <p><strong>Treatment:</strong> {incident.treatment}</p>
              <p><strong>Status:</strong> {incident.status}</p>
              <p><strong>Next Date:</strong> {incident.nextDate}</p>
              <div>
                <strong>Files:</strong>
                <div className="row">
                  {incident.files?.map((file, idx) => (
                    <div className="col-md-3 mb-2" key={idx}>
                      <div className="card p-2 text-center">
                        {file?.type?.startsWith('image/') ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="img-fluid mb-2"
                            style={{ maxHeight: '150px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="mb-2 text-truncate">{file?.name || 'Unknown file'}</div>
                        )}
                        <a
                          href={file.url}
                          download={file.name}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentManager;
