"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Section from "./Section";
import VideoFeatures from './VideoFeatures';
import DataTicker from './DataTicker';
import Rox from '../assets/Rox.png';
import Globe from '../assets/Globe.png';

export default function FeaturesShowcase() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const containerRef = useRef(null);

  // 3D MAGNETIC SETUP
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apple-style parallax: Header moves slower than content
  const headerY = useTransform(scrollYProgress, [0, 0.2], [40, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <Section id="scope" className="relative bg-[#FBFBFB] min-h-screen overflow-visible py-0">

      {/* ROX AI PERMANENT BRANDING SECTION (UPGRADED) */}
      <div className="w-full py-32 flex flex-col items-center justify-center bg-white border-b border-slate-50 overflow-hidden">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-6xl flex items-center justify-center perspective-[1000px] mb-12"
        >
          {/* 3D TILT CONTAINER */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center"
          >
            {/* NEURAL ORBITALS */}


            <img
              src={Rox}
              alt="Rox AI Core"
              loading="lazy"
              className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 drop-shadow-[0_25px_50px_rgba(0,0,0,0.1)] select-none pointer-events-none relative z-10"
            />

            {/* FLOATING INTELLIGENCE NODES (Parallax Depth Points) */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ top: '20%', left: '30%', x: useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]), translateZ: 50 }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              style={{ top: '60%', right: '25%', x: useTransform(mouseXSpring, [-0.5, 0.5], [60, -60]), y: useTransform(mouseYSpring, [-0.5, 0.5], [60, -60]), translateZ: 80 }}
            />
            <motion.div
              className="absolute w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
              style={{ bottom: '15%', left: '45%', x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]), translateZ: 30 }}
            />

            {/* Inner Glow */}
            <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-[80px] -z-10 animate-pulse" />
          </motion.div>

          {/* Large Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-r from-cyan-100/20 to-blue-100/20 rounded-full blur-[120px] -z-20 pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="text-center px-4"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-slate-900 mb-6 drop-shadow-sm">
            ROX <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">AI</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <p className="max-w-2xl text-lg md:text-2xl text-slate-500 font-medium leading-relaxed tracking-tight italic">
            "The world&apos;s first autonomous Healthcare AI <br className="hidden md:block" /> for unified global healthcare intelligence."
          </p>
        </motion.div>

        {/* BLURRED GLOBE BACKGROUND ELEMENT */}

      </div>


      <div ref={containerRef} className="container relative z-10">

        {/* MAGNIFICENT HEADER */}
        <motion.div
          style={{ y: headerY, opacity: isFocusMode ? 0 : headerOpacity }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center text-center pointer-events-none"
        >

          <h1 className="text-[13vw] lg:text-[9vw] font-semibold tracking-[-0.04em] leading-[0.85] text-slate-900 mb-10">
            Absolute <br /> <span className="text-slate-300">Precision.</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            Smarter diagnostics and care, <br /> powered by Medrox Rox AI.
          </p>

        </motion.div>

        {/* INTERACTIVE CONTENT GRID */}
        <div className="relative z-20 -mt-[30vh] pb-40">
          <VideoFeatures onFocusChange={setIsFocusMode} />
        </div>
      </div>

      <DataTicker />
    </Section>
  );
}