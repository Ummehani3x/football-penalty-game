import React from 'react';
import { motion } from 'framer-motion';

interface BallProps {
    isShot: boolean;
    targetX: number; // -100 to 100 range for logical position
    onShoot?: () => void;
    reset?: boolean;
}

export const Ball: React.FC<BallProps> = ({ isShot, targetX, onShoot }) => {
    // Convert logical X.
    // We use targetX directly now for simpler control.

    const xOffset = targetX;
    const yOffset = -250; // Visual distance to goal

    return (
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-30 perspective-[500px]">
            <motion.div
                layout
                initial={{ scale: 1, y: 0, x: 0, rotate: 0 }}
                animate={isShot ? {
                    scale: 0.5,
                    y: yOffset,
                    x: xOffset,
                    rotate: 720 + xOffset, // Spin more if moving sideways
                } : {
                    scale: 1,
                    y: [0, -5, 0], // Idle bounce
                    x: 0,
                    rotate: [0, 5, -5, 0] // Idle slight wobble
                }}
                transition={isShot ? {
                    type: "spring",
                    stiffness: 60,
                    damping: 12,
                    mass: 0.8
                } : {
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                onClick={!isShot ? onShoot : undefined} // Only clickable if not already shot
                className={`
          relative w-16 h-16 md:w-20 md:h-20 rounded-full 
          bg-white shadow-[0_10px_20px_rgba(0,0,0,0.5)] 
          cursor-pointer hover:scale-105 transition-transform
          ${isShot ? 'cursor-default' : 'cursor-pointer hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]'}
        `}
            >
                {/* Realistic Ball Texture */}
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,_white_5%,_#e5e7eb_40%,_#9ca3af_80%,_#374151_100%)]"></div>

                    {/* Simple geometric pattern for football look */}
                    <div className="absolute w-[140%] h-[20%] bg-black/80 rotate-45 top-[20%] blur-[1px] opacity-80"></div>
                    <div className="absolute w-[140%] h-[15%] bg-black/80 -rotate-45 bottom-[20%] blur-[1px] opacity-80"></div>
                    <div className="absolute w-[20%] h-[140%] bg-black/80 rotate-12 left-[30%] blur-[1px] opacity-60"></div>
                </div>

                {/* Specular highlight */}
                <div className="absolute top-2 left-3 w-4 h-2 bg-white rounded-full blur-[2px] opacity-60"></div>
            </motion.div>

            {/* Shadow on the ground */}
            {!isShot && (
                <motion.div
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: [0.6, 0.4, 0.6], scale: [1, 0.9, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/60 blur-md rounded-[100%]"
                />
            )}
        </div>
    );
};
