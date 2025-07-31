// import ButtonGradient from "./assets/svg/ButtonGradient";
// import Benefits from "./components/Benefits";
// import Collaboration from "./components/Collaboration";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// // import ThreeDMarquee from "./components/featur";
// import Pricing from "./components/Pricing";
// import Roadmap from "./components/Roadmap";
// import Services from "./components/Services";

// import AnimatedSection from "./components/design/AnimatedSection";

// const App = () => {
//   return (
//     <>

//       <Header />
//       <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-x-hidden scroll-smooth">

//         <Hero />
//         {/* <ThreeDMarquee /> */}
//         <AnimatedSection>
//           <Benefits />
//         </AnimatedSection>

//         <AnimatedSection>
//           <Collaboration />
//         </AnimatedSection>

//         <AnimatedSection>
//           <Services />
//         </AnimatedSection>

//         <AnimatedSection>
//           <Pricing />
//         </AnimatedSection>

//         <AnimatedSection>
//           <Roadmap />
//         </AnimatedSection>

//         <Footer />
//       </div>

//       <ButtonGradient />
//     </>
//   );
// };

// export default App;
import { useState } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
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
const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Header openModal={openModal} />

      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-x-hidden scroll-smooth">
        <Hero />
        <AnimatedSection>
          <ThreeDMarquee />
        </AnimatedSection>
        <AnimatedSection>
          <Benefits />
        </AnimatedSection>
        <AnimatedSection>
          <Collaboration />
        </AnimatedSection>
        <AnimatedSection>
          <Services />
        </AnimatedSection>
        <AnimatedSection>
          <Pricing />
        </AnimatedSection>
        <AnimatedSection>
          <Roadmap />
        </AnimatedSection>
        <Footer />
      </div>

      {/* Modal must be placed here, outside all scrollable content */}
      <SignupModal show={showModal} onClose={closeModal} />

      <ButtonGradient />
    </>
  );
};

export default App;
