"use client";

import { motion } from "framer-motion";
import Heading from "./Heading";
import med1 from "../assets/med1.png";
import med2 from "../assets/med2.png";
import med3 from "../assets/med3.png";
import med4 from "../assets/med4.png";
import med5 from "../assets/med5.png";
import med6 from "../assets/med6.png";
import med7 from "../assets/med7.png";
import med8 from "../assets/med8.png";
import med9 from "../assets/med9.png";
import med11 from "../assets/med11.png";
import med10 from "../assets/med10.png";
import med12 from "../assets/med12.png";
import med13 from "../assets/med13.png";
const images = [

  med2,
  med10,
  {
    type: "text",
    title: "Impressed?",
    subtitle: "Join & see for yourself — an experience like no other.",
  },
  med3,
  med4,
  med2,
  med9,
  med8,
  med13,
  med5,
  {
    type: "text",
    title: "30+ Features.",
    subtitle: "Unlimited Access. Seamless experience.",
  },
  med6,
  med1,
  med7,
  {
    type: "text",
    title: "Professionally built.",
    subtitle: "Join & pay to unlock full access.",
  },
  med4,
  med1,
  med11,
  med10,
  // Add promo cards as objects



];



export const ThreeDMarquee = ({ className = "" }) => {
  // Split images into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <section className={`relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 md:px-8 overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.2)_0%,transparent_70%)] opacity-50" />
      </div>

      <div className="text-center  sm:mb-16">
        <Heading
          title="Our Product Features"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 animate-title-glow font-[Inter]"
        >
          <span className="absolute left-0 bottom-0 w-32 sm:w-40 md:w-48 h-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full transform -translate-x-1/2 animate-gradient-flow" />
        </Heading>
      </div>

      <div className="mx-auto block h-[1000px] overflow-hidden rounded-2xl max-sm:h-[400px]">
        <div className="flex size-full items-center justify-center">
          <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
            <div
              style={{
                transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              }}
              className=" absolute left-12 top-0 w-[1500px]  -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 gap-16 transform-3d"
            >



              {chunks.map((subarray, colIndex) => (
                <motion.div
                  animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 10 : 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  key={`col-${colIndex}`}
                  className="flex flex-col items-start gap-y-20 gap-x-4"
                  role="group"
                  aria-label={`Feature column ${colIndex + 1}`}
                >
                  <GridLineVertical className="left-[-16px]" offset="80px" />
                  {subarray.map((item, imageIndex) => (
                    <div className="relative" key={`img-${colIndex}-${imageIndex}`}>
                      <GridLineHorizontal className="top-[-16px]" offset="20px" />
                      {typeof item === "string" || typeof item === "object" && item instanceof String ? (
                        // Standard image
                        <motion.img
                          whileHover={{ y: -10 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          src={item}
                          alt={`Feature ${colIndex * chunkSize + imageIndex + 1}`}
                          className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                          width={970}
                          height={700}
                          loading="lazy"
                        />
                      ) : (
                        // Text card
                        <motion.div
                          whileHover={{ y: -10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="aspect-[970/700] w-[300px] h-[280px] flex flex-col justify-center items-center text-center bg-gradient-to-br from-cyan-500 via-teal-400 to-emerald-400 text-white rounded-lg shadow-xl ring ring-gray-950/5 p-4"
                        >
                          <h3 className="text-3xl font-bold">{item.title}</h3>
                          <p className="mt-2 text-xl sm:text-base text-white/90">{item.subtitle}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }

        /* Animations */
        .animate-title-glow {
          animation: title-glow 2s ease-in-out infinite;
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease-in-out infinite;
        }

        /* Keyframes */
        @keyframes title-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.7), 0 0 20px rgba(64, 224, 208, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(34, 211, 238, 1), 0 0 40px rgba(64, 224, 208, 0.7);
          }
        }
        @keyframes gradient-flow {
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

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .size-[1720px] {
            scale: 0.4;
          }
          .h-[600px] {
            height: 400px;
          }
          .text-3xl {
            font-size: 1.75rem;
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .size-[1720px] {
            scale: 0.6;
          }
        }
      `}</style>
    </section>
  );
};
export default ThreeDMarquee;
const GridLineHorizontal = ({ className = "", offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={`absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] ${className}`}
    />
  );
};

const GridLineVertical = ({ className = "", offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={`absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] ${className}`}
    />
  );
};