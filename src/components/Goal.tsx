import React from 'react';

export const Goal: React.FC = () => {
    return (
        <div className="relative w-full max-w-[800px] h-[300px] mx-auto perspective-1000">
            {/* Goal Frame */}
            <div className="absolute inset-0 border-[16px] border-gray-100 border-b-0 rounded-t-lg shadow-[0_0_30px_rgba(255,255,255,0.4)] z-10 box-border">
                {/* Metallic shine on posts */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-30 pointer-events-none"></div>
            </div>

            {/* Net Back */}
            <div className="absolute top-4 left-4 right-4 bottom-0 bg-[#e5e5e5]/5 border-2 border-white/10 rounded-t-sm transform -translate-z-20 scale-95 opacity-60 overflow-hidden">
                {/* Net Pattern */}
                <div className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                   linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}>
                </div>
            </div>

            {/* Goal Floor/Line */}
            <div className="absolute -bottom-2 left-[-5%] w-[110%] h-1 bg-white/50 blur-[2px]"></div>
        </div>
    );
};
