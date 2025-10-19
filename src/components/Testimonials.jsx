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
        setIsInView(true); // The animation will only fire once.
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
 * The Testimonials component provides social proof to build trust with new users.
 * Styled to complement the Hero component's gradient theme while maintaining distinction.
 */
const Testimonials = () => {
  // Use the custom hook to get a ref and the in-view status for the section.
  // The animation will trigger when 15% of the section is visible.
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.15 }); // Data for the three testimonial cards.

  const testimonialsData = [
    {
      quote:
        "I found the perfect backend partner for my side-project in less than a week. We just launched our beta and the collaboration has been incredible. Couldn't have done it without this platform.",
      author: "Ananya Sharma",
      role: "Frontend Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote:
        "As a junior dev, I was looking for a mentor. I connected with a senior engineer who has been an incredible guide. GitTogether accelerated my career growth more than I could have imagined.",
      author: "Sameer Ahmed",
      role: "Junior Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote:
        "We needed a DevOps specialist for our startup idea and found the perfect co-founder here. The quality of developers on this platform is unmatched. Highly recommended.",
      author: "Riya Gupta",
      role: "Product Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    },
  ];

  return (
    // **STYLE UPDATE:** Changed the background color from 'bg-white' to 'bg-blue-50'
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center px-6 md:px-8 lg:px-12 py-16 bg-blue-50 ${
        isSectionInView ? "section-in-view" : ""
      }`}
    >
      {/* Clean white background with subtle blue accent elements */}
      <div className="absolute top-32 left-16 w-72 h-72 bg-blue-100/50 rounded-full blur-2xl"></div>
      <div className="absolute bottom-32 right-16 w-96 h-96 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header styled to match Hero typography */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            From Solo Commits to
            <span className="text-blue-600">Shared Repositories</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
            See what other developers are saying about finding their partners on
            GitTogether.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map over the testimonialsData array to render each card */}
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 animated-section-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300"
            >
              {/* Quote section with enhanced styling */}
              <div className="mb-6">
                <div className="text-blue-600 text-4xl font-bold mb-2">"</div>
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div className="text-blue-600 text-4xl font-bold text-right"></div>
              </div>
              {/* Author section styled to match Hero cards */}
              <div className="flex items-center pt-6 border-t border-gray-200">
                <img
                  className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md mr-4"
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                />
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-blue-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
