import { AlertCircle } from "lucide-react";

const TextAreaField = ({ label, error, maxLength, icon: Icon, ...props }) => {
  const currentLength = props.value?.length || 0;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#010D3E] flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-[#ff734d]" />}
        {label}
      </label>

      <textarea
        {...props}
        className={`w-full px-3 py-2 bg-[#FFF7F2] border rounded-md text-[#010D3E] text-sm placeholder-[#c26328]/60 transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#ff734d] resize-none
        ${error ? "border-red-500" : "border-[#FAC67A] hover:border-[#ff734d]"}`}
      />

      <div className="flex justify-between items-center">
        {error ? (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        ) : (
          <span />
        )}

        {maxLength && (
          <span
            className={`text-xs ${
              currentLength > maxLength ? "text-red-500" : "text-[#c26328]/70"
            }`}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextAreaField;
