import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from "./Section";
import InteractiveHint from "./InteractiveHint";
import { brainwave } from '../assets';

import {
  Stethoscope,
  BarChart3,
  Building2,
  Users,
  Pill,
  FileText,
  User,
  Clock,
} from 'lucide-react';

const wheelItems = [
  {
    id: '0',
    title: 'PatientSync',
    subtitle: 'Patient Records',
    description:
      'Sync patient records across all platforms instantly with real-time updates and secure cloud storage.',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    features: ['Instant Synchronization', 'Secure Storage', 'Real-time Updates', 'Cross-platform Access'],
    theme: { id: 'sky', name: 'Sky Blue', primary: '#0ea5e9', secondary: '#06b6d4', bg: 'from-blue-50 to-cyan-50' },
  },
  {
    id: '1',
    title: 'MedTrack',
    subtitle: 'Inventory Management',
    description:
      'Track medical inventory and patient progress in real-time with intelligent automation and alerts.',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    features: ['Real-time Tracking', 'Smart Alerts', 'Analytics Dashboard', 'Automated Reports'],
    theme: { id: 'purple', name: 'Purple', primary: '#a855f7', secondary: '#ec4899', bg: 'from-purple-50 to-pink-50' },
  },
  {
    id: '2',
    title: 'Hospital',
    subtitle: 'Communication Hub',
    description:
      'Centralize all patient care and communications in one unified platform for seamless collaboration.',
    icon: Building2,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    features: ['Unified Platform', 'Full Autoamtion', 'Patient Portal', 'Secure work flows'],
    theme: { id: 'green', name: 'Green', primary: '#10b981', secondary: '#14b8a6', bg: 'from-emerald-50 to-teal-50' },
  },
  {
    id: '3',
    title: 'CareFlow',
    subtitle: 'Workflow Automation',
    description:
      'Streamline workflows for healthcare professionals with intelligent automation and task management.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    features: ['Workflow Automation', 'Task Management', 'Team Coordination', 'Performance Tracking'],
    theme: { id: 'orange', name: 'Orange', primary: '#f97316', secondary: '#ef4444', bg: 'from-orange-50 to-red-50' },
  },
  {
    id: '4',
    title: 'ClinicPro',
    subtitle: 'Clinic Management',
    description:
      'Manage clinic operations with ease using comprehensive tools for scheduling and resource management.',
    icon: Building2,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    features: ['Appointment Scheduling', 'Resource Management', 'Staff Planning', 'Billing Integration'],
    theme: { id: 'indigo', name: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', bg: 'from-indigo-50 to-purple-50' },
  },
  {
    id: '5',
    title: 'RxManager',
    subtitle: 'Prescription Mgmt',
    description:
      'Optimize prescription and inventory management with intelligent forecasting and compliance tracking.',
    icon: Pill,
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    features: ['Prescription Tracking', 'Inventory Forecasting', 'Compliance Monitoring', 'Drug Interactions'],
    theme: { id: 'teal', name: 'Teal', primary: '#14b8a6', secondary: '#06b6d4', bg: 'from-teal-50 to-cyan-50' },
  },
  {
    id: '6',
    title: 'DocSync',
    subtitle: 'Document Management',
    description:
      'Sync medical documents across systems with full version control and secure archival capabilities.',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    features: ['Version Control', 'Document Archival', 'OCR Processing', 'Secure Sharing'],
    theme: { id: 'pink', name: 'Pink', primary: '#ec4899', secondary: '#f43f5e', bg: 'from-pink-50 to-rose-50' },
  },
  {
    id: '7',
    title: 'StaffEase',
    subtitle: 'Staff Management',
    description:
      'Simplify staff scheduling and communication with intuitive tools for workforce management.',
    icon: User,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    features: ['Smart Scheduling', 'Staff Directory', 'Performance Reviews', 'Communication Tools'],
    theme: { id: 'slate', name: 'Slate', primary: '#64748b', secondary: '#475569', bg: 'from-slate-100 to-gray-100' },
  },
];

// 1. **SUPER SLOW SCROLL:** Increased duration to 5.0 seconds.
const ROTATION_DURATION = 5.0;

export default function explore() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(wheelItems[0].theme);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollVelocity = useRef(0);
  const lastScrollTime = useRef(Date.now());

  const ANGLE_PER_ITEM = 360 / wheelItems.length;

  // Function to handle setting the active index and rotation
  const handleNewIndex = (newIndex) => {
    setHasInteracted(true);
    const correctedIndex = (newIndex + wheelItems.length) % wheelItems.length;
    setActiveIndex(correctedIndex);
    const newRotation = correctedIndex * ANGLE_PER_ITEM;
    setRotation(newRotation);
    // Change theme to the selected item's theme
    setSelectedTheme(wheelItems[correctedIndex].theme);
  };

  // Function for click event, using the same logic as scroll
  const handleIconClick = (index) => {
    handleNewIndex(index);
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = (event) => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      // 1. **SUPER SLOW SCROLL:** Require a much longer delay between steps (1.5 seconds).
      // This is the core change for super slow scrolling *rate*.
      if (timeSinceLastScroll < 1500) {
        return;
      }

      lastScrollTime.current = now;

      let nextIndex = activeIndex;

      if (event.deltaY > 0) {
        // Scroll down (next item)
        nextIndex = (activeIndex + 1) % wheelItems.length;
      } else if (event.deltaY < 0) {
        // Scroll up (previous item)
        nextIndex = (activeIndex - 1 + wheelItems.length) % wheelItems.length;
      }

      handleNewIndex(nextIndex);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocity.current = 0;
      }, 100);
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeIndex, ANGLE_PER_ITEM]);

  const currentItem = wheelItems[activeIndex];

  return (
    <Section id="explore">
      <section
        ref={containerRef}
        className={`relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br ${selectedTheme.bg} transition-all duration-1000`}
      >
        {/* ENHANCED BACKGROUND - Light Theme Animated Gradients */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            animate={{
              x: ['-10%', '110%'],
              y: ['20%', '80%', '20%'],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: `linear-gradient(135deg, ${selectedTheme.primary}20, ${selectedTheme.secondary}10)` }}
          />

          <motion.div
            animate={{
              x: ['110%', '-10%'],
              y: ['80%', '20%', '80%'],
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5
            }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: `linear-gradient(135deg, ${selectedTheme.secondary}15, ${selectedTheme.primary}10)` }}
          />

          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* PREMIUM ANIMATED HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            {/* Floating decorative elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -left-10 w-20 h-20 rounded-full blur-2xl opacity-30"
              style={{ background: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})` }}
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-5 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20"
              style={{ background: `linear-gradient(135deg, ${selectedTheme.secondary}, ${selectedTheme.primary})` }}
            />

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="block text-gray-900"
              >
                Explore Our
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})`,
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}
              >
                Integrated Solutions
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-semibold"
            >
              Click any icon to explore and see  the solutions
            </motion.p>
          </motion.div>

          <style>{`
            @keyframes gradient-shift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `}</style>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px] md:min-h-[700px] ">
            {/* Left: Spinning Wheel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg aspect-square">
                {/* INTERACTIVE HINT */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                  <InteractiveHint
                    isVisible={!hasInteracted}
                  />
                </div>

                {/* Outer glow ring */}
                <motion.div
                  animate={{
                    rotate: 360,
                    boxShadow: [
                      '0 0 40px rgba(0, 188, 212, 0.3)',
                      '0 0 60px rgba(0, 188, 212, 0.5)',
                      '0 0 40px rgba(0, 188, 212, 0.3)',
                    ],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    boxShadow: { duration: 3, repeat: Infinity },
                  }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-300/30 pointer-events-none"
                />



                {/* Main wheel container */}
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{
                    // 1. Slow down the scrolling transition (Duration increased to 5.0)
                    rotate: { duration: ROTATION_DURATION, ease: "easeInOut" },
                  }}
                  className="relative w-full h-full"
                >
                  {/* Center circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      // Center circle made non-spinning: Remove the 'rotate: rotation' animation
                      className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-white via-blue-50 to-cyan-50 
                     border-4 border-gradient-to-r from-blue-400 to-cyan-400 shadow-2xl flex items-center justify-center"
                    >
                      <motion.img
                        src={brainwave}
                        alt="Medrox Logo"
                        className="mx-auto w-16 sm:w-10 lg:w-20"
                        initial={{ opacity: 0, rotateX: 60, rotateY: 30 }}
                        animate={{
                          opacity: 1,
                          rotateX: 0,
                          rotateY: 0,
                          y: [0, -8, 0], // floating
                          scale: [1, 1.02, 1] // subtle breathing
                        }}
                        transition={{
                          delay: 0.9,
                          duration: 1.5,
                          ease: [0.6, 0, 0.2, 1],
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      />
                    </motion.div>
                  </div>

                  {/* Wheel items */}
                  {wheelItems.map((item, idx) => {
                    const angle = (idx * 360) / wheelItems.length;
                    const radius = window.innerWidth < 768 ? 160 : 190;

                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    const IconComponent = item.icon;
                    const isActive = idx === activeIndex;

                    return (
                      <motion.div
                        key={item.id}
                        className="absolute w-24 h-24"
                        style={{
                          left: `calc(50% + ${x}px - 3rem)`,
                          top: `calc(50% + ${y}px - 3rem)`,
                        }}
                        animate={{
                          scale: isActive ? 1.2 : 0.9,
                          zIndex: isActive ? 50 : 10,
                        }}
                        transition={{ duration: 0.4 }}
                        // 2. **CLICKABLE ICONS:** Add the onClick handler
                        onClick={() => handleIconClick(idx)}
                      >
                        <motion.div
                          className={`w-full h-full rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 transition-all duration-300`}
                          style={{
                            backgroundColor: isActive ? 'white' : 'rgba(255,255,255,0.8)',
                            borderColor: isActive ? selectedTheme.primary : 'rgba(255,255,255,0.6)',
                            boxShadow: isActive ? `0 20px 40px ${selectedTheme.primary}50, 0 0 30px ${selectedTheme.primary}30` : '0 10px 20px rgba(0,0,0,0.1)'
                          }}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: `0 20px 40px ${selectedTheme.primary}40`,
                          }}
                        >
                          {/* To keep the icon upright while the wheel spins, we need to counter-rotate it. */}
                          <motion.div
                            className={`p-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                            animate={{
                              // Counter-rotate the item to keep it upright, plus the pulsing animation
                              rotate: rotation, // This counters the parent wheel's -rotation
                              scale: isActive ? 1.1 : 1,
                            }}
                            transition={{
                              // Use the same duration as the main wheel rotation for a smooth counter-spin
                              rotate: {
                                duration: ROTATION_DURATION,
                                ease: "easeInOut",
                              },
                              scale: { duration: 0.3 },
                            }}
                          >
                            <IconComponent size={32} className="text-white" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>


                {/* Floating indicators */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-blue-200/40 pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Right: Content Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -30, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-12 rounded-3xl border-8 transition-all duration-500 backdrop-blur-xl bg-white/60 shadow-2xl hover:shadow-[0_0_60px_rgba(0,0,0,0.1)]"
                  style={{
                    background: `linear-gradient(${currentItem.bgColor.replace('bg-', '')}, ${currentItem.bgColor.replace('bg-', '')}) padding-box, linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary}, ${selectedTheme.primary}) border-box`,
                    backgroundSize: '300% 300%',
                    animation: 'gradient-border-shift 4s ease infinite',
                    borderColor: 'transparent'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 50px ${selectedTheme.primary}40`
                  }}
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${currentItem.color} shadow-lg`}
                        animate={{
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <currentItem.icon size={32} className="text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
                          {currentItem.title}
                        </h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {currentItem.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {currentItem.description}
                    </p>
                  </motion.div>

                  {/* Features Grid */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  >
                    {currentItem.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + idx * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white transition-colors duration-300"
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.1,
                          }}
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span className="text-sm md:text-base font-semibold text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA Button */}

                </motion.div>
              </AnimatePresence>

              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex gap-2 justify-center"
              >
                {wheelItems.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      scale: idx === activeIndex ? 1.2 : 1,
                      backgroundColor: idx === activeIndex ? '#0891b2' : '#cbd5e1',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full cursor-pointer hover:bg-cyan-400"
                    style={{
                      width: idx === activeIndex ? '24px' : '8px',
                    }}
                    onClick={() => handleIconClick(idx)} // Clickability added to the dots
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mt-16 text-center text-gray-600 font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Scroll or **Click an Icon** to explore more integrations
          </motion.div>
        </div>

        {/* Gradient border animation CSS */}
        <style>{`
          @keyframes gradient-border-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </section>
    </Section>
  );
}