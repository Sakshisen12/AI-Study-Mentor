import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
    // Generate random particles
    const particleCount = 20;
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random Viewport Width %
            y: Math.random() * 100, // Random Viewport Height %
            size: Math.random() * 4 + 1, // Random size 1-5px
            duration: Math.random() * 10 + 10, // Slow float 10-20s
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-400 opacity-20 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0], // Float up and down
                        x: [0, 50, -50, 0], // Drifting side to side
                        opacity: [0.2, 0.5, 0.2], // Pulsing
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        </div>
    );
};

export default ParticleBackground;
