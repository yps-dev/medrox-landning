"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Section from "./Section";

import { benefits } from "../constants";
import ClipPath from "../assets/svg/ClipPath";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";


export default function Benefits() {
  const containerRef = useRef(null);   // no <HTMLDivElement>
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeCard, setActiveCard] = useState(null); // no <number | null>
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollPercent = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        setScrollPosition(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="Services">
      <section ref={containerRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />

          <motion.div
            animate={{
              rotate: 360,
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 8, repeat: Infinity },
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              rotate: -360,
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 10, repeat: Infinity, delay: 2 },
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-cyan-200/30 to-blue-200/20 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-transparent rounded-full blur-3xl"
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
            <AnimatedHeading />
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mt-6">
              Purpose-built for healthcare excellence with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveCard(benefit.id)}
                onHoverEnd={() => setActiveCard(null)}
                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: activeCard === benefit.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={benefit.backgroundUrl}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300">
                      <span className="text-3xl font-bold text-cyan-300">{idx + 1}</span>
                    </div>
                  </motion.div>

                  <div>
                    <motion.h3
                      className="text-2xl md:text-3xl font-extrabold mb-3"
                      animate={{
                        y: activeCard === benefit.id ? -10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {benefit.title}
                    </motion.h3>

                    <motion.p
                      className={`text-base md:text-lg text-white/90 leading-relaxed transition-all duration-500 ${expandedCard === benefit.id
                        ? "line-clamp-none max-h-96"
                        : "line-clamp-2 max-h-16"
                        }`}
                      animate={{
                        opacity: activeCard === benefit.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {benefit.text}
                    </motion.p>

                    <motion.div
                      className="mt-4 flex items-center space-x-2 cursor-pointer text-cyan-300 hover:text-white transition-colors"
                      onClick={() =>
                        setExpandedCard(expandedCard === benefit.id ? null : benefit.id)
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeCard === benefit.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-sm font-semibold">
                        {expandedCard === benefit.id ? "Show Less" : "Learn More"}
                      </span>
                      <motion.svg
                        className="w-5 h-5"
                        animate={{
                          rotate: expandedCard === benefit.id ? 90 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </motion.svg>
                    </motion.div>

                  </div>
                </div>

                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: activeCard === benefit.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: activeCard === benefit.id ? Infinity : 0,
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-3 text-center"
          >

          </motion.div>
        </div>
      </section>
    </Section>
  );
}


const AnimatedHeading = () => {
  return (
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.25 } },
      }}
    >
      {/* First line */}
      <motion.span
        className="block text-gray-900"
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        Why Medrox
      </motion.span>

      {/* Second line with gradient shimmer */}
      <motion.span
        className="relative block bg-gradient-to-r from-slate-200 via-cyan-500 to-teal-600 bg-clip-text text-transparent"
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        Stands Apart
        {/* Shimmer overlay */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Stands Apart
        </motion.span>
      </motion.span>
    </motion.h1>
  );
}

