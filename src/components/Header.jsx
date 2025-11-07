import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";
import SignupModal from "./modal"; // adjust path if needed

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
      className={`fixed top-0 left-0 w-full z-50 border-b ${isDarkMode ? " " : ""} lg:backdrop-blur-sm transition-all duration-500 bg-gradient-to-br from-slate-50 via-cyan-70 to-teal-600"  sticky-header h-28`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 relative z-10 ">
        <a className="block w-[12rem] xl:mr-8 flex flex-row items-center group" href="#hero">
          <img src={brainwave} className="rounded-3xl m-2" width={70} height={40} alt="Brainwave" />
          <h1
            className="ml-3 text-5xl font-extrabold tracking-tight 
             bg-gradient-to-r from-cyan-400 via-teal-500 to-slate-600 
             bg-clip-text text-transparent 
             drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] 
             animate-logo-pulse"
          >
            Medrox
          </h1>

        </a>

        <nav
          className={`${openNavigation
            ? "flex fixed inset-0 bg-black/70 backdrop-blur-md"
            : "hidden"} 
      lg:static lg:flex lg:mx-auto`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-sans uppercase 
              text-lg xl:text-xl font-bold 
              bg-gradient-to-r from-slate-800 via-cyan-700 to-teal-600 
              bg-clip-text  
              transition-all duration-500 group 
              hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] 
              ${item.onlyMobile ? "lg:hidden " : ""} 
              px-6 py-6 md:py-8 lg:-mr-0.25 
              ${item.url === pathname.hash ? "z-2 text-teal-600" : ""} 
              lg:leading-6 xl:px-12 animate-nav-float`}
              >
                <span className="relative z-10">{item.title}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 
                   bg-gradient-to-r from-sky-400 to-teal-500 
                   opacity-0 group-hover:opacity-100 
                   transform scale-x-0 group-hover:scale-x-100 
                   transition-transform duration-500"></span>
              </a>

            ))}
          </div>
          <HamburgerMenu />
        </nav>

        <a
          onClick={openModal}
          className={`button hidden mr-8 transition-all duration-500 hover:text-teal-600 ${isDarkMode ? "text-n-1/50" : "text-white"} lg:block animate-nav-float`}
        >
          Join US
        </a>
        <Button
          className={`hidden lg:flex text-lg font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-500 ${isDarkMode ? "bg-teal-700 hover:bg-teal-800 text-white" : "bg-sky-500 hover:bg-sky-600 text-white"} animate-button-orbit`}
          onClick={openModal}
          aria-label="Sign in to Medrox"
        >
          Sign in
        </Button>

        <Button
          className="ml-auto lg:hidden px-3 "
          onClick={toggleNavigation}
          aria-label={openNavigation ? "Close navigation menu" : "Open navigation menu "}
        >
          <MenuSvg openNavigation={openNavigation} className="animate-icon-spin bg-slate-700" />
        </Button>
      </div>

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
          100% { width: 100px; height: 100px; opacity: 0; }
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