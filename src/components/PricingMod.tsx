import React from "react";
import { cn } from "@/lib/utils";

export default function FUIPricingSectionWithBadge() {
  const plans = [
    {
      name: "Basic plan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
    {
      name: "Startup",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 35,
      isMostPop: true,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
    {
      name: "Enterprise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 60,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
  ];

  return (
    <section className="py-0 pt-0 relative mt-[-0] bg-hero-gradient">
              <div className="absolute top-0 z-[0] h-screen w-screen bg-[#1A0540]/20  bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(106,20,255,0.3),rgba(255,255,255,0))]"></div>
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 text-gray-400 min-h-screen">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-300 font-geist py-6 sm:py-10 tracking-tighter text-2xl sm:text-3xl font-semibold md:text-4xl lg:text-5xl">
            Pricing for all sizes
          </h3>
          <div className="mt-3 max-w-xl text-white/40 font-geist font-normal text-sm sm:text-base">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              efficitur consequat nunc.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-16 justify-center gap-4 sm:gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col rounded-xl sm:rounded-2xl border-[1.2px] border-white/10 mt-4 sm:mt-6 transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset]  ${item.isMostPop ? "sm:mt-10" : ""
                }`}
            >
              {item.isMostPop ? (
                <span className="w-28 sm:w-32 absolute -top-4 sm:-top-5 left-0 right-0 mx-auto px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-md bg-[#1A0540]/50 text-white/90  bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(106,20,255,0.3),rgba(255,255,255,0))] animate-background-shine text-center text-gray-700 text-xs sm:text-sm font-semibold">
                  Most popular
                </span>
              ) : (
                ""
              )}
              <div className={cn("animate-background-shine p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 border-b border-white/10", item.name === 'Enterprise' ? "bg-[linear-gradient(110deg,transparent,45%,#1e1b4b,55%,transparent)] bg-[length:200%_100%] transition-colors rounded-t-xl sm:rounded-t-2xl" : "")}>
                <span className="text-[#6A14FF] font-normal font-geist tracking-tight text-sm sm:text-base">{item.name}</span>
                <div className="text-gray-200 text-2xl sm:text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-lg sm:text-xl text-gray-400 font-normal">/mo</span>
                </div>
                <p className="text-sm sm:text-base">{item.desc}</p>
                <button className="w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-[#8B44FF] to-[#4A0FBF] px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-lg text-zinc-50 ring-2 ring-[#6A14FF]/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-[#6A14FF]/70 flex items-center justify-center gap-2">
                  Get Started
                </button>
              </div>
              <ul className="p-4 sm:p-6 lg:p-8 space-y-2 sm:space-y-3">
                <li className="pb-2 text-gray-200 font-medium text-sm sm:text-base">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                                              className="h-4 w-4 sm:h-5 sm:w-5 text-[#6A14FF] flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
