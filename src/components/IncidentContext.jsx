// src/context/IncidentContext.js
import React, { createContext, useEffect, useState } from 'react';

export const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(() => {
    const stored = localStorage.getItem('incidents');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = (incident) => {
    setIncidents(prev => [...prev, incident]);
  };

  return (
    <IncidentContext.Provider value={{ incidents, addIncident }}>
      {children}
    </IncidentContext.Provider>
  );
};
