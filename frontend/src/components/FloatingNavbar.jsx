import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LayoutDashboard, BookOpen, LogOut, Menu, X } from 'lucide-react';

const FloatingNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
        window.location.reload();
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        ...(token ? [
            { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { name: 'Study Log', path: '/studyLog', icon: BookOpen },
        ] : [
            { name: 'Login', path: '/login', icon: null },
            { name: 'Register', path: '/register', icon: null },
        ]),
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[1400px] rounded-full px-8 py-4 transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-2xl border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent uppercase tracking-tighter italic">
                    AI Study Mentor
                </Link>

                {/* Desktop Menu */}
                <div className="hidden xl:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center space-x-3 text-sm font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 ${location.pathname === link.path ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            {link.icon && <link.icon size={18} />}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                    {token && (
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-rose-500/10 text-rose-400 rounded-full border-2 border-rose-500/30 hover:bg-rose-500/40 transition-all flex items-center space-x-3 text-sm font-black uppercase tracking-widest"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="xl:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden mt-8 overflow-hidden bg-black/80 backdrop-blur-3xl rounded-[2rem] p-10 border-2 border-white/10"
                    >
                        <div className="flex flex-col space-y-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-6 text-3xl font-black uppercase tracking-widest ${location.pathname === link.path ? "text-cyan-400" : "text-slate-400"
                                        }`}
                                >
                                    {link.icon && <link.icon size={40} />}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                            {token && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-rose-400 hover:text-rose-300 flex items-center space-x-6 text-3xl font-black uppercase tracking-widest"
                                >
                                    <LogOut size={40} />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default FloatingNavbar;
