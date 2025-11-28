import { AlertCircle } from "lucide-react";

const SelectField = ({ label, options, error, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-[#010D3E] flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-[#ff734d]" />}
      {label}
    </label>

    <select
      {...props}
      className={`w-full px-3 py-2 bg-[#FFF7F2] border rounded-md text-[#010D3E] text-sm transition-colors
      focus:outline-none focus:ring-2 focus:ring-[#ff734d]
      ${error ? "border-red-500" : "border-[#FAC67A] hover:border-[#ff734d]"}`}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>

    {error && (
      <p className="text-sm text-red-500 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

export default SelectField;
