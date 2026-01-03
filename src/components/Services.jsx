import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import React from 'react';
import { service1, service2, service3, check } from "../assets";
import Carousel from "./corusel";
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Services = () => {
  const [loadedImages, setLoadedImages] = React.useState({});

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Section id="Our-Edge" className="">

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mb-24 "
      >
        {/* PREMIUM ULTRA MEDICAL BACKGROUND - REFINED LIGHT THEME */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-b from-white via-slate-50 to-cyan-50/30">
          {/* Base Mesh Layer: Smooth Cyan Flow */}
          <motion.div
            whileInView={{
              x: ['-20%', '20%', '-20%'],
              y: ['-10%', '10%', '-10%'],
            }}
            viewport={{ amount: 0 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] will-change-transform transform-gpu"
          />

          {/* High-End Medical Glows: Floating "Silk" Orbs */}
          <motion.div
            whileInView={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            viewport={{ amount: 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-tr from-cyan-100/50 via-blue-50/20 to-transparent rounded-full blur-[100px] will-change-transform transform-gpu"
          />

          <motion.div
            whileInView={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -45, 0]
            }}
            viewport={{ amount: 0 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 -right-[15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15)_0%,transparent_60%)] rounded-full blur-[120px] will-change-transform transform-gpu"
          />

          {/* Subtle Horizontal Flow Line (Ultra Medical Feel) */}
          <motion.div
            whileInView={{
              x: ['-100%', '100%'],
              opacity: [0.1, 0.2, 0.1]
            }}
            viewport={{ amount: 0 }}
            transition={{ x: { duration: 30, repeat: Infinity, ease: 'linear' }, opacity: { duration: 10, repeat: Infinity } }}
            className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-[1px] will-change-transform transform-gpu"
          />
        </div>

        {/* STUNNING ANIMATED HEADER */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 py-20"
        >
          <div className="relative">
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
              className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-2xl opacity-30"
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
              className="absolute -top-5 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-20"
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              {/* Main Title */}
              <motion.h2
                className="text-6xl md:text-8xl lg:text-8xl font-black mb-8 tracking-tighter leading-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 30, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                  className="inline-block bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite'
                  }}
                >
                  Medrox
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 30, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                  className="inline-block text-slate-900"
                >
                  Redefining
                </motion.span>
                {' '}
                <motion.span
                  initial={{ opacity: 0, y: 30, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
                  className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                >
                  Care
                </motion.span>
              </motion.h2>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mb-8 rounded-full"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto font-semibold leading-relaxed px-4"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="inline-block"
                >
                  The world's{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 font-black">first platform</span>
                  {' '}to unite diagnostics, access, and local care—
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="inline-block"
                >
                  empowering every specialist and every patient,{' '}
                  <span className="text-cyan-600 font-black">effortlessly</span>.
                </motion.span>
              </motion.p>

              {/* Floating badges */}

            </motion.div>
          </div>
        </motion.div>

        {/* Add gradient animation keyframes */}
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Carousel />
        </motion.div>

        <div className="relative">
          {/* Left Image Section - THICK ANIMATED BORDER */}
          <motion.div
            className="relative z-1 flex flex-col lg:flex-row items-center h-auto lg:h-[39rem] mb-5 p-4 lg:p-20 border-8 border-slate-300 rounded-3xl overflow-hidden xl:h-[46rem] transition-all duration-500 hover:border-transparent"

            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.4), 0 0 80px rgba(6, 182, 212, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-[20rem] mb-8 lg:mb-0 lg:absolute lg:top-0 lg:left-0 lg:max-w-4xl lg:h-full pointer-events-none lg:w-3/5 xl:w-auto overflow-hidden bg-slate-900 rounded-2xl">
              {/* Neural Placeholder */}
              {!loadedImages['service1'] && (
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900">
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]"
                  />
                </div>
              )}
              <img
                className={`w-full h-full object-cover md:object-right transition-all duration-700 transform-gpu will-change-transform ${loadedImages['service1'] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                width={800}
                alt="Smartest AI"
                height={730}
                src={service1}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                onLoad={() => handleImageLoad('service1')}
                style={{ backfaceVisibility: 'hidden' }}
              />
            </div>

            <div className="relative z-1 w-full lg:max-w-[17rem] ml-0 lg:ml-auto">
              <h4 className="text-3xl font-black mb-4 text-slate-900">Manageable</h4>
              <p className="body-2 mb-[3rem] text-slate-700 font-medium">
                Medrox unlocks the potential of Digitalized Medical system
              </p>
              <ul className="body-2">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t text-black font-medium border-n-6"
                  >
                    <img width={24} height={24} className="" src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Smart Diagnostic Tool */}
          <motion.div
            className="relative z-1 grid gap-5 lg:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="relative min-h-auto lg:min-h-[39rem] flex flex-col lg:block border-8 border-slate-300 rounded-3xl overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #06b6d4, #14b8a6, #0ea5e9) border-box'
              }}
              variants={fadeInUp}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(6, 182, 212, 0.3)',
                borderColor: 'transparent'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative lg:absolute inset-0 h-[250px] md:h-[400px] lg:h-full bg-slate-900 overflow-hidden">
                {/* Neural Placeholder */}
                {!loadedImages['service2'] && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900 via-teal-900/20 to-slate-900">
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_70%)]"
                    />
                  </div>
                )}
                <img
                  src={service2}
                  className={`h-full w-full object-cover transition-all duration-700 transform-gpu ${loadedImages['service2'] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  width={630}
                  height={750}
                  alt="robot"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  onLoad={() => handleImageLoad('service2')}
                />
              </div>
              <div className="relative lg:absolute inset-0 flex flex-col justify-end p-6 lg:p-15 bg-slate-900/95 lg:bg-transparent lg:bg-gradient-to-b from-n-8/0 to-n-8/90">

                <h4 className="text-3xl font-black mb-4 text-white">Smart Diagnostic Tool</h4>
                <p className="body-2 mb-[3rem] text-slate-200 font-medium">
                  Medrox includes a smart diagnostic assistant designed for specialists—helping support high medical decisions faster and more accurately.
                </p>
                <ul className="body-2">
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">Supports diagnosis with pre-filled patient vitals</p>
                  </li>
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">Integrated into specialist dashboard</p>
                  </li>
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">Recommends follow-up steps or referrals</p>
                  </li>
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4 font-bold text-lg text-cyan-300">The world's first AI diagnostic assistant—powering smarter decisions with precision data.</p>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Smart Staff & Medical Management - THICK ANIMATED BORDER */}
            <motion.div
              className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem] border-8 border-slate-600 transition-all duration-500"
              style={{
                background: 'linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #06b6d4, #14b8a6, #0ea5e9) border-box'
              }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(6, 182, 212, 0.3)',
                borderColor: 'transparent'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-12 px-4 xl:px-8">
                <h4 className="text-3xl font-black mb-4 text-white">Smarter Pharmacy Operations with Full Product Lifecycle Management</h4>
                <p className="body-2 mb-[2rem] text-slate-200 font-medium">
                  Manage your staff, shifts, inventory, and prescriptions all in one dashboard. Medrox empowers your healthcare team with the tools they need.
                </p>
                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${index === 2
                        ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                        : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                        }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img src={item} width={24} height={24} alt="icon" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-full h-full bg-slate-900">
                  {/* Neural Placeholder */}
                  {!loadedImages['service3'] && (
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
                      <motion.div
                        animate={{ opacity: [0.3, 0.5, 0.3], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_70%)]"
                      />
                    </div>
                  )}
                  <img
                    src={service3}
                    className={`w-full h-full object-cover transition-all duration-700 transform-gpu ${loadedImages['service3'] ? 'opacity-100' : 'opacity-0'}`}
                    width={520}
                    height={400}
                    alt="Scary robot"
                    loading="eager"
                    decoding="async"
                    onLoad={() => handleImageLoad('service3')}
                  />
                </div>
                <VideoBar />
              </motion.div>
            </motion.div>
          </motion.div>

          <Gradient />
        </div>
      </motion.div>
    </Section>
  );
};

export default Services;
