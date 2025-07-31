"use client";

import { motion, AnimatePresence } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useEffect, useState, useRef } from "react";
import { Client, Databases, ID } from "appwrite";

export default function SignupModal({ show, onClose }) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Any");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const canvasRef = useRef(null);

    // Appwrite setup (replace with your credentials)
    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
        .setProject("66bc6d46003466fad5b9"); // Replace with your Appwrite Project ID
    const databases = new Databases(client);
    const databaseId = "67a081e10018a7e7ec5a"; // Replace with your Database ID
    const collectionId = "user_specality"; // Replace with your Collection ID

    // Scroll lock
    useEffect(() => {
        if (show) disablePageScroll();
        else enablePageScroll();
        return () => enablePageScroll();
    }, [show]);

    // Success animation (holographic particles)
    useEffect(() => {
        if (!success || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 150 }, () => ({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 6 + 3,
            speedX: Math.random() * 10 - 5,
            speedY: Math.random() * -12 - 6,
            color: `hsl(${Math.random() * 60 + 240}, 80%, 60%)`,
            rotation: Math.random() * 360,
        }));

        let animationFrame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.size *= 0.97;
                p.rotation += 5;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.beginPath();
                ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.restore();
            });
            if (particles.some((p) => p.size > 0.2)) {
                animationFrame = requestAnimationFrame(animate);
            }
        };
        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [success]);

    // Handle form submission with Appwrite
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            setIsSubmitting(false);
            return;
        }

        try {
            await databases.createDocument(databaseId, collectionId, ID.unique(), {
                email,
                role,

            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setEmail("");
                setRole("Any");
                onClose();
            }, 3500);
        } catch (err) {
            setError("Failed to join waitlist. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Custom selector options with icons
    const roles = [
        { value: "Specialist", label: "Specialist", icon: "🩺" },
        { value: "Owner", label: "Owner", icon: "🏢" },
        { value: "Staff", label: "Staff", icon: "👩‍⚕️" },
        { value: "Any", label: "Any", icon: "🌟" },
    ];

    if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
            <motion.div
                className="relative bg-gradient-to-br from-gray-900/90 via-teal-900/80 to-blue-900/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 max-w-lg w-full mx-4 shadow-2xl border border-teal-500/30"
                initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotateX: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-teal-500/50 via-blue-400/50 to-cyan-400/50 animate-glow-pulse pointer-events-none" />

                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-center"
                        >
                            <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[Inter]">
                                Thank You for Joining!
                            </h2>
                            <p className="text-base sm:text-lg text-gray-200 mb-6 font-[Inter]">
                                We will update you—Medrox is going to launch soon!
                            </p>
                            <motion.div
                                className="w-20 h-20 mx-auto mb-6"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <svg viewBox="0 0 24 24" className="w-full h-full fill-cyan-400">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-white font-[Inter]">
                                Join the Medrox Revolution
                            </h2>
                            <p className="text-base sm:text-lg text-gray-300 text-center mb-6 font-[Inter]">
                                Be the first to experience Medrox’s futuristic healthcare platform!
                            </p>
                            <form onSubmit={handleSubmit}>
                                {/* Custom Selector */}
                                <div className="mb-6 grid grid-cols-2 gap-2 sm:gap-4">
                                    {roles.map((r) => (
                                        <motion.button
                                            key={r.value}
                                            type="button"
                                            onClick={() => setRole(r.value)}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 font-[Inter] text-sm sm:text-base ${role === r.value
                                                ? "bg-teal-500/50 text-white border-teal-400 shadow-lg"
                                                : "bg-white/10 text-gray-300 border-gray-500/50 hover:bg-teal-500/30 hover:text-white"
                                                }`}
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                            aria-label={`Select role: ${r.label}`}
                                        >
                                            <span className="text-lg">{r.icon}</span>
                                            <span>{r.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                                {/* Animated Input */}
                                <div className="relative mb-6">
                                    <motion.input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white border ${error ? "border-red-400" : "border-gray-500/50"
                                            } focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 font-[Inter] placeholder:text-gray-400/70`}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                        aria-label="Email address"
                                        required
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400/20 to-blue-400/20 pointer-events-none"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                                {error && (
                                    <motion.p
                                        className="text-red-400 text-sm mb-4 font-[Inter]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                {/* Animated Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative w-full py-4 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.7)" }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? "Joining..." : "Join the Future"}
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-teal-500/50 to-blue-500/50"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-4 block mx-auto text-sm text-gray-300 hover:text-blue-300 hover:underline font-[Inter]"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    Cancel
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style jsx>{`
        /* Glowing Gradient Animation */
        .animate-glow-pulse {
          animation: glow-pulse 2.5s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.4), 0 0 30px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(147, 51, 234, 0.7), 0 0 50px rgba(59, 130, 246, 0.5);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .max-w-lg {
            max-width: 90vw;
          }
          .text-3xl {
            font-size: 1.75rem;
          }
          .text-base {
            font-size: 0.9rem;
          }
          .p-10 {
            padding: 1.5rem;
          }
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .max-w-lg {
            max-width: 80vw;
          }
        }
      `}</style>
        </motion.div>
    );
}