"use client";
import { pricing } from "../constants";
import Button from "./Button";
import { motion } from "framer-motion";

const PricingList = ({ openModal }) => {
  return (
    <div
      className="
        grid grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-2 
        gap-8 
        w-full 
        max-w-7xl 
        mx-auto 
        px-4
      "
    >
      {pricing.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: index * 0.15 }}
          whileHover={{ scale: 1.04 }}
          className="
            relative flex flex-col 
            px-6 py-8 sm:px-8 sm:py-10 
            rounded-3xl 
            backdrop-blur-xl 
            border border-slate-200/40 
            bg-gradient-to-br from-white/90 via-slate-50/80 to-white/90 
            shadow-[0_12px_40px_rgba(0,0,0,0.08)] 
            overflow-hidden group
          "
        >
          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-400/50 transition-all duration-700" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />

          {/* Plan Title */}
          <h4
            className={`relative text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent drop-shadow-md mb-4
              ${item.title.toLowerCase() === "pharmacy"
                ? "bg-gradient-to-r from-cyan-700 via-sky-500 to-teal-200 animate-gradient-move"
                : "bg-gradient-to-r from-teal-600 to-emerald-500"
              }
            `}
          >
            {item.title}
            <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)] animate-sweep pointer-events-none"></span>
          </h4>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Price */}
          {item.price && (
            <div className="flex items-baseline mb-6 sm:mb-8">
              <span className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                {item.price}
              </span>
              <span className="ml-2 text-slate-500 text-lg">Birr</span>
            </div>
          )}

          {/* CTA Button */}
          <Button
            className={`relative w-full py-3 sm:py-4 mb-6 sm:mb-8 rounded-xl font-bold text-white shadow-md hover:shadow-xl overflow-hidden transition-all duration-500
              ${item.title?.trim().toLowerCase() === "pharmacy"
                ? "bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 hover:from-sky-500 hover:via-cyan-400 hover:to-sky-600"
                : "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
              }
            `}
            onClick={openModal}
          >
            <span className="relative z-10">
              {item.price ? "Get Started" : "Contact Us"}
            </span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-500 scale-150 group-hover:scale-100 rounded-full"></span>
          </Button>

          {/* Features */}
          <ul className="space-y-3 sm:space-y-4 mt-auto">
            {item.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center text-slate-700 text-sm sm:text-base"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingList;
