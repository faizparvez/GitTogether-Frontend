import React, { useRef, useState, useEffect } from "react";
import { Code2, Users, MessageSquare, Rocket, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Workflow() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  // ⭐ UPDATED TIMELINE (Step 3 removed and re-numbered)
  const timelineSteps = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Build Your Developer Identity",
      description:
        "Create a compelling profile highlighting your tech expertise, favorite languages, frameworks, and side projects. Show the community what makes you unique as a developer.",
      color: "#ff734d",
      badge: "Step 1",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Explore the Developer Community",
      description:
        "Dive into our network of passionate developers. Filter by technology preferences, experience levels, and collaboration interests to find your ideal coding partners.",
      color: "#d64000",
      badge: "Step 2",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Instant Developer Chat",
      description:
        "Once connected, jump into real-time conversations powered by WebSockets. Share code, discuss ideas, and plan your collaboration—all within our seamless chat interface.",
      color: "#d78451",
      badge: "Step 3",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch Collaborative Projects",
      description:
        "Turn conversations into code. Start open-source contributions, hack on weekend projects, or build the next unicorn startup with your newfound development partners.",
      color: "#ff734d",
      badge: "Step 4",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Unlock Premium Features",
      description:
        "Upgrade with secure Razorpay payments to access advanced filters, unlimited connections, priority matching, and exclusive networking events with top developers.",
      color: "#d64000",
      badge: "Step 5",
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const scrollTop = -rect.top;
      const progress = Math.max(0, Math.min(1, scrollTop / containerHeight));

      setScrollProgress(progress);

      const step = Math.min(
        Math.floor(progress * (timelineSteps.length + 1)),
        timelineSteps.length - 1
      );

      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="workflow"
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-[#FFE8D6] to-[#ba6d36] overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff734d]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d64000]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-20 text-center animate-fade-in">
          <div className="flex justify-center">
            <div className="tag">
              <span className="text-[#ff734d] text-2xl mr-1">🚀</span>
              How It Works
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight m-6 text-center text-[#010D3E]">
            Your Developer{" "}
            <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
              Connection Path
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#0000000] max-w-3xl mx-auto leading-relaxed">
            From profile creation to successful collaboration—discover how
            GitTogether revolutionizes developer networking with a streamlined,
            intuitive process.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#ff734d]/20 to-transparent md:-ml-px"></div>

          {/* Animated Progress Line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-[#ff734d] via-[#d64000] to-[#c26328] md:-ml-px transition-all duration-500 ease-out"
            style={{
              height: `${(activeStep / (timelineSteps.length - 1)) * 100}%`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-[#ff734d] shadow-[0_0_20px_rgba(255,115,77,0.6)] animate-pulse"></div>
          </div>

          {/* Timeline Steps */}
          <div className="relative space-y-16 md:space-y-20">
            {timelineSteps.map((step, index) => (
              <TimelineCard
                key={index}
                step={step}
                index={index}
                isActive={index <= activeStep}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center animate-fade-in">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-pulse-on-hover inline-flex items-center gap-3 px-10 py-5 text-0.5xl shadow-orange-lg"
          >
            Start Your Journey
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          <p className="mt-4 text-sm text-[#e5e5e5]/70">
            No credit card required • Free to start
          </p>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ step, index, isActive, isEven }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationDelay = index * 100;
  const shouldAnimate = isInView && isActive;

  return (
    <div
      ref={ref}
      className={`relative flex items-start ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Node */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-20">
        <div
          className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 border-4 border-[#0b0908] ${
            isActive
              ? "bg-gradient-to-br from-[#ff734d] to-[#d64000] scale-110 shadow-[0_0_30px_rgba(255,115,77,0.5)]"
              : "bg-[#15100f] scale-100"
          }`}
          style={{
            transitionDelay: `${animationDelay}ms`,
          }}
        >
          <div
            className={`transition-all duration-300 ${
              isActive ? "text-white" : "text-[#666]"
            }`}
          >
            {step.icon}
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        className={`ml-24 md:ml-0 ${
          isEven
            ? "md:w-[calc(50%-3rem)] md:pr-12"
            : "md:w-[calc(50%-3rem)] md:pl-12"
        } transition-all duration-700 ${
          shouldAnimate
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${animationDelay}ms` }}
      >
        <div
          className={`relative bg-[#15100f] rounded-2xl p-8 border transition-all duration-500 group hover:-translate-y-2 ${
            isActive
              ? "border-[#ff734d]/30 shadow-orange-lg"
              : "border-[#ff734d]/10"
          }`}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff734d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b0908] border border-[#ff734d]/20 mb-4">
              <span className="text-xs font-semibold text-[#ff734d]">
                {step.badge}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gradient-hero transition-all duration-300">
              {step.title}
            </h3>

            <p className="text-base md:text-lg text-[#e5e5e5] leading-relaxed">
              {step.description}
            </p>

            <div
              className={`absolute -bottom-2 -right-2 w-16 h-16 rounded-full blur-2xl transition-opacity duration-500 ${
                isActive ? "opacity-30" : "opacity-0"
              }`}
              style={{ background: step.color }}
            ></div>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-[calc(50%-3rem)]"></div>
    </div>
  );
}

export default Workflow;
