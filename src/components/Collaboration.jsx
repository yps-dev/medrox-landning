
const wheelItems = [
  {
    id: '0',
    title: 'Medrox Patient Hub',
    subtitle: 'Patient Records & Journeys',
    description:
      'Centralize every patient’s journey in one place — visits, diagnoses, lab results, images, and prescriptions — so any authorized specialist can see the full story in seconds.',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    features: [
      'Unified patient timeline',
      'Cross-department access',
      'Real-time record updates',
      'Secure cloud storage'
    ],
    theme: { id: 'sky', name: 'Sky Blue', primary: '#0ea5e9', secondary: '#06b6d4', bg: 'from-blue-50 to-cyan-50' },
  },
  {
    id: '1',
    title: 'Medrox Inventory Control',
    subtitle: 'Stock & Supplies',
    description:
      'Stay on top of medicines, consumables, and devices with live stock levels, expiry alerts, and automated re‑ordering for every unit and branch.',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    features: [
      'Live stock tracking',
      'Expiry & low‑stock alerts',
      'Multi-branch inventory view',
      'Usage and cost analytics'
    ],
    theme: { id: 'purple', name: 'Purple', primary: '#a855f7', secondary: '#ec4899', bg: 'from-purple-50 to-pink-50' },
  },
  {
    id: '2',
    title: 'Medrox Lab & Results',
    subtitle: 'Lab Integration',
    description:
      'Connect lab, clinic, and wards so tests are ordered, processed, verified, and reported without manual chasing or missing results.',
    icon: Building2,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    features: [
      'Pre- and post-test workflows',
      'Result verification steps',
      'Direct integration with orders',
      'Instant result availability'
    ],
    theme: { id: 'green', name: 'Green', primary: '#10b981', secondary: '#14b8a6', bg: 'from-emerald-50 to-teal-50' },
  },
  {
    id: '3',
    title: 'Medrox Specialist Workspace',
    subtitle: 'Built for 60+ Specialties',
    description:
      'Equip every specialist — from general practice and dermatology to dental and pathology — with a dedicated workspace that guides real clinical work: structured assessments, diverse diagnostic paths, risk checks at each step, and clear follow-up plans for every patient.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    features: [
      'Specialty-specific assessment templates',
      'Multi-path diagnostic workflows',
      'Risk and blind-spot checks during care',
      'Follow-up, review, and monitoring tools'
    ],
    theme: { id: 'orange', name: 'Orange', primary: '#f97316', secondary: '#ef4444', bg: 'from-orange-50 to-red-50' },
  }
  ,
  {
    id: '4',
    title: 'Medrox Clinic Manager',
    subtitle: 'Clinic Operations',
    description:
      'Give clinic managers a single control panel for appointments, rooms, staff schedules, and billing — built for busy outpatient and specialty clinics.',
    icon: Building2,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    features: [
      'Smart appointment scheduling',
      'Room & resource planning',
      'Staff rota & shifts',
      'Integrated billing'
    ],
    theme: { id: 'indigo', name: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', bg: 'from-indigo-50 to-purple-50' },
  },
  {
    id: '5',
    title: 'Medrox Pharmacy Suite',
    subtitle: 'Pharmacy Management',
    description:
      'Run a modern pharmacy with tight control over prescriptions, stock, pricing, and POS — all linked directly to doctors and patient records.',
    icon: Pill,
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    features: [
      'E-prescription handling',
      'Linked to patient records',
      'Inventory forecasting',
      'Built-in POS and sales'
    ],
    theme: { id: 'teal', name: 'Teal', primary: '#14b8a6', secondary: '#06b6d4', bg: 'from-teal-50 to-cyan-50' },
  },
  {
    id: '6',
    title: 'Medrox Document Vault',
    subtitle: 'Cloud-Native Records & Results',
    description:
      'Keep every report, scan, consent form, and referral in a cloud‑native vault that needs no local servers and is available wherever care happens. Hospitals, clinics, and pharmacies stay connected to the same living record, so authorized staff and patients can securely access the right documents anytime, from any location or device.',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    features: [
      'Cloud-based, no local server needed',
      'Always-on data across all sites',
      'Structured, searchable storage',
      'Secure sharing with providers and patients'
    ],
    theme: { id: 'pink', name: 'Pink', primary: '#ec4899', secondary: '#f43f5e', bg: 'from-pink-50 to-rose-50' },
  }
  ,
  {
    id: '7',
    title: 'Medrox Staff Console',
    subtitle: 'Staff & Remote Work',
    description:
      'Let staff work efficiently on-site or remotely with secure access to patient data, tasks, and communication — always with full control and audit trails.',
    icon: User,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    features: [
      'Smart staff scheduling',
      'Role-based remote access',
      'Patient monitoring views',
      'Team communication tools'
    ],
    theme: { id: 'slate', name: 'Slate', primary: '#64748b', secondary: '#475569', bg: 'from-slate-100 to-gray-100' },
  },
];


import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from "./Section";
import { brainwave } from '../assets';

import {
  Stethoscope,
  BarChart3,
  Building2,
  Users,
  Pill,
  FileText,
  User,
  HandMetal // Representing the palm/hand hint
} from 'lucide-react';

// ... (wheelItems array remains exactly as you provided)

