import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { plans } from "../utils/constants";

const Billing = () => {
  // const [isUserPremium, setIsUserPremium] = useState(false);

  // useEffect(() => {
  //   verifyPremiumUser();
  // }, []);

  // const verifyPremiumUser = async () => {
  //   const res = await axios.get(BASE_URL + "/premium/verify", {
  //     withCredentials: true,
  //   });

  //   if (res.data.isPremium) {
  //     setIsUserPremium(true);
  //   }
  // };

  const isUserPremium = false;
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
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
        color: "#6366f1",
      },
      // handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-16">
      {/* Premium User Card - shadcn structure */}
      <div className="rounded-lg border border-[#3f3f46] bg-[#18181b] text-[#fafafa] shadow-sm w-full max-w-md">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#6366f1] rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-center">
            Premium Member
          </h3>
          <p className="text-sm text-[#a1a1aa] text-center">
            You're already enjoying all premium benefits
          </p>
        </div>
        <div className="p-6 pt-0">
          <p className="text-sm text-[#a1a1aa] leading-relaxed text-center">
            Keep connecting and collaborating with amazing developers. Your
            premium membership gives you unlimited access to all features.
          </p>
        </div>
        <div className="flex items-center p-6 pt-0">
          <div className="flex items-center justify-center w-full gap-2 text-[#6366f1] text-sm font-medium">
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
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-[#0a0a0a] px-6 md:px-8 lg:px-12 py-16">
      {/* Background accents */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#6366f1]/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#fafafa] leading-tight tracking-tight">
            Choose Your <span className="text-[#6366f1]">Membership Plan</span>
          </h1>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            Unlock premium features and accelerate your developer networking
            journey
          </p>
        </div>

        {/* Pricing Cards - shadcn structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.type}
              className={`relative rounded-lg border bg-[#18181b] text-[#fafafa] shadow-sm transition-all duration-300 hover:shadow-md ${
                plan.popular
                  ? "border-[#6366f1] md:scale-105"
                  : "border-[#3f3f46]"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#6366f1] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#a1a1aa]">{plan.duration}</p>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-0">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#6366f1]">
                    {plan.price}
                  </span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[#6366f1] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-[#a1a1aa] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="flex items-center p-6 pt-0">
                <button
                  onClick={() => handleBuyClick(plan.type)}
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full ${
                    plan.popular
                      ? "bg-[#6366f1] text-white hover:bg-[#6366f1]/90"
                      : "border border-[#3f3f46] bg-[#27272a] hover:bg-[#3f3f46] hover:text-[#fafafa]"
                  }`}
                >
                  {plan.popular ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-[#71717a]">
            All plans include a 7-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;