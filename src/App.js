import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import PatientPortal from './components/PatientPortal';
import IncidentManager from './components/IncidentManager';
import Dashboard from './components/DashBoard';
import CalendarView from './components/CalendarView';
import { IncidentProvider } from './components/IncidentContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <IncidentProvider>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/portal" element={<PatientPortal />} />
          <Route path="/incident-manager" element={<IncidentManager />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
      </div>
    </IncidentProvider>
  );
}

export default App;
