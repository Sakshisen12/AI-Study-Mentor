import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Calendar, ChevronRight } from 'lucide-react';

const StudyCard = ({ title, difficulty, score, studyTime, confidence, date }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Normalize score
  const normalizedScore = score ? Math.min(Math.max(score, 0), 100) : 0;

  const scoreColorClass = normalizedScore >= 80 ? "text-emerald-400" : normalizedScore >= 50 ? "text-amber-400" : "text-rose-400";
  const scoreBgClass = normalizedScore >= 80 ? "bg-emerald-500" : normalizedScore >= 50 ? "bg-amber-500" : "bg-rose-500";

  const getDifficultyStyles = (diff) => {
    switch (diff) {
      case 'Hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  }

  return (
    <div className="h-full perspective-1000 group" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <div className="glass-card h-full p-10 flex flex-col justify-between rounded-[2.5rem] border-4">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-4xl font-black text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight">
                  {title}
                </h3>
                <span className={`px-4 py-2 rounded-full text-sm font-black border-2 ${getDifficultyStyles(difficulty)} uppercase tracking-widest`}>
                  {difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-lg font-bold uppercase tracking-[0.2em] mb-8">
                <Calendar size={20} className="opacity-50" />
                <span>{date || "Recent Session"}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">AI Accuracy</span>
                <span className={`text-6xl font-black ${scoreColorClass}`}>
                  {score ? score.toFixed(0) : "0"}%
                </span>
              </div>

              <div className="w-full h-4 bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${normalizedScore}%` }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className={`h-full ${scoreBgClass} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                />
              </div>

              <div className="flex items-center justify-between text-slate-400 pt-6 border-t-2 border-white/10">
                <div className="flex items-center gap-3">
                  <Clock size={24} className="text-slate-500" />
                  <span className="text-2xl font-black">{studyTime || 0} MINS</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-400 group-hover:translate-x-3 transition-transform">
                  <span className="text-sm font-black uppercase tracking-widest">Deep Sync</span>
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div className="glass-card h-full p-10 flex flex-col border-4 border-indigo-500/30 bg-indigo-950/40 rounded-[2.5rem]">
            <h4 className="text-xl font-black text-indigo-300 uppercase tracking-[0.4em] mb-10 text-center">Neural Analytics</h4>

            <div className="space-y-8 flex-grow">
              <div className="flex justify-between items-center border-b-2 border-white/5 pb-4">
                <span className="text-slate-400 flex items-center gap-3 text-lg font-bold">
                  <Target size={24} className="text-indigo-400" /> CONFIDENCE
                </span>
                <span className="text-white font-black text-4xl">{confidence}/5</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-white/5 pb-4">
                <span className="text-slate-400 flex items-center gap-3 text-lg font-bold">
                  <Clock size={24} className="text-indigo-400" /> DURATION
                </span>
                <span className="text-white font-black text-4xl">{studyTime} <span className="text-xs text-slate-500 uppercase">min</span></span>
              </div>

              <div className="mt-8 p-8 rounded-3xl bg-indigo-500/10 border-2 border-indigo-400/20 shadow-2xl">
                <p className="text-xs text-indigo-400 uppercase font-black tracking-[0.5em] mb-4 text-center">Efficiency Rating</p>
                <p className={`text-7xl font-black text-center ${scoreColorClass}`}>{score ? score.toFixed(1) : "N/A"}</p>
              </div>
            </div>

            <button className="w-full mt-auto py-6 rounded-2xl bg-indigo-500 text-white text-xl font-black uppercase tracking-widest hover:bg-indigo-400 transition-colors shadow-lg">
              Return to Matrix
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default StudyCard;

