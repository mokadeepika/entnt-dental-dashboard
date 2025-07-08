import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addPatient, updatePatient, deletePatient } from "./patientsSlice";

export default function PatientsPage() {
  const pts = useSelector((s) => s.patients.list);
  const dsp = useDispatch();
  const blank = { name: "", dob: "", contact: "", healthInfo: "" };
  const [editing, setEditing] = useState(null);
  const [form, set] = useState(blank);

  const save = (e) => {
    e.preventDefault();
    editing ? dsp(updatePatient(form)) : dsp(addPatient(form));
    setEditing(null);
    set(blank);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Patients</h2>
      <form onSubmit={save} className="grid grid-cols-5 gap-2 mb-6">
        {["name", "dob", "contact", "healthInfo"].map((f) => (
          <input
            key={f}
            className="border p-2 rounded"
            placeholder={f}
            value={form[f]}
            onChange={(e) => set({ ...form, [f]: e.target.value })}
          />
        ))}
        <button className="bg-green-600 text-white rounded col-span-1">
          {editing ? "Save" : "Add"}
        </button>
      </form>

      <table className="w-full text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Health</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {pts.map((p) => (
            <tr key={p.id} className="border-b">
              <td>{p.name}</td>
              <td>{p.dob}</td>
              <td>{p.contact}</td>
              <td>{p.healthInfo}</td>
              <td className="space-x-3">
                <button
                  onClick={() => {
                    setEditing(p.id);
                    set(p);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => dsp(deletePatient(p.id))}
                  className="text-red-600"
                >
                  Del
                </button>
                <Link to={`/incidents/${p.id}`} className="text-indigo-600">
                  Incidents
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
