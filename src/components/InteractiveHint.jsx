import { motion } from "framer-motion";
import { Hand } from "lucide-react";

const InteractiveHint = ({ isVisible }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
            className="absolute z-50 pointer-events-none flex flex-col items-center justify-center"
        >
            <motion.div
                animate={{
                    y: [0, 12, 0],
                    scale: [1, 0.85, 1],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                {/* Palm Icon with Glow */}
                <Hand
                    className="w-14 h-14 md:w-16 md:h-16 text-cyan-400 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                    strokeWidth={1.5}
                />

                {/* Tapping Pulse Effect */}
                <motion.div
                    animate={{
                        scale: [0.8, 2],
                        opacity: [0.6, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                    className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-400/40 rounded-full blur-md"
                />
            </motion.div>
        </motion.div>
    );
};

export default InteractiveHint;
