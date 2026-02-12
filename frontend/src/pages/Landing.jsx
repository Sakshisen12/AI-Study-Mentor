import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Zap, Shield } from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'
import AIHologram from '../components/AIHologram'

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -20, scale: 1.05 }}
    className="glass-panel p-12 rounded-[3.5rem] flex flex-col gap-6 group transition-all"
  >
    <div className={`w-20 h-20 rounded-3xl bg-${color}-500/10 flex items-center justify-center text-${color}-400 border-2 border-${color}-500/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
      <Icon size={40} />
    </div>
    <h3 className="text-3xl font-black uppercase tracking-tighter">{title}</h3>
    <p className="text-xl text-slate-400 font-medium leading-relaxed">{description}</p>
  </motion.div>
)

const Landing = () => {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20 pb-40">
        <div className="max-w-[1800px] w-full grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12 text-center xl:text-left"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border-2 border-indigo-500/20 text-indigo-400">
              <Sparkles size={20} />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Neural Interface v4.0</span>
            </div>

            <h1 className="text-8xl md:text-[10rem] font-black leading-[0.85] tracking-tighter">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500">
                STUDYING.
              </span>
            </h1>

            <p className="text-3xl md:text-4xl text-slate-400 font-bold max-w-2xl leading-relaxed">
              Elevate your cognitive patterns with AI-driven neural synchronization.
              Master the flow of your digital mind.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center xl:justify-start">
              <a
                href="/register"
                className="group relative px-12 py-8 rounded-[2.5rem] bg-indigo-500 text-white text-3xl font-black uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-[0_0_60px_rgba(79,70,229,0.5)] active:scale-95 flex items-center gap-4">
                Sync Now
                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="/login"
                className="text-2xl font-black uppercase tracking-widest text-slate-400 hover:text-white border-b-4 border-transparent hover:border-slate-400 pb-2 transition-all">
                Resume Protocol
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden xl:flex justify-center relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" />
            <div className="transform scale-[3.5] relative z-10 drop-shadow-[0_0_80px_rgba(79,70,229,0.3)]">
              <AIHologram />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative py-40 px-8 bg-gradient-to-b from-transparent to-indigo-950/20">
        <div className="max-w-[1800px] mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-black uppercase tracking-tighter">Engineered for Flow</h2>
            <div className="w-40 h-2 bg-indigo-500 mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(79,70,229,1)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
            <FeatureCard
              icon={Brain}
              color="indigo"
              title="Cognitive Sync"
              description="Real-time analysis of your learning patterns to synchronize study sessions with your mental peak."
            />
            <FeatureCard
              icon={Zap}
              color="cyan"
              title="Adaptive Pulse"
              description="A dynamic protocol that shifts your schedule based on metabolic fatigue and neural density."
            />
            <FeatureCard
              icon={Shield}
              color="violet"
              title="Neural Guard"
              description="Prevent burnout with biological feedback loops designed to sustain peak architectural focus."
            />
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <section className="py-40 px-8">
        <div className="max-w-[1400px] mx-auto glass-panel p-24 rounded-[4rem] text-center space-y-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h2 className="text-7xl font-black leading-tight italic relative z-10">
            "The future of learning is not just smarter, <br />
            it's synchronized."
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
            <a
              href="/register"
              className="inline-block px-16 py-10 rounded-[3rem] bg-indigo-500 text-white text-4xl font-black uppercase tracking-[0.2em] shadow-[0_0_80px_rgba(79,70,229,0.6)]">
              Inaugurate Protocol
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 opacity-50">
        <p className="text-xl font-black uppercase tracking-[1em]">AI STUDY MENTOR // NEURAL SYSTEM</p>
      </footer>
    </div>
  )
}

export default Landing
