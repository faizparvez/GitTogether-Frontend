import React, { useRef } from "react";

const ProductShowcase = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="bg-[#FFF7F2] py-20 overflow-x-clip"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">
              <span className="text-[#ff734d] text-2xl mr-2">⚡</span>
              Connect. Code. Collaborate.
            </div>
          </div>
          <h2 className="section-title mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#010D3E] max-w-4xl mx-auto leading-tight">
            A more effective way to{" "}
            <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
              find your dev match
            </span>
          </h2>
          <p className="section-description mt-5 text-lg text-center text-[#000000] max-w-3xl mx-auto leading-relaxed">
            Effortlessly connect with developers who share your passion and
            skills. Our intelligent matching platform provides you with the
            tools to build meaningful professional relationships, so you can
            focus on what really matters - creating amazing projects together.
          </p>
        </div>

        {/* Product Image Section with Decorative Elements */}
        <div className="relative mt-16">
          {/* Main Product Image Placeholder */}
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#F1F1F1] to-[#EAEAEA] rounded-3xl shadow-2xl shadow-[rgba(255,115,77,0.15)] overflow-hidden border-2 border-[rgba(255,115,77,0.2)] aspect-video">
              {/* Placeholder Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#ff734d] to-[#d64000] shadow-2xl mb-6">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-[#010D3E] font-bold text-2xl mb-2">
                    GitTogether Dashboard
                  </p>
                  <p className="text-[#000000] text-sm">
                    Main product screenshot placeholder
                  </p>
                </div> */}
                <img src="/image.png" />
              </div>

              {/* Glassmorphism overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(255,115,77,0.05)] to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
