import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-[1.5rem] max-lg:flex-wrap pricing-container">
      {pricing.map((item, index) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3 relative overflow-hidden animate-card-glow"
          style={{ "--index": index }}

        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[-1]"
          ></div>
          <div
            className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-700 z-[-2]"
          ></div>

          <h4 className="h4 mb-4 text-3xl font-extrabold animate-title-pulse">
            {item.title}
          </h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50 animate-text-fade">
            {item.description}
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            {item.price && (
              <>
                <div className="text-[5.5rem] leading-none font-bold animate-price-glow">
                  <span
                    style={{
                      background: "linear-gradient(45deg, #26C6DA, #2ECC71, #00CED1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="h3 ml-2 text-n-1/50">Birr</div>
              </>
            )}
          </div>

          <Button
            className="w-full mb-6 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-button-pulse relative overflow-hidden group"
            href={item.price ? "/pricing" : "mailto:medrox23@gmail.com"}
            aria-label={item.price ? `Get started with ${item.title} plan` : "Contact Medrox"}
          >
            <span className="relative z-10">{item.price ? "Get started" : "Contact us"}</span>
            <span className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 origin-center"></span>
          </Button>

          <ul>
            {item.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-start py-5 border-t border-n-6 animate-feature-slide"
                style={{ animationDelay: `${featureIndex * 0.1}s` }}
              >
                <svg
                  className="w-6 h-6 text-cyan-500 animate-check-glow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <p className="body-2 ml-4 text-n-1/70">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{`
        /* Pricing Container */
        .pricing-container {
          perspective: 1000px;
        }

.animate-card-glow {

  position: relative;
  background: linear-gradient(135deg, #1e1e1e, #121212);
  overflow: hidden;
  z-index: 0;
}

.animate-card-glow::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: conic-gradient(
  from 0deg,
  #e0f7fa,  /* soft light cyan */
  #80deea,  /* breezy teal */
  #b0bec5,  /* silvery steel */
  #26c6da,  /* vibrant teal */

  #e0f7fa
);

  animation: rotateGradient 12s linear infinite;
  z-index: -2;
  filter: blur(100px);
  opacity: 0.4;
}

.animate-card-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05), transparent 70%);
  z-index: -1;
}

@keyframes rotateGradient {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

        /* Title Animation */
        .animate-title-pulse {
          position: relative;
          transition: all 0.5s ease;
        }
        .animate-title-pulse:hover {
          transform: scale(1.05);
          text-shadow: 0 0 15px rgba(38, 198, 218, 0.6);
        }
        .animate-title-pulse::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(38, 198, 218, 0.3), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseEffect 3s infinite;
        }

        /* Text Animation */
        .animate-text-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: textFadeIn 1s ease-out forwards;
          animation-delay: calc(0.2s + var(--index, 0) * 0.2s);
        }

        /* Price Animation */
        .animate-price-glow {
          position: relative;
          transition: all 0.5s ease;
        }
        .animate-price-glow:hover {
          filter: drop-shadow(0 0 15px rgba(46, 204, 113, 0.7));
        }

        /* Button Animation */
        .animate-button-pulse {
          position: relative;
        }
        .animate-button-pulse:hover {
          transform: scale(1.05);
        }
        .animate-button-pulse::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(0, 206, 209, 0.4);
          border-radius: 50%;
          transform: translateX(-50%);
          transition: all 0.5s ease;
        }
        .animate-button-pulse:hover::before {
          width: 20px;
          height: 20px;
          opacity: 1;
        }

        /* Feature Animation */
        .animate-feature-slide {
          opacity: 0;
          transform: translateX(-20px);
          animation: featureSlide 1s ease-out forwards;
        }
        .animate-check-glow {
          transition: all 0.5s ease;
        }
        .animate-check-glow:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 0 10px rgba(38, 198, 218, 0.7));
        }

        /* Keyframes */
        @keyframes pulseEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
        @keyframes textFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes featureSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .animate-card-glow {
            width: 100%;
            max-width: 20rem;
            margin: 0 auto;
          }
          .animate-title-pulse {
            font-size: 1.75rem;
          }
          .animate-price-glow {
            font-size: 4rem;
          }
          .animate-button-pulse {
            padding: 0.75rem;
            font-size: 1rem;
          }
        }

        /* High contrast mode for accessibility */
        @media (prefers-contrast: high) {
          .animate-card-glow {
            background: #1c2526;
            border-color: #00695c;
          }
          .animate-title-pulse,
          .animate-price-glow span {
            background: linear-gradient(45deg, #00695c, #1b5e20, #00695c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .animate-button-pulse {
            background: linear-gradient(to right, #00695c, #1b5e20);
          }
          .animate-button-pulse:hover {
            background: linear-gradient(to right, #004d40, #134c1b);
          }
          .animate-check-glow {
            stroke: #00695c;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-card-glow,
          .animate-title-pulse,
          .animate-text-fade,
          .animate-price-glow,
          .animate-button-pulse,
          .animate-feature-slide,
          .animate-check-glow,
          .animate-title-pulse::after,
          .animate-button-pulse::before {
            animation: none;
            transform: none;
            transition: none;
            filter: none;
            box-shadow: none;
            text-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PricingList;