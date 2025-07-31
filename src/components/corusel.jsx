"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Ho, Hr, H1, Hq } from "../assets";

const slides = [
    {
        img: Ho,
        title: "Smarter Healthcare, Powered by advance diagnostic tools and AI",
        desc: "Medrox leverages artificial intelligence to streamline diagnosis and patient care.",
    },
    {
        img: Hr,
        title: "Connected Health secters, Empowered Patients",
        desc: "Bringing Health Secters and patients together with seamless technology.",
    },
    {
        img: H1,
        title: "Real-time  Appointments ,Records & Medicine Control",
        desc: "Manage prescriptions, staff, and inventory—all from one powerful dashboard.",
    },
    {
        img: Hq,
        title: "So Join Us Today!",
        desc: "and let's impact the world.",
    },
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: { perView: 1 },
        mode: "snap",
        spacing: 10,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

    // Auto scroll
    useEffect(() => {
        const interval = setInterval(() => {
            if (instanceRef.current) {
                instanceRef.current.next();
            }
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <div
            ref={sliderRef}
            className="keen-slider mb-10 rounded-3xl overflow-hidden shadow-xl border border-teal-200"
        >
            <AnimatePresence initial={false} mode="wait">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="keen-slider__slide relative h-[400px] md:h-[550px]"
                    >
                        <motion.img
                            key={`img-${index}`}
                            src={slide.img}
                            alt={slide.title}
                            className="object-cover w-full h-full"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 1, 0.5, 1], // Smoother cubic-bezier
                            }}

                        />
                        {index === currentSlide && (
                            <motion.div
                                key={`content-${index}`}
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 backdrop-blur-md"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.7, delay: 2 }}
                            >
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-teal-300 drop-shadow">
                                    {slide.title}
                                </h3>
                                <p className="text-sm md:text-base text-cyan-100">{slide.desc}</p>
                            </motion.div>
                        )}
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
