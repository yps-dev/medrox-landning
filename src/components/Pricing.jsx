"use client";
import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { motion } from "framer-motion";
import ContactModal, { useModal } from "./contact";
import { stars, smallSphere } from "../assets";

const Pricing = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-24"
      id="pricing"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/20 via-emerald-100/20 to-transparent animate-gradientShift" />
        <img
          src={stars}
          alt="stars"
          className="absolute top-0 left-1/2 -translate-x-1/2 opacity-30 w-[1000px] pointer-events-none"
        />
      </div>



      <div className="container relative z-10 text-center">
        {/* Animated Sphere */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex justify-center mb-16"
        >
          <img
            src={smallSphere}
            width={200}
            height={200}
            alt="Sphere"
            className="opacity-80 animate-float"
          />
        </motion.div>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <Heading
            tag="⚡ Premium Access"
            title="Choose Your Plan — Simple. Smart. Scalable."
          />

        </motion.div>

        {/* Pricing Cards */}
        <PricingList openModal={openModal} />
        <ContactModal isOpen={isOpen} closeModal={closeModal} />

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <a
            onClick={openModal}
            className="inline-block text-sm font-semibold tracking-widest uppercase border-b border-cyan-500 hover:text-cyan-600 transition cursor-pointer"
          >
            See Full Details
          </a>
        </motion.div>
        <ContactModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </Section>
  );
};

export default Pricing;