const ROTATION_DURATION = 7.0;

export default function ExploreSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(wheelItems[0].theme);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastScrollTime = useRef(Date.now());

  const ANGLE_PER_ITEM = 360 / wheelItems.length;

  const handleNewIndex = (newIndex) => {
    setHasInteracted(true);
    const correctedIndex = (newIndex + wheelItems.length) % wheelItems.length;
    setActiveIndex(correctedIndex);
    setRotation(newIndex * ANGLE_PER_ITEM);
    setSelectedTheme(wheelItems[correctedIndex].theme);
  };

  const handleIconClick = (index) => handleNewIndex(index);

  // REMOVED GLOBAL WINDOW LISTENER - CAUSES SCROLL DRAG
  const handleWheel = (event) => {
    // Only capture wheel if it's over THIS component
    const now = Date.now();
    if (now - lastScrollTime.current < 1500) return;
    lastScrollTime.current = now;

    // Basic throttle logic
    if (event.deltaY > 0) handleNewIndex(activeIndex + 1);
    else if (event.deltaY < 0) handleNewIndex(activeIndex - 1);
  };

  const currentItem = wheelItems[activeIndex];

  return (
    <Section id="explore">
      <section
        ref={containerRef}
        onWheel={handleWheel} // Localized Scroll Listener
        className={`relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br ${selectedTheme.bg} transition-all duration-1000`}
      >

        {/* PREMIUM CRYSTAL BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            whileInView={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            viewport={{ amount: 0 }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)] will-change-transform transform-gpu"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">

          {/* TITLE SHIFTING HEADER */}
          <div className="text-center mb-16 relative">
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4">
              <span className="block text-slate-900 opacity-90">Explore Our</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedTheme.id}
                  initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="block bg-clip-text text-transparent bg-gradient-to-r"
                  style={{ backgroundImage: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})` }}
                >
                  {currentItem.title.split(' ').slice(1).join(' ')}
                </motion.span>
              </AnimatePresence>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: THE CRYSTAL WHEEL */}
            <div className="relative flex items-center justify-center min-h-[500px]">
              <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">

                {/* ANIMATED ORBITAL RING (Circular ring around) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10%] rounded-full border border-dashed border-white/30 opacity-40 pointer-events-none"
                />

                {/* GLASSY CRYSTAL CIRCULAR LINE */}
                <div className="absolute inset-0 rounded-full border-[2px] lg:border-[2px]  border-white/40 lg:border-white/50  shadow-[0_0_30px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.2)] backdrop-blur-[2px]" />

                {/* Main Spinning Wheel */}
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: ROTATION_DURATION, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full will-change-transform transform-gpu" // Optimized: GPU Layer Promotion
                >
                  {wheelItems.map((item, idx) => {
                    const angle = (idx * 360) / wheelItems.length;
                    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 200;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    const isActive = idx === activeIndex;

                    return (
                      <motion.div
                        key={item.id}
                        className="absolute left-1/2 top-1/2"
                        style={{ x: x - 40, y: y - 40 }}
                      >
                        <motion.div
                          onClick={() => handleIconClick(idx)}
                          className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
                        >
                          {/* FIRST TIME USER PALM HINT */}
                          {!hasInteracted && idx === 1 && (
                            <div className="absolute -top-12 -right-12 z-50 pointer-events-none">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: [1, 1.2, 1], opacity: 1, y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex flex-col items-center"
                              >
                                <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold shadow-lg mb-2 text-slate-800 border border-white">
                                  CLICK ME
                                </div>
                                <motion.div
                                  animate={{ scale: [1, 0.8, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <HandMetal className="text-slate-800 fill-slate-800/20" size={32} />
                                </motion.div>
                              </motion.div>
                            </div>
                          )}

                          {/* ACTIVE CRYSTAL CIRCLE */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                layoutId="active-glow"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 rounded-2xl   blur-xl"
                                style={{ backgroundColor: selectedTheme.primary + '90' }}
                              />
                            )}
                          </AnimatePresence>

                          <motion.div
                            className={`w-full h-full rounded-2xl flex items-center justify-center border transition-all duration-700 backdrop-blur-md will-change-transform transform-gpu
                              ${isActive ? 'bg-white shadow-2xl' : 'bg-white/40 border-white/30'}`}
                            style={{
                              borderColor: isActive ? selectedTheme.primary : 'transparent ',
                              rotate: rotation
                            }}
                          >
                            <item.icon
                              size={32}
                              className={`transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* CENTER LOGO */}
                <div className="absolute flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-full bg-white/80 backdrop-blur-lg shadow-2xl border border-white flex items-center justify-center z-20"
                  >
                    <img src={brainwave} alt="Logo" loading="lazy" className="w-16" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* RIGHT: PREMIUM CARD */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="p-10 md:p-14 rounded-[3rem] bg-white/70 backdrop-blur-2xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] border border-white"
                >
                  <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 text-white bg-gradient-to-r ${currentItem.color}`}>
                    All in One
                  </span>

                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {currentItem.title}
                  </h3>

                  <p className="text-xl text-slate-600 leading-relaxed mb-10">
                    {currentItem.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentItem.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 border border-white/50"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentItem.color}`} />
                        <span className="text-sm font-bold text-slate-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}