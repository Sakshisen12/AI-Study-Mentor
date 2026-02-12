import React from "react";
import { Flame, Brain, Moon, Clock } from "lucide-react";

const StatItem = ({ icon: Icon, label, value, color, suffix }) => (
    <div className="flex flex-col items-center justify-center p-8 transition-transform hover:scale-110">
        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6 bg-${color}-500/10 text-${color}-400 shadow-[0_0_40px_rgba(0,0,0,0.3)] border-2 border-${color}-500/20 glow-${color}-500`}>
            <Icon size={48} />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white">{value}</span>
            <span className="text-sm uppercase font-black text-slate-500 tracking-widest font-mono">{suffix}</span>
        </div>
        <p className="text-xs uppercase font-black text-slate-500 tracking-[0.4em] mt-3 whitespace-nowrap">{label}</p>
    </div>
);

const WellnessStats = ({ streak = 0, totalFocus = 0, restBalance = 80, focusScore = 0 }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x-2 divide-white/10">
            <StatItem icon={Flame} label="Daily Streak" value={streak} suffix="day" color="rose" />
            <StatItem icon={Clock} label="Focus Sync" value={totalFocus} suffix="min" color="indigo" />
            <StatItem icon={Moon} label="Bio Rhythm" value={restBalance} suffix="%" color="cyan" />
            <StatItem icon={Brain} label="Flow Index" value={focusScore} suffix="/10" color="violet" />
        </div>
    );
};

export default WellnessStats;

