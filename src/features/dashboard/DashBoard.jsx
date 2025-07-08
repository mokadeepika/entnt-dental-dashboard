import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function DashBoard() {
  const inc = useSelector((s) => s.incidents.list);
  const upcoming = [...inc]
    .filter((i) => dayjs(i.appointmentDate).isAfter(dayjs()))
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);
  const revenue = inc.reduce((s, i) => s + (i.cost ?? 0), 0);
  const completed = inc.filter((i) => i.status === "Completed").length;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat title="Revenue" val={`$${revenue}`} />
        <Stat title="Completed" val={completed} />
        <Stat title="Pending" val={inc.length - completed} />
      </section>
      <section>
        <h2 className="font-semibold mb-2">Next 10 Appointments</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th>Date</th>
              <th>Patient</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((u) => (
              <tr key={u.id} className="border-b">
                <td>{dayjs(u.appointmentDate).format("MMM DD HH:mm")}</td>
                <td>{u.patientName}</td>
                <td>{u.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
const Stat = ({ title, val }) => (
  <div className="bg-white rounded shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">{val}</p>
  </div>
);
