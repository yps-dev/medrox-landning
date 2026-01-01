import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { brainwave } from "../assets";

const Preloader = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setProgress(100);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    {/* Futuristic Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]"
                        />
                    </div>

                    <div className="relative flex flex-col items-center">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative mb-12"
                        >
                            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                                <img src={brainwave} alt="Medrox" className="w-full h-auto" />
                            </div>

                            {/* Spinning Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-20px] rounded-full border border-dashed border-cyan-500/30"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] rounded-full border border-dotted border-white/10"
                            />
                        </motion.div>

                        {/* Progress Text */}
                        <div className="text-center">
                            <motion.h2
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-white font-mono text-sm tracking-[0.3em] uppercase mb-4"
                            >
                                Initializing Neural Core
                            </motion.h2>

                            {/* Progress Bar Container */}
                            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-blue-400"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {/* Progress Percentage */}
                            <motion.span
                                className="block mt-4 text-cyan-500 font-mono text-xs opacity-60"
                            >
                                {Math.round(progress)}% SYNCED
                            </motion.span>
                        </div>
                    </div>

                    {/* Scrolling Data Lines (Visual Detail) */}
                    <div className="absolute bottom-10 left-10 hidden md:block opacity-20">
                        <div className="font-mono text-[10px] text-cyan-400 space-y-1">
                            <div>{">"} ENCRYPT_LAYER: SECURED</div>
                            <div>{">"} NEURAL_LINK: ESTABLISHED</div>
                            <div>{">"} SYSTEM_INTEGRITY: 100%</div>
                            <div>{">"} DOCTOR_SYNC: READY</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
