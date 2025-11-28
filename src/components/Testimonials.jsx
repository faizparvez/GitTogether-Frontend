import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    text: "I found my perfect coding partner in just 3 days! We're now building a SaaS startup together. GitTogether made networking feel natural and productive.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Arjun Patel",
    username: "@arjundev",
    role: "Full Stack Developer"
  },
  {
    text: "As a frontend developer, I struggled to find backend experts. GitTogether's smart matching connected me with an amazing DevOps engineer. Our collaboration has been seamless.",
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Priya Sharma",
    username: "@priyacodes",
    role: "Frontend Engineer"
  },
  {
    text: "The real-time chat feature is incredible. I can share code snippets instantly and discuss technical challenges with my connections. This platform truly understands developers.",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Rahul Verma",
    username: "@rahulbuilds",
    role: "Backend Developer"
  },
  {
    text: "I was skeptical at first, but GitTogether exceeded my expectations. Found a talented React developer for my startup, and we've already launched our MVP together!",
    imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Neha Gupta",
    username: "@nehagupta_",
    role: "Product Manager"
  },
  {
    text: "The payment integration is smooth and secure. I upgraded to premium and the advanced matching algorithm is worth every rupee. Best investment for my dev career.",
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Vikram Singh",
    username: "@vikramtech",
    role: "Mobile Developer"
  },
  {
    text: "GitTogether helped me transition from solo freelancing to collaborative projects. The quality of developers here is outstanding. Highly recommend!",
    imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Anjali Mehta",
    username: "@anjalicodes",
    role: "UI/UX Developer"
  },
  {
    text: "As a junior developer, I found experienced mentors who guide me through complex problems. The community here is supportive and genuinely helpful.",
    imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Karan Malhotra",
    username: "@karanlearns",
    role: "Junior Developer"
  },
  {
    text: "The MERN stack focus is perfect for me. I connected with developers who share the same tech stack, making collaboration effortless. Love this platform!",
    imageSrc: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Shreya Reddy",
    username: "@shreyareacts",
    role: "React Developer"
  },
  {
    text: "GitTogether's WebSocket chat is lightning fast. I can brainstorm ideas and share code in real-time. It's like having a dev team in your pocket!",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Aditya Kumar",
    username: "@adityabuilds",
    role: "DevOps Engineer"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props) => (
  <div className={props.className}>
    <motion.div
      className="flex flex-col gap-6 pb-6"
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username, role }) => (
            <div 
              className="bg-white/80 backdrop-blur-sm border border-[rgba(255,115,77,0.2)] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-[rgba(255,115,77,0.15)] transition-all duration-300" 
              key={name}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-[#ff734d] opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-[#010D3E] leading-relaxed mb-5">
                {text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,115,77,0.1)]">
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[rgba(255,115,77,0.2)]"
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-[#010D3E] tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="text-sm text-[#000000] leading-5 tracking-tight">
                    {username}
                  </div>
                  <div className="text-xs text-[#ff734d] font-medium mt-0.5">
                    {role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  const navigate = useNavigate();
  return (
    <section id="testimonials" className="bg-gradient-to-b from-[#FFF7F2] to-[#FFDCC2] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-72 h-72 bg-[#ff734d] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-[#c26328] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Section Heading */}
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">
              <span className="text-[#ff734d] text-xl mr-2">💬</span>
              Developer Success Stories
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#010D3E] mt-5 max-w-4xl mx-auto leading-tight">
            Loved by developers
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
                building together
              </span>
            </span>
          </h2>
          <p className="text-lg text-center text-[#000000] mt-5 max-w-3xl mx-auto leading-relaxed">
            From solo projects to successful partnerships, see how GitTogether is helping 
            developers find their perfect coding match and build amazing things together.
          </p>
        </div>

        {/* Testimonials Columns with Mask */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10 max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={20}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <motion.button
  whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15, ease: "easeOut" } }}
  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
  onClick={() => navigate("/login")}
  className="inline-flex items-center cursor-pointer gap-2 bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-[rgba(255,115,77,0.3)] hover:shadow-xl hover:shadow-[rgba(255,115,77,0.4)] transition-all duration-300"
>
  Join 1000+ Developers
  <svg 
    className="w-5 h-5" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 7l5 5m0 0l-5 5m5-5H6" 
    />
  </svg>
</motion.button>

        </div>
      </div>
    </section>
  );
};
export default Testimonials;