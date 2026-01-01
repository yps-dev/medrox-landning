'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
    const {
        texts,
        rotationInterval = 3000,
        loop = true,
        auto = true,
        onNext,
        mainClassName,
        elementLevelClassName,
        ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const handleIndexChange = useCallback(
        (newIndex) => {
            setCurrentTextIndex(newIndex);
            if (onNext) onNext(newIndex);
        },
        [onNext]
    );

    const next = useCallback(() => {
        const nextIndex =
            currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
        if (nextIndex !== currentTextIndex) {
            handleIndexChange(nextIndex);
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
        const prevIndex =
            currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
        if (prevIndex !== currentTextIndex) {
            handleIndexChange(prevIndex);
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
        (index) => {
            const validIndex = Math.max(0, Math.min(index, texts.length - 1));
            if (validIndex !== currentTextIndex) {
                handleIndexChange(validIndex);
            }
        },
        [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
        if (currentTextIndex !== 0) {
            handleIndexChange(0);
        }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
        ref,
        () => ({
            next,
            previous,
            jumpTo,
            reset,
        }),
        [next, previous, jumpTo, reset]
    );

    useEffect(() => {
        if (!auto) return;
        const intervalId = setInterval(next, rotationInterval);
        return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
        <div
            className={cn('relative ', mainClassName)}
            {...rest}
        >
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className={cn(
                        'text-lg sm:text-2xl lg:text-4xl font-semibold text-white',

                    )}
                >
                    {texts[currentTextIndex]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
