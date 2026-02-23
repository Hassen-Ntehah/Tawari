import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import Home from './Home';
import Preferences from './preferences';
import Login from './Login'; 
import SignUp from './SignUp';

const Navigation = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  
  return (
    <nav className="bg-gray-200 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 text-blue-400">
          <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-500">Tawari</Link>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
            {currentUser ? (
              <>
                <Link to="/preferences" className="hover:text-blue-400 transition-colors">Preferences</Link>
                <div className="flex items-center space-x-4 ml-4 border-l border-slate-700 pl-4">
                  <span className="text-sm text-slate-300">Hi, {currentUser.username}</span>
                  <button onClick={logout} className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-md transition-colors text-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-300 text-white hover:bg-blue-400 rounded-md transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-slate-700">Home</Link>
          {currentUser ? (
            <>
              <Link to="/preferences" className="block px-3 py-2 rounded-md hover:bg-slate-700">Preferences</Link>
              <button onClick={logout} className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-700 rounded-md">
                Logout ({currentUser.username})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-slate-700">Login</Link>
              <Link to="/signup" className="block px-3 py-2 rounded-md hover:bg-slate-700">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col  w-full justify-center self-center bg-slate-50 font-sans">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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