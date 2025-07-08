import React, { useState } from "react";
import TextInput from "../../components/ui/TextInput";
import DateInput from "../../components/ui/DateInput";
import FileInput from "../../components/ui/FileInput";

export default function IncidentForm({ initial = {}, onSubmit, onCancel }) {
  const [form, set] = useState({ status: "Pending", ...initial });
  const [newFiles, setNew] = useState([]);

  const save = async (e) => {
    e.preventDefault();
    const enc = await Promise.all(newFiles.map(toB64));
    onSubmit({ ...form, files: [...(form.files || []), ...enc] });
  };

  return (
    <form onSubmit={save} className="space-y-4 p-4 border rounded bg-white">
      <TextInput
        label="Title"
        value={form.title || ""}
        onChange={(e) => set({ ...form, title: e.target.value })}
      />
      <TextInput
        label="Description"
        value={form.description || ""}
        onChange={(e) => set({ ...form, description: e.target.value })}
      />
      <TextInput
        label="Comments"
        value={form.comments || ""}
        onChange={(e) => set({ ...form, comments: e.target.value })}
      />
      <DateInput
        label="Appointment"
        value={form.appointmentDate || ""}
        onChange={(e) => set({ ...form, appointmentDate: e.target.value })}
      />
      {"cost" in form && (
        <>
          <TextInput
            label="Cost $"
            value={form.cost}
            onChange={(e) => set({ ...form, cost: Number(e.target.value) })}
          />
          <TextInput
            label="Treatment"
            value={form.treatment || ""}
            onChange={(e) => set({ ...form, treatment: e.target.value })}
          />
          <DateInput
            label="Next Visit"
            value={form.nextDate || ""}
            onChange={(e) => set({ ...form, nextDate: e.target.value })}
          />
          <TextInput
            label="Status"
            value={form.status}
            onChange={(e) => set({ ...form, status: e.target.value })}
          />
        </>
      )}
      <FileInput label="Files" onSelect={setNew} />
      <div className="space-x-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const toB64 = (f) =>
  new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res({ name: f.name, url: r.result });
    r.readAsDataURL(f);
  });
