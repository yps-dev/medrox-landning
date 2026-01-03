import { useRef, useState } from "react";
import { pricing } from "../constants";
import Button from "./Button";
import { motion } from "framer-motion";

const PricingCard = ({ item, index, openModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="
        relative h-full flex flex-col 
        px-6 py-8 sm:px-8 sm:py-10 
        rounded-3xl 
        bg-white
        border border-slate-100
        shadow-lg hover:shadow-2xl transition-all duration-300
        overflow-hidden group
      "
    >
      {/* PREMIUM SAPPHIRE GRADIENT HEADER (Line at top) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 opacity-90" />

      {/* Plan Title */}
      <h4
        className={`text-2xl sm:text-3xl font-black mb-4 
          ${item.title.toLowerCase() === "pharmacy" ? "text-cyan-600" : "text-slate-900"}
        `}
      >
        {item.title}
      </h4>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
        {item.description}
      </p>

      {/* Price */}
      {item.price && (
        <div className="flex items-baseline mb-6 sm:mb-8">
          <span className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            {item.price}
          </span>
          <span className="ml-2 text-slate-400 text-lg">Birr</span>
        </div>
      )}

      {/* CTA Button */}
      <Button
        className={`relative w-full py-3 sm:py-4 mb-6 sm:mb-8 rounded-xl font-bold text-white shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-0.5
          ${item.title?.trim().toLowerCase() === "pharmacy"
            ? "bg-slate-900 hover:bg-slate-800"
            : "bg-blue-600 hover:bg-blue-700"
          }
        `}
        onClick={openModal}
      >
        <span className="relative z-10">
          {item.price ? "Get Started" : "Contact Us"}
        </span>
      </Button>

      {/* Features */}
      <ul className="space-y-3 sm:space-y-4 mt-auto">
        {item.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-center text-slate-600 text-sm sm:text-base font-medium"
          >
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

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
        <PricingCard key={item.id} item={item} index={index} openModal={openModal} />
      ))}
    </div>
  );
};

export default PricingList;
