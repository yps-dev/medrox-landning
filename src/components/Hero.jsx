

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









// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ContactModal, { useModal } from "./contact";
// import doc from "../assets/hero/robot.png";
// import ph from "../assets/hero/curve.png";
// import ScrollStack, { ScrollStackItem } from './design/stack';

// const containerVariants = {
//   initial: { opacity: 0, y: 80, scale: 0.95 },
//   animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 2, ease: [0.4, 0, 0.2, 1] } },
// };

// export default function UltraHeroSwitcher({ pharmacyImg = ph, doctorImg = doc }) {
//   const [view, setView] = useState("health");
//   const switchingRef = useRef(false);
//   const lastInteractionTime = useRef(0);
//   const autoTimerRef = useRef(null);
//   const { isOpen, openModal, closeModal } = useModal();

//   const prefersReducedMotion =
//     typeof window !== "undefined" &&
//     window.matchMedia &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   const triggerSwitch = (nextView) => {
//     if (switchingRef.current || view === nextView) return;
//     switchingRef.current = true;
//     setView(nextView);
//     lastInteractionTime.current = Date.now();
//     setTimeout(() => {
//       switchingRef.current = false;
//     }, 1000);
//   };

//   useEffect(() => {
//     const onWheel = (e) => {
//       const now = Date.now();
//       if (now - lastInteractionTime.current < 6000) return;
//       if (e.deltaY > 30) {
//         triggerSwitch(view === "health" ? "pharmacy" : "health");
//       }
//     };
//     window.addEventListener("wheel", onWheel, { passive: true });
//     return () => window.removeEventListener("wheel", onWheel);
//   }, [view]);

//   useEffect(() => {
//     let startY = null;
//     const onTouchStart = (e) => {
//       startY = e.touches[0]?.clientY ?? null;
//     };
//     const onTouchEnd = (e) => {
//       if (startY == null) return;
//       const delta = startY - (e.changedTouches[0]?.clientY ?? 0);
//       if (Math.abs(delta) > 50 && Date.now() - lastInteractionTime.current >= 6000) {
//         triggerSwitch(view === "health" ? "pharmacy" : "health");
//       }
//       startY = null;
//     };
//     window.addEventListener("touchstart", onTouchStart, { passive: true });
//     window.addEventListener("touchend", onTouchEnd, { passive: true });
//     return () => {
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchend", onTouchEnd);
//     };
//   }, [view]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (Date.now() - lastInteractionTime.current < 6000) return;
//       if (["ArrowDown", "PageDown", "ArrowUp", "PageUp"].includes(e.key)) {
//         triggerSwitch(view === "health" ? "pharmacy" : "health");
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [view]);

//   useEffect(() => {
//     if (prefersReducedMotion) return;
//     autoTimerRef.current = setInterval(() => {
//       if (Date.now() - lastInteractionTime.current >= 8000) {
//         triggerSwitch(view === "health" ? "pharmacy" : "health");
//       }
//     }, 8000);
//     return () => {
//       if (autoTimerRef.current) clearInterval(autoTimerRef.current);
//     };
//   }, [view, prefersReducedMotion]);

