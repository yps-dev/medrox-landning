import { motion } from "framer-motion";
import { socials } from "../../constants";

export const Rings = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export const NeuralGrid = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
      {/* Moving scanner line in drawer */}
      <motion.div
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent z-10"
      />
      {/* Static grid-like crossing lines */}
      <div className="absolute top-1/4 w-full h-px bg-white/5" />
      <div className="absolute top-1/2 w-full h-px bg-white/5" />
      <div className="absolute top-3/4 w-full h-px bg-white/5" />
    </div>
  );
};

export const SideLines = () => {
  return (
    <>
      <div className="absolute top-0 left-5 w-[1px] h-full bg-white/5"></div>
      <div className="absolute top-0 right-5 w-[1px] h-full bg-white/5"></div>
    </>
  );
};

export const BackgroundCircles = () => {
  return (
    <>
      <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] bg-cyan-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-blue-900/10 rounded-full blur-[120px]" />
    </>
  );
};

export const HamburgerMenu = () => {
  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden bg-slate-950">
      <NeuralGrid />
      <BackgroundCircles />
      <Rings />
      <SideLines />

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* FOOTER SOCIALS IN DRAWER */}
      <div className="absolute bottom-12 left-0 w-full px-12 z-20 pointer-events-auto">
        <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] mb-6">Connect With Medrox</p>
        <div className="flex gap-6">
          {socials.map((social) => (
            <a key={social.id} href={social.url} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300">
              <img src={social.iconUrl} alt={social.title} width={20} height={20} className="opacity-50 hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
