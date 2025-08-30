

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { SplitText } from 'gsap/SplitText';
// import { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, PointsMaterial, Points, BufferAttribute, Shape, ExtrudeGeometry, MeshBasicMaterial, Mesh } from 'three';
// import { ScrollParallax } from 'react-just-parallax';
// import { curve, heroBackground, robot } from '../assets';
// import Button from './Button';
// import Section from './Section';
// import { BackgroundCircles, BottomLine, Gradient } from './design/Hero';
// import { heroIcons } from '../constants';
// import Generating from './Generating';
// import Notification from './Notification';
// import CompanyLogos from './CompanyLogos';
// import medical from "../assets/notification/xr.png";
// import ContactModal, { useModal } from "./contact";
// // Register GSAP plugin
// gsap.registerPlugin(SplitText);

// const Hero = () => {
//   const parallaxRef = useRef(null);
//   const canvasRef = useRef(null);
//   const titleRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const buttonRef = useRef(null);
//   const logoRef = useRef(null);
//   const robotRef = useRef(null);
//   const iconsRef = useRef(null);
//   const notificationRef = useRef(null);
//   const heartbeatRef = useRef(null);

//   // Three.js 3D background and heartbeat animation
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new Scene();
//     const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new WebGLRenderer({ canvas: canvasRef.current, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     // Molecular particle system
//     const particlesGeometry = new BufferGeometry();
//     const particleCount = 500;
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 8;
//       positions[i + 1] = (Math.random() - 0.5) * 8;
//       positions[i + 2] = (Math.random() - 0.5) * 8;
//       colors[i] = Math.random() > 0.5 ? 0 / 255 : 46 / 255; // Teal or Emerald
//       colors[i + 1] = Math.random() > 0.5 ? 206 / 255 : 204 / 255; // Cyan or Emerald
//       colors[i + 2] = Math.random() > 0.5 ? 209 / 255 : 113 / 255;
//     }

//     particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));
//     particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3));

//     const particleMaterial = new PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.6,
//     });

//     const particles = new Points(particlesGeometry, particleMaterial);
//     scene.add(particles);

//     // Heartbeat animation
//     const heartShape = new Shape();
//     heartShape.moveTo(0, 0);
//     heartShape.bezierCurveTo(0, -0.3, -0.5, -0.3, -0.5, 0);
//     heartShape.bezierCurveTo(-0.5, 0.3, -0.1, 0.6, 0, 0.4);
//     heartShape.bezierCurveTo(0.1, 0.6, 0.5, 0.3, 0.5, 0);
//     heartShape.bezierCurveTo(0.5, -0.3, 0, -0.3, 0, 0);

//     const extrudeSettings = { depth: 0.1, bevelEnabled: false };
//     const heartGeometry = new ExtrudeGeometry(heartShape, extrudeSettings);
//     const heartMaterial = new MeshBasicMaterial({ color: 0x00CED1, transparent: true, opacity: 0.8 });
//     const heartMesh = new Mesh(heartGeometry, heartMaterial);
//     heartMesh.position.set(2, 1, 0);
//     heartMesh.scale.set(0.2, 0.2, 0.2);
//     scene.add(heartMesh);

//     // Animate heartbeat
//     gsap.to(heartMesh.scale, {
//       x: 0.25,
//       y: 0.25,
//       z: 0.25,
//       duration: 0.5,
//       repeat: 3,
//       yoyo: true,
//       ease: 'power2.inOut',
//       onComplete: () => {
//         gsap.to(heartMesh, { opacity: 0, duration: 0.5, onComplete: () => scene.remove(heartMesh) });
//       },
//     });

//     camera.position.z = 4;

//     // Subtle cursor interaction
//     let mouseX = 0;
//     let mouseY = 0;
//     document.addEventListener('mousemove', (e) => {
//       mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//       mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
//     });

//     // Slow animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       particles.rotation.y += 0.001 + mouseX * 0.005;
//       particles.rotation.x += mouseY * 0.005;
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Resize handler
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // GSAP animations
//   useEffect(() => {
//     // Title animation
//     if (titleRef.current) {
//       const split = new SplitText(titleRef.current, { type: 'words' });
//       gsap.from(split.words, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.08,
//         duration: 0.8,
//         ease: 'power2.out',
//         delay: 0.3,
//       });

