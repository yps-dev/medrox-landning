"use client";
import React, { useState, useEffect, useRef } from "react";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import AnimatedSection from "./components/design/AnimatedSection";
import SignupModal from "./components/modal";
import ThreeDMarquee from "./components/featur";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl text-white font-bold">Something went wrong.</h2>
          <p className="text-gray-300">Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let orbs = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Orb {
      constructor(x, y, color, radius = 220) { // bigger radius
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.vx = (Math.random() - 0.5) * 0.3; // slower for smoothness
        this.vy = (Math.random() - 0.5) * 0.3;
      }
      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.6, this.color.replace("0.25", "0.15")); // softer edge
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // bounce softly off edges
        if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;
        this.draw();
      }
    }

    function initOrbs() {
      orbs = [
        new Orb(width * 0.3, height * 0.4, "rgba(45, 212, 191, 0.25)"), // teal
        new Orb(width * 0.7, height * 0.3, "rgba(34, 211, 238, 0.25)"), // cyan
        new Orb(width * 0.5, height * 0.7, "rgba(56, 189, 248, 0.25)"), // sky blue
        new Orb(width * 0.2, height * 0.8, "rgba(20, 184, 166, 0.25)"), // emerald
        new Orb(width * 0.8, height * 0.6, "rgba(6, 182, 212, 0.25)")   // light cyan
      ];
    }
    initOrbs();

    let mouse = { x: width / 2, y: height / 2 };
    const moveHandler = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // make first orb follow mouse
      orbs[0].x += (mouse.x - orbs[0].x) * 0.04;
      orbs[0].y += (mouse.y - orbs[0].y) * 0.04;
    };
    const touchHandler = e => {
      const t = e.touches[0];
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      orbs[0].x += (mouse.x - orbs[0].x) * 0.04;
      orbs[0].y += (mouse.y - orbs[0].y) * 0.04;
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("touchmove", touchHandler);

    function animate() {
      ctx.clearRect(0, 0, width, height);
      orbs.forEach(orb => orb.update());
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("touchmove", touchHandler);
    };
  }, []);


  return (
    <ErrorBoundary>
      <Header openModal={openModal} />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <canvas ref={canvasRef} id="orbCanvas" className="w-full h-full"></canvas>
      </div>

      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-x-hidden scroll-smooth">
        <Hero />
        <ThreeDMarquee />
        <Benefits />
        <AnimatedSection>
          <Collaboration />
        </AnimatedSection>

        <AnimatedSection>
          <Services />
        </AnimatedSection>

        <Pricing />
        <AnimatedSection>
          <Roadmap />
        </AnimatedSection>
        <Footer />
      </div>
      <SignupModal show={showModal} onClose={closeModal} />
    </ErrorBoundary>
  );
};

export default App;
