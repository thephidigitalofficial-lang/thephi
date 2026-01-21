export default function InputField({
  label,
  placeholder,
  onChange,
  value,
  name,
  error,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`w-full rounded-xl bg-[#1F1F1F] px-4 py-3 flex flex-col ${error ? "border border-red-500/50" : ""}`}>
        <label className="text-white font-bold text-base mb-1">
          {label}
          <span className="text-red-500"> *</span>
        </label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange ? onChange : () => { }}
          className="w-full bg-transparent text-gray-200 placeholder-gray-400 text-white focus:outline-none text-base"
        />
      </div>
      {error && <span className="text-red-500 text-xs pl-2">{error}</span>}
    </div>
  );
}
