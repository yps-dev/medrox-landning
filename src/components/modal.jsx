"use client";
import { motion, AnimatePresence } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useEffect, useState, useRef } from "react";
import { Client, Databases, ID } from "appwrite";
import { User, Mail, ChevronDown, Check, X } from "lucide-react"; // Import new icons

// --- [NEW] Animated Avatar Component ---
// This creates a unique, animated avatar based on the user's name
const AnimatedAvatar = ({ name }) => {
    const getHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    const HSLtoRGB = (h, s, l) => {
        s /= 100;
        l /= 100;
        const k = (n) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n) =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
    };

    const hash = getHash(name || "Medrox");
    const [r1, g1, b1] = HSLtoRGB(hash % 360, 70, 60);
    const [r2, g2, b2] = HSLtoRGB((hash + 72) % 360, 80, 50);

    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <motion.div
            className="w-28 h-28 rounded-full p-1 border-2 border-teal-500/50 shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
            <div className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center">
                <motion.svg
                    className="absolute inset-0 w-full h-full"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <motion.stop
                                offset="0%"
                                stopColor={`rgb(${r1},${g1},${b1})`}
                                animate={{ stopColor: [`rgb(${r1},${g1},${b1})`, `rgb(${r2},${g2},${b2})`, `rgb(${r1},${g1},${b1})`] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.stop
                                offset="100%"
                                stopColor={`rgb(${r2},${g2},${b2})`}
                                animate={{ stopColor: [`rgb(${r2},${g2},${b2})`, `rgb(${r1},${g1},${b1})`, `rgb(${r2},${g2},${b2})`] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#avatarGradient)" />
                </motion.svg>
                <span className="relative z-10 text-4xl font-bold text-white tracking-tighter">
                    {initials}
                </span>
            </div>
        </motion.div>
    );
};
// --- [END] Animated Avatar Component ---


export default function SignupModal({ show, onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(""); // Set to empty string
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const canvasRef = useRef(null);

    // --- [NEW] Validation State ---
    const [errors, setErrors] = useState({});

    // Appwrite setup (unchanged)
    const client = new Client()
        .setEndpoint("https://appwrite.medroxhealth.com/v1")
        .setProject("68e57fd20024a99d08a4");
    const databases = new Databases(client);
    const databaseId = "67a081e10018a7e7ec5a";
    const collectionId = "user_specality";

    // Scroll lock (unchanged)
    useEffect(() => {
        if (show) disablePageScroll();
        else enablePageScroll();
        return () => enablePageScroll();
    }, [show]);

    // Success animation (unchanged)
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
            color: `hsl(180, 20 %, 60 %)`,
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

    // --- [NEW] Enterprise Validation Logic ---
    const validateInput = (id, value) => {
        let newErrors = { ...errors };
        if (id === 'name') {
            if (!value) {
                newErrors.name = 'Name is required.';
            } else {
                delete newErrors.name;
            }
        }
        if (id === 'email') {
            if (!value) {
                newErrors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                newErrors.email = 'Email address is invalid.';
            } else {
                delete newErrors.email;
            }
        }
        if (id === 'role') {
            if (!value) {
                newErrors.role = 'Please select a role.';
            } else {
                delete newErrors.role;
            }
        }
        setErrors(newErrors);
    };

    const handleBlur = (e) => {
        validateInput(e.target.id, e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required.';
        if (!email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid.';
        if (!role) newErrors.role = 'Please select a role.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- [UPDATED] Handle form submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Run validation first
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await databases.createDocument(databaseId, collectionId, ID.unique(), {
                name,
                email,
                role,
            });
            // Don't clear state here, we need it for the success screen
            setSuccess(true);
            // Remove the auto-close timer
        } catch (err) {
            setError("Failed to join waitlist. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- [NEW] Logic to close modal and reset all state ---
    const handleCloseAndReset = () => {
        onClose(); // From props
        setTimeout(() => { // Delay reset to allow exit animation
            setSuccess(false);
            setName("");
            setEmail("");
            setRole("");
            setErrors({});
        }, 500);
    };

    // Custom selector options with icons
    const roles = [
        { value: "Specialist", label: "Specialist", icon: "🩺" },
        { value: "Owner", label: "Owner", icon: "🏢" },
        { value: "Staff", label: "Staff", icon: "👩‍⚕️" },
        { value: "Pharmacy", label: "Pharmacy", icon: "💊" },
        { value: "Any", label: "Any", icon: "✨" },
    ];

    if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md" // Increased blur
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

                {/* Close Button (Moved outside AnimatePresence) */}
                <motion.button
                    onClick={handleCloseAndReset}
                    className="absolute top-4 right-4 text-gray-500 hover:text-teal-400 transition-colors z-20"
                    aria-label="Close modal"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X size={24} />
                </motion.button>

                <AnimatePresence mode="wait">
                    {success ? (
                        // --- [ULTRA] NEW CONFIRMATION SCREEN ---
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-center flex flex-col items-center"
                        >
                            <AnimatedAvatar name={name} />

                            <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-2 font-[Inter] tracking-tight">
                                Welcome, {name.split(' ')[0]}!
                            </h2>

                            <p className="text-lg text-gray-300 mb-6 font-[Inter]">
                                Your registration is confirmed. We're excited to have you.
                            </p>

                            <div className="w-full text-left bg-black/30 p-4 rounded-lg border border-teal-500/30 mb-6">
                                <div className="flex items-center mb-2">
                                    <User size={16} className="text-teal-400 mr-3" />
                                    <span className="text-gray-400 text-sm">Name:</span>
                                    <span className="text-white text-sm font-medium ml-auto">{name}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Mail size={16} className="text-teal-400 mr-3" />
                                    <span className="text-gray-400 text-sm">Email:</span>
                                    <span className="text-white text-sm font-medium ml-auto">{email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Check size={16} className="text-teal-400 mr-3" />
                                    <span className="text-gray-400 text-sm">Role:</span>
                                    <span className="text-white text-sm font-medium ml-auto">{role}</span>
                                </div>
                            </div>

                            <motion.button
                                onClick={handleCloseAndReset}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-lg font-semibold shadow-xl"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 206, 209, 0.7)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                Done
                            </motion.button>
                        </motion.div>
                    ) : (
                        // --- [UPDATED] FORM WITH VALIDATION ---
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
                                <div className="relative mb-4 w-full max-w-xl mx-auto">
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
                                        className={`flex items-center border rounded-xl bg-black/30 backdrop-blur-md px-4 py-3 focus-within:ring-4 transition-all duration-300 ${errors.name ? 'border-red-500/50 focus-within:ring-red-500/50' : 'border-teal-500/30 focus-within:ring-teal-500/50'
                                            }`}
                                    >
                                        <User className={`w-6 h-6 mr-3 flex-shrink-0 ${errors.name ? 'text-red-400' : 'text-teal-500'}`} />
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            onBlur={handleBlur}
                                            placeholder="Enter your name"
                                            className="w-full text-lg text-white bg-transparent placeholder:text-gray-400 outline-none font-[Inter] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-0"
                                            aria-label="Name input"
                                            aria-invalid={!!errors.name}
                                        />
                                    </motion.div>
                                    <AnimatePresence>
                                        {errors.name && (
                                            <motion.p
                                                className="text-red-400 text-xs mt-1 font-medium"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Email Input */}
                                <div className="relative mb-4 w-full max-w-xl mx-auto">
                                    <motion.label
                                        htmlFor="email"
                                        className="text-sm font-bold text-white mb-2 block font-[Inter]"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.4 }}
                                    >
                                        Email
                                    </motion.label>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`flex items-center border rounded-xl bg-black/30 backdrop-blur-md px-4 py-3 focus-within:ring-4 transition-all duration-300 ${errors.email ? 'border-red-500/50 focus-within:ring-red-500/50' : 'border-teal-500/30 focus-within:ring-teal-500/50'
                                            }`}
                                    >
                                        <Mail className={`w-6 h-6 mr-3 flex-shrink-0 ${errors.email ? 'text-red-400' : 'text-teal-500'}`} />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={handleBlur}
                                            placeholder="Enter your email"
                                            className="w-full text-lg text-white bg-transparent placeholder:text-gray-400 outline-none font-[Inter] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-0"
                                            aria-label="Email input"
                                            aria-invalid={!!errors.email}
                                        />
                                    </motion.div>
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                className="text-red-400 text-xs mt-1 font-medium"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Role Selector */}
                                <div className="relative mb-6 w-full max-w-xl mx-auto">
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
                                            className={`flex items-center justify-between w-full border rounded-xl bg-black/30 backdrop-blur-md px-4 py-3 text-lg font-[Inter] transition-all duration-300 ${errors.role ? 'border-red-500/50' : 'border-teal-500/30'
                                                } ${role ? 'text-white' : 'text-gray-400'}`}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <span className="flex items-center">
                                                <span className="mr-3 text-teal-500">
                                                    {roles.find((r) => r.value === role)?.icon || "🤔"}
                                                </span>
                                                {roles.find((r) => r.value === role)?.label || "Select your role"}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isRoleDropdownOpen ? 180 : 0 }}
                                            >
                                                <ChevronDown className="w-5 h-5 text-teal-500" />
                                            </motion.div>
                                        </motion.button>
                                        <AnimatePresence>
                                            {isRoleDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                                    transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
                                                    className="absolute z-10 w-full mt-2 bg-black/95 backdrop-blur-md rounded-xl shadow-lg border border-teal-500/30 overflow-hidden"
                                                >
                                                    {roles.map((r) => (
                                                        <motion.button
                                                            key={r.value}
                                                            type="button"
                                                            onClick={() => {
                                                                setRole(r.value);
                                                                validateInput('role', r.value);
                                                                setIsRoleDropdownOpen(false);
                                                            }}
                                                            className={`flex items-center w-full px-4 py-3 text-lg text-white font-[Inter] hover:bg-teal-500/20 transition-all duration-200 ${role === r.value ? "bg-teal-500/10" : ""
                                                                }`}
                                                            whileHover={{ x: 5, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
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
                                    <AnimatePresence>
                                        {errors.role && (
                                            <motion.p
                                                className="text-red-400 text-xs mt-1 font-medium"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                {errors.role}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {error && (
                                    <motion.p
                                        className="text-red-400 text-sm mb-4 font-[Inter] text-center"
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
                                    disabled={isSubmitting || Object.keys(errors).length > 0 || !name || !email || !role}
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

                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style jsx>{`
        .animate-glow-pulse {
          animation: glow-pulse 2.5s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(0, 206, 209, 0.3), 0 0 30px rgba(0, 206, 209, 0.2);
          }
          50% {
            box-shadow: 0 0 25px rgba(0, 206, 209, 0.5), 0 0 50px rgba(0, 206, 209, 0.4);
          }
        }
        
        /* Responsive fixes */
        @media (max-width: 640px) {
          .max-w-lg {
            max-width: 90vw;
          }
          .text-3xl {
            font-size: 1.75rem; /* 28px */
          }
           .text-4xl {
            font-size: 2rem; /* 32px */
          }
          .text-lg {
            font-size: 1rem; /* 16px */
          }
          .p-8 {
            padding: 1.5rem; /* 24px */
          }
          .p-10 {
            padding: 1.5rem; /* 24px */
          }
        }
      `}</style>
        </motion.div>
    );
}