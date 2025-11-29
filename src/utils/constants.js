export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const plans = [
  {
    name: "Starter",
    type: "starter",
    price: "₹499",
    duration: "1 Month",
    features: [
      "Send 50 connection requests per day",
      "Basic profile visibility",
      "Access to developer community",
      "Email support",
    ],
    popular: false,
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    type: "pro",
    price: "₹1,299",
    duration: "3 Months",
    features: [
      "Send 200 connection requests per day",
      "Priority profile visibility",
      "Verified developer badge",
      "Direct messaging with matches",
      "Advanced search filters",
      "24/7 priority support",
    ],
    popular: true,
    buttonText: "Go Pro",
  },
  {
    name: "Elite",
    type: "elite",
    price: "₹2,499",
    duration: "6 Months",
    features: [
      "Unlimited connection requests",
      "Featured profile placement",
      "Elite developer badge",
      "Unlimited direct messaging",
      "AI-powered match suggestions",
      "Early access to new features",
      "Dedicated account manager",
      "Portfolio showcase spotlight",
    ],
    popular: false,
    buttonText: "Go Elite",
  },
];

export const SKILLS_OPTIONS = [
  // Frontend
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",

  // Backend
  "Node.js",
  "Express.js",
  "Python",
  "Django",

  // Databases
  "MongoDB",
  "PostgreSQL",
  "MySQL",

  // DevOps & Cloud
  "Docker",
  "Kubernetes",
  "AWS",

  // APIs & Architecture
  "REST APIs",
  "GraphQL",
  "System Design",

  // Mobile
  "React Native",
  "Flutter",

  // AI / Data
  "Machine Learning",
  "Data Analysis",
];

export const INTERESTS_OPTIONS = [
  // Technical
  "AI/ML",
  "Cloud Computing",
  "DevOps",
  "System Design",
  "Open Source",
  "UI/UX Design",
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "Product Development",
  "Entrepreneurship",
  "Hackathons",

  // Non-Technical (Premium, Modern)
  "Fitness",
  "Travel",
  "Film & Cinema",
  "Photography",
  "Music",
  "Cooking",
  "Reading",
  "Creative Writing",
  "Gaming",
  "Coffee",
];

export const LOOKING_FOR_OPTIONS = [
  "Project Partner",
  "Co-founder",
  "Mentor",
  "Mentee",
  "Friend",
  "Networking",
  "Open Source Contributor",
  "Freelance Collaboration",
];

export const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export const GENDER_OPTIONS = ["Male", "Female", "Other"];
