// components/ScrollFigure.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import smallSphere from "../../assets";

gsap.registerPlugin(ScrollTrigger);

const ScrollFigure = () => {
    const figureRef = useRef();

    useEffect(() => {
        gsap.to(figureRef.current, {
            yPercent: 200,
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });
    }, []);

    return (
        <img
            ref={figureRef}
            src={smallSphere}
            alt="Scroll Figure"
            className="fixed z-40 top-20 right-8 w-24 opacity-90 transition-transform duration-300 ease-in-out"
        />
    );
};

export default ScrollFigure;
