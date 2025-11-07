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
  },
];

// 1. **SUPER SLOW SCROLL:** Increased duration to 5.0 seconds.
const ROTATION_DURATION = 5.0;

export default function explore() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const scrollVelocity = useRef(0);
  // This ref controls the throttling, ensuring a slow scroll step.
  const lastScrollTime = useRef(Date.now());

  const ANGLE_PER_ITEM = 360 / wheelItems.length;

  // Function to handle setting the active index and rotation
  const handleNewIndex = (newIndex) => {
    // 2. Click works: This function is the key and is used for both scroll and click.
    const correctedIndex = (newIndex + wheelItems.length) % wheelItems.length;
    setActiveIndex(correctedIndex);
    const newRotation = correctedIndex * ANGLE_PER_ITEM;
    setRotation(newRotation);
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
        className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white"
      >
        {/* 3. Premium Background Animation (Wave Cutting Across) */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Existing blur circles for ambience */}
          <motion.div
            animate={{
              rotate: 360,
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 15, repeat: Infinity },
            }}
            className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-cyan-200/20 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              rotate: -360,
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              rotate: { duration: 100, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 20, repeat: Infinity, delay: 3 },
            }}
            className="absolute bottom-1/4 left-20 w-96 h-96 bg-gradient-to-tl from-cyan-200/30 to-blue-200/20 rounded-full blur-3xl"
          />

          {/* New Wavy Background Animation */}
          <motion.div
            animate={{
              // Move from left to right and slightly oscillate Y position for a wave effect
              x: ['-100%', '100%'],
              y: ['-10%', '0%', '10%', '0%', '-10%'],
            }}
            transition={{
              x: { duration: 25, repeat: Infinity, ease: 'linear' },
              y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute top-1/2 left-0 w-[200%] h-32 transform -translate-y-1/2 
                           bg-gradient-to-r from-transparent via-cyan-900/70 to-transparent 
                           opacity-50 blur-xl"
          />

          <motion.div
            animate={{
              // Move from right to left and slightly oscillate Y position for a wave effect
              x: ['100%', '-100%'],
              y: ['10%', '0%', '-10%', '0%', '10%'],
            }}
            transition={{
              x: { duration: 30, repeat: Infinity, ease: 'linear', delay: 5 },
              y: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            }}
            className="absolute top-1/2 left-0 w-[200%] h-24 transform -translate-y-1/2 
                           bg-gradient-to-r from-transparent via-blue-100/80 to-transparent 
                           opacity-40 blur-lg"
          />

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="block text-gray-900">Explore Our</span>
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                Integrated Solutions
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Discover each powerful tool in our ecosystem
            </p>
          </motion.div>

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
                {/* Outer glow ring */}
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
                          className={`w-full h-full rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 ${isActive
                            ? "bg-white border-cyan-300 shadow-2xl shadow-cyan-500/50"
                            : "bg-white/80 border-white/60 hover:border-cyan-200"
                            } transition-all duration-300`}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0 20px 40px rgba(0, 188, 212, 0.3)",
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
                  className={`p-8 md:p-12 rounded-3xl ${currentItem.bgColor} border-2 border-white/60 shadow-xl`}
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
      </section>
    </Section>
  );
}