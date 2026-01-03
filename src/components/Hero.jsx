"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { brainwave } from "../assets";
import Button from './Button';
import Section from './Section';
import { MouseParallax } from 'react-just-parallax';
import {
  Hospital,
  Stethoscope,
  HeartPulse,
  Microscope,
  ShieldCheck,
  BrainCircuit,
  Radiation,
  Baby,
  Bone,
  Cpu,
  Globe,
  Activity,

  Brain,

  Ambulance,
  Pill,
  Syringe,
} from 'lucide-react';
import { Hand, PersonSimpleRun } from 'phosphor-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

// --- TOOTH ICON WRAPPER ---
const Tooth = (props) => <FontAwesomeIcon icon={faTooth} {...props} />;

// --- MAGNETIC WRAPPER ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// --- APPLE SPATIAL TYPING COMPONENT ---
const HeroHeadline = ({ text, className }) => {
  const letters = Array.from(text || "");
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 15, filter: "blur(12px)", scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="relative inline-block">
          <span className="relative z-10">{letter === " " ? "\u00A0" : letter}</span>
          <motion.span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              width: '40px',
              skewX: '-20deg',
            }}
            animate={{ x: ['-200%', '400%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.05, repeatDelay: 3 }}
          />
        </motion.span>
      ))}
    </motion.h1>
  );
};

// --- SERVICE MARQUEE ---
const services = [
  { id: 'hosp', name: 'Hospitals', Icon: Hospital, color: 'from-red-500 to-pink-500' },
  { id: 'clin', name: 'Clinics', Icon: Stethoscope, color: 'from-blue-500 to-cyan-500' },
  { id: 'cardio', name: 'Cardiology', Icon: HeartPulse, color: 'from-red-600 to-rose-600' }, // ❤️ Heart with pulse
  { id: 'path', name: 'Pathology', Icon: Microscope, color: 'from-purple-600 to-violet-600' }, // 🔬 Lab research
  { id: 'neuro', name: 'Neurology', Icon: BrainCircuit, color: 'from-indigo-500 to-purple-600' }, // Advanced brain
  { id: 'onco', name: 'Oncology', Icon: Radiation, color: 'from-orange-500 to-amber-600' }, // Cancer care
  { id: 'pedia', name: 'Pediatrics', Icon: Baby, color: 'from-pink-400 to-rose-500' }, // Child care
  { id: 'ortho', name: 'Orthopedics', Icon: Bone, color: 'from-lime-500 to-green-600' }, // Bones & joints
  { id: 'dent', name: 'Dental Care', Icon: Tooth, color: 'from-teal-500 to-cyan-500' },
  { id: 'derm', name: 'Dermatology', Icon: Hand, color: 'from-amber-400 to-orange-500' },
  { id: 'psyc', name: 'Psychiatry', Icon: Brain, color: 'from-purple-500 to-indigo-500' },
  { id: 'physio', name: 'Physiotherapy', Icon: PersonSimpleRun, color: 'from-green-500 to-emerald-500' },
  { id: 'ems', name: 'Emergency', Icon: Ambulance, color: 'from-rose-500 to-pink-600' },
  { id: 'pharm', name: 'Pharmacies', Icon: Pill, color: 'from-cyan-500 to-sky-500' },
  { id: 'med', name: 'Medical Services', Icon: Syringe, color: 'from-indigo-500 to-blue-600' },
];

