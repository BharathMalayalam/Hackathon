import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Problems', path: '/problems' },
        { label: 'Git Guide', path: '/git-guide' },
        { label: 'Register', path: '/register' },
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
                        <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                            <Terminal className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-50 transition-colors">
                            Hack<span className="text-blue-500">a</span>thon
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-all hover:text-blue-400 py-2 ${location.pathname === link.path
                                        ? 'text-blue-500 border-b-2 border-blue-500'
                                        : 'text-slate-300'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center">
                        <Link
                            to="/register"
                            className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] shadow-blue-500/20"
                        >
                            Register Now
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800 overflow-hidden shadow-2xl"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={`block px-5 py-3.5 rounded-xl text-base font-semibold transition-all ${location.pathname === link.path
                                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-6 pb-2">
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="flex justify-center items-center w-full text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                >
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
