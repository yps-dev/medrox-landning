import { useRef } from "react";
import Section from "./Section";
import Button from "./Button";
import { brainwave, grid } from "../assets";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Antigravity from "./design/Antigravity";
import Orb from "./design/Orb";

const Roadmap = () => {
  const containerRef = useRef(null);

  // Use the window scroll but catch it in a spring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- THE SECRET TO SLOW MOTION ---
  // Stiffness: 15 (Very loose/slow response)
  // Damping: 40 (Prevents it from bouncing)
  // Mass: 5 (Makes the scroll feel incredibly heavy and cinematic)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 40,
    mass: 5
  });

  // --- LOCKED-IN ANIMATION RANGES ---
  // By using very small decimal jumps (0.1 to 0.12), the change happens 
  // over a tiny fraction of the scroll, but the "Spring" forces it to take 
  // seconds to complete the visual move.

  // 1. SEEN ENOUGH?
  const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const text1Scale = useTransform(smoothProgress, [0, 0.3], [0.8, 1.1]);

  // 2. JOIN THE REVOLUTION
  const text2Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const text2Blur = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], ["20px", "0px", "0px", "20px"]);

  // 3. FINALE
  const circleScale = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const circleOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.85, 0.95], [40, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);

  return (
    <Section className="bg-slate-50 relative !pb-0 overflow-hidden" id="Join Us" customPaddings="py-0">

      {/* Container is fixed to 100vh to avoid extra space below */}
      <div ref={containerRef} className="h-[100vh] relative">

        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* BACKGROUND: Antigravity Field (Stable/Professional) */}
          <Antigravity
            count={250}
            color="#9ec8ff"
            magnetRadius={15}
            ringRadius={15}
            waveSpeed={0.3}
            rotationSpeed={0.05}
            particleSize={6}
          />

          {/* Subtle Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

          {/* SEQUENCE 1 */}
          <motion.div
            style={{ opacity: text1Opacity, scale: text1Scale }}
            className="absolute text-center z-10"
          >
            <h2 className="text-7xl md:text-[10rem] font-black text-slate-900 tracking-tighter leading-none">
              SEEN<br />ENOUGH?
            </h2>
          </motion.div>

          {/* SEQUENCE 2 */}
          <motion.div
            style={{
              opacity: text2Opacity,
              filter: useTransform(text2Blur, b => `blur(${b})`)
            }}
            className="absolute text-center z-10 w-full"
          >
            <h2 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-none">
              JOIN THE<br />REVOLUTION
            </h2>
          </motion.div>

          {/* SEQUENCE 3 */}
          <motion.div
            style={{ scale: circleScale, opacity: circleOpacity }}
            className="absolute z-20 w-[600px] h-[600px] rounded-full overflow-hidden flex items-center justify-center"
          >
            {/* WebGL Orb Background */}
            <div className="absolute inset-0">
              <Orb
                hoverIntensity={2}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
                scale={1.3}
              />
            </div>

            <motion.div style={{ y: contentY, opacity: contentOpacity }} className="text-center flex flex-col items-center relative z-10">

              {/* BIG LOGO with Breathing Pulse */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150 animate-pulse-slow" />
                <motion.img
                  src={brainwave}
                  width={180}
                  height={180}
                  alt="Logo"
                  className="relative z-10 drop-shadow-2xl"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-4 drop-shadow-sm">Medrox</h1>
              <p className="text-slate-500 text-xl font-medium tracking-wide mb-10">The future of healthcare is here.</p>

              <Button href="/join" className="px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-lg shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.4)] hover:scale-105 transition-all duration-300 group">
                <span className="flex items-center gap-3">
                  Get Started <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};

export default Roadmap;