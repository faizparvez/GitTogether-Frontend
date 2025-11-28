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
  "React",
  "Vue",
  "Angular",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Ruby",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "CI/CD",
  "GraphQL",
  "REST APIs",
];

export const INTERESTS_OPTIONS = [
  "AI/ML",
  "Web3",
  "Mobile Dev",
  "Open Source",
  "DevOps",
  "Design",
  "Photography",
  "Gaming",
  "Music",
  "Coffee",
  "Hiking",
  "Travel",
  "Fitness",
  "Cooking",
  "Reading",
];

export const LOOKING_FOR_OPTIONS = [
  "Project Partner",
  "Co-founder",
  "Friend",
  "Freelance Collaboration",
  "Networking",
];

export const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export const GENDER_OPTIONS = ["Male", "Female", "Other"];
