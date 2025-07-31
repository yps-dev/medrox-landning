import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "../assets";
import Carousel from "./corusel";
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Services = () => {
  return (
    <Section id="how-to-use">
      <motion.div
        className="container"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <motion.div variants={fadeInUp}>
          <Heading
            title="Medrox Redefining Care "
            text="The world’s first platform to unite diagnostics, access, and local care—empowering every specialist and every patient, effortlessly."
          />

        </motion.div>

        <motion.div variants={fadeInUp}>
          <Carousel />
        </motion.div>

        <div className="relative">
          {/* Left Image Section */}
          <motion.div
            className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]"
            variants={fadeInUp}
          >
            <div className="absolute top-0 left-0 max-w-4xl h-full pointer-events-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                alt="Smartest AI"
                height={730}
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4"> Managable</h4>
              <p className="body-2 mb-[3rem] text-n-2">
                Medrox unlocks the potential of Digitalized Medical system
              </p>
              <ul className="body-2">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img width={24} height={24} className="" src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Smart Diagnostic Tool */}
          <motion.div
            className="relative z-1 grid gap-5 lg:grid-cols-2"
            variants={staggerContainer}
          >
            <motion.div
              className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden"
              variants={fadeInUp}
            >
              <div className="absolute inset-0">
                <img
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">

                <h4 className="h4 mb-4">Smart Diagnostic Tool </h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Medrox includes a smart diagnostic assistant designed for specialists—helping support high medical decisions faster and more accurately.
                </p>
                <ul className="body-2">
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">Supports diagnosis with pre-filled patient vitals</p>
                  </li>
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">Integrated into specialist dashboard</p>
                  </li>
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">Recommends follow-up steps or referrals</p>
                  </li>
                  <li className="flex items-start py-4 border-t border-n-6">
                    <img width={24} height={24} src={check} />
                    <p className="ml-4 font-bold text-lg">The world’s first AI diagnostic assistant—powering smarter decisions with precision data.</p>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Smart Staff & Medical Management */}
            <motion.div
              className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]"
              variants={fadeInUp}
            >
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Smart Staff & Medical Record and Medicine Management</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  Manage your staff, shifts, inventory, and prescriptions all in one dashboard. Medrox empowers your healthcare team with the tools they need.
                </p>
                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${index === 2
                        ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                        : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                        }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img src={item} width={24} height={24} alt="icon" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={service3}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="Scary robot"
                />
                <VideoBar />
              </motion.div>
            </motion.div>
          </motion.div>

          <Gradient />
        </div>
      </motion.div>
    </Section>
  );
};

export default Services;
