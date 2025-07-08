import { configureStore } from "@reduxjs/toolkit";
import auth      from "../features/auth/authSlice";
import patients  from "../features/patients/patientsSlice";
import incidents from "../features/incidents/incidentsSlice";

export const store = configureStore({
  reducer: { auth, patients, incidents }
});