//       // Emphasize key words
//       const keyWords = ['revolution', 'Medrox', 'Healthcare'];
//       split.words.forEach((word) => {
//         if (keyWords.some((kw) => word.textContent?.toLowerCase().includes(kw.toLowerCase()))) {
//           gsap.to(word, {
//             color: '#00CED1',
//             textShadow: '0 0 10px rgba(0, 206, 209, 0.5)',
//             duration: 0.6,
//             repeat: 1,
//             yoyo: true,
//             ease: 'power2.inOut',
//             delay: 1.2,
//           });
//         }
//       });
//     }

//     // Description animation
//     if (descriptionRef.current) {
//       const split = new SplitText(descriptionRef.current, { type: 'words' });
//       gsap.from(split.words, {
//         opacity: 0,
//         y: 20,
//         stagger: 0.04,
//         duration: 0.6,
//         ease: 'power2.out',
//         delay: 0.8,
//       });
//     }

//     // Button animation
//     if (buttonRef.current) {
//       gsap.from(buttonRef.current, {
//         opacity: 0,
//         y: 15,
//         duration: 0.7,
//         ease: 'power2.out',
//         delay: 1.2,
//       });

//       // Button hover effect with ripple
//       buttonRef.current.addEventListener('mouseenter', () => {
//         gsap.to(buttonRef.current, {
//           scale: 1.03,
//           boxShadow: '0 0 15px rgba(0, 206, 209, 0.7)',
//           duration: 0.3,
//           ease: 'power2.out',
//         });
//         gsap.to(buttonRef.current, {
//           '--ripple-opacity': 0.5,
//           '--ripple-scale': 2,
//           duration: 0.5,
//           ease: 'power1.out',
//         });
//       });
//       buttonRef.current.addEventListener('mouseleave', () => {
//         gsap.to(buttonRef.current, {
//           scale: 1,
//           boxShadow: 'none',
//           duration: 0.3,
//           ease: 'power2.out',
//         });
//         gsap.to(buttonRef.current, {
//           '--ripple-opacity': 0,
//           '--ripple-scale': 0,
//           duration: 0.3,
//           ease: 'power1.out',
//         });
//       });
//     }

//     // Logo (curve) animation
//     if (logoRef.current) {
//       gsap.from(logoRef.current, {
//         opacity: 0,
//         scale: 0.8,
//         duration: 1.2,
//         ease: 'power2.out',
//         delay: 0.3,
//       });
//     }

//     // Robot image animation
//     if (robotRef.current) {
//       gsap.from(robotRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 1,
//         ease: 'power2.out',
//         delay: 0.8,
//       });
//     }

//     // Icons and Notification animation
//     if (iconsRef.current) {
//       gsap.from(iconsRef.current.children, {
//         opacity: 0,
//         x: -30,
//         stagger: 0.08,
//         duration: 0.6,
//         ease: 'power2.out',
//         delay: 1.2,
//       });
//     }
//     if (notificationRef.current) {
//       gsap.from(notificationRef.current, {
//         opacity: 0,
//         x: 30,
//         duration: 0.6,
//         ease: 'power2.out',
//         delay: 1.4,
//       });
//     }

//     // Heartbeat DOM element animation
//     if (heartbeatRef.current) {
//       gsap.from(heartbeatRef.current, {
//         opacity: 0,
//         scale: 0.5,
//         duration: 1,
//         ease: 'power2.out',
//         delay: 0.5,
//       });
//       gsap.to(heartbeatRef.current, {
//         scale: 1.1,
//         duration: 0.5,
//         repeat: 3,
//         yoyo: true,
//         ease: 'power2.inOut',
//         delay: 1,
//         onComplete: () => {
//           gsap.to(heartbeatRef.current, { opacity: 0, duration: 0.5 });
//         },
//       });
//     }
//   }, []);

