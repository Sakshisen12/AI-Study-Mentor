import React, { useEffect, useState } from "react"
import StudyCard from "../components/StudyCard"
import GlassCard from "../components/GlassCard"
import ParticleBackground from "../components/ParticleBackground"
import AIHologram from "../components/AIHologram"
import BurnoutMeter from "../components/BurnoutMeter"
import AdaptivePlan from "../components/AdaptivePlan"
import WellnessStats from "../components/WellnessStats"
import PerformanceGraph from "../components/PerformanceGraph"
import { motion } from "framer-motion"

const Dashboard = () => {

  const [name, setName] = useState(localStorage.getItem("name") || "Scholar");
  const [studyLogs, setStudyLogs] = useState([])
  const [recommendation, setRecommendation] = useState("")
  const [loading, setLoading] = useState(false)


  const [stats, setStats] = useState({ streak: 0, totalFocus: 0, restBalance: 100, focusScore: 0 });

  useEffect(() => {
    fetchLogs()
    fetchRecommendation()
  }, [])

  useEffect(() => {
    if (studyLogs.length > 0) {
      // Calculate Streak (Mock calculation for now based on unique days)
      const uniqueDays = new Set(studyLogs.map(log => log.date)).size;

      // Calculate Total Focus (Sum of studyTime)
      const totalMinutes = studyLogs.reduce((acc, log) => acc + (parseInt(log.studyTime) || 0), 0);

      // Calculate Focus Score (Average confidence * 2 for 0-10 scale)
      const avgConfidence = studyLogs.reduce((acc, log) => acc + (parseInt(log.confidence) || 0), 0) / studyLogs.length;

      setStats({
        streak: uniqueDays,
        totalFocus: totalMinutes,
        restBalance: Math.max(0, 100 - (totalMinutes / 10)), // Simple decay based on work
        focusScore: (avgConfidence * 2).toFixed(1)
      });
    }
  }, [studyLogs]);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:8000/studylog", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        window.location.href = "/login"
        return
      }

      const data = await res.json()
      setStudyLogs(data)
    } catch (error) {
      console.error("Error fetching logs:", error)
    }
  }

  const fetchRecommendation = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:8000/recommendation", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        // Optional: Redirect to login or just show placeholder
        return
      }

      const data = await res.json()
      setRecommendation(data.recommendation)
    } catch (error) {
      console.error("Error fetching recommendation:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen text-white pt-32 pb-24 px-8 overflow-x-hidden">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-[2000px] mx-auto space-y-20 relative z-10"
      >
        {/* Massive Header Section */}
        <header className="flex flex-col xl:flex-row items-center justify-between gap-16">
          <div className="text-center xl:text-left space-y-6">
            <h1 className="leading-tight text-7xl md:text-8xl font-black tracking-tighter">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 block sm:inline">{name}!</span>
            </h1>
            <p className="text-3xl text-slate-300 font-bold max-w-3xl leading-relaxed">
              Neural interface at <span className="text-emerald-400">100% capacity</span>. Elevating your cognitive performance to the next dimension. 🚀
            </p>
          </div>
          <div className="transform scale-[1.8] xl:scale-[2.2] drop-shadow-[0_0_60px_rgba(79,70,229,0.5)]">
            <AIHologram />
          </div>
        </header>

        {/* Enlarged Stats Cluster */}
        <section className="space-y-12">
          <h2 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-6">
            <span className="w-4 h-16 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,1)]"></span>
            Synchronized Bio-Metrics
          </h2>
          <div className="glass-panel p-16 rounded-[4rem]">
            <WellnessStats
              streak={stats.streak}
              totalFocus={stats.totalFocus}
              restBalance={stats.restBalance.toFixed(0)}
              focusScore={stats.focusScore}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          {/* Performance Trend - Much Bigger */}
          <section className="space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-6">
              <span className="w-4 h-16 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(6,182,212,1)]"></span>
              Cognitive Velocity
            </h2>
            <div className="glass-panel p-12 h-[700px] rounded-[4rem]">
              <PerformanceGraph />
            </div>
          </section>

          {/* Secondary Stats Group */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="glass-panel p-12 h-[320px] rounded-[3.5rem] relative flex items-center overflow-hidden">
              <BurnoutMeter burnoutLevel={stats.totalFocus > 120 ? "High" : stats.totalFocus > 60 ? "Moderate" : "Low"} />
            </div>
            <div className="glass-panel p-12 h-[320px] rounded-[3.5rem] relative flex items-center overflow-hidden">
              <AdaptivePlan recommendation={recommendation} />
            </div>

            {/* Massive Mentorship Card */}
            <div className="md:col-span-2 glass-panel p-16 rounded-[4rem] bg-gradient-to-br from-indigo-600/30 via-transparent to-cyan-500/10 border-indigo-500/40 flex flex-col justify-between gap-12 group">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.5em] text-indigo-400 mb-8 font-mono">Neural Guidance Protocol :: ACTIVE</p>
                <h3 className="text-5xl md:text-6xl font-black leading-tight italic group-hover:text-indigo-200 transition-colors">
                  "{recommendation || "Calibrating multidimensional algorithms for your optimal flow state..."}"
                </h3>
              </div>
              <button
                onClick={fetchRecommendation}
                disabled={loading}
                className="w-full py-10 rounded-[2.5rem] bg-indigo-500 text-white text-3xl font-black uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-[0_0_60px_rgba(79,70,229,0.6)] active:scale-95 disabled:opacity-50"
              >
                {loading ? "Re-syncing Neural Net..." : "Synchronize AI Insights"}
              </button>
            </div>
          </section>
        </div>

        {/* Large Activity Section */}
        <section className="space-y-16">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-6">
              <span className="w-4 h-16 bg-violet-500 rounded-full shadow-[0_0_20px_rgba(139,92,246,1)]"></span>
              Activity Archive
            </h2>
            <button className="text-2xl font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 border-b-4 border-transparent hover:border-indigo-400 pb-2 transition-all">Full Network Analysis</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-16">
            {studyLogs.length > 0 ? (
              studyLogs.slice().reverse().map((log, index) => (
                <div key={index} className="h-[550px]">
                  <StudyCard
                    title={`${log.subject}`}
                    difficulty={log.difficulty}
                    score={log.predicted_score}
                    studyTime={log.studyTime}
                    confidence={log.confidence}
                    date={log.date}
                  />
                </div>
              ))
            ) : (
              <div className="md:col-span-2 2xl:col-span-3 glass-panel p-32 text-center border-dashed border-slate-700 bg-transparent flex flex-col items-center gap-12">
                <div className="w-32 h-32 rounded-full bg-slate-800 animate-pulse"></div>
                <p className="text-4xl text-slate-500 font-black italic uppercase tracking-widest">Station Idle. Awaiting Primary Data Input.</p>
              </div>
            )}
          </div>
        </section>
      </motion.div>
    </div>
  )
}

export default Dashboard
