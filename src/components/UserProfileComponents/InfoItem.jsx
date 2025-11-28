const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <Icon className="w-4 h-4 text-[#ff734d] flex-shrink-0" />
    <div className="flex items-center gap-2">
      <span className="text-[#000000]/60">{label}:</span>
      <span className="text-[#010D3E] font-medium">{value}</span>
    </div>
  </div>
);

export default InfoItem;
