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
        renderMode: "performance", // Keen slider perf mode
        dragSpeed: 0.8,
        defaultAnimation: { duration: 800, easing: (t) => t }, // smoother easing
    });

    // Auto scroll with tab visibility check
    useEffect(() => {
        let interval;
        const startAutoScroll = () => {
            interval = setInterval(() => {
                if (document.hidden) return; // pause when tab not visible
                instanceRef.current?.next();
            }, 5000);
        };
        startAutoScroll();
        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <div
            ref={sliderRef}
            className="keen-slider mb-10 rounded-3xl overflow-hidden shadow-lg border border-teal-200 will-change-transform"
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="keen-slider__slide relative h-[400px] md:h-[550px] w-full"
                >
                    {/* Optimized Image */}
                    <img
                        src={slide.img}
                        alt={slide.title}
                        className="object-cover w-full h-full transition-transform duration-500 ease-out hover:scale-[1.02] will-change-transform"
                        loading="lazy"
                        decoding="async"
                        fetchpriority={index === 0 ? "high" : "low"} // first slide loads first
                    />

                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 sm:p-6 backdrop-blur-sm">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 text-teal-300 drop-shadow-sm">
                            {slide.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-cyan-100 max-w-[90%]">
                            {slide.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousel;
