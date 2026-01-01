import React from 'react';
import { motion } from 'framer-motion';

export default function EnergyPool() {
    return (
        <div className="relative w-full py-32 flex flex-col items-center justify-end overflow-hidden">
            {/* 1. THE LASER BEAM (Visual Connector) */}

            {/* 2. THE ENERGY POOL (Floor Glow) */}
            <div className="absolute bottom-0 left-0 right-0 h-[300px] z-0 pointer-events-none">
                {/* Radial Haze */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen" />

                {/* Intense Core Landing Spot */}
            </div>

            {/* 3. REACTIVE DATA CORE (Replaces Button) */}
            <ReactiveCore />

            {/* 4. REFLECTION PLANE */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
        </div>
    );
}

const ReactiveCore = () => {
    return (
        <motion.div
            className="relative z-10 group cursor-default"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* GLOWING AMBIENCE */}
            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500" />

            {/* OUTER RING (Spinning) */}
            <motion.div
                className="w-24 h-24 rounded-full border border-white/10 border-t-white/50 border-r-cyan-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ borderRadius: '40%' }} // Squircle-ish
            >
                <motion.div
                    className="absolute inset-0 rounded-full border border-white/5"
                    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* INNER CORE (Pulsing) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-8 h-8 bg-white rounded-full shadow-[0_0_30px_cyan]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* DATA PARTICLES (Orbiting) */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full blur-[1px]" />
                <div className="absolute bottom-1 right-2 w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[1px]" />
            </motion.div>
        </motion.div>
    );
};
