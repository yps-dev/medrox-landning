// "use client";
// import Section from "./Section";
// import Heading from "./Heading";
// import PricingList from "./PricingList";
// import ContactModal, { useModal } from "./contact";
// import { stars, smallSphere } from "../assets";

// const Pricing = () => {
//   const { isOpen, openModal, closeModal } = useModal();

//   return (
//     <Section
//       className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-20 sm:py-24"
//       id="pricing"
//     >
//       {/* Static background gradient + stars (no animation for performance) */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/15 via-emerald-100/15 to-transparent" />
//         <img
//           src={stars}
//           alt="stars"
//           className="absolute top-0 left-1/2 -translate-x-1/2 opacity-25 max-w-[800px] w-full pointer-events-none"
//         />
//       </div>

//       <div className="container relative z-10 text-center px-4 sm:px-6 lg:px-8">
//         {/* Decorative Sphere (hidden on mobile for performance) */}
//         <div className="hidden lg:flex justify-center mb-12">
//           <img
//             src={smallSphere}
//             width={160}
//             height={160}
//             alt="Sphere"
//             className="opacity-80"
//           />
//         </div>

//         {/* Heading */}
//         <div className="mb-12 sm:mb-16">
//           <Heading
//             tag="⚡ Premium Access"
//             title="Choose Your Plan — Simple. Smart. Scalable."
//           />
//         </div>

//         {/* Pricing Cards */}
//         <PricingList openModal={openModal} />
//         <ContactModal isOpen={isOpen} closeModal={closeModal} />

//         {/* CTA */}
//         <div className="mt-10 sm:mt-12">
//           <button
//             onClick={openModal}
//             className="text-sm font-semibold tracking-widest uppercase border-b border-cyan-500 hover:text-cyan-600 transition-colors"
//           >
//             See Full Details
//           </button>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default Pricing;
import { useEffect, useRef, useState } from 'react';
import Section from "./Section";

import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  Smartphone,
  Cloud,
  Lock,
} from 'lucide-react';

const features = [
  {
    id: 0,
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second response times for critical healthcare operations and dialy opperationes and tasks.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 1,
    icon: Zap, // ⚡ use a dynamic icon to symbolize automation & energy
    title: 'Fully Automated Workflows',
    description: 'From start to finish, every task is digitized and automated — streamlining operations, reducing effort, and freeing specialists to engage more deeply with patients instead of paperwork. A new era of healthcare efficiency, delivered with ease.',
    color: 'from-cyan-500 to-blue-600',
  }
  ,
  {
    id: 2,
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Full admin control with zero manual intervention — AI‑driven dashboards that deliver predictive insights and effortless oversight in real time.',
    color: 'from-purple-400 to-pink-500',
  }
  ,
  {
    id: 3,
    icon: Users,
    title: '60+ Specialists',
    description: 'Empowering a diverse network of over 60 specialists with a unified ecosystem designed for seamless collaboration, effortless communication, and coordinated care across every department.',
    color: 'from-green-400 to-emerald-500',
  }
  ,
  {
    id: 4,
    icon: Clock,
    title: '24/7 Availability',
    description: 'Always-on platform with 99.9% uptime guarantee. ',
    color: 'from-red-400 to-rose-500',
  },
  {
    id: 5,
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access your services anytime, anywhere with powerful mobile apps — from booking appointments to exploring full medical records, patients can connect, engage, and build lasting relationships with ease.',
    color: 'from-indigo-400 to-blue-500',
  }
  ,
  {
    id: 6,
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Scalable infrastructure that grows with your needs. Fully responsive design works perfectly on any device.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 7,
    icon: Shield, // or Lock, depending on which visual fits better
    title: 'Privacy & Security',
    description: 'Military‑grade encryption with HIPAA‑compliant safeguards — ensuring zero data retention, uncompromising privacy, and enterprise‑level protection across all healthcare workflows.',
    color: 'from-blue-500 to-teal-500',
  }

];

export default function FeaturesShowcase() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollPercent = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        setScrollPosition(scrollPercent);

        const activeIdx = Math.floor(scrollPercent * (features.length - 1));
        setActiveIndex(activeIdx);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="Why-Us">
      <section ref={containerRef} className="relative w-full py-20 md:py-40 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-40"
            style={{
              backgroundSize: '200% 200%',
            }}
          />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="block text-white">Discover</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                What Sets Us Apart
              </span>

            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to revolutionize healthcare management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              const isActive = idx === activeIndex || idx === activeIndex + 1;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 overflow-hidden ${isActive
                    ? 'bg-gradient-to-br from-white/20 via-white/10 to-white/5 border-cyan-400/50 shadow-2xl shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <motion.div
                    className={`relative mb-6 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? `bg-gradient-to-br ${feature.color}` : 'bg-white/10'
                      }`}
                    animate={{
                      scale: isActive ? [1, 1.05, 1] : 1,
                      rotate: isActive ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{
                      duration: isActive ? 2 : 0,
                      repeat: isActive ? Infinity : 0,
                    }}
                  >
                    <IconComponent
                      size={32}
                      className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                        }`}
                    />
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                    {feature.description}
                  </p>

                  <motion.div
                    className="flex items-center text-sm font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      x: isActive ? [0, 6, 0] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isActive ? Infinity : 0,
                    }}
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>

                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />
                </motion.div>
              );
            })}
          </div>



          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 pt-20 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: '99.9%', value: 'Uptime' },
                { label: '<500ms', value: 'Response Time' },
                { label: '256-bit', value: 'Encryption' },
                { label: '24/7', value: 'Support' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.label}
                  </p>
                  <p className="text-gray-400">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Section>
  );
}
