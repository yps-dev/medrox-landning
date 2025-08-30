"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Replace with your assets
import med1 from "../assets/med1.png";
import med2 from "../assets/med2.png";
import med3 from "../assets/med3.png";
import med4 from "../assets/med4.png";
import med5 from "../assets/med5.png";
import med6 from "../assets/med6.png";
import med7 from "../assets/med7.png";
import med8 from "../assets/med8.png";
import med9 from "../assets/med9.png";
import med10 from "../assets/med10.png";
import med11 from "../assets/med11.png";
import med12 from "../assets/med12.png";
import med13 from "../assets/med13.png";



import med14 from "../assets/over.png";
import med15 from "../assets/adg.png";
import med16 from "../assets/adi.png";
import med17 from "../assets/pres.png";
import med18 from "../assets/sale.png";
import med19 from "../assets/inv.png";

const slides = [
  { type: "image", src: med2 },
  { type: "image", src: med10 },
  { type: "text", title: "Impressed?", subtitle: "Experience the future of healthcare today." },
  { type: "image", src: med3 },
  { type: "image", src: med4 },

  { type: "text", title: "Phrmacy?", subtitle: "Experience the future of full Phrmacy Mangment today." },
  { type: "image", src: med14 },
  { type: "image", src: med17 },
  { type: "image", src: med18 },
  { type: "image", src: med19 },
  { type: "text", title: "Admin Control?", subtitle: "Full Owner admin control with out Optimus Ai Driven Handler." },
  { type: "image", src: med15 },
  { type: "image", src: med16 },

  { type: "image", src: med8 },
  { type: "text", title: "30+ Features.", subtitle: "All-in-one seamless pharmacy & healthcare system." },
  { type: "image", src: med13 },
  { type: "image", src: med5 },
  { type: "image", src: med6 },
  { type: "image", src: med1 },
  { type: "image", src: med7 },
  { type: "text", title: "Professionally Built.", subtitle: "Designed with care. Built for performance." },
  { type: "image", src: med11 },
];

export default function UltraHeroSwitcher() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // autoplay every 6s
  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section
      aria-label="Ultra Medical Showcase"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <AnimatePresence>
        {slides.map(
          (slide, i) =>
            i === index && (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt={`Slide ${i}`}
                    className="
                      w-full h-full
                      object-contain sm:object-cover
                      transition-all duration-700 ease-in-out
                      "
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900/70 via-slate-900/60 to-black/70 text-center px-6">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                      {slide.title}
                    </h2>
                    <p className="mt-4 text-lg sm:text-2xl text-white/90 max-w-2xl">
                      {slide.subtitle}
                    </p>
                    <button
                      onClick={() => (window.location.href = "#join")}
                      className="mt-6 px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-400 transition-all duration-300 shadow-lg"
                    >
                      Join Now
                    </button>
                  </div>
                )}

                {/* Overlay gradient for better text visibility */}
                {slide.type === "image" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                )}
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-cyan-400 scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 sm:p-3 hover:bg-black/60 transition-all z-20"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 sm:p-3 hover:bg-black/60 transition-all z-20"
      >
        ›
      </button>
    </section>
  );
}
