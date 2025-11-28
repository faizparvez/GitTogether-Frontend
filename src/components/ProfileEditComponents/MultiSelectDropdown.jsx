import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
  error,
  maxItems,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(opt)
  );

  const handleSelect = (option) => {
    if (selected.length < maxItems) {
      onChange([...selected, option]);
      setSearch("");
    }
  };

  const handleRemove = (option) => {
    onChange(selected.filter((item) => item !== option));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#010D3E] flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-[#ff734d]" />}
        {label}
      </label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 bg-[#FFE8D6] text-[#010D3E] text-sm px-3 py-1 rounded-md border border-[#FAC67A]"
            >
              {item}
              <button
                onClick={() => handleRemove(item)}
                className="hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={selected.length >= maxItems}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md border bg-[#FFF7F2] text-[#010D3E] text-sm transition-colors 
            ${
              error
                ? "border-red-500"
                : "border-[#FAC67A] hover:border-[#ff734d]"
            }
            ${
              selected.length >= maxItems ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <span className="text-[#c26328]">
            {selected.length >= maxItems
              ? `Maximum ${maxItems} items selected`
              : `Select ${label.toLowerCase()}...`}
          </span>

          <span className="text-[#c26328]/70 text-xs">
            {selected.length}/{maxItems}
          </span>
        </button>

        {isOpen && selected.length < maxItems && (
          <div className="absolute z-10 w-full mt-1 bg-[#FFF7F2] border border-[#FAC67A] rounded-lg shadow-xl max-h-60 overflow-hidden">
            <div className="p-2 border-b border-[#FAC67A]">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFE8D6] border border-[#FAC67A] rounded-md text-sm text-[#010D3E] placeholder-[#c26328]/60 focus:outline-none focus:ring-2 focus:ring-[#ff734d]"
              />
            </div>

            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full text-left px-4 py-2 text-sm text-[#010D3E] hover:bg-[#FFE8D6] transition-colors"
                  >
                    {option}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-[#c26328]/70">
                  No options found
                </div>
              )}

              {/* ⭐ NEW: Add Custom Option */}
              {search.trim() !== "" &&
                !options.includes(search.trim()) &&
                !selected.includes(search.trim()) && (
                  <button
                    type="button"
                    onClick={() => handleSelect(search.trim())}
                    className="w-full text-left px-4 py-2 text-sm text-[#d64000] bg-[#FFE8D6] hover:bg-[#FAC67A]/40 transition-colors border-t border-[#FAC67A]"
                  >
                    ➕ Add "{search.trim()}"
                  </button>
                )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