//   return (
//     <section
//       aria-label="Hero showcase"
//       className="relative isolate w-full overflow-hidden bg-gradient-to-b from-teal-50 to-cyan-100/20"
//     >
//       <ScrollStack className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
//         <ScrollStackItem
//           className={`flex items-center justify-center h-[70vh] sm:h-[80vh] snap-center bg-gradient-to-br from-blue-100 to-cyan-200/90 relative transition-all duration-300 ${view !== "health" ? 'hidden' : ''}`}
//         >
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.15),transparent_50%)] animate-pulse-slow" />
//           <div className="flex flex-col lg:flex-row items-center justify-between p-4 sm:p-8 lg:p-12 max-w-6xl mx-auto relative z-10 w-full">
//             <motion.div
//               variants={containerVariants}
//               initial="initial"
//               animate="animate"
//               className="text-center lg:text-left mb-6 lg:mb-0 lg:w-1/2"
//             >
//               <p className="rounded-full bg-blue-200/50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-blue-900 tracking-wide shadow-sm">
//                 Medrox MEDICAL BREAKTHROUGH
//               </p>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 sm:mt-6 text-blue-900 leading-tight">
//                 Revolutionizing Health Care
//               </h1>
//               <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6 text-blue-800/80 max-w-md sm:max-w-lg">
//                 The first, most powerful healthcare platform for health sectors—built for specialists and staff—patient diagnosis, appointments, history, operations—30+ approved features.
//               </p>
//               <motion.button
//                 onClick={openModal}
//                 className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Explore Medrox platform"
//               >
//                 Explore Medrox
//               </motion.button>
//             </motion.div>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, rotate: -3 }}
//               animate={{ scale: 1, opacity: 1, rotate: 0 }}
//               transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
//               className="w-full lg:w-1/2 relative"
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl opacity-75" />
//               <img
//                 src={doctorImg}
//                 alt="AI Medical Innovation"
//                 className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-cover rounded-3xl shadow-2xl"
//               />
//             </motion.div>
//           </div>
//         </ScrollStackItem>
//         <ScrollStackItem
//           className={`flex items-center justify-center h-[70vh] sm:h-[80vh] snap-center bg-gradient-to-br from-emerald-100 to-teal-200/90 relative transition-all duration-300 ${view !== "pharmacy" ? 'hidden' : ''}`}
//         >
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,200,0.15),transparent_50%)] animate-pulse-slow" />
//           <div className="flex flex-col lg:flex-row items-center justify-between p-4 sm:p-8 lg:p-12 max-w-6xl mx-auto relative z-10 w-full">
//             <motion.div
//               variants={containerVariants}
//               initial="initial"
//               animate="animate"
//               className="text-center lg:text-left mb-6 lg:mb-0 lg:w-1/2"
//             >
//               <p className="rounded-full bg-emerald-200/50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-emerald-900 tracking-wide shadow-sm">
//                 Medrox PHARMACY EVOLUTION
//               </p>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 sm:mt-6 text-emerald-900 leading-tight">
//                 Transforming Pharmacy Management
//               </h1>
//               <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6 text-emerald-800/80 max-w-md sm:max-w-lg">
//                 World’s first, fastest, and easiest all‑in‑one pharmacy platform — from inventory, sales & POS to prescriptions to customer care & More.
//               </p>
//               <motion.button
//                 onClick={openModal}
//                 className="mt-6 sm:mt-8 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Discover Medrox pharmacy platform"
//               >
//                 Discover
//               </motion.button>
//             </motion.div>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, rotate: 3 }}
//               animate={{ scale: 1, opacity: 1, rotate: 0 }}
//               transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
//               className="w-full lg:w-1/2 relative"
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-3xl opacity-75" />
//               <img
//                 src={pharmacyImg}
//                 alt="AI Pharmacy Innovation"
//                 className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-cover rounded-3xl shadow-2xl"
//               />
//             </motion.div>
//           </div>
//         </ScrollStackItem>
//       </ScrollStack>
//       <ContactModal isOpen={isOpen} closeModal={closeModal} />
//     </section>
//   );
// }










import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import ContactModal from "./contact";
import { useModal } from "./contact";
import ScrollStack, { ScrollStackItem } from './design/stack';
import { brainwave } from "./../assets";
import {
  Hospital, Stethoscope, Brain, Ambulance, Pill, Syringe
} from 'lucide-react';
import { PersonSimpleRun, Hand } from "phosphor-react";
import AllInOneHero from "./all";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

// Create a wrapper so Tooth behaves like a React component
const Tooth = (props) => <FontAwesomeIcon icon={faTooth} {...props} />;
const IMAGES = {
  doctor: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2",
  pharmacy: "https://images.pexels.com/photos/3873146/pexels-photo-3873146.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2"
};


// Assume you are importing icons like this:
// import { Hospital, Stethoscope, Tooth, Heart, Brain, Syringe, Ambulance, Pharmacy, PlusCircle } from 'lucide-react';
// ⚠️ IMPORTANT: These gradient classes (e.g., 'bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent')
// must be available in your Tailwind CSS configuration (e.g., main CSS file)

