import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
    { day: "Mon", score: 65, focus: 70 },
    { day: "Tue", score: 68, focus: 75 },
    { day: "Wed", score: 72, focus: 60 },
    { day: "Thu", score: 75, focus: 85 },
    { day: "Fri", score: 70, focus: 80 },
    { day: "Sat", score: 78, focus: 90 },
    { day: "Sun", score: 82, focus: 85 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 border-b border-white/5 pb-1">{label}</p>
                <div className="space-y-1">
                    <p className="text-indigo-400 text-sm flex justify-between gap-4">
                        <span className="font-medium">Score</span>
                        <span className="font-bold">{payload[0].value}%</span>
                    </p>
                    <p className="text-cyan-400 text-sm flex justify-between gap-4">
                        <span className="font-medium">Focus</span>
                        <span className="font-bold">{payload[1].value}%</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const PerformanceGraph = () => {
    return (
        <div className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-3xl font-black text-white flex items-center gap-4">
                        <TrendingUp className="text-indigo-400" size={32} />
                        <span>Cognitive Growth</span>
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-[0.4em] font-black mt-2">7-Day Real-Time Analytics</p>
                </div>
                <div className="flex gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                        <span className="text-sm text-slate-400 font-black uppercase tracking-widest">Efficiency</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="5 5" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 14, fontWeight: 700 }}
                            dy={20}
                        />
                        <YAxis
                            hide={true}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '2px solid #334155',
                                borderRadius: '1.5rem',
                                color: '#f8fafc',
                                padding: '1.5rem',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#6366f1"
                            strokeWidth={6}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceGraph;

