import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import { motion } from "framer-motion";
import ContactModal, { useModal } from "./contact";

const Pricing = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-teal-200 via-sky-50 to-white/80 backdrop-blur-2xl py-20"
      id="pricing"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-0 opacity-50 animate-pulse">
        <img
          src={stars}
          alt="Stars"
          className="w-[900px] h-auto pointer-events-none select-none"
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
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading
            tag="⚡ Subscribe & Elevate Your Experience"
            title="One Smart Monthly Plan for Smarter Healthcare"
          />

        </motion.div>

        {/* Pricing Card in Center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
          className="relative z-10 mt-10"
        >
          <div className="flex justify-center">
            <PricingList />
          </div>

          <LeftLine />
          <RightLine />
        </motion.div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-10"
        >
          <a
            className="text-sm font-bold font-mono tracking-widest uppercase border-b border-sky-500 hover:text-sky-700 transition"
            onClick={openModal}
          >
            See full details
          </a>
        </motion.div>
        <ContactModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </Section>
  );
};

export default Pricing;
