"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { Ho, Hr, H1, Hq } from "../assets";

const slides = [
    {
        img: Ho,
        title: "Smarter Healthcare, Powered by Advanced Diagnostic Tools & AI",
        desc: "Medrox leverages artificial intelligence to streamline diagnosis and patient care.",
    },
    {
        img: Hr,
        title: "Connected Health Sectors, Empowered Patients",
        desc: "Bringing Health Sectors and patients together with seamless technology.",
    },
    {
        img: H1,
        title: "Real-time Appointments, Records & Medicine Control",
        desc: "Manage prescriptions, staff, and inventory—all from one powerful dashboard.",
    },
    {
        img: Hq,
        title: "So Join Us Today!",
        desc: "And let's impact the world.",
    },
];

const Carousel = () => {
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: { perView: 1 },
        mode: "snap",
        renderMode: "performance",
        dragSpeed: 1.2, // Increased for smoother drag
        defaultAnimation: {
            duration: 600, // Faster transitions
            easing: (t) => 1 - Math.pow(1 - t, 3) // Smooth cubic easing
        },
        // Performance optimizations
        rubberband: false, // Disable rubberband for better performance
        vertical: false,
    });

    // Auto scroll with tab visibility check
    useEffect(() => {
        let interval;
        const startAutoScroll = () => {
            interval = setInterval(() => {
                if (document.hidden) return;
                instanceRef.current?.next();
            }, 5000);
        };
        startAutoScroll();
        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <div
            ref={sliderRef}
            className="keen-slider mb-10 rounded-3xl overflow-hidden shadow-xl border-8 border-cyan-700 transition-all duration-500 hover:border-transparent" // Removed expensive hover shadow and reduced base shadow
            style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #06b6d4, #14b8a6, #0ea5e9, #06b6d4) border-box',
                backgroundSize: '300% 300%',
                animation: 'gradient-border-shift 4s ease infinite',
                transform: 'translateZ(0)', // GPU acceleration
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: 1000
            }}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="keen-slider__slide relative h-[400px] md:h-[550px] w-full"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    {/* Optimized Image */}
                    <img
                        src={slide.img}
                        alt={slide.title}
                        className="object-cover w-full h-full"
                        style={{
                            backfaceVisibility: 'hidden',
                        }}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchpriority={index === 0 ? "high" : "low"}
                    />

                    {/* Overlay - Removed Blur for Performance */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white p-4 sm:p-6">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 drop-shadow-md">
                            {slide.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-cyan-100 max-w-[90%] font-medium">
                            {slide.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Add gradient border animation
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient-border-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);
}

export default Carousel;
