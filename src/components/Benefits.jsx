"use client";
import React, { useRef, useEffect } from "react";
import { benefits } from "../constants";
import ClipPath from "../assets/svg/ClipPath";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";

export default function Benefits() {
  const cardsRef = useRef([]);


  return (
    <section className="relative text-slate-800 py-20 md:py-28 overflow-hidden">
      {/* 🔥 Ultra Premium Animated Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Smooth shifting gradient */}
        <div className="absolute inset-0 animate-gradientShift bg-gradient-to-br from-[#f5fcff] via-[#e6f3fa] to-[#d9f1ff]" />

        {/* Aurora beams */}
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>

        {/* Floating Glow Orbs */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        {/* Dynamic fluid waves */}
        <div className="wave-layer wave-1"></div>

      </div>

      {/* Heading */}
      <div className="text-center mb-20 relative group">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-500
          transition-all duration-700 ease-in-out
          group-hover:scale-[1.02] group-hover:saturate-[1.25]"
        >
          Smarter, Smoother, Sleeker Healthcare
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600/80">
          Redefining the way pharmacies & healthcare systems work — built with elegance,
          powered by innovation.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-12">
        {benefits.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="group relative w-[340px] md:w-[360px] h-[500px] rounded-3xl overflow-hidden border bg-white/40 border-white/30 shadow-xl backdrop-blur-lg transition-all duration-700 hover:scale-105 hover:shadow-2xl opacity-100"
          >

            {/* Hover image reveal */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-1000 scale-105 group-hover:scale-100">
              <img
                src={item.backgroundUrl || "/assets/images/fallback.png"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col h-full p-8 bg-gradient-to-b from-white/70 via-white/40 to-transparent backdrop-blur-sm">
              <h3 className="text-2xl font-extrabold mb-3 text-slate-800 drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 mb-auto font-medium opacity-90 leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center mt-6">
                <img
                  src={item.iconUrl || "/assets/images/fallback.png"}
                  alt={item.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="ml-auto text-xs uppercase font-semibold tracking-wider text-slate-700">
                  Learn more
                </p>
                <Arrow className="ml-2" />
              </div>
            </div>

            {item.light && <GradientLight />}
            <ClipPath />
          </div>
        ))}
      </div>

      {/* Local styles */}
      <style jsx>{`
        /* 🌊 Premium fluid wave animation */
        .wave-layer {
          position: absolute;
          width: 200%;
          height: 400px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2326C6DA' fill-opacity='0.25' d='M0,160C240,80,480,280,720,260C960,240,1200,100,1440,180L1440,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")
            repeat-x;
          animation: waveFlow 22s cubic-bezier(0.55, 0.5, 0.45, 0.95) infinite;
          top: -60px;
        }
        .wave-1 {
          animation-delay: 0s;
          opacity: 0.55;
        }
        .wave-2 {
          animation-delay: -8s;
          opacity: 0.35;
          top: 100px;
        }
        .wave-3 {
          animation-delay: -14s;
          opacity: 0.25;
          top: 180px;
        }

        /* 🌌 Aurora light beams */
        .aurora {
          position: absolute;
          width: 100%;
          height: 100%;
          background: conic-gradient(
            from 180deg at 50% 50%,
            rgba(0, 255, 200, 0.12),
            rgba(0, 180, 255, 0.08),
            transparent 70%
          );
          mix-blend-mode: screen;
          filter: blur(120px);
          animation: auroraShift 18s ease-in-out infinite;
        }
        .aurora-1 {
          top: -20%;
          left: -20%;
        }
        .aurora-2 {
          bottom: -20%;
          right: -20%;
          animation-delay: 8s;
        }

        /* ✨ Glow orbs */
        .glow-orb {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(38, 198, 218, 0.4) 0%,
            transparent 70%
          );
          filter: blur(140px);
          animation: glowFloat 14s ease-in-out infinite alternate;
        }
        .orb-1 {
          top: 15%;
          left: 12%;
        }
        .orb-2 {
          bottom: 15%;
          right: 18%;
          animation-delay: 7s;
        }

        /* 🌈 Gradient shifting */
        .animate-gradientShift {
          background-size: 300% 300%;
          animation: gradientShift 20s ease infinite;
        }

        /* Keyframes */
        @keyframes waveFlow {
          0% {
            transform: translateX(0) translateY(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) translateY(-10px) scaleY(1.05);
          }
          100% {
            transform: translateX(-50%) translateY(0) scaleY(1);
          }
        }
        @keyframes auroraShift {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(10deg) scale(1.05);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }
        @keyframes glowFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-40px) scale(1.08);
            opacity: 0.55;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.35;
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* 🚀 Card fade-in */
       
        }
      `}</style>
    </section>
  );
}
