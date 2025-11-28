const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#FFE8D6] to-[#bc6a30] flex items-center justify-center relative overflow-hidden">

    {/* Spinner + Text */}
    <div className="relative flex flex-col items-center gap-4 z-10 animate-fade-in">
      
      {/* Spinner Outer Ring */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[rgba(255,115,77,0.15)] rounded-full"></div>

        {/* Spinning Ring */}
        <div className="w-16 h-16 border-4 border-[#ff734d] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-[#010D3E]">
          Loading profile
        </p>
        <p className="text-sm text-[#000000]/70">
          Please wait a moment...
        </p>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
