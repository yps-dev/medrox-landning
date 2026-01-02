import React from "react";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-12 relative overflow-hidden bg-[#030712]">
      {/* Dimmed Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-8 border-t border-n-1/10">

          {/* Brand & Rights */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-grotesk tracking-tight drop-shadow-sm">
              Medrox
            </h3>
            <p className="text-n-3 text-sm font-medium tracking-wide">
              © {new Date().getFullYear()}. Crafting digital excellence.
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <a
                href="tel:+251949838254"
                className="group relative flex flex-col items-center gap-1"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-n-3 font-bold transition-colors group-hover:text-cyan-400">Call Us</span>
                <span className="text-lg font-semibold text-white transition-all group-hover:text-cyan-400 group-hover:scale-105">+251 94 983 8254</span>
              </a>
              <div className="hidden sm:block w-px h-10 bg-n-1/20" />
              <a
                href="mailto:medrox23@gmail.com"
                className="group relative flex flex-col items-center gap-1"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-n-3 font-bold transition-colors group-hover:text-emerald-400">Email Us</span>
                <span className="text-lg font-semibold text-white transition-all group-hover:text-emerald-400 group-hover:scale-105">medrox23@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Presence */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-n-4 font-bold">Connect</span>
            <ul className="flex gap-4">
              {socials.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-n-8/50 border border-n-1/10 backdrop-blur-md transition-all duration-300 hover:bg-n-8 hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)] group"
                    aria-label={`Visit our ${item.title} page`}
                  >
                    <img
                      src={item.iconUrl}
                      width={22}
                      height={22}
                      alt={item.title}
                      className="opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Footer;