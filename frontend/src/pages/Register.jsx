import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import { API } from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/register", {
        name,
        email,
        password,
      });
      const data = res.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Registration Successful");
        navigate("/dashboard", { replace: true });
        window.location.reload();
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] relative z-10"
      >
        <div className="glass-panel p-20 rounded-[4rem] border-4 border-indigo-500/20 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <h1 className="text-center mb-16 font-black text-7xl text-white tracking-tighter uppercase italic">
            Neural <span className="text-indigo-400">Initiate</span>
          </h1>

          <div className="space-y-10">
            <input
              type="text"
              placeholder="Identity Label"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-8 bg-white/5 border-2 border-white/10 text-white rounded-[2rem] focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-2xl font-bold placeholder-slate-500"
            />

            <input
              type="email"
              placeholder="Neural Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-8 bg-white/5 border-2 border-white/10 text-white rounded-[2rem] focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-2xl font-bold placeholder-slate-500"
            />

            <input
              type="password"
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-8 bg-white/5 border-2 border-white/10 text-white rounded-[2rem] focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-2xl font-bold placeholder-slate-500"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-indigo-500 text-white py-10 text-3xl font-black uppercase tracking-widest rounded-[2rem] hover:bg-indigo-400 shadow-[0_0_50px_rgba(79,70,229,0.4)] transition-all active:scale-95"
            >
              Authorize Protocol
            </button>
          </div>

          <p className="mt-12 text-center text-slate-400 text-xl font-bold tracking-tight">
            Existing entity? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-black underline underline-offset-8">Login Protocol</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;


