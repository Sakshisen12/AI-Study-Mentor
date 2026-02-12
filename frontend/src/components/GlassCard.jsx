import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hoverEffect = true }) => {
    return (
        <motion.div
            className={`relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl ${className}`}
            whileHover={hoverEffect ? {
                y: -8,
                boxShadow: "0 20px 40px -10px rgba(0, 255, 255, 0.15), 0 0 20px rgba(168, 85, 247, 0.4) inset",
                borderColor: "rgba(255, 255, 255, 0.3)"
            } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* Internal Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

            {/* Neon Edge Highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            {children}
        </motion.div>
    );
};

export default GlassCard;
