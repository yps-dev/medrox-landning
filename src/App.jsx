
"use client";
import React, { useState } from "react";
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

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <ErrorBoundary>
      <Header openModal={openModal} />
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-x-hidden scroll-smooth">
        {/* Add animations directly in Hero.jsx */}
        <Hero />
        {/* Add animations directly in ThreeDMarquee.jsx */}
        <ThreeDMarquee />
        {/* Add animations directly in Benefits.jsx */}
        <Benefits />
        {/* Add animations directly in Collaboration.jsx */}
        <Collaboration />
        {/* Add animations directly in Services.jsx */}
        <Services />
        {/* Add animations directly in Pricing.jsx */}
        <Pricing />
        {/* Add animations directly in Roadmap.jsx */}
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
