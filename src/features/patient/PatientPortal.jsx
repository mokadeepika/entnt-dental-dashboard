import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";

export default function PatientPortal() {
  /* --- ALWAYS call hooks first ------------------------------------ */
  const user = useSelector((s) => s.auth.user);

  // patientId might be undefined until user exists
  const patientId = user?.patientId ?? null;

  const patient = useSelector((s) =>
    s.patients.list.find((p) => p.id === patientId)
  );

  const myInc = useSelector((s) =>
    s.incidents.list
      .filter((i) => i.patientId === patientId)
      .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
  );
  /* ---------------------------------------------------------------- */

  // If logged-out or wrong role, redirect
  if (!user || user.role !== "Patient") return <Navigate to="/" replace />;

  // If patient record missing, show message
  if (!patient) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Patient record not found.</h2>
        <p>Please contact the clinic.</p>
      </div>
    );
  }

  /* ---------- JSX -------------- */
  return (
    <div className="p-6 space-y-6">
      {/* Patient Details */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2 text-lg">My Details</h2>
        <p>
          <b>Name:</b> {patient.name}
        </p>
        <p>
          <b>DOB:</b> {patient.dob}
        </p>
        <p>
          <b>Contact:</b> {patient.contact}
        </p>
        <p>
          <b>Health Info:</b> {patient.healthInfo}
        </p>
      </section>

      {/* Incident / Appointment History */}
      <section>
        <h2 className="font-semibold mb-2 text-lg">Appointments</h2>
        {myInc.length === 0 && <p>No appointments yet.</p>}
        {myInc.map((i) => (
          <div key={i.id} className="border rounded p-3 mb-3 bg-white shadow">
            <p className="font-medium">{i.title}</p>
            <p className="text-sm text-gray-600">
              {dayjs(i.appointmentDate).format("MMM DD, YYYY hh:mm A")}
            </p>
            {i.description && (
              <p>
                <b>Description:</b> {i.description}
              </p>
            )}
            {i.comments && (
              <p>
                <b>Comments:</b> {i.comments}
              </p>
            )}
            {i.cost && (
              <p>
                <b>Cost:</b> ${i.cost}
              </p>
            )}
            {i.treatment && (
              <p>
                <b>Treatment:</b> {i.treatment}
              </p>
            )}
            {i.status && (
              <p>
                <b>Status:</b> {i.status}
              </p>
            )}
            {i.nextDate && (
              <p>
                <b>Next:</b> {dayjs(i.nextDate).format("MMM DD, YYYY")}
              </p>
            )}
            {i.files?.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="font-medium">Attachments:</p>
                {i.files.map((f) => (
                  <a
                    key={f.name}
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sky-600 underline hover:text-sky-800"
                  >
                    {f.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
