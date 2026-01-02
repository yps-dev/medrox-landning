import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Play, Maximize2, X } from 'lucide-react';

import LaserFlow from './LaserFlow';



const videos = [
    {
        id: 'main',
        title: 'System Core Logic',
        src: 'https://www.dropbox.com/scl/fi/3xlusyip6jc2b9qdtpj6k/main.mp4?rlkey=4o04resyer6vmjixos1adyq96&st=5qr1i145&raw=1',
        length: '02:15',
        type: 'Main Module',
        description: 'Deep dive into the neural architecture backbone.',
        color: '#06b6d4', // Cyan
    },
    {
        id: 'sub1',
        title: 'Real-time Metrics',
        src: 'https://www.dropbox.com/scl/fi/jgf10xbl272vsnznrjzwv/doc.mp4?rlkey=bdkm9649d65e4lllkeidivnyt&st=04a0nozo&raw=1',
        length: '00:45',
        type: 'Analytics',
        description: 'Live data stream visualization.',
        color: '#10b981', // Emerald
    },
    {
        id: 'sub2',
        title: 'Security Protocols',
        src: 'https://www.dropbox.com/scl/fi/pszsxxhydsntvhhnjhzcv/user.mp4?rlkey=1lkv3yo74jokhkbivkg547z4t&st=txthefr2&raw=1',
        length: '00:30',
        type: 'Security',
        description: 'Bank-grade encryption layers.',
        color: '#f59e0b', // Amber
    },
    {
        id: 'sub3',
        title: 'Global Sync',
        src: 'https://www.dropbox.com/scl/fi/rrsonhhw7sos5hhfvio87/rep.mp4?rlkey=08e9t1ikt044ibgul7va90y6d&st=tm7ncgt9&raw=1',
        length: '00:50',
        type: 'Network',
        description: 'Instant node propagation demo.',
        color: '#8b5cf6', // Violet
    },
];

