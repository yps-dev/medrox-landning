import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import SignupModal from "./modal"; // adjust path if needed

const Header = ({ openModal }) => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);


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
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-transparent lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-transparent backdrop-blur-sm"
        } wave-container`}
    >

      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 relative z-10">
        <a className="block w-[12rem] xl:mr-8 flex flex-row items-center group" href="#hero">


          <img src={brainwave} className="rounded-3xl m-2" width={70} height={40} alt="Brainwave" />

          <h1
            className="ml-3 text-3xl font-extrabold tracking-tight animate-logo-ripple"
            style={{
              background: "linear-gradient(45deg, #26C6DA, #2ECC71, #00CED1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Medrox
          </h1>
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-xl uppercase text-n-1 transition-all duration-500 group hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold ${item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12 animate-nav-glow`}
              >
                <span className="relative z-10">{item.title}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>

        <a
          onClick={openModal}
          className="button hidden mr-8 text-n-1/50 transition-all duration-500 hover:text-n-1 lg:block animate-nav-glow"
        >
          Join US
        </a>
        <Button
          className="hidden lg:flex hover:from-cyan-700 hover:to-emerald-700 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-button-wave"
          onClick={openModal}
          aria-label="Sign in to Medrox"
        >
          Sign in
        </Button>


        <Button
          className="ml-auto lg:hidden px-3"
          onClick={toggleNavigation}
          aria-label={openNavigation ? "Close navigation menu" : "Open navigation menu"}
        >
          <MenuSvg openNavigation={openNavigation} className="animate-icon-pulse" />
        </Button>
      </div>

      <div className="absolute inset-0 wave-bg pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">

            </linearGradient>
          </defs>
          <path
            className="wave-path"
            d="M0,60 C200,40 400,80 600,60 S800,20 1000,40 S1200,80 1440,60 V100 H0 Z"
            fill="url(#waveGradient)"
          />
          <path
            className="wave-path wave-path-2"
            d="M0,70 C250,50 450,90 650,70 S850,30 1050,50 S1250,90 1440,70 V100 H0 Z"
            fill="url(#waveGradient)"
            opacity="0.7"
          />
        </svg>

      </div>
      <style jsx>{`
        /* Wave Background Animation */
        .wave-container {
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

        /* Logo and Icon Animations */
        .animate-logo-ripple {
          position: relative;
          transition: all 0.5s ease;
        }
        .animate-logo-ripple:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 15px rgba(38, 198, 218, 0.7));
        }
        .animate-logo-ripple::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(38, 198, 218, 0.4), transparent);
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
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
        .animate-icon-glow {
          transition: all 0.5s ease;
        }
        .animate-icon-glow:hover {
          transform: rotate(15deg) scale(1.2);
          filter: drop-shadow(0 0 20px rgba(46, 204, 113, 0.8));
        }

        /* Navigation Animations */
        .animate-nav-glow {
          position: relative;
          transition: all 0.5s ease;
        }
        .animate-nav-glow:hover {
          transform: translateY(-2px);
          text-shadow: 0 0 10px rgba(38, 198, 218, 0.6);
        }
        .animate-nav-glow::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(0, 206, 209, 0.3);
          border-radius: 50%;
          transform: translateX(-50%);
          transition: all 0.5s ease;
        }
        .animate-nav-glow:hover::before {
          width: 20px;
          height: 20px;
          opacity: 1;
        }

        /* Button Animation */
        .animate-button-wave {
          position: relative;
          overflow: hidden;
        }
        .animate-button-wave::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.5s ease;
        }
        .animate-button-wave:hover::after,
        .animate-button-wave:focus::after {
          width: 200px;
          height: 200px;
        }

        /* Hamburger Menu Animation */
        .animate-icon-pulse {
          transition: all 0.5s ease;
        }
        .animate-icon-pulse:hover,
        .animate-icon-pulse:focus {
          transform: scale(1.2);
          filter: drop-shadow(0 0 10px rgba(38, 198, 218, 0.7));
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .wave-path {
            d: path('M0,40 C150,20 300,60 450,40 S600,0 750,20 S900,60 1080,40 V80 H0 Z');
          }
          .wave-path-2 {
            d: path('M0,50 C180,30 330,70 480,50 S630,10 780,30 S930,70 1080,50 V80 H0 Z');
          }
          .animate-logo-ripple {
            font-size: 1.5rem;
          }
          .animate-icon-glow {
            width: 2.5rem;
            height: 2.5rem;
          }
        }

        /* High contrast mode for accessibility */
        @media (prefers-contrast: high) {
          .animate-logo-ripple {
            background: linear-gradient(45deg, #00695c, #1b5e20, #00695c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .animate-button-wave {
            background: linear-gradient(to right, #00695c, #1b5e20);
          }
          .wave-path,
          .wave-path-2 {
            fill: #00695c;
            opacity: 0.8;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .wave-path,
          .wave-path-2,
          .animate-logo-ripple::after,
          .animate-nav-glow::before,
          .animate-button-wave::after,
          .animate-icon-glow,
          .animate-nav-glow,
          .animate-button-wave,
          .animate-icon-pulse {
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