import React from "react";
import { Clock, BookOpen, Coffee, Sparkles } from "lucide-react";

const AdaptivePlan = ({ recommendation }) => {
    const dynamicPlan = [
        {
            time: "Current",
            task: recommendation ? recommendation.split('Study ')[1] || recommendation : "Optimize Flow",
            duration: "45m",
            icon: <Sparkles size={24} />,
            type: "study",
            note: "AI SUGGESTED"
        },
        {
            time: "Upcoming",
            task: "Bio-Break",
            duration: "15m",
            icon: <Coffee size={24} />,
            type: "break",
            note: "RECUPERATION"
        }
    ];

    return (
        <div className="h-full w-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h3 className="text-3xl font-black text-white flex items-center gap-4">
                        <Sparkles className="text-indigo-400" size={32} />
                        <span>Adaptive Protocol</span>
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-[0.4em] font-black mt-2">Real-time scheduling active</p>
                </div>
            </div>

            <div className="space-y-6 flex-grow">
                {dynamicPlan.map((planItem, index) => (
                    <div key={index} className="flex gap-8 items-center p-6 rounded-[2rem] bg-indigo-500/5 border-2 border-white/5 hover:border-indigo-500/20 transition-all group">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${planItem.type === 'break'
                                ? 'bg-amber-500/10 text-amber-400 border-2 border-amber-500/20 shadow-lg'
                                : 'bg-indigo-500/10 text-indigo-400 border-2 border-indigo-500/20 shadow-lg glow-indigo-500'
                            }`}>
                            {planItem.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-2xl font-black text-slate-200 truncate group-hover:text-white transition-colors uppercase tracking-tight">{planItem.task}</h4>
                                <span className="text-sm font-black text-slate-500 uppercase tracking-widest">{planItem.duration}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500 font-black uppercase tracking-[0.3em]">{planItem.time}</p>
                                <span className={`text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${planItem.type === 'break' ? 'text-amber-500 bg-amber-500/10' : 'text-indigo-500 bg-indigo-500/10'
                                    }`}>{planItem.note}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdaptivePlan;

