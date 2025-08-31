"use client";
import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";
import ContactModal, { useModal } from "./contact";
import { stars, smallSphere } from "../assets";

const Pricing = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-20 sm:py-24"
      id="pricing"
    >
      {/* Static background gradient + stars (no animation for performance) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/15 via-emerald-100/15 to-transparent" />
        <img
          src={stars}
          alt="stars"
          className="absolute top-0 left-1/2 -translate-x-1/2 opacity-25 max-w-[800px] w-full pointer-events-none"
        />
      </div>

      <div className="container relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Decorative Sphere (hidden on mobile for performance) */}
        <div className="hidden lg:flex justify-center mb-12">
          <img
            src={smallSphere}
            width={160}
            height={160}
            alt="Sphere"
            className="opacity-80"
          />
        </div>

        {/* Heading */}
        <div className="mb-12 sm:mb-16">
          <Heading
            tag="⚡ Premium Access"
            title="Choose Your Plan — Simple. Smart. Scalable."
          />
        </div>

        {/* Pricing Cards */}
        <PricingList openModal={openModal} />
        <ContactModal isOpen={isOpen} closeModal={closeModal} />

        {/* CTA */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={openModal}
            className="text-sm font-semibold tracking-widest uppercase border-b border-cyan-500 hover:text-cyan-600 transition-colors"
          >
            See Full Details
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
