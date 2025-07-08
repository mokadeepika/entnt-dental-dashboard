export default function DateInput({ label, ...props }) {
  return (
    <label className="block mb-2 text-sm">
      {label && <span className="block font-medium">{label}</span>}
      <input
        type="datetime-local"
        {...props}
        className="w-full p-2 border rounded"
      />
    </label>
  );
}
