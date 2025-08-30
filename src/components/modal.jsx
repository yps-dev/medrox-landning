
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useEffect, useState, useRef } from "react";
import { Client, Databases, ID } from "appwrite";

export default function SignupModal({ show, onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Any");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const canvasRef = useRef(null);

    // Appwrite setup
    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("66bc6d46003466fad5b9");
    const databases = new Databases(client);
    const databaseId = "67a081e10018a7e7ec5a";
    const collectionId = "user_specality";

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
            color: `hsl(180, 20 %, 60 %)`, // Grayscale with teal tint
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

        try {
            await databases.createDocument(databaseId, collectionId, ID.unique(), {
                name,
                email,
                role,
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setName("");
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
        { value: "Pharmacy", label: "pharmacy", icon: "💊" },
        { value: "Any", label: "Any", icon: "✨" },
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
                className="relative bg-gradient-to-br from-black/90 via-gray-900/80 to-black/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 max-w-lg w-full mx-4 shadow-2xl border border-teal-500/30"
                initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotateX: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-teal-500/30 via-teal-500/20 to-teal-500/30 animate-glow-pulse pointer-events-none" />
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
                            <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[Inter] tracking-tight">
                                Thank You for Joining!
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 font-[Inter]">
                                We’ll keep you updated—Medrox is launching soon!
                            </p>
                            <motion.div
                                className="w-20 h-20 mx-auto mb-6"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <svg viewBox="0 0 24 24" className="w-full h-full fill-teal-500">
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
                            <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-white font-[Inter] tracking-tight">
                                Join the Medrox Revolution
                            </h2>
                            <p className="text-lg text-gray-300 text-center mb-8 font-[Inter]">
                                Be the first to experience Medrox’s cutting-edge healthcare platform!
                            </p>
                            <form onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="relative mb-6 w-full max-w-xl mx-auto">
                                    <motion.label
                                        htmlFor="name"
                                        className="text-sm font-bold text-white mb-2 block font-[Inter]"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        Your Name
                                    </motion.label>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="flex items-center border border-teal-500/30 rounded-xl bg-black/30 backdrop-blur-md px-4 py-3 focus-within:ring-4 focus-within:ring-teal-500/50 transition-all duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4a4 4 0 100 8 4 4 0 000-8zm-7 8c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.24-.82-4.29-2.17-5.86"
                                            />
                                        </svg>
                                        <motion.input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full text-lg text-white bg-transparent placeholder:text-gray-400 outline-none font-[Inter] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-0"
                                            aria-label="Name input"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="absolute inset-0 rounded-xl z-[-1] pointer-events-none bg-gradient-to-r from-teal-500/10 via-black/10 to-teal-500/10"
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                                {/* Email Input */}
                                <div className="relative mb-6 w-full max-w-xl mx-auto">
                                    <motion.label
                                        htmlFor="contact"
                                        className="text-sm font-bold text-white mb-2 block font-[Inter]"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.4 }}
                                    >
                                        Email or Phone
                                    </motion.label>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="flex items-center border border-teal-500/30 rounded-xl bg-black/30 backdrop-blur-md px-4 py-3 focus-within:ring-4 focus-within:ring-teal-500/50 transition-all duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 12a4 4 0 01-8 0m8 0v2m0-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-8-4V12m0 0H6a2 2 0 00-2 2v2a2 2 0 002 2h2"
                                            />
                                        </svg>
                                        <motion.input
                                            id="contact"
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email or phone number"
                                            className="w-full text-lg text-white bg-transparent placeholder:text-gray-400 outline-none font-[Inter] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-0"
                                            aria-label="Contact input"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="absolute inset-0 rounded-xl z-[-1] pointer-events-none bg-gradient-to-r from-teal-500/10 via-black/10 to-teal-500/10"
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                                {/* Role Selector */}
                                <div className="relative mb-8 w-full max-w-xl mx-auto">
                                    <motion.label
                                        htmlFor="role"
                                        className="text-sm font-bold text-white mb-2 block font-[Inter]"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.4 }}
                                    >
                                        Your Role
                                    </motion.label>
                                    <motion.div
                                        className="relative"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                            className="flex items-center justify-between w-full border border-teal-500/30 rounded-xl bg-black/30 backdrop-blur-md px-4 py-3 text-lg text-white font-[Inter]"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <span className="flex items-center">
                                                <span className="mr-3 text-teal-500">
                                                    {roles.find((r) => r.value === role)?.icon}
                                                </span>
                                                {roles.find((r) => r.value === role)?.label}
                                            </span>
                                            <svg
                                                className="w-5 h-5 text-teal-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.button>
                                        <AnimatePresence>
                                            {isRoleDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute z-10 w-full mt-2 bg-black/95 backdrop-blur-md rounded-xl shadow-lg border border-teal-500/30"
                                                >
                                                    {roles.map((r) => (
                                                        <motion.button
                                                            key={r.value}
                                                            type="button"
                                                            onClick={() => {
                                                                setRole(r.value);
                                                                setIsRoleDropdownOpen(false);
                                                            }}
                                                            className={`flex items - center w - full px - 4 py - 3 text - lg text - white font - [Inter] hover: bg - gray - 800 / 50 transition - all duration - 200 ${role === r.value ? "bg-gray-800/50 border-l-2 border-teal-500" : ""
                                                                } `}
                                                            whileHover={{ x: 5 }}
                                                            transition={{ type: "spring", stiffness: 400 }}
                                                        >
                                                            <span className="mr-3 text-teal-500">{r.icon}</span>
                                                            {r.label}
                                                        </motion.button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
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
                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative w-full py-4 rounded-xl bg-gradient-to-r from-black to-teal-600 text-white text-lg font-semibold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 206, 209, 0.7)" }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? "Joining..." : "Join the Future"}
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-black/30"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-4 block mx-auto text-sm text-gray-300 hover:text-teal-500 hover:underline font-[Inter]"
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
    .animate - glow - pulse {
    animation: glow - pulse 2.5s ease -in -out infinite;
}

@keyframes glow - pulse {
    0 %, 100 % {
        box- shadow: 0 0 15px rgba(0, 206, 209, 0.3), 0 0 30px rgba(0, 206, 209, 0.2);
}
50 % {
    box- shadow: 0 0 25px rgba(0, 206, 209, 0.5), 0 0 50px rgba(0, 206, 209, 0.4);
          }
        }

@media(max - width: 640px) {
          .max - w - lg {
        max - width: 90vw;
    }
          .text - 3xl {
        font - size: 1.75rem;
    }
          .text - lg {
        font - size: 1rem;
    }
          .p - 10 {
        padding: 1.5rem;
    }
}
@media(min - width: 641px) and(max - width: 1024px) {
          .max - w - lg {
        max - width: 80vw;
    }
}
`}</style>
        </motion.div>
    );
}
