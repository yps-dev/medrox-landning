import { useEffect, useRef, useState } from "react";

const AutoScrollWhoIsItFor = ({ whoIsItFor }) => {
    const scrollRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let scrollAmount = 0;
        let animationFrame;

        const scroll = () => {
            if (!isPaused) {
                scrollAmount += 0.5;
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    scrollAmount = 0;
                }
                container.scrollLeft = scrollAmount;
            }
            animationFrame = requestAnimationFrame(scroll);
        };

        animationFrame = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrame);
    }, [isPaused]);

    return (
        <div className="relative mt-24 px-4 md:px-8">
            {/* Section Header */}
            <h3 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 animate-gradient">
                Who Is It For?
            </h3>

            {/* Auto-scrolling row */}
            <div
                ref={scrollRef}
                className="mt-12 flex overflow-x-auto gap-8 max-w-6xl mx-auto no-scrollbar scroll-smooth py-4 px-1"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {whoIsItFor.map((item, index) => (
                    <div
                        key={item.id}
                        className="min-w-[280px] w-full relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-white/20 hover:scale-[1.03] transition-transform duration-500 cursor-pointer group"
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Icon + Title */}
                        <div className="flex items-center mb-4">
                            <div className="mr-4 text-cyan-600 text-3xl group-hover:scale-110 group-hover:drop-shadow-glow transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h6 className="text-lg font-semibold text-cyan-700 group-hover:text-emerald-600 transition-colors">
                                {item.title}
                            </h6>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 text-sm">{item.description}</p>

                        {/* Hover glow */}
                        {hoveredCard === item.id && (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-teal-100/10 rounded-3xl animate-pulse-glow pointer-events-none z-0" />
                        )}

                        {/* Edge shimmer */}
                        <div className="absolute -inset-px bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-80 transition-opacity duration-700 rounded-3xl blur-md z-0" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutoScrollWhoIsItFor;
