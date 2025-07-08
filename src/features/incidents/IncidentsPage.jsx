import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import dayjs from "dayjs";
import { addIncident, updateIncident } from "./incidentsSlice";
import IncidentForm from "./IncidentForm";

export default function IncidentsPage() {
  const { patientId } = useParams();
  const nav = useNavigate();
  const dsp = useDispatch();
  const pats = useSelector((s) => s.patients.list);
  const all = useSelector((s) => s.incidents.list);
  const rows = patientId ? all.filter((i) => i.patientId === patientId) : all;
  const pat = pats.find((p) => p.id === patientId);
  const [edit, setEdit] = useState(null);

  const saveNew = (data) => {
    dsp(addIncident({ ...data, patientId, patientName: pat.name }));
    setEdit(null);
  };
  const saveEdit = (data) => {
    dsp(updateIncident(data));
    setEdit(null);
  };

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => nav(-1)} className="underline">
        ← Back
      </button>
      <h1 className="text-2xl font-bold">
        {pat ? `Incidents • ${pat.name}` : "All Incidents"}
      </h1>

      <table className="w-full text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Title</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b">
              <td>{dayjs(r.appointmentDate).format("MMM DD HH:mm")}</td>
              <td>{r.patientName}</td>
              <td>{r.title}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => setEdit(r)} className="text-blue-600">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {patientId && !edit && <IncidentForm onSubmit={saveNew} />}

      {edit && (
        <IncidentForm
          initial={edit}
          onSubmit={saveEdit}
          onCancel={() => setEdit(null)}
        />
      )}
    </div>
  );
}