const services = [
  {
    id: 'hosp', name: 'Hospitals', icon: Hospital,
    gradient: 'bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent',
    iconColor: 'text-red-400', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.7)]'
  },
  {
    id: 'clin', name: 'Clinics', icon: Stethoscope,
    gradient: 'bg-gradient-to-br from-cyan-600/20 via-blue-500/10 to-transparent',
    iconColor: 'text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.7)]'
  },
  {
    id: 'dent', name: 'Dental Care', icon: Tooth,
    gradient: 'bg-gradient-to-br from-cyan-600/20 via-teal-500/10 to-transparent',
    iconColor: 'text-teal-400', glow: 'shadow-[0_0_15px_rgba(20,184,166,0.7)]'
  },
  {
    id: 'derm', name: 'Dermatology', icon: Hand,
    gradient: 'bg-gradient-to-br from-white via-yellow-500/10 to-transparent',
    iconColor: 'text-yellow-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.7)]'
  },
  {
    id: 'psyc', name: 'Psychiatry', icon: Brain,
    gradient: 'bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-transparent',
    iconColor: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.7)]'
  },
  {
    id: 'physio', name: 'Physiotherapy', icon: PersonSimpleRun,
    gradient: 'bg-gradient-to-br from-green-600/20 via-green-500/10 to-transparent',
    iconColor: 'text-green-400', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.7)]'
  },
  {
    id: 'ems', name: 'Emergency Centers', icon: Ambulance,
    gradient: 'bg-gradient-to-br from-pink-700/20 via-pink-600/10 to-transparent',
    iconColor: 'text-pink-400', glow: 'shadow-[0_0_15px_rgba(219,39,119,0.7)]'
  },
  {
    id: 'pharm', name: 'Pharmacies', icon: Pill,
    gradient: 'bg-gradient-to-br from-cyan-600/20 via-cyan-500/10 to-transparent',
    iconColor: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.7)]'
  },
  {
    id: 'med', name: 'Medical Services', icon: Syringe,
    gradient: 'bg-gradient-to-br from-indigo-600/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-indigo-400', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.7)]'
  },
];

// Re-using IconResolver
const IconResolver = ({ IconComponent, className }) => {
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};



const MarqueeItem = ({ service, index }) => (
  <motion.div
    initial={{ y: 50, opacity: 0, rotateZ: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}

    // --- ULTRA HOVER EFFECT ---
    whileHover={{
      scale: 1.05,
      rotateY: 5, // Subtle 3D tilt
      rotateX: 5,
      boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), ${service.glow.replace('shadow-[', '').replace(']', '')}`, // Deep shadow + color glow
      transition: { duration: 0.3 }
    }}

    // --- ULTRA CARD STYLES ---
    className={`flex items-center justify-center p-6 w-64 min-w-[16rem] h-36 
                   rounded-3xl cursor-pointer transform-gpu overflow-hidden relative 
                   ${service.gradient} 
                   border border-white/20 dark:border-gray-700/50 
                   shadow-lg transition-all duration-300 backdrop-blur-md`}
  >

    {/* Decorative Inner Ring (Pulsating Glow Layer) */}
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1.2, opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute h-40 w-40 rounded-full ${service.iconColor.replace('text-', 'bg-')}/50 blur-xl opacity-30`}
    />

    {/* Content Container (z-index ensures it's above the decorative layer) */}
    <div className="flex flex-col items-center z-10 text-center">

      {/* The Icon & Circle Wrapper */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: index * 0.1 + 0.3 }}
        className={`flex items-center justify-center h-16 w-16 rounded-full 
                           ${service.iconColor.replace('text-', 'bg-')}/20 
                           border border-white/30 dark:border-gray-600/30 
                           animate-icon-pulse`}
      >
        <IconResolver
          IconComponent={service.icon}
          className={`text-3xl ${service.iconColor}`}
        />
      </motion.div>

      {/* Service Name */}
      <p className="mt-4 text-xl font-extrabold tracking-tight text-white dark:text-gray-100 whitespace-nowrap text-shadow-md">
        {service.name}
      </p>
    </div>
  </motion.div>
);


const ServiceMarquee = () => {
  // ... (ServiceMarquee component remains mostly the same, just calling the new MarqueeItem)
  const doubledServices = [...services, ...services];

  return (
    <div className="relative w-full overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,rgb(17 24 39 / 1)_20%,rgb(17 24 39 / 1)_80%,transparent)]">
      <div className="flex w-fit marquee-track space-x-8 lg:space-x-12">
        {doubledServices.map((service, index) => (
          <MarqueeItem key={`${service.id}-${index}`} service={service} index={index} />
        ))}
      </div>

      {/* Injected CSS for Ultra Animations */}
      <style jsx global>{`
                .marquee-track {
                    animation: marquee 60s linear infinite; 
                    /* Preserve-3D enables smooth 3D transform animations */
                    transform-style: preserve-3d;
                }
                .marquee-track:hover {
                    animation-play-state: paused; 
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                /* Icon Pulse Keyframe for Ultra Look */
                @keyframes icon-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .animate-icon-pulse {
                    animation: icon-pulse 2s ease-in-out infinite;
                }
            `}</style>
    </div>
  );
};



