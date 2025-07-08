export default function FileInput({ label, onSelect }) {
  return (
    <label className="block mb-2 text-sm">
      {label && <span className="block font-medium">{label}</span>}
      <input
        type="file"
        multiple
        className="block mt-1"
        onChange={(e) => onSelect([...e.target.files])}
      />
    </label>
  );
}
