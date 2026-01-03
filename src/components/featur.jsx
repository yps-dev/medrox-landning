"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import RotatingText from "./text";

import med1 from "../assets/med1.png"
import med2 from "../assets/med2.png"
import med3 from "../assets/med3.png"
import med4 from "../assets/med4.png"
import med5 from "../assets/med5.png"
import med6 from "../assets/med6.png"
import med7 from "../assets/med7.png"
import med8 from "../assets/med8.png"
import med44 from "../assets/med44.png"
import med9 from "../assets/med9.png"
import med10 from "../assets/med10.png"
import med11 from "../assets/med11.png"
import med12 from "../assets/med12.png"
import med13 from "../assets/med13.png"
import med14 from "../assets/over.png"
import med15 from "../assets/adg.png"
import med16 from "../assets/adi.png"
import med17 from "../assets/pres.png"
import med18 from "../assets/sale.png"
import med19 from "../assets/inv.png"
import med55 from "../assets/med55.png"
import med66 from "../assets/med66.png"
import med77 from "../assets/med77.png"
import med88 from "../assets/med88.png"
import med99 from "../assets/med99.png"

// --- MARQUEE COMPONENT ---
const Marquee = ({ items, direction = "left", speed = "normal" }) => {
  const scrollClass = direction === "left" ? "animate-scroll" : "animate-scroll-reverse";

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="flex w-full overflow-hidden select-none mask-linear-fade">
      <div className={`flex flex-shrink-0 gap-4 md:gap-8 py-4 ${scrollClass} will-change-transform`}>
        {duplicatedItems.map((product, idx) => (
          <ProductCard product={product} key={`${product.title}-${idx}`} />
        ))}
      </div>
    </div>
  );
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PRODUCTS = [
  { title: "Medrox Core Platform", link: "#", thumbnail: med1 },
  { title: "Smart Diagnostic Assistant", link: "#", thumbnail: med2 },
  { title: "Integrated Pharmacy Management", link: "#", thumbnail: med3 },
  { title: "Unified Patient Records", link: "#", thumbnail: med4 },
  { title: "Cloud-Based Care Access", link: "#", thumbnail: med5 },
  { title: "Clinical & Business Analytics", link: "#", thumbnail: med6 },
  { title: "Hospital & Clinic Operations", link: "#", thumbnail: med7 },
  { title: "Multi-Branch & Network Support", link: "#", thumbnail: med8 },
  { title: "Medrox Pulse Dashboard", link: "#", thumbnail: med44 },
  { title: "Owner & Admin Control Center", link: "#", thumbnail: med9 },
  { title: "Billing & Revenue Tools", link: "#", thumbnail: med10 },
  { title: "Smart Stock & Inventory", link: "#", thumbnail: med11 },
  { title: "End-to-End Prescription Flow", link: "#", thumbnail: med12 },
  { title: "60+ specilait  workflow ", link: "#", thumbnail: med13 },
  { title: "360° Patient Record View", link: "#", thumbnail: med14 },
  { title: "Lab & Diagnostics Management", link: "#", thumbnail: med15 },
  { title: "Security & Access Control", link: "#", thumbnail: med16 },
  { title: "Treatment & Follow-Up Tools", link: "#", thumbnail: med17 },
  { title: "Point-of-Sale & Invoicing", link: "#", thumbnail: med18 },
  { title: "Advanced Inventory Tracking", link: "#", thumbnail: med19 },
  { title: "Executive Overview Dashboard", link: "#", thumbnail: med55 },
  { title: "patinet Data & Document Storage", link: "#", thumbnail: med66 },
  { title: "Real-Time Data Sync", link: "#", thumbnail: med77 },
  { title: "Advanced Reports & KPIs", link: "#", thumbnail: med88 },
  { title: "Next-Generation Healthcare Suite", link: "#", thumbnail: med99 },

];

export default function FeatureSection() {
  return <HeroParallax products={PRODUCTS} />;
}

const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 8);
  const secondRow = products.slice(8, 16);
  const thirdRow = products.slice(16, 24);

  return (
    <div className="relative w-full py-20 bg-[#020617] antialiased overflow-hidden flex flex-col gap-16">
      <Header />

      <div className="flex flex-col gap-12 -rotate-[2deg] scale-105 origin-center">
        <Marquee items={firstRow} direction="left" />
        <Marquee items={secondRow} direction="right" />
        <Marquee items={thirdRow} direction="left" />
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-6xl font-black text-white leading-none tracking-tighter mb-6">
          The Ultimate <br />
          <span className="bg-gradient-to-r  mt-1 from-cyan-400 via-blue-500 to-teal-500 bg-clip-text text-transparent">
            MEDROX ECOSYSTEM
          </span>
        </h1>

        <div className="text-base md:text-2xl mt-8 text-neutral-400 min-h-[100px] font-medium leading-relaxed">
          <RotatingText
            texts={[
              "Supporting 60+ specialist workflows in one unified platform, from analyzing to decision making and Full diagnostics.",


              "Experience the future of connected healthcare today with real-time appointments, records, and medication control.",


              "Experience the future of full pharmacy management today with end‑to‑end stock, prescriptions, and sales in one place.",


              "Full owner and admin control with an AI‑driven command center for staff, branches, and daily operations.",


              "All‑in‑one, seamless system for clinics, hospitals, and pharmacies—built to connect every sector of care.",


              "Designed with care. Built for real‑world performance in busy hospitals, clinics, and pharmacies.",


              "Efficient, secure, and scalable — the next generation of healthcare for single sites and growing networks.",


              "30+ powerful features in every Medrox platform, from smart diagnostics to full pharmacy and operations control.",
            ]}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div
      className="group/product h-36 w-[14rem] md:h-72 md:w-[28rem] relative shrink-0 transform-gpu"
    >
      <div className="relative block h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#020617] md:bg-n-8/40 md:backdrop-blur-sm">
        <img
          src={product.thumbnail}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-3xl transition-transform duration-700 group-hover/product:scale-110"
          alt={product.title}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover/product:opacity-80 transition-opacity duration-500" />
      </div>


      <div className="absolute bottom-6 left-6 right-6 z-20">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 translate-y-4 group-hover/product:translate-y-0 opacity-0 group-hover/product:opacity-100 transition-all duration-500">
          {product.title}
        </h2>
        <div className="h-1 w-0 bg-cyan-500 group-hover/product:w-full transition-all duration-700 delay-100" />
      </div>

      {/* Decorative glow - Desktop Only */}
      <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover/product:opacity-20 blur-xl transition-opacity duration-500" />
    </div>
  );
};
