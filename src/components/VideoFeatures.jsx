import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ArrowUpRight } from 'lucide-react';
import { ContainerScroll } from './design/ContainerScroll';
import { cn } from '../lib/utils';

// --- VIDEO DATABASE ---
const videos = [
    {
        id: 'main-demo', // MAIN HERO
        title: 'AllIn one Platform',
        subtitle: 'Architecture',
        src: 'https://www.dropbox.com/scl/fi/3xlusyip6jc2b9qdtpj6k/main.mp4?rlkey=4o04resyer6vmjixos1adyq96&st=5qr1i145&raw=1',
        description: 'Deep dive into the architecture.',
        color: '#007BFF',
    },
    {
        id: 'analytics', // SUB 1
        title: 'Built for Every Specialists',
        subtitle: 'Lifestyle not just work',
        src: 'https://www.dropbox.com/scl/fi/jgf10xbl272vsnznrjzwv/doc.mp4?rlkey=bdkm9649d65e4lllkeidivnyt&st=04a0nozo&raw=1',
        description: 'Processing millions of data points.',
        color: '#10b981',
    },
    {
        id: 'security', // SUB 2
        title: 'Empowering lives',
        subtitle: 'With care that fits life.',
        src: 'https://www.dropbox.com/scl/fi/pszsxxhydsntvhhnjhzcv/user.mp4?rlkey=1lkv3yo74jokhkbivkg547z4t&st=txthefr2&raw=1',
        description: 'End-to-end encryption protocols.',
        color: '#f59e0b',
    },
    {
        id: 'network', // SUB 3
        title: 'Easy access',
        subtitle: 'Built for daily life.',
        src: 'https://www.dropbox.com/scl/fi/rrsonhhw7sos5hhfvio87/rep.mp4?rlkey=08e9t1ikt044ibgul7va90y6d&st=tm7ncgt9&raw=1',
        description: 'Instant node propagation.',
        color: '#8b5cf6',
    },
];
// --- APPLE SPATIAL TYPING COMPONENT ---
const TypingShineText = React.memo(({ text, subtext, className }) => {
    const letters = Array.from(text || "");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1
            },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 15,
            filter: "blur(12px)",
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <div className={cn("flex flex-col transform-gpu will-change-transform", className)}>
            <motion.div
                className="relative flex flex-wrap"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {letters.map((letter, index) => (
                    <motion.span
                        variants={child}
                        key={index}
                        className="relative inline-block"
                    >
                        <span className="relative z-10 text-slate-900">
                            {letter === " " ? "\u00A0" : letter}
                        </span>

                        <span
                            className="absolute top-full left-0 opacity-[0.08] blur-[2px] scale-y-[-1] select-none pointer-events-none"
                            aria-hidden="true"
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>

                        <motion.span
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                                width: '20px',
                                skewX: '-20deg',
                            }}
                            animate={{ x: ['-100%', '300%'] }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                                delay: index * 0.05,
                                repeatDelay: 2
                            }}
                        />
                    </motion.span>
                ))}
            </motion.div>

            {subtext && (
                <motion.p
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 5 }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm text-slate-400 font-medium mt-1 tracking-tight"
                >
                    {subtext}
                </motion.p>
            )}
        </div>
    );
});

TypingShineText.displayName = "TypingShineText";