//   // Custom cursor effect
//   useEffect(() => {
//     const cursorInner = document.createElement('div');
//     cursorInner.className = 'fixed w-4 h-4 rounded-full bg-cyan-500/70 pointer-events-none z-50';
//     const cursorOuter = document.createElement('div');
//     cursorOuter.className = 'fixed w-8 h-8 rounded-full border border-teal-500/50 pointer-events-none z-50';
//     document.body.appendChild(cursorInner);
//     document.body.appendChild(cursorOuter);

//     document.addEventListener('mousemove', (e) => {
//       gsap.to(cursorInner, {
//         x: e.clientX - 8,
//         y: e.clientY - 8,
//         duration: 0.2,
//         ease: 'power2.out',
//       });
//       gsap.to(cursorOuter, {
//         x: e.clientX - 16,
//         y: e.clientY - 16,
//         duration: 0.4,
//         ease: 'power2.out',
//       });
//     });

//     // Pulse on interactive elements
//     const interactiveElements = document.querySelectorAll('button, a, li');
//     interactiveElements.forEach((el) => {
//       el.addEventListener('mouseenter', () => {
//         gsap.to(cursorOuter, {
//           scale: 1.5,
//           borderColor: '#00CED1',
//           duration: 0.3,
//         });
//       });
//       el.addEventListener('mouseleave', () => {
//         gsap.to(cursorOuter, {
//           scale: 1,
//           borderColor: 'rgba(0, 128, 128, 0.5)',
//           duration: 0.3,
//         });
//       });
//     });

//     return () => {
//       document.body.removeChild(cursorInner);
//       document.body.removeChild(cursorOuter);
//     };
//   }, []);
//   const { isOpen, openModal, closeModal } = useModal();
//   return (
//     <Section
//       className="pt-[2rem] -mt-[5.25rem] relative"
//       crosses
//       crossesOffset="lg:translate-y-[5.25rem]"
//       customPaddings
//       id="hero"
//     >
//       <canvas ref={canvasRef} className="absolute inset-0 z-0" />
//       <div className="relative bg-gradient-to-br from-[#0d0d0d] via-[#083344] to-[#0891b2] w-screen" ref={parallaxRef}>



//         <div className="absolute inset-0  z-1" />
//         <div className="relative z-2 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
//           <h1 ref={titleRef} className="h1 mb-6 text-white" style={{ textShadow: '0 2px 10px rgba(0, 206, 209, 0.3)' }}>
//             Transform the Future of&nbsp;Healthcare&nbsp;with{" "}
//             <span className="inline-block relative">
//               Medrox{" "}
//               <img
//                 ref={logoRef}
//                 src={curve}
//                 className="absolute top-full left-0 w-full xl:-mt-2"
//                 width={624}
//                 height={28}
//                 alt="Curve"
//               />
//               <div
//                 ref={heartbeatRef}
//                 className="absolute top-0 -right-12 w-6 h-6 bg-cyan-500/50 rounded-full animate-pulse"
//                 style={{ boxShadow: '0 0 15px rgba(0, 206, 209, 0.7)' }}
//               />
//             </span>
//           </h1>
//           <p ref={descriptionRef} className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
//             Experience the ultimate healthcare hub — not just a system, but a revolution.
//             Medrox empowers clinics, hospitals, and health centers across Ethiopia and the world
//             with intelligent, secure, cloud-based control.
//           </p>
//           <Button
//             ref={buttonRef}
//             onClick={openModal}
//             white
//             className="relative overflow-hidden"
//             style={{
//               '--ripple-opacity': '0',
//               '--ripple-scale': '0',
//               backgroundImage: 'radial-gradient(circle at center, rgba(0, 206, 209, var(--ripple-opacity)) 0%, transparent var(--ripple-scale))',
//             }}
//           >
//             Get started
//           </Button>
//         </div>
//         <ContactModal isOpen={isOpen} closeModal={closeModal} />
//         <div className="relative max-w-[50rem] mx-auto md:max-w-5xl xl:mb-24">
//           <div className="relative z-2 p-0.5 rounded-2xl bg-conic-gradient">
//             <div className="relative bg-n-8 rounded-[1rem]">
//               <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
//               <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
//                 <img
//                   ref={robotRef}
//                   src={medical}
//                   className="relative z-10 w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
//                   width={1024}
//                   height={700}
//                   alt="AI"
//                 />

