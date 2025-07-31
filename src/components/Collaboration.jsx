"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/Collaboration";

// Updated data with curated Heroicons and hover text
const collabText =
  "Transform healthcare with AI-driven automation and real-time connectivity for unparalleled efficiency.";

const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Real-Time Management",
    text: "Manage appointments, data, and communications in real-time with secure cloud access.",
  },
  {
    id: "2",
    title: "Advanced Analytics",
    text: "Unlock predictive insights with machine learning to optimize care and operations.",
  },
];

const collabApps = [
  {
    id: "0",
    title: "PatientSync",
    description: "Sync patient records across platforms instantly.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 0 0-10 10c0 2.76 1.12 5.26 2.93 7.07l4-4A6 6 0 0 1 18 12a10 10 0 0 0-10-10z" />
        <path d="M12 22a10 10 0 0 0 10-10c0-2.76-1.12-5.26-2.93-7.07l-4 4a6 6 0 0 1-8 0l-4-4C3.12 6.74 2 9.24 2 12a10 10 0 0 0 10 10z" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "1",
    title: "MedTrack",
    description: "Track medical inventory and patient progress in real-time.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M3 3h18v18H3zM7 7h10v10H7z" />
        <path d="M10 7v10m4-10v10" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "2",
    title: "HealthHub",
    description: "Centralize patient care and communication.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <path d="M7 7h.01" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "3",
    title: "CareFlow",
    description: "Streamline workflows for healthcare professionals.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 2v20m10-10H2" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "4",
    title: "ClinicPro",
    description: "Manage clinic operations with ease.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "5",
    title: "RxManager",
    description: "Optimize prescription and inventory management.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18m-9 4v6m-3-3h6" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "6",
    title: "DocSync",
    description: "Sync medical documents across systems.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
  {
    id: "7",
    title: "StaffEase",
    description: "Simplify staff scheduling and communication.",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    width: 32,
    height: 32,
  },
];

const Collaboration = React.forwardRef(({ crosses, ...props }, ref) => {
  const sectionRef = useRef(null);
  const appsRef = useRef([]);
  const contentRef = useRef(null);
  const [hoveredApp, setHoveredApp] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Scroll-based animation observer with debouncing
  useEffect(() => {
    let timeoutId;
    const section = sectionRef.current;
    const content = contentRef.current;
    const apps = appsRef.current.filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              entry.target.classList.add("animate-in");
              entry.target.classList.remove("animate-out");
              apps.forEach((app, index) => {
                app.style.setProperty("--app-delay", `${index * 0.1}s`);
                app.classList.add("animate-app-in");
              });
              if (content) {
                content.classList.add("animate-content-in");
                content.classList.remove("animate-out");
              }
            }, 50);
          } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              entry.target.classList.add("animate-out");
              entry.target.classList.remove("animate-in");
              apps.forEach((app) => app.classList.remove("animate-app-in"));
              if (content) {
                content.classList.add("animate-out");
                content.classList.remove("animate-content-in");
              }
            }, 50);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    if (section) observer.observe(section);
    return () => {
      clearTimeout(timeoutId);
      if (section) observer.unobserve(section);
    };
  }, []);

  // Interactive mouse movement for background with throttling
  useEffect(() => {
    let lastUpdate = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate < 16) return; // Throttle to ~60fps
      lastUpdate = now;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      sectionRef.current.style.setProperty("--mx", `${x}%`);
      sectionRef.current.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#F5FCFF] to-[#E6F3FA] py-16"
      {...props}
      role="region"
      aria-label="AI-Driven Healthcare Solutions"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none bg-animation">
        <div className="wave-layer wave-1"></div>
        <div className="wave-layer wave-2"></div>
        <div className="wave-layer wave-3"></div>
        <div className="glow-orb"></div>
      </div>

      <div className="container lg:flex gap-12">



        <div className="max-full" ref={contentRef}>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-10 md:mb-14 text-teal-900 tracking-tight animate-header-glow">
            What Makes Medrox Different?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-[30rem] animate-text-flow">
            Redefining healthcare with cutting-edge AI automation and real-time connectivity.
          </p>

          <ul className="max-w-[22rem] mb-10 md:mb-14  gap-6">
            {collabContent.map((item) => (
              <li className="animate-card relative bg-white mb-9  rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group w-full" key={item.id}>
                <div className="flex items-center">
                  <h6 className="text-2xl md:text-3xl font-bold text-cyan-500 animate-text-slide">{item.title}</h6>
                </div>
                {item.text && (

                  <p className="text-base md:text-lg text-gray-600 mt-3 animate-text-flow delay-100">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg md:text-xl font-semibold py-4 px-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-400 animate-button-glow"
            aria-label="Start exploring AI-driven healthcare solutions"
          >
            Start Now
          </Button>
        </div>

        <div className="lg:ml-auto xl:w-[40rem] mt-8 lg:mt-0">
          <p className="text-base text-gray-600 mb-12 max-w-[24rem] mx-auto animate-content">
            {collabText}
          </p>

          <div className="relative left-1/2 w-[25rem] aspect-square -translate-x-1/2 scale-75 md:scale-90 lg:scale-100 ">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full opacity-20 animate-spin-slow"></div>
            <div className="flex w-3xl aspect-square m-auto border-2 border-cyan-300 rounded-full shadow-lg">
              <div className="w-[8rem] aspect-square m-auto p-1 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-white rounded-full shadow-inner">
                  <svg
                    className="w-16 h-16 text-teal-700 animate-pulse-scale"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 0 0-10 10c0 2.76 1.12 5.26 2.93 7.07l4-4A6 6 0 0 1 18 12a10 10 0 0 0-10-10z" />
                    <path d="M12 22a10 10 0 0 0 10-10c0-2.76-1.12-5.26-2.93-7.07l-4 4a6 6 0 0 1-8 0l-4-4C3.12 6.74 2 9.24 2 12a10 10 0 0 0 10 10z" />
                  </svg>
                </div>
              </div>
            </div>
            <ul className="absolute inset-0 w-full h-full">
              {collabApps.map((app, index) => {
                const angle = (2 * Math.PI * index) / collabApps.length;
                const radius = 190; // Circular radius from center (adjust to stay inside)

                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <li
                    key={app.id}
                    ref={(el) => (appsRef.current[index] = el)}
                    onMouseEnter={() => setHoveredApp(app)}
                    onMouseLeave={() => setHoveredApp(null)}
                    onFocus={() => setHoveredApp(app)}
                    onBlur={() => setHoveredApp(null)}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px - 2rem)`,
                      top: `calc(50% + ${y}px - 2rem)`,
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Learn more about ${app.title}`}
                  >
                    <div className="relative flex items-center justify-center w-[4rem] h-[4rem] bg-white border-2 border-cyan-200 rounded-2xl shadow-md hover:scale-110 focus:scale-110 hover:shadow-xl focus:shadow-xl hover:bg-cyan-50 focus:bg-cyan-50 transition-all duration-400">
                      <div className="w-8 h-8 text-cyan-800">{app.icon}</div>

                      {hoveredApp?.id === app.id && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-3 text-sm text-gray-700 animate-tooltip z-10">
                          <p className="font-semibold text-teal-800">{app.title}</p>
                          <p>{app.description}</p>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <LeftCurve
              className="absolute left-0 top-1/2 -translate-y-1/2 text-cyan-300"
              aria-hidden="true"
            />
            <RightCurve
              className="absolute right-0 top-1/2 -translate-y-1/2 text-cyan-300"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Enhanced Background Animation */
        .bg-animation {
          background: linear-gradient(180deg, #F5FCFF 0%, #E6F3FA 100%);
          overflow: hidden;
        }
          .animate-line-draw {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawLine 2s ease-out forwards;
    animation-delay: calc(0.5s + var(--index, 0) * 0.2s);
  }

  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
      }
        .wave-layer {
          position: absolute;
          width: 200%;
          height: 350px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2326C6DA' fill-opacity='0.45' d='M0,140C240,80,480,280,720,280C960,280,1200,80,1440,160L1440,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")
            repeat-x;
          animation: waveMove 16s linear infinite;
          top: -80px;
        }
        .wave-1 {
          animation-delay: 0s;
          opacity: 0.55;
        }
        .wave-2 {
          animation-delay: -5s;
          opacity: 0.4;
          top: 80px;
        }
        .wave-3 {
          animation-delay: -10s;
          opacity: 0.3;
          top: 160px;
        }
        .glow-orb {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            #26c6da 0%,
            transparent 70%
          );
          filter: blur(140px);
          opacity: 0.35;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: glowFloat 10s ease-in-out infinite;
        }

        /* Section Animation */
        .animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .animate-out {
          opacity: 0;
          transform: translateY(100px) scale(0.95);
        }

        /* Content Animation */
        .animate-content-in {
          opacity: 1;
          transform: translateY(0);
          animation: contentFade 1.6s ease-out forwards;
        }

        /* Header Animations */
        .animate-header-glow {
          opacity: 0;
          transform: translateY(60px);
          animation: headerGlow 1.4s ease-out forwards;
          text-shadow: 0 0 12px rgba(0, 206, 209, 0.4);
        }
        .animate-text-flow {
          opacity: 0;
          transform: translateY(40px);
          animation: textFlow 1.3s ease-out forwards;
        }
        .animate-text-flow.delay-100 {
          animation-delay: 0.15s;
        }
        .animate-text-slide {
          opacity: 0;
          transform: translateX(-40px);
          animation: textSlide 1.2s ease-out forwards;
        }
        .animate-text-slide.delay-100 {
          animation-delay: 0.1s;
        }

        /* Card Animations */
        .animate-card {
          opacity: 0;
          transform: translateY(50px) scale(0.94);
          animation: cardRise 1.5s ease-out forwards;
          animation-delay: calc(var(--delay, 0s) + 0.25s * var(--index, 0));
        }
        .animate-card:focus {
          outline: 2px solid #26c6da;
          outline-offset: 2px;
        }
        .animate-check-glow {
          animation: checkGlow 1.6s ease-in-out infinite;
        }
        .animate-button-glow {
          opacity: 0;
          transform: translateY(30px);
          animation: buttonGlow 1.4s ease-out forwards;
          animation-delay: 0.6s;
          box-shadow: 0 0 15px rgba(0, 206, 209, 0.4);
        }
        .animate-button-glow:hover,
        .animate-button-glow:focus {
          box-shadow: 0 0 25px rgba(0, 206, 209, 0.6);
        }

        /* App Icons Animation */
        .animate-app-in {
          animation: appOrbit 1.5s ease-out forwards;
          animation-delay: var(--app-delay);
        }

        /* Tooltip Animation */
        .animate-tooltip {
          animation: tooltipFade 0.3s ease-out forwards;
        }

        /* Hover Effects */
        .animate-content-in {
          transition: transform 0.5s ease;
        }
        .section:hover .animate-content-in {
          transform: translateY(-12px);
        }

        /* Keyframes */
        @keyframes waveMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }
        @keyframes glowFloat {
          0%,
          100% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        @keyframes headerGlow {
          from {
            opacity: 0;
            transform: translateY(60px);
            text-shadow: 0 0 0 rgba(0, 206, 209, 0);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            text-shadow: 0 0 12px rgba(0, 206, 209, 0.4);
          }
        }
        @keyframes textFlow {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes textSlide {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes cardRise {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes checkGlow {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px rgba(0, 206, 209, 0.3));
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0 0 6px rgba(0, 206, 209, 0.5));
          }
        }
        @keyframes buttonGlow {
          from {
            opacity: 0;
            transform: translateY(30px);
            box-shadow: 0 0 0 rgba(0, 206, 209, 0);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            box-shadow: 0 0 15px rgba(0, 206, 209, 0.4);
          }
        }
        @keyframes appOrbit {
          from {
            opacity: 0;
            transform: translateY(50px) rotate(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }
        @keyframes tooltipFade {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes scale-glow {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 4px rgba(0, 206, 209, 0.3));
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 8px rgba(0, 206, 209, 0.5));
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .wave-layer {
            height: 200px;
          }
          .glow-orb {
            width: 500px;
            height: 500px;
          }
          .text-5xl {
            font-size: 2.5rem;
          }
          .text-7xl {
            font-size: 3.5rem;
          }
          .text-xl {
            font-size: 1.125rem;
          }
          .text-2xl {
            font-size: 1.5rem;
          }
          .text-base {
            font-size: 0.875rem;
          }
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
          .w-[25rem] {
            width: 22rem;
          }
          .max-w-sm {
            max-width: 20rem;
          }
        }

        /* High contrast mode for accessibility */
        @media (prefers-contrast: high) {
          .text-teal-900 {
            color: #004d40;
          }
          .text-cyan-600 {
            color: #00695c;
          }
          .bg-cyan-600 {
            background-color: #00695c;
          }
          .bg-cyan-700 {
            background-color: #004d40;
          }
          .bg-white {
            background-color: #ffffff;
          }
          .border-cyan-200 {
            border-color: #4dd0e1;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-header-glow,
          .animate-text-flow,
          .animate-text-slide,
          .animate-card,
          .animate-check-glow,
          .animate-button-glow,
          .animate-app-in,
          .animate-tooltip,
          .animate-content-in {
            animation: none;
            transform: none;
            opacity: 1;
            transition: none;
          }
          .wave-layer,
          .glow-orb,
          .animate-spin-slow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
});

Collaboration.displayName = "Collaboration";

export default Collaboration;