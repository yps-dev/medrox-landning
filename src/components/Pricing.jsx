import React, { useRef, useState, useEffect } from 'react';
import Section from "./Section";
import PricingList from "./PricingList";
import { motion, useScroll, useTransform, animate, useMotionValue, useMotionTemplate, useVelocity, useSpring } from 'framer-motion';
import InfinityGrid from './InfinityGrid';
import VideoFeatures from './VideoFeatures';
import Threads from './Threads'; // IMPORT THREADS
import LaserFlow from './LaserFlow';
import DataTicker from './DataTicker'; // NEW
import EnergyPool from './EnergyPool'; // NEW
// --- HELPER: Hex to RGB ---
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ] : [1, 1, 1];
}

const ShootingStars = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[100px] bg-gradient-to-r from-transparent via-white to-transparent will-change-transform" // HINT FOR COMPOSITOR
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random(),
          }}
          animate={{
            x: [-200, 1500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
      {/* Soft dust */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 will-change-transform" // ADD WILL-CHANGE
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
});

// --- MAIN COMPONENT ---
export default function FeaturesShowcase() {
  const containerRef = useRef(null);
  const [activeColor, setActiveColor] = useState('#3b82f6');
  const [isFocusMode, setIsFocusMode] = useState(false); // New Focus State

  const color1 = useMotionValue('#3b82f6');
  const color2 = useMotionValue('#06b6d4');

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // WARP SCROLL EFFECT: Skew y based on velocity
  // Max skew 5 deg for subtle effect
  const skewY = useTransform(smoothVelocity, [-1000, 0, 1000], [-5, 0, 5]);

  // Smooth Focus Mode Opacity
  // When focused, background elements fade to 0.1
  const bgOpacity = isFocusMode ? 0.1 : 1;
  const contentOpacity = isFocusMode ? 0.2 : 1;

  useEffect(() => {
    animate(color1, activeColor, { duration: 1.0 });
    animate(color2, activeColor, { duration: 1.5, delay: 0.1 });
  }, [activeColor]);

  // Convert activeColor to RGB for Threads
  const threadsColor = hexToRgb(activeColor);

  return (
    <Section id="features" className="relative bg-gradient-to-br from-cyan-100 via-gray-100 to-cyan-100/70 pt-0 pb-0 overflow-hidden min-h-screen">

      {/* --- BACKGROUND (Dims on Focus) --- */}
      <motion.div
        className="absolute bg-gradient-to-br from-cyan-900/70  to-cyan-900/70 inset-0 z-0 transition-opacity duration-700 ease-in-out will-change-transform"
        style={{ opacity: bgOpacity }}
      >
        {/* THREADS WEBGL ANIMATION */}
        {/* <Threads ... />  REPLACED WITH LASERFLOW AS REQUESTED OR ADDED ALONGSIDE? 
            User said "so amzing what ytou didi but lets rake itto teh next levevand add thsi".
            User also said "dont chnag eother thing ins my ui".
            So I should KEEP InfinityGrid if possible or overlay this.
            Let's add it ON TOP of InfinityGrid but behind content.
        */}
        <InfinityGrid activeColor={activeColor} />

        {/* GLOBAL LASER FEED (Page Top -> Video) */}
        <div
          className="absolute inset-x-0 mt-5 top-0  h-[111vh]          /* default for very large screens */
  2xl:h-[111vh]      /* screens ≥1536px (big desktops) */
  xl:h-[115vh]       /* screens ≥1280px */
  lg:h-[118vh]       /* screens ≥1024px */
  md:h-[108vh]        /* screens ≥768px */
  sm:h-[90vh]
  xs:h-[60vh]        /* screens ≥640px */ mix-blend-screen pointer-events-none z-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
          }}
        >

          <LaserFlow
            color="#FFFFFF"         // ULTRA BRIGHT WHITE
            dpr={0}
            horizontalBeamOffset={0}
            verticalBeamOffset={0}
            verticalSizing={20.0}
            horizontalSizing={1.0}
            wispIntensity={7.0}
            fogIntensity={2.5}
            wispDensity={2.5}
            fogScale={0.5}
            wispSpeed={25}
            flowSpeed={0.35}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none" />
      </motion.div>

      {/* Layer Shooting Stars ON TOP of Threads for depth */}
      <div className={`transition-opacity duration-500 ${isFocusMode ? 'opacity-0' : 'opacity-100'}`}>
        <ShootingStars />
      </div>

      {/* --- TRUNK --- */}

      {/* --- CONTENT (Warps on Scroll) --- */}
      <motion.div
        ref={containerRef}
        className="container relative z-10 py-20 md:py-32 will-change-transform" // PERFORMANCE FIX: Re-added for smooth scroll
        style={{ skewY }} // APPLY WARP IT HERE
      >
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32 transition-all duration-500 will-change-transform"
          style={{ opacity: contentOpacity, filter: isFocusMode ? 'blur(5px)' : 'blur(0px)', transform: isFocusMode ? 'scale(0.95)' : 'scale(1)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* HOLOGRAPHIC HEADER */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-9xl font-black tracking-tighter text-white/10 mb-[-1.5rem] md:mb-[-3.5rem] select-none mix-blend-overlay"
            >
              CAPABILITIES
            </motion.h2>

            <p className="text-4xl mt-11 md:text-6xl font-black tracking-tight text-white mb-6 relative z-10 drop-shadow-2xl">
              Everything you need to{' '}
              <span
                className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 animate-text"
                style={{
                  backgroundSize: '200% auto',
                  textShadow: `0 0 30px ${activeColor}55`
                }}
              >
                Scale
                {/* SPARKLES WOW EFFECT */}
                <motion.span
                  className="absolute -top-6 -right-6 w-4 h-4 bg-white rounded-full blur-[1px]"
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.span
                  className="absolute -bottom-4 -left-4 w-2 h-2 bg-cyan-200 rounded-full blur-[1px]"
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />
                <motion.span
                  className="absolute top-0 -right-8 w-1 h-1 bg-teal-200 rounded-full"
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                />
              </span>
            </p>
            <style jsx>{`
              @keyframes text {
                to { background-position: 200% center; }
              }
              .animate-text {
                animation: text 3s linear infinite;
              }
            `}</style>

            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto drop-shadow-lg mb-16">
              Built for the future. Robust, secure, and incredibly fast.
            </p>



          </motion.div>
        </div>

        <div className="relative mb-32">
          {/* PASS FOCUS HANDLER */}

          <VideoFeatures
            onColorChange={setActiveColor}
            onFocusChange={setIsFocusMode}
          />
        </div>



        {/* FOOTER FINALE */}

      </motion.div>

      {/* DATA TICKER (Unwarped, Sticky Bottom or just at end) */}
      <div className="relative z-20 border-t border-white/10">
        <DataTicker />
      </div>

    </Section>
  );
}