//                 <ScrollParallax isAbsolutelyPositioned>
//                   <ul ref={iconsRef} className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
//                     {heroIcons.map((icon, index) => (
//                       <li className="p-5" key={index}>
//                         <img src={icon} width={24} height={25} alt={icon} />
//                       </li>
//                     ))}
//                   </ul>
//                 </ScrollParallax>

//               </div>
//             </div>
//             <Gradient />
//           </div>
//           <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">

//           </div>
//           <BackgroundCircles />
//         </div>
//         <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
//       </div>

//       <BottomLine />
//     </Section>
//   );
// };

// export default Hero;





































import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal, { useModal } from "./contact";
import doc from "../assets/hero/robot.png";
import ph from "../assets/hero/curve.png";
export default function UltraHeroSwitcher({ pharmacyImg, doctorImg }) {
  const [view, setView] = useState("health");
  const switchingRef = useRef(false);
  const lastInteractionTime = useRef(0);
  const autoTimerRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const triggerSwitch = (nextView) => {
    if (switchingRef.current || view === nextView) return;
    switchingRef.current = true;
    setView(nextView);
    lastInteractionTime.current = Date.now();
    setTimeout(() => {
      switchingRef.current = false;
    }, 1200); // short lock for responsiveness
  };

  // Scroll / wheel handler with hold requirement
  useEffect(() => {
    const onWheel = (e) => {
      const now = Date.now();
      if (now - lastInteractionTime.current < 2000) return; // 1s hold
      if (e.deltaY > 30) {
        triggerSwitch(view === "health" ? "pharmacy" : "health");
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [view]);

  // Touch swipe handler
  useEffect(() => {
    let startY = null;
    const onTouchStart = (e) => {
      startY = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e) => {
      if (startY == null) return;
      const delta = startY - (e.changedTouches[0]?.clientY ?? 0);
      if (Math.abs(delta) > 50 && Date.now() - lastInteractionTime.current >= 2000) {
        triggerSwitch(view === "health" ? "pharmacy" : "health");
      }
      startY = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [view]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e) => {
      if (Date.now() - lastInteractionTime.current < 2000) return;
      if (["ArrowDown", "PageDown", "ArrowUp", "PageUp"].includes(e.key)) {
        triggerSwitch(view === "health" ? "pharmacy" : "health");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  // Auto-switch back and forth
  useEffect(() => {
    if (prefersReducedMotion) return;
    autoTimerRef.current = setInterval(() => {
      if (Date.now() - lastInteractionTime.current >= 10000) {
        triggerSwitch(view === "health" ? "pharmacy" : "health");
      }
    }, 10000);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [view, prefersReducedMotion]);
  const containerVariants = {
    initial: { opacity: 0, y: 80, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.8, ease: [0.32, 0.02, 0.24, 1] } },
  };

  const cardVariants = {
    enterFromTop: { opacity: 0, y: -100, scale: 0.9, rotate: -5 },
    enter: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 1.5, ease: [0.32, 0.02, 0.24, 1] } },
    exit: { opacity: 0, y: 100, scale: 0.92, rotate: 5, transition: { duration: 1.2, ease: [0.32, 0.02, 0.24, 1] } },
  };

  const bgStyle = view === "health"
    ? { background: "linear-gradient(135deg, #f3f7fa, #e0eaf5, #c1d9f1)", minHeight: "100vh" }
    : { background: "linear-gradient(135deg, #e6f6f1, #c2e8d8, #a3d9c1)", minHeight: "100vh" };

  const textColor = view === "health" ? "text-blue-900" : "text-teal-900";

  return (
    <section
      aria-label="Hero showcase"
      className="relative isolate w-full overflow-hidden"
      style={bgStyle}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: view === "health"
            ? "radial-gradient(circle at 15% 15%, rgba(193, 217, 241, 0.15), transparent 60%), radial-gradient(circle at 85% 85%, rgba(224, 234, 245, 0.15), transparent 60%)"
            : "radial-gradient(circle at 15% 15%, rgba(163, 217, 193, 0.15), transparent 60%), radial-gradient(circle at 85% 85%, rgba(194, 232, 216, 0.15), transparent 60%)",
          animation: "glow 25s infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='20' fill='rgba(0, 255, 255, 0.05)'/%3E%3Ccircle cx='30' cy='70' r='10' fill='rgba(0, 255, 0, 0.03)'/%3E%3Ccircle cx='70' cy='30' r='15' fill='rgba(0, 191, 255, 0.04)'/%3E%3C/svg%3E')",
          animation: "float 15s infinite linear",
        }}
      />
      <style>
        {`
          @keyframes glow {
            0% { opacity: 0.2; }
            50% { opacity: 0.4; }
            100% { opacity: 0.2; }
          }
          @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(20px, 20px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>

      <div className="absolute top-12 left-12 z-20 flex items-center gap-8">
        <div className="rounded-full bg-white/40 px-6 py-4 text-xl font-extrabold backdrop-blur-lg shadow-2xl" style={{ color: view === "health" ? "#1e40af" : "#047857" }}>
          {view === "health" ? "Medical Medrox" : "Pharmacy Medrox"}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-10xl px-16 py-40">
        <AnimatePresence mode="wait">
          {view === "health" && (
            <motion.div
              key="health"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-4xl overflow-hidden shadow-3xl bg-white/20 backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
                <motion.div
                  initial={{ opacity: 0, x: -200, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 1.8, ease: [0.32, 0.02, 0.24, 1] }}
                  className="text-center lg:text-left"
                >
                  <p className={`rounded-full bg-blue-100/30 px-8 py-4 inline-block text-lg font-medium ${textColor} tracking-wider`}>Medrox MEDICAL BREAKTHROUGH</p>
                  <h1 className={`text-4xl md:text-8xl font-extrabold mt-10 ${textColor} leading-snug`}>
                    Revolutionizing Health Care
                  </h1>
                  <p className={`text-3xl md:text-4xl mt-8 max-w-4xl ${textColor} opacity-90`}>
                    The first, most powerful healthcare platform for health sectors—built for specialists and staff—patient diagnosis, appointments, history, operations—30+ approved features.
                  </p>

                  <div className="mt-12 flex justify-center lg:justify-start gap-10">
                    <button onClick={openModal} className="bg-blue-800 text-white px-12 py-6 rounded-full font-extrabold shadow-3xl hover:bg-blue-700 transition-all duration-400 hover:scale-115">
                      Explore Medrox
                    </button>
                  </div>
                </motion.div>
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1.8, ease: [0.32, 0.02, 0.24, 1] }}
                    className="rounded-4xl overflow-hidden shadow-4xl"
                  >
                    <img src={doc} alt="AI Medical Innovation" className="w-full h-[700px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/15 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
          {view === "pharmacy" && (
            <motion.div
              key="pharmacy"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-4xl overflow-hidden shadow-3xl bg-white/20 backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
                <motion.div
                  initial={{ opacity: 0, x: -200, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 1.8, ease: [0.32, 0.02, 0.24, 1] }}
                  className="text-center lg:text-left"
                >
                  <p className={`rounded-full bg-teal-100/30 px-8 py-4 inline-block text-lg font-medium ${textColor} tracking-wider`}>Medrox PHARMACY EVOLUTION</p>
                  <h1 className={`text-4xl md:text-8xl font-extrabold mt-10 ${textColor} leading-snug`}>
                    Transforming Pharmacy Mangment
                  </h1>
                  <p className={`text-2xl md:text-3xl mt-8 max-w-4xl ${textColor} opacity-90`}>
                    World’s first, fastest, and easiest all‑in‑one pharmacy platform — from inventory, sales & POS to prescriptions to customer care & More.
                  </p>

                  <div className="mt-12 flex justify-center lg:justify-start gap-10">
                    <button

                      onClick={openModal} className="bg-green-800 text-white px-12 py-6 rounded-full font-extrabold shadow-3xl hover:bg-green-700 transition-all duration-400 hover:scale-115">
                      Discover
                    </button>
                  </div>
                </motion.div>
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1.8, ease: [0.32, 0.02, 0.24, 1] }}
                    className="rounded-4xl overflow-hidden shadow-4xl"
                  >
                    <img src={ph} alt="AI Pharmacy Innovation" className="w-full h-[700px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/15 to-transparent" />
                  </motion.div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <ContactModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
}


