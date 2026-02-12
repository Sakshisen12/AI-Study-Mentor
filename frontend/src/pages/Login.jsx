import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import { API } from "../api/api";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        name,
        email,
        password,
      });

      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        alert("Login Successful");
        navigate("/dashboard", { replace: true });
        window.location.reload();
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.detail || "Server Connection Failed";
      alert(`Status: ${errorMsg}`);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative overflow-hidden'>
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] relative z-10"
      >
        <div className='glass-panel p-12 rounded-[3rem] border-2 border-indigo-500/20 shadow-[0_0_80px_rgba(0,0,0,0.5)]'>
          <h1 className='text-center mb-10 font-black text-5xl text-white tracking-tighter uppercase italic'>
            Sync <span className="text-indigo-400">Portal</span>
          </h1>

          <div className="space-y-6">
            <input
              type='text'
              placeholder='User Identity'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-6 bg-white/5 border-2 border-white/10 text-white rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-xl font-bold placeholder-slate-500"
            />

            <input
              type='email'
              placeholder='Neural Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-6 bg-white/5 border-2 border-white/10 text-white rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-xl font-bold placeholder-slate-500"
            />

            <input
              type="password"
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-6 bg-white/5 border-2 border-white/10 text-white rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-xl font-bold placeholder-slate-500"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-500 text-white py-6 text-xl font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-400 shadow-[0_0_50px_rgba(79,70,229,0.4)] transition-all active:scale-95"
            >
              Inaugurate Session
            </button>
          </div>

          <p className="mt-12 text-center text-slate-400 text-xl font-bold tracking-tight">
            New entity? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-black underline underline-offset-8">Register Protocol</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;


