const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default:
      "bg-white/80 text-[#010D3E] border border-[rgba(255,115,77,0.2)] shadow-sm",
    primary:
      "bg-[#ff734d]/10 text-[#d64000] border border-[rgba(255,115,77,0.3)] shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