const containerVariants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15
    }
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const imageVariants = {
  initial: { opacity: 0, scale: 0.92, rotateY: -8 },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function UltraHeroSwitcher() {
  const [showModal, setShowModal] = useState(false);


  const openModals = () => setShowModal(true);
  const closeModals = () => setShowModal(false);
  const [view, setView] = useState("health");
  const switchingRef = useRef(false);
  const lastInteractionTime = useRef(0);
  const autoTimerRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [imageLoaded, setImageLoaded] = useState({ health: false, pharmacy: false });
  const getDelay = (view) => {
    const baseDelay = 5000;     // 10 seconds
    const allInOneDelay = 300000; // 5 minutes
    return view === "all-in-one" ? allInOneDelay : baseDelay;
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = IMAGES.doctor;
    img2.src = IMAGES.pharmacy;
    img1.onload = () => setImageLoaded(prev => ({ ...prev, health: true }));
    img2.onload = () => setImageLoaded(prev => ({ ...prev, pharmacy: true }));
  }, []);



  const triggerSwitch = (nextView) => {
    if (switchingRef.current || view === nextView) return;
    switchingRef.current = true;
    setView(nextView);
    lastInteractionTime.current = Date.now();
    setTimeout(() => {
      switchingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    const onWheel = (e) => {
      const now = Date.now();
      if (now - lastInteractionTime.current < getDelay(view)) return;
      if (Math.abs(e.deltaY) > 30) {
        const nextView =
          view === "health"
            ? "pharmacy"
            : view === "pharmacy"
              ? "all-in-one"
              : "health";
        triggerSwitch(nextView);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [view]);


  useEffect(() => {
    let startY = null;

    const onTouchStart = (e) => {
      startY = e.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (e) => {
      if (startY == null) return;
      const delta = startY - (e.changedTouches[0]?.clientY ?? 0);
      if (
        Math.abs(delta) > 60 &&
        Date.now() - lastInteractionTime.current >= getDelay(view)
      ) {
        const nextView =
          view === "health"
            ? "pharmacy"
            : view === "pharmacy"
              ? "all-in-one"
              : "health";
        triggerSwitch(nextView);
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
  useEffect(() => {
    const onKey = (e) => {
      if (Date.now() - lastInteractionTime.current < getDelay(view)) return;

      if (["ArrowDown", "PageDown"].includes(e.key)) {
        const nextView =
          view === "health"
            ? "pharmacy"
            : view === "pharmacy"
              ? "all-in-one"
              : "health";
        triggerSwitch(nextView);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        const nextView =
          view === "all-in-one"
            ? "pharmacy"
            : view === "pharmacy"
              ? "health"
              : "all-in-one";
        triggerSwitch(nextView);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);


  // NEW Auto-Timer Logic
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Define the base delay. All-in-one gets a longer hold.
    const baseDelay = 10000; // 10 seconds for Health/Pharmacy views
    const allInOneDelay = 300000; // 5 minutes

    const delay = view === "all-in-one" ? allInOneDelay : baseDelay;

    const autoSwitch = () => {
      if (Date.now() - lastInteractionTime.current >= delay) {
        const nextView = view === "health"
          ? "pharmacy"
          : view === "pharmacy"
            ? "all-in-one"
            : "health";
        triggerSwitch(nextView);
      }
    };

    // Use setTimeout to run the check and schedule the next check
    // This allows the delay value to be dynamically determined by the 'view'
    autoTimerRef.current = setTimeout(() => {
      autoSwitch();
      // Since the timeout only runs once, we clear it and let the effect re-run
      // when `view` changes, which schedules the next switch.
    }, delay);

    // Cleanup function
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [view, prefersReducedMotion, triggerSwitch]); // Ensure dependencies are correct
  return (
    <div className=" bg-gradient-to-b from-slate-50 to-cyan-50">
      <section
        aria-label="Hero showcase"
        className="relative isolate  w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/40 to-teal-50/60"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.06),transparent_50%)]" />

        <ScrollStack className="w-full min-h-screen">
          <AnimatePresence mode="wait">
            {view === "health" && (
              <ScrollStackItem key="health" itemClassName="bg-gradient-to-br from-cyan-50 to-blue-50">
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -40, transition: { duration: 0.5 } }}
                  className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 z-10"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className="inline-block rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-cyan-900 tracking-wider border border-cyan-200/50 shadow-sm">
                        MEDROX MEDICAL BREAKTHROUGH
                      </span>
                    </motion.div>

                    <motion.h1
                      variants={itemVariants}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-900 via-blue-800 to-teal-900 leading-[1.1] tracking-tight"
                    >
                      Revolutionizing
                      <br />
                      <span className="text-cyan-600">Health Care</span>
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                      The most powerful healthcare platform built specifically for specialists and medical staff. Medrox supports the full workflow of 60+ specializations, digitizing everything from patient diagnosis and appointments  and full  operations. It features over 30 approved, cutting-edge tools within one effortless ecosystem.                    </motion.p>

                    <motion.button
                      variants={itemVariants}
                      onClick={openModal}
                      className="group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 rounded-full shadow-lg shadow-cyan-500/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Explore Medrox platform"
                    >
                      <span className="relative z-10">Explore Medrox</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={imageVariants}
                    className="flex-1 relative w-full max-w-xl lg:max-w-none"
                    style={{ perspective: "1200px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-cyan-900/20 border border-white/50 backdrop-blur-sm">
                      {!imageLoaded.health && (
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 animate-pulse" />
                      )}
                      <img
                        src={IMAGES.doctor}
                        alt="AI Medical Innovation"
                        className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </ScrollStackItem>
            )}

            {view === "pharmacy" && (
              <ScrollStackItem key="pharmacy" itemClassName="bg-gradient-to-br from-teal-50 to-emerald-50">
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -40, transition: { duration: 0.5 } }}
                  className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 z-10"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className="inline-block rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-teal-900 tracking-wider border border-teal-200/50 shadow-sm">
                        MEDROX PHARMACY EVOLUTION
                      </span>
                    </motion.div>

                    <motion.h1
                      variants={itemVariants}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 leading-[1.1] tracking-tight"
                    >
                      Transforming
                      <br />
                      <span className="text-teal-600">Pharmacy Management</span>
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                      World's first, fastest, and easiest all‑in‑one pharmacy platform — from inventory, sales & POS to prescriptions to customer care & More.
                    </motion.p>

                    <motion.button
                      variants={itemVariants}
                      onClick={openModal}
                      className="group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg font-bold text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-full shadow-lg shadow-teal-500/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105 active:scale-95"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Discover Medrox pharmacy platform"
                    >
                      <span className="relative z-10">Discover</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={imageVariants}
                    className="flex-1 relative w-full max-w-xl lg:max-w-none"
                    style={{ perspective: "1200px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-teal-900/20 border border-white/50 backdrop-blur-sm">
                      {!imageLoaded.pharmacy && (
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-100 animate-pulse" />
                      )}
                      <img
                        src={IMAGES.pharmacy}
                        alt="AI Pharmacy Innovation"
                        className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </ScrollStackItem>
            )}

            {view === "all-in-one" && (
              <ScrollStackItem key="all-in-one" itemClassName=" relative overflow-hidden w-full h-full">

                <AllInOneHero openInfo={openModal} />


              </ScrollStackItem>
            )}
          </AnimatePresence>
        </ScrollStack>

        <style dangerouslySetInnerHTML={{
          __html: `
          .scroll-stack-card:hover {
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 200, 150, 0.4) !important;
            transition: box-shadow 0.3s ease;
          }
          .scroll-stack-inner {
            background: linear-gradient(to bottom, rgba(0, 200, 150, 0.2), transparent 15%);
            transform: translateZ(0);
          }
.all-in-one-card {
  background: linear-gradient(
    45deg,
    #0f766e,   /* deep teal */
    #F9F9F9,   /* darker cyan */
    #E3F4F4    /* bold blue */
     
  );
  
  box-shadow:
    0 0 50px rgba(0, 200, 200, 0.7),   /* strong cyan glow */
    0 0 30px rgba(0, 120, 150, 0.6),   /* inner teal depth */
    0 0 70px rgba(0, 255, 255, 0.4);   /* outer aura */
  border-radius: 1rem; /* optional: smooth corners */
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.all-in-one-card:hover {
  transform: scale(1.02);
  box-shadow:
    0 0 60px rgba(0, 255, 255, 0.85),
    0 0 40px rgba(0, 180, 200, 0.7),
    0 0 90px rgba(0, 255, 255, 0.5);
}
          .nav-dot-active {
            background-color: #00ffcc !important;
            box-shadow: 0 0 12px rgba(0, 255, 204, 0.8);
          }
          .particle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.4), transparent);
            animation: particle-float 8s infinite ease-in-out;
          }
          @keyframes particle-float {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
            50% { transform: translateY(-30px) scale(1.3); opacity: 0.6; }
          }
          .beam {
            position: absolute;
            height: 2px;
            background: linear-gradient(to right, transparent, rgba(0, 255, 255, 0.7), transparent);
            animation: beam-slide 5s infinite linear;
          }
          @keyframes beam-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 255, 255, 0.3);
          }
        `
        }} />
        <ContactModal
          isOpen={isOpen || showModal}          // works if either is true
          closeModal={closeModal || closeModals} // uses whichever function is passed
        />
      </section>
    </div>
  );
}
