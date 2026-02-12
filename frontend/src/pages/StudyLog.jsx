import { useState } from "react"
import GlassCard from "../components/GlassCard"
import { motion } from "framer-motion"
import { API } from "../api/api"

const StudyLog = () => {

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    studyTime: "",
    difficulty: "",
    confidence: "",
    date: ""
  })


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const res = await API.post("/studylog", {
        subject: formData.subject,
        topic: formData.topic,
        studyTime: Number(formData.studyTime),
        difficulty: Number(formData.difficulty),
        confidence: Number(formData.confidence),
        date: formData.date
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = res.data
      console.log(data)
      alert("Study Session Logged Successfully!")
      // Reset form or navigate
      setFormData({
        subject: "",
        topic: "",
        studyTime: "",
        difficulty: "",
        confidence: "",
        date: ""
      })
    } catch (error) {
      console.error("Error logging study session:", error)
      alert("Failed to log session")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center relative overflow-hidden pt-24 pb-12">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl px-4"
      >
        <GlassCard className="p-10 border border-white/10">
          <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Log Study Session 📘
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Subject */}
            <input
              type="text"
              name="subject"
              placeholder="Subject (e.g., DBMS, OS)"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-4 mb-5 bg-white/5 border border-white/10 rounded-xl text-white text-xl placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
              required
            />

            {/* Topic */}
            <input
              type="text"
              name="topic"
              placeholder="Topic (e.g., Normalization)"
              value={formData.topic}
              onChange={handleChange}
              className="w-full p-4 mb-5 bg-white/5 border border-white/10 rounded-xl text-white text-xl placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
              required
            />

            {/* Study Time */}
            <input
              type="number"
              name="studyTime"
              placeholder="Study Time (minutes)"
              value={formData.studyTime}
              onChange={handleChange}
              className="w-full p-4 mb-5 bg-white/5 border border-white/10 rounded-xl text-white text-xl placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Difficulty */}
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-xl focus:outline-none focus:border-cyan-400 transition-all [&>option]:bg-gray-800"
                required
              >
                <option value="">Difficulty (1-5)</option>
                <option value="1">1 - Very Easy</option>
                <option value="2">2 - Easy</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - Hard</option>
                <option value="5">5 - Very Hard</option>
              </select>

              {/* Confidence */}
              <select
                name="confidence"
                value={formData.confidence}
                onChange={handleChange}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-xl focus:outline-none focus:border-cyan-400 transition-all [&>option]:bg-gray-800"
                required
              >
                <option value="">Confidence (1-5)</option>
                <option value="1">1 - Not Confident</option>
                <option value="2">2 - Slightly Confident</option>
                <option value="3">3 - Okay</option>
                <option value="4">4 - Confident</option>
                <option value="5">5 - Very Confident</option>
              </select>
            </div>

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-4 mb-8 bg-white/5 border border-white/10 rounded-xl text-white text-xl placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark]"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 text-xl font-bold rounded-xl hover:shadow-[0_0_20px_rgba(129,140,248,0.5)] transition-all transform hover:-translate-y-1"
            >
              Save Study Log
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default StudyLog