const VideoCard = ({ video, isMain, onColorChange, onFocus, onBlur, focusedId, onClick, isModalOpen, className }) => {
    const isHovered = focusedId === video.id;
    const isDimmed = (focusedId && !isHovered) || isModalOpen;
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isReadyToPlay, setIsReadyToPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // --- HYPER-SPEED BUFFER PRIMING ---
    useEffect(() => {
        if (!videoRef.current) return;

        const primeBuffer = async () => {
            try {
                // Force a tiny play/pause to fill the GPU and network buffer
                await videoRef.current.play();
                videoRef.current.pause();
                // If it successfully plays and pauses, it's essentially ready
                setIsReadyToPlay(true);
            } catch (err) {
                // Autoplay might be blocked, but the buffer will still fill
                console.log("Buffer priming ready state pending...");
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    primeBuffer();
                    observer.disconnect();
                }
            },
            { rootMargin: '400px' } // Start priming 400px before it enters
        );

        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    // Sync time for seamless transition
    useEffect(() => {
        if (!videoRef.current) return;
        const interval = setInterval(() => {
            if (videoRef.current && isPlaying) {
                setCurrentTime(videoRef.current.currentTime);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Speed Optimization: Only play sub-videos on hover
    useEffect(() => {
        if (!videoRef.current) return;

        if (isHovered && !isModalOpen) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        } else if (!isMain) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isHovered, isMain, isModalOpen]);

    // --- 3D TILT & SPOTLIGHT LOGIC ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the movement with springs
    const springConfig = { stiffness: 100, damping: 30 };
    const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), springConfig);

    // Spotlight movement (GPU accelerated via translate)
    const spotlightX = useSpring(x, springConfig);
    const spotlightY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (isModalOpen) return;
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to center of card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        if (!isModalOpen) {
            onBlur();
            x.set(0);
            y.set(0);
        }
    };

    useEffect(() => {
        if (isHovered && onColorChange && !isModalOpen) {
            onColorChange(video.color);
        }
    }, [isHovered, video.color, onColorChange, isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            videoRef.current?.pause();
            setIsPlaying(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => setIsPlaying(false));
                    setIsPlaying(true);
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.2 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => videoRef.current && observer.unobserve(videoRef.current);
    }, [isModalOpen]);

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = true;
    }, []);

    return (
        <motion.div
            className={`relative rounded-3xl group cursor-pointer 
                ${typeof className !== 'undefined' ? className : (isMain ? 'col-span-1 lg:col-span-3 lg:row-span-2 min-h-[400px] lg:min-h-[500px]' : 'col-span-1 min-h-[200px]')}
            `}
            onMouseEnter={() => !isModalOpen && onFocus(video.id)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            {/* INNER CARD (TRANSFORM TARGET) */}
            <motion.div
                layoutId={`card-${video.id}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(video, currentTime);
                }}
                className="w-full h-full relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1221] md:bg-white/5 md:backdrop-blur-md transition-all duration-300 transform-gpu will-change-transform cursor-pointer"
                style={{
                    scale: isHovered && !isModalOpen ? 1.02 : isDimmed ? 0.98 : 1,
                    opacity: isDimmed ? 0.4 : 1,
                }}
            >
                {/* DIM OVERLAY (Cheaper than Grayscale filter) */}
                {isDimmed && (
                    <div className="absolute inset-0 bg-black/40 z-40 pointer-events-none" />
                )}
                {/* SPOTLIGHT EFFECT */}
                {/* SPOTLIGHT EFFECT (Optimized - Desktop Only) */}
                {!isDimmed && (
                    <motion.div
                        className="hidden md:block absolute -inset-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(400px circle at center, rgba(255,255,255,0.12), transparent 70%)`,
                            x: spotlightX,
                            y: spotlightY,
                        }}
                    />
                )}

                {/* LASER IMPACT GLOW (Only for Main Card) */}
                {isMain && !isModalOpen && (
                    <>
                        {/* The "Hit" Point */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[3px] bg-white z-50 shadow-[0_0_20px_10px_rgba(255,255,255,0.7)] pointer-events-none rounded-b-full">
                            <motion.div
                                className="absolute inset-0 bg-white blur-[2px]"
                                animate={{ opacity: [0.8, 1, 0.8], scaleX: [0.9, 1.1, 0.9] }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                            />
                        </div>

                        {/* The "Spread" */}
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-40 pointer-events-none opacity-80" />

                        {/* Atmospheric Top Haze */}
                        <motion.div
                            className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-30"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </>
                )}

                {/* SHIMMER BORDER */}
                {!isDimmed && (
                    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/50 transition-colors duration-500 z-20" />
                )}

                {/* PREVIEW VIDEO */}
                <div className="absolute inset-0 z-0 select-none bg-slate-900 overflow-hidden">
                    {/* Neural Poster (Fast Placeholder) */}
                    <div
                        className={`absolute inset-0 z-0 transition-opacity duration-1000 bg-gradient-to-br from-slate-900 via-slate-800 to-black ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent"
                        />
                    </div>

                    <video
                        ref={videoRef}
                        src={video.src}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsLoaded(true)}
                        onCanPlayThrough={() => setIsReadyToPlay(true)}
                        className={`w-full h-full object-cover transition-all duration-700 will-change-transform transform-gpu ${isLoaded && isReadyToPlay ? 'opacity-90' : 'opacity-0'} group-hover:opacity-100`}
                        style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0) translateZ(0)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* ACTIVE GLOW LAYER */}
                {isHovered && !isModalOpen && (
                    <motion.div
                        layoutId="active-glow"
                        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                        style={{ backgroundColor: video.color, mixBlendMode: 'overlay' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                    />
                )}

                {/* CONTENT LAYER */}
                <div className="relative z-30 w-full h-full flex flex-col justify-between p-6 md:p-8 transform-gpu">
                    <div className="flex justify-between items-start">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm transition-opacity duration-300 ${isDimmed ? 'opacity-50' : 'opacity-100'}`}>
                            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: video.color }} />
                            <span className="text-xs font-mono text-white/70 tracking-wider uppercase">{video.type}</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick(video, currentTime);
                            }}
                            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <Maximize2 size={16} />
                        </motion.button>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{ scale: isHovered && !isModalOpen ? 1.2 : 1 }}
                            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl
                               ${(isHovered && !isModalOpen) ? 'bg-white/30 border-white/50 shadow-white/20' : ''}
                            `}
                        >
                            <Play className="ml-1 text-white fill-white opacity-90" size={32} />
                        </motion.div>
                    </div>

                    <div className={`mt-auto transition-opacity duration-300 ${isDimmed ? 'opacity-0' : 'opacity-100'}`}>
                        <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 ${isMain ? 'md:text-4xl' : ''}`}>
                            {video.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 max-w-[90%] line-clamp-2">
                            {video.description}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs text-white/40 font-mono">
                            <span>{video.length}</span>
                            <span>4K • 60FPS</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Memoize the VideoCard to prevent unnecessary re-renders
const VideoCardMemo = React.memo(VideoCard);

// --- MAIN GRID COMPONENT ---
export default function VideoFeatures({ onColorChange, onFocusChange }) {
    const [focusedId, setFocusedId] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null); // For Expansion

    const handleFocus = (id) => {
        if (selectedVideo) return; // Don't focus if modal is open
        setFocusedId(id);
        if (onFocusChange) onFocusChange(true);
    };

    const handleBlur = () => {
        if (selectedVideo) return;
        setFocusedId(null);
        if (onFocusChange) onFocusChange(false);
    };

    const handleCardClick = (video, time = 0) => {
        setSelectedVideo({ ...video, startTime: time });
        if (onFocusChange) onFocusChange(true); // Keep focus mode ON when modal is open
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
        setFocusedId(null);
        if (onFocusChange) onFocusChange(false);
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
                {/* MAIN CARD WITH LASER OVERLAY */}
                <div className="col-span-1  lg:col-span-3 lg:row-span-2 min-h-[400px] lg:min-h-[500px] relative">
                    {/* VIDEO CARD (BASE) */}
                    <VideoCard
                        video={videos[0]}
                        isMain={true}
                        onColorChange={onColorChange}
                        focusedId={focusedId}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onClick={handleCardClick}
                        isModalOpen={!!selectedVideo}
                        className="w-full h-full"
                    />

                    {/* LASER FLOW OVERLAY (ON TOP OF BORDER) */}

                </div>

                {videos.slice(1).map((v) => (
                    <VideoCardMemo
                        key={v.id}
                        video={v}
                        isMain={false}
                        onColorChange={onColorChange}
                        focusedId={focusedId}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onClick={handleCardClick}
                        isModalOpen={!!selectedVideo}
                    />
                ))}
            </div>

            {/* EXPANDED VIDEO MODAL */}
            {createPortal(
                <AnimatePresence>
                    {selectedVideo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
                            style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0,0,0,0.8)' }} // Original style, will be overridden by class
                            onClick={handleCloseModal}
                        >
                            {/* Backdrop with enhanced styles */}
                            <motion.div
                                className="absolute inset-0 bg-black/40 backdrop-blur-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                                onClick={handleCloseModal} // Ensure clicking backdrop closes modal
                            />

                            {/* Close Button */}
                            <button
                                className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[60]"
                                onClick={handleCloseModal}
                            >
                                <X size={32} />
                            </button>

                            <motion.div
                                layoutId={`card-${selectedVideo.id}`}
                                className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10" // Added z-10 to ensure it's above the backdrop
                                onClick={(e) => e.stopPropagation()} // Click inside modal doesn't close
                            >
                                <video
                                    src={selectedVideo.src}
                                    autoPlay
                                    loop
                                    controls
                                    playsInline
                                    muted={false}
                                    onLoadedMetadata={(e) => {
                                        if (selectedVideo.startTime) {
                                            e.target.currentTime = selectedVideo.startTime;
                                        }
                                    }}
                                    className="w-full h-full object-contain"
                                />

                                {/* Overlay info */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl font-bold text-white mb-2"
                                    >
                                        {selectedVideo.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg text-gray-300"
                                    >
                                        {selectedVideo.description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
