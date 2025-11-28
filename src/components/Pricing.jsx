// Pricing.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constants";
import { plans } from "../utils/constants";

/* small className joiner */
const cn = (...classes) => classes.filter(Boolean).join(" ");

const CheckIcon = ({ className, strokeColor = "#ff734d" }) => (
  <svg
    className={className}
    fill="none"
    stroke={strokeColor}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

/* Loading view (keeps your original logic message but with theme) */
function LoadingView() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-b from-[#FFE8D6] to-[#bc6a30] px-6 py-16">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-[rgba(241,241,241,1)] border-t-[rgba(255,115,77,0.9)] rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-[#010D3E]">Loading your membership status...</p>
      </div>
    </div>
  );
}

/* Premium card (when user already premium) */
function PremiumCard() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-b from-[#FFE8D6] to-[#bc6a30] px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl shadow-2xl shadow-[rgba(255,115,77,0.15)] w-full max-w-md bg-white/90 backdrop-blur-sm border border-[rgba(255,115,77,0.15)]"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff734d] to-[#d64000] flex items-center justify-center shadow-lg">
              <CheckIcon className="w-8 h-8 text-white" strokeColor="#ffffff" />
            </div>
          </div>
          <h3 className="text-2xl font-bold leading-none tracking-tight text-center bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
            Premium Member
          </h3>
          <p className="text-sm text-center mt-2 text-[#010D3E]">
            You're already enjoying all premium benefits
          </p>
        </div>

        <div className="p-6 pt-0">
          <p className="text-sm leading-relaxed text-center text-[#010D3E]">
            Keep connecting and collaborating with amazing developers. Your
            premium membership gives you unlimited access to all features.
          </p>
        </div>

        <div className="flex items-center p-6 pt-0">
          <div className="flex items-center justify-center w-full gap-2 text-sm font-medium text-[#ff734d]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Active Subscription</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Single plan card (reusable) */
function PlanCard({ plan, onBuy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative rounded-2xl p-8 w-full lg:w-80 transition-all duration-300",
        plan.popular
          ? "lg:scale-105 shadow-2xl shadow-[rgba(255,115,77,0.28)]"
          : "shadow-xl shadow-[rgba(255,115,77,0.08)] hover:shadow-2xl hover:shadow-[rgba(255,115,77,0.12)]"
      )}
      style={{
        backgroundColor: plan.popular ? "#d64000" : "#FFFFFF",
        border: plan.popular ? "2px solid #d64000" : "1px solid rgba(255,115,77,0.15)",
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#d64000] text-white border-2 border-white shadow-lg">
            <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ⭐ Most Popular
            </motion.span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className={cn("text-xl font-bold mb-1", plan.popular ? "text-white" : "text-[#010D3E] opacity-90")}>
          {plan.name}
        </h3>
        <p className={cn("text-sm", plan.popular ? "text-white/90" : "text-[#010D3E] opacity-70")}>
          {plan.duration}
        </p>
      </div>

      {/* Price */}
      <div className="flex flex-col items-baseline gap-1 mb-8">
        <span className={cn("text-5xl font-bold tracking-tighter leading-none", plan.popular ? "text-white" : "text-[#010D3E]")}>
          {plan.price}
        </span>
        <span className={cn("tracking-tight font-semibold text-sm", plan.popular ? "text-white/80" : "text-[#010D3E] opacity-70")}>
          /month
        </span>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.12, ease: "easeOut" } }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onBuy(plan.type)}
        className={cn(
          "w-full py-3.5 px-6 cursor-pointer rounded-xl font-semibold text-base transition-all duration-300 mb-8 shadow-lg",
          plan.popular
            ? "bg-white text-[#d64000] hover:bg-white/95 hover:shadow-xl"
            : "bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white hover:opacity-90 hover:shadow-xl hover:shadow-[rgba(255,115,77,0.25)]"
        )}
      >
        {plan.popular ? "Get Started Now" : "Choose Plan"}
      </motion.button>

      {/* features */}
      <ul className="flex flex-col gap-4">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <CheckIcon className="h-5 w-5 flex-shrink-0 mt-0.5" strokeColor={plan.popular ? "#ffffff" : "#ff734d"} />
            <span className={plan.popular ? "text-white/95 leading-relaxed" : "text-[#010D3E] leading-relaxed"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* Main Pricing component: keeps original logic but updated styling & modular structure */
const Pricing = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Error verifying premium status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "GitTogether",
      description: "",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#ff734d", // switched to brand orange
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (isUserPremium) {
    return <PremiumCard />;
  }

  /* Pricing plans view (non-premium users) */
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#FFE8D6] to-[#bc6a30]">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-5 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#010D3E] max-w-4xl mx-auto">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">Developer Journey</span>
          </h2>

          <p className="text-lg text-[#010D3E] max-w-2xl mx-auto leading-relaxed">
            Unlock premium features and accelerate your networking with fellow developers. Start free, upgrade when you're ready.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="flex flex-col gap-6 items-center lg:flex-row lg:items-end lg:justify-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={plan.type} plan={plan} onBuy={handleBuyClick} />
          ))}
        </div>

        {/* Footer notes */}
        <div className="text-center mt-16 space-y-3">
  <p className="text-md text-[#010D3E] font-medium">
    All plans include a 7-day money-back guarantee. Cancel anytime, no questions asked.
  </p>
  <p className="text-md text-[#000000] ">
    Secure payments powered by Razorpay
  </p>
</div>

      </div>
    </section>
  );
};

export default Pricing;
