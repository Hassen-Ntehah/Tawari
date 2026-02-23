import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Mail, Lock, ArrowRight, Loader2, Github, Globe, LogIn, TrendingUp, Users } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
        if (!username.trim() || !password.trim()) {
          setError('Please enter both username and password.');
          setIsLoading(false);
          return;
        }

        const success = login(username, password);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid username or password. Please try again.');
          setIsLoading(false);
        }
    }, 800);
  };

  return (
    // 1. Outer Container: Exact match to SignUp dimensions
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* 2. Inner Wrapper: Exact match to SignUp max-width and padding */}
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-300">Back</span>
          </h1>
          <p className="text-lg text-slate-500">Access your personalized dashboard and daily reports.</p>
        </header>

        {/* Content Grid: Exact match to SignUp grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Context/Stats (Sticky) */}
            <div className="hidden lg:block space-y-8 sticky top-12">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 overflow-hidden relative">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                            <TrendingUp className="text-indigo-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Community Pulse</h2>
                        <p className="text-slate-500 mb-6">Here is what happened while you were away.</p>
                        
                        <div className="space-y-4">
                             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="font-medium text-slate-700">Active Readers</span>
                                </div>
                                <span className="font-bold text-slate-900">12,405</span>
                             </div>
                             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="font-medium text-slate-700">Articles Curated</span>
                                </div>
                                <span className="font-bold text-slate-900">1,284</span>
                             </div>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-50 opacity-50 blur-3xl"></div>
                </div>

                {/* "New Feature" Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-white mb-3 inline-block">NEW</span>
                        <h3 className="text-xl font-bold mb-2">Dark Mode is here</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Prefer reading at night? You can now toggle your reading experience in Settings.
                        </p>
                    </div>
                     <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-4 translate-y-4">
                        <Users size={120} />
                     </div>
                </div>
            </div>

            {/* Right Column: The Login Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <LogIn className="text-blue-500" size={28} />
                        Sign In
                    </h2>
                    <p className="text-slate-500 mt-2">Enter your credentials to continue.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-700">
                        <Globe className="h-5 w-5 mr-2 text-blue-500" />
                        Google
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-700">
                        <Github className="h-5 w-5 mr-2" />
                        GitHub
                    </button>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-slate-400 uppercase tracking-wider text-xs font-semibold">
                            Or continue with email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700 text-sm">
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}