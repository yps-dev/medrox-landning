import React from "react";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10 wave-container">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col relative z-10">
        <p
          className="text-cyan-700  lg:block animate-text-glow text-xl"

        >
          Medrox
        </p>

        <p
          className="caption text-n-4 lg:block animate-text-glow"
          style={{
            background: "linear-gradient(45deg, #26C6DA, #2ECC71, #00CED1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "all 0.5s ease",
          }}
        >
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="flex flex-col items-center sm:items-start gap-2 animate-contact-glow">
          <a
            href="tel:+251949838254"
            className="text-n-4 text-base font-semibold transition-all duration-500 group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:to-emerald-500"
            aria-label="Call Medrox at +251 94 983 8254"
          >
            Phone: +251 94 983 8254
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
          </a>
          <a
            href="mailto:medrox23@gmail.com"
            className="text-n-4 text-base font-semibold transition-all duration-500 group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:to-emerald-500"
            aria-label="Email Medrox at medrox23@gmail.com"
          >
            Email: yordanossisay198@@gmail.com
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
          </a>
        </div>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <li key={item.id} className="animate-icon-tilt">
              <a
                href={item.url}
                target="_blank"
                className="flex items-center justify-center w-12 h-12 bg-n-7 rounded-xl transition-all duration-500 group hover:bg-gradient-to-r hover:from-cyan-600 hover:to-emerald-600 hover:shadow-2xl"
                aria-label={`Visit our ${item.title} page`}
              >
                <img
                  src={item.iconUrl}
                  width={20}
                  height={20}
                  alt={item.title}
                  className="group-hover:scale-110 group-hover:filter group-hover:drop-shadow-[0_0_10px_rgba(38,198,218,0.7)] transition-transform duration-500"
                />
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-0 wave-bg pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="footerWaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgba(38, 198, 218, 0.3)", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "rgba(46, 204, 113, 0.3)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgba(0, 206, 209, 0.3)", stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <path
            className="wave-path wave-path-2"
            d="M0,30 C250,10 450,50 650,30 S850,-10 1050,10 S1250,50 1440,30 V100 H0 Z"
            fill="url(#footerWaveGradient)"
            opacity="0.7"
          />
        </svg>
      </div>

      <style jsx>{`
        /* Wave Background Animation */
        .wave-container {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
        }
        .wave-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .wave-path {
          animation: waveFlow 8s linear infinite;
        }
        .wave-path-2 {
          animation: waveFlow 10s linear infinite reverse;
        }
        @keyframes waveFlow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }

        /* Copyright Text Animation */
        .animate-text-glow {
          position: relative;
        }
        .animate-text-glow:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 10px rgba(38, 198, 218, 0.6));
        }
        .animate-text-glow::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(38, 198, 218, 0.3), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: rippleEffect 3s infinite;
        }
        @keyframes rippleEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
          }
        }

        /* Social Icon 3D Tilt and Glow */
        .animate-icon-tilt {
          perspective: 1000px;
        }
        .animate-icon-tilt:hover a {
          transform: rotateX(10deg) rotateY(10deg);
        }
        .animate-icon-tilt a:focus {
          transform: rotateX(5deg) rotateY(5deg);
          outline: 2px solid #26C6DA;
          outline-offset: 2px;
        }

        /* Contact Info Animation */
        .animate-contact-glow {
          position: relative;
        }
        .animate-contact-glow a {
          position: relative;
        }
        .animate-contact-glow a:hover {
          transform: translateY(-2px);
          text-shadow: 0 0 8px rgba(38, 198, 218, 0.6);
        }
        .animate-contact-glow a::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(0, 206, 209, 0.3);
          border-radius: 50%;
          transform: translateX(-50%);
          transition: all 0.5s ease;
        }
        .animate-contact-glow a:hover::before {
          width: 16px;
          height: 16px;
          opacity: 1;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .wave-path {
            d: path('M0,15 C150,-5 300,25 450,15 S600,-25 750,-5 S900,25 1080,15 V80 H0 Z');
          }
          .wave-path-2 {
            d: path('M0,25 C180,5 330,35 480,25 S630,-15 780,5 S930,35 1080,25 V80 H0 Z');
          }
          .animate-text-glow {
            font-size: 0.875rem;
          }
          .animate-icon-tilt a {
            width: 2.5rem;
            height: 2.5rem;
          }
          .animate-icon-tilt img {
            width: 1rem;
            height: 1rem;
          }
          .animate-contact-glow a {
            font-size: 0.75rem;
          }
        }

        /* High contrast mode for accessibility */
        @media (prefers-contrast: high) {
          .animate-text-glow,
          .animate-contact-glow a {
            background: linear-gradient(45deg, #00695c, #1b5e20, #00695c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .animate-icon-tilt a {
            background: #00695c;
          }
          .animate-icon-tilt a:hover,
          .animate-icon-tilt a:focus {
            background: #1b5e20;
          }
          .wave-path,
          .wave-path-2 {
            fill: #00695c;
            opacity: 0.8;
          }
          .animate-contact-glow a span {
            background: #1b5e20;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .wave-path,
          .wave-path-2,
          .animate-text-glow::after,
          .animate-icon-tilt,
          .animate-icon-tilt a,
          .animate-icon-tilt img,
          .animate-text-glow,
          .animate-contact-glow,
          .animate-contact-glow a,
          .animate-contact-glow a span,
          .animate-contact-glow a::before {
            animation: none;
            transform: none;
            transition: none;
            filter: none;
            box-shadow: none;
            text-shadow: none;
          }
        }
      `}</style>
    </Section>
  );
};

export default Footer;