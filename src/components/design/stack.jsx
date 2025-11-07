import { useLayoutEffect, useRef, useCallback, useState } from 'react';
import React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Removed the interface, will use PropTypes or just assume the shape
// We need to keep ReactNode for JSX compatibility, but as a normal export
// so we'll just import it as part of React
// Since we can't use 'ReactNode' type, we just assume 'children' is a renderable element.

// --- ScrollStackItem Component (JSX) ---
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <motion.div
        className={`scroll-stack-card relative w-full min-h-[65vh] sm:min-h-[70vh] my-4 sm:my-6 lg:my-8 p-4 sm:p-6 lg:p-10 rounded-3xl sm:rounded-[40px] shadow-xl bg-white/80 border border-white/40 ${itemClassName}`}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransformStyle: 'preserve-3d'
        }}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

// --- ScrollStack Component (JSX) ---
const ScrollStack = ({
    children,

    className = '',
    itemDistance = 50,
    itemScale = 0.02,
    itemStackDistance = 12,
    stackPosition = '10%',
    scaleEndPosition = '5%',
    baseScale = 0.94,
    rotationAmount = 0.8,
    blurAmount = 0.8,
    useWindowScroll = false,
    onStackComplete
}) => {
    // Removed type annotations from useRef
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const cardsRef = useRef([]); // Initialized as an empty array for HTMLElements
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);
    const [showAllInOne, setShowAllInOne] = useState(false);
    const rafRef = useRef();

    const { scrollYProgress } = useScroll({
        target: scrollerRef,
        offset: ["start start", "end end"]
    });

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return { scrollTop: 0, containerHeight: 0, scrollContainer: null };
            return {
                scrollTop: scroller.scrollTop,
                containerHeight: scroller.clientHeight,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        (element) => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current || showAllInOne) return;
        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = getElementOffset(card);
            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCardTop = getElementOffset(cardsRef.current[j]);
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }
                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            const newTransform = {
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                card.style.transform = `scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
                lastTransformsRef.current.set(i, newTransform);
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        calculateProgress,
        parsePercentage,
        getScrollData,
        getElementOffset,
        showAllInOne
    ]);

    const handleScroll = useCallback(() => {
        if (showAllInOne) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateCardTransforms);
    }, [showAllInOne, updateCardTransforms]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Removed the type assertion (as HTMLElement[])
        const cards = Array.from(
            scroller.querySelectorAll('.scroll-stack-card')
        );
        cardsRef.current = cards;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'center center';
            card.style.backfaceVisibility = 'hidden';
            card.style.WebkitBackfaceVisibility = 'hidden';
        });

        const scrollTarget = useWindowScroll ? window : scroller;
        scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

        updateCardTransforms();

        return () => {
            scrollTarget.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            stackCompletedRef.current = false;
            cardsRef.current = [];
            lastTransformsRef.current.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        handleScroll,
        updateCardTransforms
    ]);

    const containerClassName = `relative w-full min-h-screen ${useWindowScroll ? '' : 'overflow-y-auto'
        } ${className}`;

    const containerStyles = {
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
    };

    return (
        <motion.div
            className={containerClassName}
            ref={scrollerRef}
            style={containerStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
            .scroll-stack-card {
              transition: box-shadow 0.3s ease;
            }

            
            .scroll-stack-card:hover {
              box-shadow: 0 20px 60px rgba(0, 200, 200, 0.2), 0 0 40px rgba(6, 182, 212, 0.15) !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .scroll-stack-card {
                transition: none !important;
                animation: none !important;
              }
            }
          `
            }} />
            <div className="scroll-stack-inner pt-[5vh] sm:pt-[8vh] px-4 sm:px-6 lg:px-12 pb-[20vh] min-h-screen relative ">
                {children}
            </div>





        </motion.div>
    );
};

export default ScrollStack;