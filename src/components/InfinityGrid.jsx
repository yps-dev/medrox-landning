import React from 'react';
import { motion } from 'framer-motion';

const InfinityGrid = ({ activeColor = '#06b6d4' }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[500px]">
            {/* 3D PLANE */}
            <div
                className="absolute inset-[-100%] w-[300%] h-[300%] origin-center"
                style={{
                    transform: 'rotateX(60deg) translateZ(-100px)',
                    background: `
            linear-gradient(transparent 0%, ${activeColor}20 100%),
            linear-gradient(90deg, transparent 0%, ${activeColor}10 100%),
            linear-gradient(0deg, transparent 24%, ${activeColor}15 25%, ${activeColor}15 26%, transparent 27%, transparent 74%, ${activeColor}15 75%, ${activeColor}15 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, ${activeColor}15 25%, ${activeColor}15 26%, transparent 27%, transparent 74%, ${activeColor}15 75%, ${activeColor}15 76%, transparent 77%, transparent)
          `,
                    backgroundSize: '80px 80px',
                    animation: 'grid-run 4s linear infinite',
                    maskImage: 'linear-gradient(to bottom, transparent, 10% black, 90% black, transparent)'
                }}
            >
                <style jsx>{`
          @keyframes grid-run {
            0% { transform: rotateX(60deg) translateY(0); }
            100% { transform: rotateX(60deg) translateY(80px); }
          }
        `}</style>
            </div>

            {/* FOG OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
        </div>
    );
};

export default InfinityGrid;
