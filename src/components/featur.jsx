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

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PRODUCTS = [
  { title: "Medrox Core", link: "#", thumbnail: med1 },
  { title: "Smart Diagnostics", link: "#", thumbnail: med2 },
  { title: "Pharmacy Sync", link: "#", thumbnail: med3 },
  { title: "Patient Nexus", link: "#", thumbnail: med4 },
  { title: "Cloud Care", link: "#", thumbnail: med5 },
  { title: "Neural Analytics", link: "#", thumbnail: med6 },
  { title: "Quantum Health", link: "#", thumbnail: med7 },
  { title: "Global Network", link: "#", thumbnail: med8 },
  { title: "Medrox Pulse", link: "#", thumbnail: med44 },
  { title: "Owner Control", link: "#", thumbnail: med9 },
  { title: "Sales Engine", link: "#", thumbnail: med10 },
  { title: "Inventory IQ", link: "#", thumbnail: med11 },
  { title: "Prescription Flow", link: "#", thumbnail: med12 },
  { title: "Specialist Hub", link: "#", thumbnail: med13 },
  { title: "Holographic Records", link: "#", thumbnail: med14 },
  { title: "Neural Lab", link: "#", thumbnail: med15 },
  { title: "Adaptive Guard", link: "#", thumbnail: med16 },
  { title: "Precision Med", link: "#", thumbnail: med17 },
  { title: "E-Sales Pro", link: "#", thumbnail: med18 },
  { title: "Smart Inventory", link: "#", thumbnail: med19 },
  { title: "Pulse X", link: "#", thumbnail: med55 },
  { title: "Nexus Drive", link: "#", thumbnail: med66 },
  { title: "Quantum Sync", link: "#", thumbnail: med77 },
  { title: "Analytics Plus", link: "#", thumbnail: med88 },
  { title: "Next-Gen Med", link: "#", thumbnail: med99 },
];

export default function FeatureSection() {
  return <HeroParallax products={PRODUCTS} />;
}

export const HeroParallax = ({
  products
}) => {
  // Split products into rows (distribute all 25 images)
  const firstRow = products.slice(0, 9);
  const secondRow = products.slice(9, 17);
  const thirdRow = products.slice(17, 25);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.1, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-20 overflow-hidden bg-[#020617] antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
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
              "Supporting over 60+ specialists workflows",
              "Experience the future of healthcare today.",
              "Experience the future of full Pharmacy Management today.",
              "Full Owner admin control with AI-Driven Handler.",
              "All-in-one seamless pharmacy & healthcare system.",
              "Designed with care. Built for performance.",
              "Efficient. Secure. Broad. The next generation of Healthcare.",
              "More than 30+ Features in each platform.",
            ]}
          />
        </div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -30,
        scale: 1.05,
      }}
      key={product.title}
      className="group/product h-80 w-[24rem] md:h-96 md:w-[32rem] relative shrink-0 transition-transform duration-500">
      <div className="block h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src={product.thumbnail}
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-700 group-hover/product:scale-110"
          alt={product.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover/product:opacity-80 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-10 left-10 right-10 z-20">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 translate-y-4 group-hover/product:translate-y-0 opacity-0 group-hover/product:opacity-100 transition-all duration-500">
          {product.title}
        </h2>
        <div className="h-1 w-0 bg-cyan-500 group-hover/product:w-full transition-all duration-700 delay-100" />
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover/product:opacity-20 blur-xl transition-opacity duration-500" />
    </motion.div>
  );
};
