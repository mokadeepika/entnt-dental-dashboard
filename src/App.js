import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar        from "./components/layout/NavBar";
import Protected     from "./components/layout/Protected";
import LoginPage     from "./features/auth/LoginPage";
import PatientsPage  from "./features/patients/PatientsPage";
import DashBoard     from "./features/dashboard/DashBoard";
import CalendarView  from "./features/calendar/CalendarView";
import PatientPortal from "./features/patient/PatientPortal";
import IncidentsPage from "./features/incidents/IncidentsPage";

export default function App(){
  const user = useSelector(s=>s.auth.user);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      {/* shared shell */}
      <Route path="/*" element={
        <Protected>
          <NavBar/>
          <Routes>
            {user?.role==="Admin" && (
              <>
                <Route path="/"          element={<PatientsPage/>}/>
                <Route path="incidents"               element={<IncidentsPage/>}/>
+                <Route path="incidents/:patientId"    element={<IncidentsPage/>}/>
                <Route path="dashboard"  element={<DashBoard/>}/>
                <Route path="calendar"   element={<CalendarView/>}/>
                <Route path="*"          element={<Navigate to="/" />} />
              </>
            )}
            {user?.role==="Patient" && (
              <Route path="*" element={<Navigate to="/portal" />} />
            )}
          </Routes>
        </Protected>
      }/>
      {/* patient portal */}
      <Route path="/portal" element={
        <Protected>
          <NavBar/><PatientPortal/>
        </Protected>
      }/>
    </Routes>
  );
}