const ServiceMarquee = () => {
  const doubledServices = [...services, ...services];
  return (
    <div className="w-full mt-20 md:mt-32">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 text-center">Supporting the Future of Healthcare</p>
      <div className="relative w-full overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div
          className="flex w-max gap-8 lg:gap-12"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {doubledServices.map((service, index) => (
            <div key={`${service.id}-${index}`} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <service.Icon className="text-slate-600 w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors uppercase tracking-wider">{service.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const FeatureChip = ({ icon: Icon, text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: -20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-xl border border-white/20 rounded-full shadow-lg hover:shadow-cyan-500/10 transition-all cursor-default group"
  >
    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
      <Icon size={16} className="text-cyan-600" />
    </div>
    <span className="text-sm font-bold text-slate-800 tracking-tight">{text}</span>
  </motion.div>
);

const Hero = ({ openContact }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const productScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const productRotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  return (
    <Section
      className="pt-[14rem] -mt-[5.25rem] min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      {/* SPATIAL BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-100/30 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-100/30 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="container relative z-10" ref={containerRef}>
        <div className="relative z-1 max-w-[72rem] mx-auto text-center mb-16 md:mb-24">

          {/* LOGO & BRAND (Refined) */}
          <div className="flex flex-row justify-center gap-8 items-center mb-10">
            <Magnetic>
              <motion.div
                className="relative cursor-pointer group mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="mb-12"
                >
                  <motion.img
                    src={brainwave}
                    alt="Medrox"
                    loading="eager"
                    fetchpriority="high"
                    className="w-24 sm:w-40 lg:w-32 drop-shadow-2xl"
                    animate={{
                      y: [0, -12, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                {/* REflection & Shine */}
                <div className="absolute top-[120%] left-0 w-full h-full scale-y-[-0.5] opacity-10 blur-sm grayscale pointer-events-none">
                  <img src={brainwave} alt="Reflection" className="w-full h-full" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent z-20 pointer-events-none"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>
            </Magnetic>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-center mb-6"
            >
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-6xl font-black leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-gray-700">
                  Medrox
                </span>
              </span>

            </motion.h1>
          </div>

          {/* HEADLINE */}
          <HeroHeadline
            text="All in one healthcare Platform"
            className="h1 mb-8 text-slate-900 leading-[0.85] tracking-[-0.05em] lg:text-[7.5rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="body-1 max-w-2xl mx-auto mb-10 text-slate-500 font-medium text-lg"
          >
            Experience the world's most advanced healthcare ecosystem. Built with proprietary AI to unify global healthcare worldwide.
          </motion.p>

          <Button onClick={openContact} white className="px-12 py-5 text-lg font-black shadow-2xl hover:shadow-cyan-500/20 transition-all">
            Get Started Today
          </Button>
        </div>

        {/* THE CENTERPIECE: HERO VIDEO */}
        <div className="relative max-w-6xl mx-auto">

          {/* Floating Feature Pills (Surrounding) */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30">
            <FeatureChip icon={ShieldCheck} text="Unified care, one platform" delay={1.2} />
            <FeatureChip icon={Activity} text="Faster journeys, less waiting" delay={1.4} />
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30 items-end">
            <FeatureChip icon={Globe} text="Insightful data, clear decisions" delay={1.6} />
            <FeatureChip icon={Cpu} text="Everywhere, for every one" delay={1.8} />
          </div>

          <motion.div
            style={{ scale: productScale, rotateX: productRotate }}
            className="relative z-10 perspective-[2000px] max-w-5xl mx-auto"
          >
            <MouseParallax strength={0.03}>
              <div className="relative rounded-[2rem] p-0.5 bg-gradient-to-b from-slate-200 to-transparent shadow-2xl overflow-hidden ring-1 ring-black/5">
                <div className="relative bg-white rounded-[1.8rem] overflow-hidden aspect-video">
                  <video
                    src="https://www.dropbox.com/scl/fi/z3c8mvvyw5pcyao7wbwzv/medrox-hero.mp4?rlkey=3znvs4f40lb9rpiqgl45n2tqc&st=nqicld7c&raw=1"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  {/* Glass Shine */}
                  <motion.div
                    className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                  />
                </div>
              </div>
            </MouseParallax>
          </motion.div>
        </div>

        {/* APPLE STYLE SERVICE MARQUEE */}
        <ServiceMarquee />

      </div>
    </Section>
  );
};

export default Hero;
