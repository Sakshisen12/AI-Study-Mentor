import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AIHologram = () => {
    return (
        <div className="relative flex flex-col items-center justify-center p-6">
            {/* Floating Orb */}
            <motion.div
                className="relative w-32 h-32 rounded-full flex items-center justify-center mb-4"
                animate={{
                    y: [-10, 10, -10], // Float
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Core Glow */}
                <div className="absolute inset-0 rounded-full bg-cyan-500 blur-xl opacity-40 animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 opacity-80 backdrop-blur-md border border-white/30" />

                {/* Rings */}
                <motion.div
                    className="absolute inset-[-10px] rounded-full border border-cyan-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-[-20px] rounded-full border border-purple-500/20 dashed"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ borderStyle: 'dashed' }}
                />

                {/* Icon */}
                <div className="z-10 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                    <Sparkles size={48} />
                </div>
            </motion.div>

            {/* Greeting / Status */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
            >
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                    AI Mentor
                </h3>
                <p className="text-cyan-100/70 text-sm">
                    Online & Ready to Help
                </p>
            </motion.div>
        </div>
    );
};

export default AIHologram;
