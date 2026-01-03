import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import SignupModal from "./modal"; // adjust path if needed

const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Magnetic pull
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative group"
    >
      <Button className={className} onClick={onClick}>
        {children}
      </Button>
      <motion.div
        className="absolute -inset-2 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ x: useTransform(springX, (v) => v * 0.5), y: useTransform(springY, (v) => v * 0.5) }}
      />
    </motion.div>
  );
};

const Header = ({ openModal }) => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsDarkMode(scrollY > 100); // Switch to dark mode after scrolling 100px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 sticky-header ${isDarkMode
        ? "h-30 bg-slate-900/90 backdrop-blur-xl border-b border-white/5"
        : "h-28 lg:h-28 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50/50 backdrop-blur-md border-b border-black/5"
        }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 relative z-10 ">
        <a className="block w-[12rem] xl:mr-8 flex flex-row items-center group relative" href="#hero">
          <img src={brainwave} className="rounded-3xl m-2" width={70} height={40} alt="Brainwave" />

          <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          <h1
            className="ml-3 text-5xl font-extrabold tracking-tight 
             bg-gradient-to-r from-cyan-500 via-teal-600 to-slate-200 
             bg-clip-text text-transparent 
             drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] 
             animate-logo-pulse"
          >
            Medrox
          </h1>
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"} 
          fixed lg:static inset-0 z-[100] lg:flex lg:mx-auto lg:bg-transparent`}
        >
          {/* 100% OPAQUE BACKDROP FOR MOBILE */}
          <AnimatePresence>
            {openNavigation && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-950 z-[-1] lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* PREMIUM MOBILE CLOSE (X) BUTTON */}
          <AnimatePresence>
            {openNavigation && (
              <motion.button
                initial={{ opacity: 0, rotate: -90, scale: 0.5, x: 50 }}
                animate={{ opacity: 1, rotate: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 50 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleNavigation}
                className="absolute top-12 right-12 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white z-[110] lg:hidden backdrop-blur-3xl shadow-2xl"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <div className="relative z-[105] flex flex-col items-center justify-center m-auto lg:flex-row gap-10 lg:gap-0">
            {navigation.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.url}
                onClick={(e) => {
                  if (item.title === "Sign in") {
                    e.preventDefault();
                    openModal();
                  }
                  handleClick();
                }}
                initial={openNavigation ? { opacity: 0, x: 50, filter: "blur(12px)" } : {}}
                animate={openNavigation ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: openNavigation ? 0.3 + index * 0.1 : 0,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`block relative font-sans lowercase 
                text-[3rem] tracking-tight lg:text-[1rem] xl:text-xl font-bold 
                ${isDarkMode || openNavigation ? "text-white" : "text-slate-800/80"}
                transition-all duration-500 group 
                hover:text-cyan-400
                ${item.onlyMobile ? "lg:hidden " : ""} 
                px-8 py-4 lg:py-8 lg:px-4 xl:px-10 lg:-mr-0.25 
                ${item.url === pathname.hash ? "z-2 !text-cyan-400" : ""} 
                lg:leading-6 animate-nav-float`}
              >
                <span className="relative z-10">{item.title}</span>
                {/* Holographic underline */}
                <span className="absolute inset-x-8 bottom-4 lg:bottom-4 h-[3px] 
                   bg-gradient-to-r from-cyan-400 to-blue-500 
                   opacity-0 group-hover:opacity-100 
                   transform scale-x-0 group-hover:scale-x-100 
                   transition-all duration-500 shadow-[0_0_25px_rgba(34,211,238,0.7)]"></span>

                {/* Mobile ambient light */}
                <div className="lg:hidden absolute inset-0 bg-cyan-500/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <MagneticButton
            className={`text-lg font-bold py-3 px-10 rounded-2xl shadow-2xl transition-all duration-500 border border-white/10 ${isDarkMode ? "bg-cyan-600 hover:bg-cyan-500 text-white" : "bg-slate-900 hover:bg-slate-800 text-white hover:scale-105 active:scale-95"} animate-button-orbit`}
            onClick={openModal}
          >
            Sign in
          </MagneticButton>
        </div>

        <Button
          className="ml-auto lg:hidden p-2 rounded-xl bg-slate-100/10 border border-white/5"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} className="animate-icon-spin" />
        </Button>
      </div>

      {/* ULTRA SCANNER LINE BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scanner-line" />

      <div className="absolute inset-0 wave-bg pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: isDarkMode ? "#008080" : "#00BCD4" }} />
              <stop offset="100%" style={{ stopColor: isDarkMode ? "#87CEEB" : "#4DD0E1" }} />
            </linearGradient>
          </defs>

        </svg>
      </div>

      <style jsx>{`
        /* Wave and Background Animation */
       
    
       

        /* Logo Animation */
        .animate-logo-pulse {
          position: relative;
          transition: all 0.5s ease;
        }
        .animate-logo-pulse:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 15px rgba(0, 188, 212, 0.7));
        }
        .animate-logo-pulse::after {
          content: '';
          position: absolute;
          top: 70%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(0, 188, 212, 0.4), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseEffect 3s infinite;
        }
        @keyframes pulseEffect {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 150px; height: 150px; opacity: 0; }
        }

        /* Scanner Line Animation */
        @keyframes scanner-line {
          0% { transform: translateX(-100%) scaleX(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) scaleX(1); opacity: 0; }
        }
        .animate-scanner-line {
          animation: scanner-line 6s ease-in-out infinite;
        }

        /* Navigation Animation */
        .animate-nav-float {
          position: relative;
          transition: all 0.5s ease;
        }
        .animate-nav-float:hover {
          transform: translateY(-3px);
          text-shadow: 0 0 10px rgba(0, 128, 128, 0.6);
        }
        .animate-nav-float::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(135, 206, 235, 0.3);
          border-radius: 50%;
          transform: translateX(-50%);
          transition: all 0.5s ease;
        }
        .animate-nav-float:hover::before {
          width: 20px;
          height: 20px;
          opacity: 1;
        }

        /* Button Animation */
        .animate-button-orbit {
          position: relative;
          overflow: hidden;
        }
        .animate-button-orbit::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.6s ease;
        }
        .animate-button-orbit:hover::after,
        .animate-button-orbit:focus::after {
          width: 200px;
          height: 200px;
        }

        /* Icon Animation */
        .animate-icon-spin {
          transition: all 0.5s ease;
        }
        .animate-icon-spin:hover,
        .animate-icon-spin:focus {
          transform: rotate(15deg) scale(1.2);
          filter: drop-shadow(0 0 10px rgba(0, 188, 212, 0.7));
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
         
          .animate-logo-pulse {
            font-size: 1.5rem;
          }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
          .animate-logo-pulse {
            background: linear-gradient(45deg, #00695c, #008080);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .animate-button-orbit {
            background: linear-gradient(to right, #00695c, #008080);
          }
          .wave-path,
         
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
   
          .animate-logo-pulse::after,
          .animate-nav-float::before,
          .animate-button-orbit::after,
          .animate-icon-spin,
          .animate-nav-float,
          .animate-button-orbit,
          .animate-icon-spin {
            animation: none;
            transform: none;
            transition: none;
            filter: none;
            text-shadow: none;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;