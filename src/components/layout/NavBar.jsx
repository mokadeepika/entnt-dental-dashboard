import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function NavBar() {
  const user = useSelector((s) => s.auth.user);
  const nav = useNavigate();
  const dsp = useDispatch();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-sky-800 text-white">
      <div className="space-x-4">
        {user?.role === "Admin" && (
          <>
            <Link to="/">Patients</Link>
            <Link to="/incidents">Incidents</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/calendar">Calendar</Link>
          </>
        )}
        {user?.role === "Patient" && <Link to="/portal">My Portal</Link>}
      </div>

      <button
        onClick={() => {
          dsp(logout());
          nav("/login");
        }}
        className="hover:underline"
      >
        Logout
      </button>
    </nav>
  );
}
