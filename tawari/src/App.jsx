import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import { Menu, X, LogOut, User, Settings, LogIn, ChevronRight } from 'lucide-react';
import Home from './Home';
import Preferences from './preferences';
import Login from './Login'; 
import SignUp from './SignUp';

const Navigation = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add shadow on scroll for a premium feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Assuming your logo.png is essentially square/icon-like */}
            <div className="relative">
                <img 
                    className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" 
                    src="/logo.png" 
                    alt="AWARI Logo" 
                />
            </div>
            <span 
                className="text-2xl font-black tracking-tight" 
                style={{ color: '#00b5e8' }}
            >
                AWARI
            </span>
          </Link>
          
          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
                to="/" 
                className="text-sm font-medium text-slate-600 hover:text-[#00b5e8] transition-colors"
            >
                Home
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                    to="/preferences" 
                    className="text-sm font-medium text-slate-600 hover:text-[#00b5e8] transition-colors flex items-center gap-1"
                >
                    Preferences
                </Link>
                
                <div className="flex items-center pl-6 border-l border-slate-200 gap-4">
                  <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-slate-900">{currentUser.username}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Member</span>
                  </div>
                  
                  <button 
                    onClick={logout} 
                    className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                    to="/login" 
                    className="text-sm font-bold text-slate-600 hover:text-[#00b5e8] transition-colors"
                >
                    Log In
                </Link>
                <Link 
                    to="/signup" 
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow-lg shadow-[#00b5e8]/20 transition-all hover:-translate-y-0.5 hover:shadow-[#00b5e8]/40"
                    style={{ 
                        background: 'linear-gradient(135deg, #00b5e8 0%, #0062ff 100%)' 
                    }}
                >
                    Get Started
                    <ChevronRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 hover:text-[#00b5e8] focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {/* Added transition for smooth opening */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
            isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-[#00b5e8] font-medium transition-colors">
            <span className="bg-slate-100 p-2 rounded-lg"><LogIn size={18}/></span>
            Home
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/preferences" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-[#00b5e8] font-medium transition-colors">
                <span className="bg-slate-100 p-2 rounded-lg"><Settings size={18}/></span>
                Preferences
              </Link>
              <div className="border-t border-slate-100 my-2 pt-2">
                  <div className="px-4 py-2 mb-2">
                      <p className="text-xs text-slate-400 uppercase font-bold">Signed in as</p>
                      <p className="font-bold text-slate-900">{currentUser.username}</p>
                  </div>
                  <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors">
                    <span className="bg-red-100 p-2 rounded-lg"><LogOut size={18}/></span>
                    Sign Out
                  </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Link to="/login" className="flex justify-center items-center py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="flex justify-center items-center py-3 rounded-xl text-white font-bold transition-transform active:scale-95"
                style={{ background: '#00b5e8' }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Changed bg-slate-50 to min-h-screen to ensure full height coverage */}
        <div className="flex flex-col w-screen min-h-screen bg-slate-50 font-sans selection:bg-[#00b5e8] selection:text-white">
          <Navigation />
          {/* Added pt-20 to account for the fixed navbar height so content isn't hidden */}
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}