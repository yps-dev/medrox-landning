import { useRef, useState } from "react";
import { pricing } from "../constants";
import Button from "./Button";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

const PricingCard = ({ item, index, openModal }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Tilt
      options={{
        max: 15,
        scale: 1.02,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: index * 0.15 }}
        className="
          relative h-full flex flex-col 
          px-6 py-8 sm:px-8 sm:py-10 
          rounded-3xl 
          backdrop-blur-xl 
          border border-white/10
          bg-slate-900/40
          shadow-[0_12px_40px_rgba(0,0,0,0.4)]
          overflow-hidden group
        "
      >
        {/* SPOTLIGHT EFFECT */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        {/* HOLOGRAPHIC BORDER */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.2), transparent 40%)`,
            maskImage: 'linear-gradient(black, black), content-box',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />

        {/* INNER GLOW */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />

        {/* Plan Title */}
        <h4
          className={`relative text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent drop-shadow-md mb-4
            ${item.title.toLowerCase() === "pharmacy"
              ? "bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-200"
              : "bg-gradient-to-r from-teal-400 to-emerald-300"
            }
          `}
        >
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium relative z-10">
          {item.description}
        </p>

        {/* Price */}
        {item.price && (
          <div className="flex items-baseline mb-6 sm:mb-8 relative z-10">
            <span className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              {item.price}
            </span>
            <span className="ml-2 text-gray-400 text-lg">Birr</span>
          </div>
        )}

        {/* CTA Button */}
        <Button
          className={`relative w-full py-3 sm:py-4 mb-6 sm:mb-8 rounded-xl font-bold text-white shadow-lg overflow-hidden transition-all duration-500 z-10
            ${item.title?.trim().toLowerCase() === "pharmacy"
              ? "bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300"
              : "bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300"
            }
          `}
          onClick={openModal}
        >
          <span className="relative z-10">
            {item.price ? "Get Started" : "Contact Us"}
          </span>
          {/* Button Shine */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
        </Button>

        {/* Features */}
        <ul className="space-y-3 sm:space-y-4 mt-auto relative z-10">
          {item.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center text-gray-300 text-sm sm:text-base font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 border border-white/5">
                <svg
                  className="w-3 h-3 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Tilt>
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
