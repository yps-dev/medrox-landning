



import { motion, useMotionValue, useMotionTemplate, useTransform, useSpring } from 'framer-motion';
import Section from "./Section";
import { benefits } from "../constants";
import { grid } from "../assets";

const Benefits = () => {
  return (
    <Section id="services" className="bg-slate-50 relative overflow-hidden" customPaddings="py-0">

      {/* --- 0. BACKGROUND ATMOSPHERE (The "Alive" Feel) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-100/40 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 py-24 lg:py-40">

        {/* --- SECTION HEADER --- */}
        <div className="max-w-4xl mx-auto text-center mb-20 lg:mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <span className="font-code text-[13px] font-black tracking-[0.3em] text-slate-500 uppercase">
              Why Choose US            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8"
          >
            Engineered for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500">
              Absolute Mastery.
            </span>
          </motion.h2>
        </div>
        {/* --- 3. BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(380px,auto)]">
          {benefits.map((item, index) => (
            <BenefitCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </Section>
  );
};

const BenefitCard = ({ item, index }) => {
  // --- BENTO LOGIC ---
  // Makes the 1st (index 0) and 4th (index 3) items span 2 columns for asymmetry
  const isLarge = index === 0 || index === 3;

  // --- MOUSE TRACKING ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values for parallax (Physics)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // --- 4. PARALLAX DEPTH LOGIC ---
  // The icon moves slightly opposite to the mouse to create depth
  const iconX = useTransform(smoothX, [0, 500], [-15, 15]);
  const iconY = useTransform(smoothY, [0, 500], [-15, 15]);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      className={`
        relative group overflow-hidden
        ${isLarge ? "md:col-span-2" : "md:col-span-1"} 
        rounded-[2.5rem] 
        bg-white/60 backdrop-blur-xl 
        border border-white/60
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]
        transition-shadow duration-700
      `}
    >
      {/* --- CROSSING LINES (Animated Border Gradient) --- */}
      <div className="absolute inset-0 z-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgb(6,182,212)_180deg,transparent_270deg,transparent_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-color-dodge" />
      </div>

      {/* --- 5. NOISE TEXTURE (For that physical paper feel) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* --- SPOTLIGHT EFFECT --- */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.8),
              transparent 40%
            )
          `,
        }}
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-20 h-full flex flex-col p-8 md:p-12">

        {/* TOP AREA: Parallax Icon & Number */}
        <div className="flex justify-between items-start mb-auto">
          {/* 4. PARALLAX ICON WRAPPER */}
          <motion.div
            style={{ x: iconX, y: iconY }}
            className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center"
          >
            <img
              src={item.iconUrl}
              alt={item.title}
              className="w-8 h-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
          </motion.div>

          <span className="font-code text-xs font-bold text-slate-300 tracking-widest uppercase">
            0{index + 1}
          </span>
        </div>

        {/* BOTTOM AREA: Typography */}
        <div className="mt-12">
          {/* 2. MICRO-TYPOGRAPHY: Tight Headline */}
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter mb-4 leading-tight">
            {item.title}
          </h3>

          <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
            {item.text}
          </p>

          {/* 6. MAGNETIC INTERACTION HINT */}
          <div className="mt-8 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
            <span className="w-8 h-[1px] bg-slate-900" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Discover</span>
          </div>
        </div>
      </div>

      {/* --- DECORATIVE GRID LINES (Restored Full Texture) --- */}
      <div className="absolute inset-0">
        <img src={grid} className="w-full h-full object-cover" alt="" />
      </div>

    </motion.div>
  );
};

export default Benefits;



