
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import logo from "../assets/logo.png";

// Register GSAP plugin
gsap.registerPlugin(SplitText);

// Custom hook to manage modal state
export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        console.log("Opening modal"); // Debug log
        setIsOpen(true);
    };
    const closeModal = () => {
        console.log("Closing modal"); // Debug log
        setIsOpen(false);
    };
    return { isOpen, openModal, closeModal };
};

// Contact data with professional icons
const contactDetails = [
    {
        id: "0",
        type: "Phone",
        value: "+251-149828354",
        href: "tel:+25949838254",
        icon: (
            <svg
                className="w-8 h-8 text-cyan-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        id: "1",
        type: "Email",
        value: "contact@medrox.ai",
        href: "mailto:contact@medrox.ai",
        icon: (
            <svg
                className="w-8 h-8 text-cyan-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        id: "2",
        type: "Telegram",
        value: "@MedroxAI",
        href: "https://t.me/MedroxAI",
        icon: (
            <svg
                className="w-8 h-8 text-cyan-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
        ),
    },
    {
        id: "3",
        type: "X Account",
        value: "@MedroxAI",
        href: "https://x.com/MedroxAI",
        icon: (
            <svg
                className="w-8 h-8 text-cyan-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
        ),
    },
];

const ContactModal = ({ isOpen, closeModal }) => {
    const modalRef = useRef(null);
    const canvasRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const contactRefs = useRef([]);
    const ctaButtonRef = useRef(null);

    // Particle background animation
    useEffect(() => {
        if (!canvasRef.current || !isOpen) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 206, 209, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    // GSAP animations for modal entrance and exit
    useEffect(() => {
        if (!modalRef.current || !isOpen) return;

        // Debug: Log contactRefs to ensure elements are captured
        console.log("Contact Refs:", contactRefs.current);

        const tl = gsap.timeline({
            onComplete: () => {
                // Ensure contact items are visible after animation
                contactRefs.current.forEach((el) => {
                    if (el) gsap.set(el, { opacity: 1, x: 0 });
                });
            },
        });

        const splitTitle = new SplitText(titleRef.current, { type: "words" });

        // Entrance animation
        tl.from(modalRef.current, {
            y: "-100vh",
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            .from(
                logoRef.current,
                {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                },
                "-=0.4"
            )
            .from(
                splitTitle.words,
                {
                    opacity: 0,
                    y: 20,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.3"
            )
            .from(
                contactRefs.current,
                {
                    opacity: 0,
                    x: -30,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.3"
            )
            .from(
                ctaButtonRef.current,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.2"
            );

        // Exit animation
        return () => {
            gsap.to(modalRef.current, {
                y: "-100vh",
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: "power3.in",
            });
        };
    }, [isOpen]);

    // Custom cursor effect
    useEffect(() => {
        if (!isOpen) return;

        const cursorInner = document.createElement("div");
        cursorInner.className = "fixed w-4 h-4 rounded-full bg-cyan-500/70 pointer-events-none z-50";
        const cursorOuter = document.createElement("div");
        cursorOuter.className = "fixed w-8 h-8 rounded-full border border-teal-500/50 pointer-events-none z-50";
        document.body.appendChild(cursorInner);
        document.body.appendChild(cursorOuter);

        const handleMouseMove = (e) => {
            gsap.to(cursorInner, {
                x: e.clientX - 8,
                y: e.clientY - 8,
                duration: 0.2,
                ease: "power2.out",
            });
            gsap.to(cursorOuter, {
                x: e.clientX - 16,
                y: e.clientY - 16,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        document.addEventListener("mousemove", handleMouseMove);

        const interactiveElements = modalRef.current.querySelectorAll("a, button");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                gsap.to(cursorOuter, {
                    scale: 1.5,
                    borderColor: "#00CED1",
                    duration: 0.3,
                });
                gsap.to(cursorInner, {
                    scale: 1.2,
                    backgroundColor: "#00CED1",
                    duration: 0.3,
                });
            });
            el.addEventListener("mouseleave", () => {
                gsap.to(cursorOuter, {
                    scale: 1,
                    borderColor: "rgba(0, 128, 128, 0.5)",
                    duration: 0.3,
                });
                gsap.to(cursorInner, {
                    scale: 1,
                    backgroundColor: "rgba(0, 206, 209, 0.7)",
                    duration: 0.3,
                });
            });
        });

        return () => {
            document.body.removeChild(cursorInner);
            document.body.removeChild(cursorOuter);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div
                ref={modalRef}
                className="relative bg-white/95 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl overflow-hidden"
                role="dialog"
                aria-labelledby="modal-title"
            >
                <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" />
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full p-2 z-10"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col items-center relative z-10">
                    <img
                        ref={logoRef}
                        src={logo}
                        width={80}
                        height={80}
                        alt="Medrox Logo"
                        className="mb-6"
                    />
                    <h2
                        ref={titleRef}
                        id="modal-title"
                        className="text-3xl md:text-4xl font-bold text-teal-900 mb-6 text-center"
                        style={{ textShadow: "0 0 10px rgba(0, 206, 209, 0.4)" }}
                    >
                        Join the Medrox Revolution
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 text-center">
                        Connect with us to transform healthcare with cutting-edge AI solutions.
                    </p>
                    <div className="grid grid-cols-1 gap-4 w-full">
                        {contactDetails.map((item, index) => (
                            <a
                                key={item.id}
                                href={item.href}
                                ref={(el) => {
                                    contactRefs.current[index] = el;
                                    console.log(`Contact item ${item.type} ref assigned: `, el); // Debug log
                                }}
                                className="group relative flex items-center p-4 bg-cyan-50/50 rounded-xl hover:bg-cyan-100/70 transition-all duration-300 z-10"
                                onClick={() => {
                                    console.log(`Clicked contact item: ${item.type} `); // Debug log
                                    gsap.to(contactRefs.current[index], {
                                        scale: 0.95,
                                        duration: 0.1,
                                        yoyo: true,
                                        repeat: 1,
                                    });
                                }}
                            >
                                <div className="w-8 h-8 mr-4 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300 animate-pulse-glow">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-cyan-600">{item.type}</p>
                                    <p className="text-base text-gray-600">{item.value}</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/10 to-teal-100/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        ))}
                    </div>
                    <button
                        ref={ctaButtonRef}
                        onClick={() => {
                            console.log("CTA button clicked"); // Debug log
                            window.location.href = "mailto:contact@medrox.ai";
                        }}
                        className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-400 animate-button-glow z-10"
                        aria-label="Contact us now"
                    >
                        Contact Us Now
                    </button>
                </div>
            </div>
            <style jsx>{`
    .backdrop - blur - md {
    backdrop - filter: blur(12px);
}
        .animate - pulse - glow {
    animation: pulseGlow 2s ease -in -out infinite;
}
        .animate - button - glow {
    box - shadow: 0 0 15px rgba(0, 206, 209, 0.4);
}
        .animate - button - glow: hover,
        .animate - button - glow:focus {
    box - shadow: 0 0 25px rgba(0, 206, 209, 0.6);
}
@keyframes pulseGlow {
    0 %,
        100 % {
            transform: scale(1);
            filter: drop - shadow(0 0 4px rgba(0, 206, 209, 0.3));
        }
    50 % {
        transform: scale(1.1);
        filter: drop - shadow(0 0 8px rgba(0, 206, 209, 0.5));
    }
}
/* High contrast mode */
@media(prefers - contrast: high) {
          .text - teal - 900 {
        color: #004d40;
    }
          .text - cyan - 600 {
        color: #00695c;
    }
          .bg - cyan - 600 {
        background - color: #00695c;
    }
          .bg - cyan - 700 {
        background - color: #004d40;
    }
          .bg - white {
        background - color: #ffffff;
    }
          .bg - cyan - 50 {
        background - color: #e0f7fa;
    }
}
/* Reduced motion */
@media(prefers - reduced - motion: reduce) {
          .animate - pulse - glow,
          .animate - button - glow {
        animation: none;
        transform: none;
        transition: none;
    }
}
`}</style>
        </div>
    );
};

export default ContactModal;
