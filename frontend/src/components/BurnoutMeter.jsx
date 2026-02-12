import React from "react";
import { motion } from "framer-motion";
import { Zap, Battery, BatteryCharging, BatteryWarning } from "lucide-react";

const BurnoutMeter = ({ burnoutLevel = "Low" }) => {
    const getBurnoutConfig = (level) => {
        switch (level) {
            case "High":
                return {
                    color: "text-rose-400",
                    accent: "rose",
                    message: "NEURAL OVERLOAD",
                    subMessage: "CRITICAL FATIGUE DETECTED. MANDATORY RESET SUGGESTED.",
                    icon: <BatteryWarning size={48} />,
                    percent: 90,
                };
            case "Moderate":
                return {
                    color: "text-amber-400",
                    accent: "amber",
                    message: "SYSTEM STRAIN",
                    subMessage: "FOCUS DECLINING. SHIFT TO LIGHT REVIEW.",
                    icon: <BatteryCharging size={48} />,
                    percent: 50,
                };
            default:
                return {
                    color: "text-emerald-400",
                    accent: "emerald",
                    message: "PEAK FLOW",
                    subMessage: "COGNITIVE STATE OPTIMAL. PERFORMANCE STABLE.",
                    icon: <Battery size={48} />,
                    percent: 20,
                };
        }
    };

    const config = getBurnoutConfig(burnoutLevel);

    return (
        <div className="relative h-full w-full flex items-center justify-between p-8">
            <div className="flex flex-col justify-center max-w-[55%] gap-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-${config.accent}-500/10 ${config.color} border-2 border-${config.accent}-500/20 shadow-lg`}>
                        {config.icon}
                    </div>
                    <span className="text-sm uppercase font-black tracking-[0.4em] text-slate-500">Neural Status</span>
                </div>
                <h3 className={`text-4xl font-black leading-tight ${config.color}`}>{config.message}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-bold uppercase tracking-widest">{config.subMessage}</p>
            </div>

            <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full transform -rotate-90 scale-110">
                    <circle
                        cx="88"
                        cy="88"
                        r="75"
                        stroke="#1e293b"
                        strokeWidth="12"
                        fill="transparent"
                        strokeOpacity="0.3"
                    />
                    <motion.circle
                        initial={{ strokeDasharray: 471, strokeDashoffset: 471 }}
                        animate={{ strokeDashoffset: 471 - (471 * config.percent) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="88"
                        cy="88"
                        r="75"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="transparent"
                        className={config.color}
                        strokeOpacity="1"
                        style={{ filter: `drop-shadow(0 0 10px ${config.color.includes('rose') ? '#fb7185' : config.color.includes('amber') ? '#fbbf24' : '#34d399'})` }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-4xl font-black ${config.color}`}>{config.percent}%</span>
                </div>
            </div>
        </div>
    );
};

export default BurnoutMeter;

