import React from 'react';
import { motion } from 'framer-motion';

const items = [
    "LATENCY: 12ms",
    "UPTIME: 99.999%",
    "ENCRYPTION: AES-256-GCM",
    "SUPPORT: 24/7",
    "GLOBAL SYNC: Real-time",
    "RESPONSE TIME: <500ms",
    "AI CORE: Stable & Adaptive",
    "VERSION: 3.1.0-RC"
];

export default function DataTicker() {
    return (
        <div className="w-full h-12 bg-black/80 border-t border-b border-white/5 backdrop-blur-md flex items-center overflow-hidden relative z-20 select-none">
            {/* GRADIENT FADES ON SIDES */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

            {/* SCROLLING TRACK */}
            <motion.div
                className="flex items-center gap-16 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30, // Slow, technical speed
                }}
            >
                {/* REPEAT CONTENT FOR SEAMLESS LOOP */}
                {[...Array(4)].map((_, i) => (
                    <React.Fragment key={i}>
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                                <span className="text-xs font-mono font-bold text-white/50 tracking-[0.2em]">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
}
