import React, { useState, useEffect, useRef } from "react";

/**
 * useInView is a custom React hook that detects when an element is visible in the viewport.
 * This is a clean, reusable way to trigger scroll-based animations.
 * @param {object} options - Configuration for the Intersection Observer API.
 * @returns {[React.RefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's in view.
 */
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

/**
 * The Workflow component explains the three-step process of using the GitTogether platform.
 * Styled to match the Hero component's gradient background theme.
 */
const Workflow = () => {
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.2 });

  const workflowSteps = [
    {
      step: "1",
      title: "Push Your Profile",
      description:
        "Build a developer card that showcases your skills, languages, and what you're passionate about building next.",
      colors: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
      },
    },
    {
      step: "2",
      title: "Discover Developers",
      description:
        "Explore our curated network of talented developers. Filter by tech stack and interests to find the perfect collaborator.",
      colors: {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-600",
      },
    },
    {
      step: "3",
      title: "Commit to Connecting",
      description:
        "Send a connection request, start a conversation, and begin collaborating on the next great connection.",
      colors: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
      },
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-8 lg:px-12 py-8 bg-gray-50">
      {/* Simple, clean background with subtle accents */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl"></div>

      <div
        ref={sectionRef}
        className={`container mx-auto max-w-6xl relative z-10 ${
          isSectionInView ? "section-in-view" : ""
        }`}
      >
        {/* Header styled to match Hero typography */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Your Collaboration <span className="text-blue-600">Workflow</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
            A simple, developer-first path to your next great connection.
          </p>
        </div>

        {/* Enhanced workflow cards styled like Hero cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((item, index) => (
            <div key={item.step} className="animated-section-card group">
              {/* Cards styled to match Hero's developer cards */}
              <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 text-center hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Step number styled like Hero elements */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300">
                    <span className="text-3xl text-white font-bold">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Content with Hero-matching typography */}
                <div className="text-center">
                  <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Connection arrow styled to match theme */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:flex justify-center mt-6 mb-6">
                  <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-blue-600 text-2xl font-bold">→</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
