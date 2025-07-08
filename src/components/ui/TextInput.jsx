export default function TextInput({ label, ...props }) {
  return (
    <label className="block mb-2 text-sm">
      {label && <span className="block font-medium">{label}</span>}
      <input {...props} className="w-full p-2 border rounded" />
    </label>
  );
}
