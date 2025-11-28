const SectionCard = ({ title, description, icon: Icon, children }) => (
  <div className="rounded-lg border border-[#FAC67A] bg-[#FFFFFF] shadow-md">
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-[#ff734d]" />}
        <h3 className="text-xl font-bold text-[#010D3E]">{title}</h3>
      </div>

      {description && (
        <p className="text-sm text-[#c26328]/80">{description}</p>
      )}
    </div>

    <div className="p-6 pt-0 space-y-4">{children}</div>
  </div>
);

export default SectionCard;
