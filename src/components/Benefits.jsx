"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Heading from "./Heading";
import { benefits } from "../constants";
import ClipPath from "../assets/svg/ClipPath";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import { ScrollParallax } from 'react-just-parallax';
const backgroundSets = [
  ["#00CED1", "#20B2AA"],
  ["#008B8B", "#00CED1"],
  ["#20B2AA", "#40E0D0"],
  ["#00FFFF", "#7FFFD4"],
];

export default function Benefits() {
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);
  const [bgIndex, setBgIndex] = useState(0);

  // 3D animated wave background using THREE.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.PlaneGeometry(50, 50, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color(backgroundSets[bgIndex][0]) },
        colorB: { value: new THREE.Color(backgroundSets[bgIndex][1]) },
      },

      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z = sin(pos.x * 4.0 + time) * 0.5 + cos(pos.y * 4.0 + time) * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
      varying vec2 vUv;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float time;
      void main() {
        float wave = sin(time + vUv.y * 10.0) * 0.5 + 0.5;
        vec3 color = mix(colorA, colorB, wave);
        gl_FragColor = vec4(color, 0.5);
      }
    `,

      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
      const now = Date.now();
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();


    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [bgIndex]);

  // Scroll observer to change background color dynamically
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            setBgIndex(index % backgroundSets.length);
          }
        });
      },
      { threshold: 0.5 }
    );

    cardsRef.current.forEach((card) => observer.observe(card));
    return () => cardsRef.current.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <section className="relative min-h-screen bg-[#102a2e] text-white px-6 py-24 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <div className="absolute inset-0 -z-20 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center mb-20 relative group">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent 
      bg-gradient-to-r from-[#fafeff] via-[#fcffff] to-[#0f766e]
      animate-pulse
      transition-all duration-700 ease-in-out
      group-hover:scale-[1.03]
      group-hover:saturate-[1.4]
      drop-shadow-[0_2px_10px_rgba(20,184,166,0.6)]"
        >
          Smarter, Smoother, Sleeker Healthcare
        </h1>

        {/* ✨ Optional shimmer line on hover */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
        />
      </div>


      <div className="flex flex-wrap justify-center gap-12">

        {benefits.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="group relative w-[340px] md:w-[360px] h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-xl backdrop-blur-md bg-white/5 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
          >
            {/* Reveal image with nice transition */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100">
              <img
                src={item.backgroundUrl || "/assets/images/fallback.png"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col h-full p-8">
              <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-200 mb-auto opacity-90 leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center mt-6">
                <img
                  src={item.iconUrl || "/assets/images/fallback.png"}
                  alt={item.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="ml-auto text-xs uppercase font-semibold tracking-wider text-white">
                  Learn more
                </p>
                <Arrow className="ml-2" />
              </div>
            </div>

            {item.light && <GradientLight />}
            <ClipPath />
          </div>
        ))}

      </div>

    </section>
  );
}
