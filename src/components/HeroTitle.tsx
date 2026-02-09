import { motion } from 'framer-motion';

export const HeroTitle = () => {
    return (
        <div className="absolute top-[120px] left-1/2 -translate-x-1/2 z-0 w-full text-center pointer-events-none opacity-50 md:opacity-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center"
            >
                {/* Title */}
                <motion.h1
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative text-7xl md:text-[10rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    Penalty
                    <span className="block text-xl md:text-3xl tracking-[1.5em] font-light text-cyan-400/60 mt-4 not-italic pl-[1.5em]">Kicks</span>

                    {/* Neon Underline Animation */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className="absolute -bottom-4 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-[1px]"
                    />
                </motion.h1>
            </motion.div>
        </div>
    );
};
