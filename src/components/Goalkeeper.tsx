import React from 'react';
import { motion } from 'framer-motion';

export type GoalkeeperAction = 'center' | 'dive-left' | 'dive-right' | 'idle';

interface GoalkeeperProps {
    action: GoalkeeperAction;
}

export const Goalkeeper: React.FC<GoalkeeperProps> = ({ action }) => {
    // Animation states
    const variants = {
        idle: {
            x: 0, y: [0, -5], rotate: 0, scale: 1,
            transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 0.8 }
        },
        center: { x: 0, y: -20, scale: 1.1, rotate: 0 }, // Jump up/block center
        'dive-left': { x: -220, y: 30, rotate: -85 }, // Dive left
        'dive-right': { x: 220, y: 30, rotate: 85 },   // Dive right
    };

    return (
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 z-20 pointer-events-none transform -translate-y-1/2 h-40 flex items-center justify-center">
            <motion.div
                initial="idle"
                animate={action}
                variants={variants}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative w-32 h-48 md:w-36 md:h-56"
            >
                {/* Shadow */}
                <motion.div
                    animate={action === 'idle' ? { scaleX: 1.5, opacity: 0.4 } : { scaleX: 1, opacity: 0 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/40 blur-md rounded-full transform"
                ></motion.div>

                {/* Goalkeeper SVG Body - Stylized/Abstract */}
                <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-visible">
                    <g fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
                        {/* Legs */}
                        <path d="M35 170 L50 120 L65 170" stroke="#1f2937" /> {/* Dark pants */}

                        {/* Body Shape */}
                        <path d="M50 120 L50 60" stroke="#bef264" strokeWidth="24" /> {/* Neon Jersey */}

                        {/* Arms - Open ready position */}
                        <path d="M20 70 L50 60 L80 70" stroke="#bef264" />

                        {/* Hands (Gloves) */}
                        <circle cx="15" cy="70" r="10" fill="#fca5a5" stroke="none" />
                        <circle cx="85" cy="70" r="10" fill="#fca5a5" stroke="none" />

                        {/* Head */}
                        <circle cx="50" cy="35" r="14" fill="#fde047" stroke="none" />
                    </g>
                </svg>
            </motion.div>
        </div>
    );
};
