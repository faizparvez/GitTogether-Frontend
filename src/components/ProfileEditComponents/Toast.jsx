import { useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
      <div
        className={`rounded-lg border shadow-xl p-4 flex items-start gap-3 min-w-[320px]
        ${type === "success"
          ? "bg-[#FFF7F2] border-[#ff734d]"
          : "bg-[#FFF7F2] border-red-500"}`}
      >
        {type === "success" ? (
          <div className="rounded-full bg-[#ff734d] p-1">
            <Check className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="rounded-full bg-red-500 p-1">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex-1">
          <p className="text-sm font-semibold text-[#010D3E]">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-[#c26328] hover:text-[#ff734d]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
