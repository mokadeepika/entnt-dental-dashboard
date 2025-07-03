import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const USERS = [
  { id: '1', role: 'Admin', email: 'entnt@gmail.com', password: 'Admin@123' },
  { id: '2', role: 'Admin', email: 'genentnt@gmail.com', password: 'general@123' },
  { id: '3', role: 'Patient', email: 'rohit@entnt.in', password: 'patient123', patientId: 'p1' },
];

const LoginPage = () => {
  const [patEmail, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [AdEmail, setAdEmail] = useState('');
  const [Adpass, setAdPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePatientLogin = () => {
    const user = USERS.find(
      (u) => u.email === patEmail && u.password === pass && u.role === 'Patient'
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/portal');
    } else {
      setError('Invalid patient credentials');
    }
  };

  const handleAdminLogin = () => {
    const user = USERS.find(
      (u) => u.email === AdEmail && u.password === Adpass && u.role === 'Admin'
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">ENTNT Dental Management Login</h2>

      {error && (
        <div className="alert alert-danger text-center col-md-6 mx-auto">{error}</div>
      )}

      <div className="row justify-content-center g-4">
       
        <div className="col-md-5">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">Patient Login</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={patEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter patient email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handlePatientLogin}>
                Login as Patient
              </button>
            </div>
          </div>
        </div>

       
        <div className="col-md-5">
          <div className="card shadow border-0">
            <div className="card-header bg-success text-white text-center">
              <h4 className="mb-0">Admin Login</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={AdEmail}
                  onChange={(e) => setAdEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={Adpass}
                  onChange={(e) => setAdPass(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button className="btn btn-success w-100" onClick={handleAdminLogin}>
                Login as Admin
              </button>
              <div className="mt-4 small text-muted">
                <p><strong>Admin 1:</strong> entnt@gmail.com / Admin@123</p>
                <p><strong>Admin 2:</strong> genentnt@gmail.com / general@123</p>
                <p><strong>Patient:</strong> rohit@entnt.in / patient123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
