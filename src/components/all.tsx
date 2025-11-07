import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useModal } from './contact';
import ContactModal from './contact';
import { brainwave } from '../assets';
import {
    Building,
    Stethoscope,
    Brain,
    Ambulance,
    Pill,
    Syringe,
    Cross,
} from 'lucide-react';
import { PersonSimpleRun, Hand } from 'phosphor-react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

// Create a wrapper so Tooth behaves like a React component
const Tooth = (props) => <FontAwesomeIcon icon={faTooth} {...props} />;

const services = [
    {
        id: 'hosp', name: 'Hospitals', icon: Building,
        gradient: 'bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent',
        iconColor: 'text-red-400', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.7)]'
    },
    {
        id: 'clin', name: 'Clinics', icon: Stethoscope,
        gradient: 'bg-gradient-to-br from-cyan-600/20 via-blue-500/10 to-transparent',
        iconColor: 'text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.7)]'
    },
    {
        id: 'dent', name: 'Dental Care', icon: Tooth,
        gradient: 'bg-gradient-to-br from-cyan-600/20 via-teal-500/10 to-transparent',
        iconColor: 'text-teal-400', glow: 'shadow-[0_0_15px_rgba(20,184,166,0.7)]'
    },
    {
        id: 'derm', name: 'Dermatology', icon: Hand,
        gradient: 'bg-gradient-to-br from-white via-yellow-500/10 to-transparent',
        iconColor: 'text-yellow-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.7)]'
    },
    {
        id: 'psyc', name: 'Psychiatry', icon: Brain,
        gradient: 'bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-transparent',
        iconColor: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.7)]'
    },
    {
        id: 'physio', name: 'Physiotherapy', icon: PersonSimpleRun,
        gradient: 'bg-gradient-to-br from-green-600/20 via-green-500/10 to-transparent',
        iconColor: 'text-green-400', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.7)]'
    },
    {
        id: 'ems', name: 'Emergency Centers', icon: Ambulance,
        gradient: 'bg-gradient-to-br from-pink-700/20 via-pink-600/10 to-transparent',
        iconColor: 'text-pink-400', glow: 'shadow-[0_0_15px_rgba(219,39,119,0.7)]'
    },
    {
        id: 'pharm', name: 'Pharmacies', icon: Pill,
        gradient: 'bg-gradient-to-br from-cyan-600/20 via-cyan-500/10 to-transparent',
        iconColor: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.7)]'
    },
    {
        id: 'med', name: 'Medical Services', icon: Syringe,
        gradient: 'bg-gradient-to-br from-indigo-600/20 via-indigo-500/10 to-transparent',
        iconColor: 'text-indigo-400', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.7)]'
    },
];


const IconResolver = ({ IconComponent, className }: any) => {
    if (!IconComponent) return null;
    return <IconComponent className={className} />;
};


const AllInOneHero = ({ openInfo }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });
    // AFTER (Removing the fade and minimizing the shrink/move effects)
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 1]); // **(1, 1) keeps opacity at 1 (fully visible)**
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1]); // **(1, 1) keeps scale at 1 (no shrink)**
    const y = useTransform(scrollYProgress, [0, 1], [0, 50]); // (Optional: reduce downward movement from 200 to 50)
    const doubledServices = [...services, ...services, ...services];

    return (
        <>
            <motion.section
                ref={containerRef}
                style={{ opacity, scale }}
                className="relative h-[155vh] w-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50/30"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.04),transparent_50%)]" />

                <motion.div
                    style={{ y }}
                    className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20"
                >



                    <div className="relative flex items-center justify-center 
                  w-20 sm:w-28 lg:w-40 h-20 sm:h-28 lg:h-40 
                 backdrop-blur-md 
                ">
                        <motion.img
                            src={brainwave}
                            alt="Medrox Logo"
                            className="mx-auto w-20 sm:w-32 lg:w-60"
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

                    </div>



                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-block mb-6"
                        >
                            <span className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-200/50 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2 mr-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
                                </span>
                                <span className="text-sm font-semibold text-gray-900 tracking-wide">
                                    ULTIMATE HEALTHCARE PLATFORM
                                </span>
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6"
                        >
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                                Medrox
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 mt-2">
                                All in One
                            </span>
                        </motion.h1>

                        <AnimatedTaglines />


                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Efficient, Secure, Comprehensive — Built for Healthcare Worldwide
                        </motion.p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        onClick={openInfo}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 rounded-full shadow-xl shadow-cyan-500/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 mb-16"
                    >
                        <span className="relative z-10">Get Started Today</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }} // faster entry
                        className="w-full"
                    >
                        <div className="relative w-full overflow-hidden py-8 rounded-2xl">
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

                            <div className="flex space-x-6 marquee-animation">
                                {doubledServices.map((service, index) => (
                                    <motion.div
                                        key={`${service.id}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.2,                // faster than 0.25
                                            delay: index * 0.015,         // tighter stagger
                                            ease: "easeOut",
                                        }}
                                        whileHover={{
                                            scale: 1.07,
                                            y: -6,
                                            transition: { duration: 0.12, ease: "easeOut" }, // snappier hover
                                        }}
                                        className={`flex-shrink-0 w-48 h-48 rounded-3xl bg-gradient-to-br ${service.gradient} 
            border border-gray-200/50 shadow-lg hover:shadow-xl 
            transition-all duration-150 overflow-hidden group cursor-pointer`}
                                    >
                                        <div className="relative h-full flex flex-col items-center justify-center p-6">
                                            <motion.div
                                                className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all duration-200"
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.35 }} // faster wobble
                                            >
                                                <IconResolver
                                                    IconComponent={service.icon}
                                                    className={`text-5xl ${service.iconColor}`}
                                                />
                                            </motion.div>

                                            <h3 className="text-lg font-bold text-gray-900 text-center">
                                                {service.name}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-gray-500 mb-7">Built for all suporting 60+ specilsits and phsicians  ecosystem</p>
                        <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
                            {['30+ Features for Every Department.', '99.9% Uptime', '24/7 Support', 'HIPAA Compliant'].map(
                                (feature, i) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                                        className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
                            initial={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                                opacity: 0,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 0.5, 0],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                <style>{`
          .marquee-animation {
            animation: marquee 10s linear infinite;
          }

          .marquee-animation:hover {
            animation-play-state: paused;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-animation {
              animation: none;
            }
          }
        `}</style>
            </motion.section>

        </>
    );
}
export default AllInOneHero;









const taglines = [
    "Transforming Health",
    "Empowering Lives",
    "Transforming Health, Empowering Lives",
];

const AnimatedTaglines = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % taglines.length);
        }, 4000); // 4s per tagline cycle
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-12 flex items-center justify-center mb-7">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium max-w-3xl mx-auto"
                >
                    {taglines[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