// --- THUMBNAIL WITH CONTROLS ---
const VideoThumbnail = React.memo(({ video, className, onClick }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => { });
                        setIsPlaying(true);
                    } else {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <motion.div
            className={cn(
                "group relative overflow-hidden cursor-pointer rounded-3xl bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu will-change-transform",
                className
            )}
            layoutId={`video-container-${video.id}`}
            onClick={() => onClick(video)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
        >
            <video
                ref={videoRef}
                src={video.src}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                    <button onClick={togglePlay} className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 border border-white/10 transition-all">
                        {isPlaying ? <Pause className="fill-white text-white" size={14} /> : <Play className="fill-white text-white ml-0.5" size={14} />}
                    </button>
                    <button onClick={toggleMute} className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 border border-white/10 transition-all">
                        {isMuted ? <VolumeX className="text-white" size={14} /> : <Volume2 className="text-white" size={14} />}
                    </button>
                </div>
            </div>

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowUpRight className="text-slate-900 w-4 h-4" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20">
                {isPlaying && (
                    <motion.div
                        className="h-full bg-blue-500"
                        layoutId={`thumb-progress-${video.id}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                    />
                )}
            </div>
        </motion.div>
    );
});

VideoThumbnail.displayName = "VideoThumbnail";

// --- HERO VIDEO CONTROL WRAPPER ---
const HeroVideo = React.memo(({ video, onClick }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => { });
                        setIsPlaying(true);
                    } else {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="relative w-full h-full group transform-gpu will-change-transform" onClick={() => onClick(video)}>
            <video
                ref={videoRef}
                src={video.src}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
                draggable={false}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={togglePlay} className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 border border-white/10 transition-all">
                    {isPlaying ? <Pause className="fill-white text-white" size={18} /> : <Play className="fill-white text-white ml-1" size={18} />}
                </button>
                <button onClick={toggleMute} className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 border border-white/10 transition-all">
                    {isMuted ? <VolumeX className="text-white" size={18} /> : <Volume2 className="text-white" size={18} />}
                </button>
            </div>

            <div className="absolute inset-0 bg-transparent cursor-pointer" />
        </div>
    )
});

HeroVideo.displayName = "HeroVideo";

// --- MAIN HUB ---
export default function VideoFeatures({ onColorChange }) {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section className="w-full relative overflow-hidden transform-gpu will-change-transform">
            <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
                <div className="absolute inset-0 bg-gray-50 mix-blend-multiply" />
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <div className="-mt-20 md:-mt-32 lg:mb-20 md:mb-20">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-slate-800 dark:text-white mb-2 tracking-tight">
                                Unleash the power of <br />
                                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Adaptive Health
                                </span>
                            </h1>
                        </>
                    }
                >
                    <HeroVideo video={videos[0]} onClick={setSelectedVideo} />
                </ContainerScroll>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-40 relative z-10 -mt-[10rem] md:-mt-[20rem]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex flex-col gap-3">
                        <TypingShineText
                            text={videos[1].title}
                            subtext={videos[1].subtitle}
                            className="pl-1 h-16"
                        />
                        <VideoThumbnail
                            video={videos[1]}
                            className="aspect-[4/3] w-full"
                            onClick={setSelectedVideo}
                        />
                    </div>

                    <div className="md:col-span-1 flex flex-col gap-3 md:mt-12">
                        <TypingShineText
                            text={videos[2].title}
                            subtext={videos[2].subtitle}
                            className="pl-1 h-16"
                        />
                        <VideoThumbnail
                            video={videos[2]}
                            className="aspect-[4/3] w-full"
                            onClick={setSelectedVideo}
                        />
                    </div>

                    <div className="md:col-span-1 flex flex-col gap-3">
                        <TypingShineText
                            text={videos[3].title}
                            subtext={videos[3].subtitle}
                            className="pl-1 h-16"
                        />
                        <VideoThumbnail
                            video={videos[3]}
                            className="aspect-[4/3] w-full"
                            onClick={setSelectedVideo}
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

// --- PORTAL MODAL COMPONENT (UPDATED) ---
const VideoModal = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const handleKeyDown = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(prog);
        }
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    if (!video) return null;

    return createPortal(
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 lg:p-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none" />
            </div>

            <motion.div
                layoutId={`video-container-${video.id}`}
                className="relative w-full max-w-7xl aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-white/10 z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
                >
                    <X size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/50 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-xl">
                    <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                        {isPlaying ? <Pause className="fill-white text-white" size={16} /> : <Play className="fill-white text-white ml-1" size={16} />}
                    </button>
                    <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                        {isMuted ? <VolumeX className="text-white" size={16} /> : <Volume2 className="text-white" size={16} />}
                    </button>
                </div>

                <video
                    ref={videoRef}
                    src={video.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={isMuted}
                    controls={false}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    loop
                />

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                        layoutId={`progress-${video.id}`}
                    />
                </div>

                <motion.div
                    className="absolute top-8 left-8 z-40 pointer-events-none"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-white text-3xl font-bold tracking-tight drop-shadow-lg">{video.title}</h2>
                    <p className="text-white/80 text-lg font-medium drop-shadow-md">{video.subtitle}</p>
                </motion.div>
            </motion.div>
        </motion.div>,
        document.body
    );
};
