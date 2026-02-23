import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, Github, Globe, CheckCircle, Zap, UserPlus } from 'lucide-react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
        if (!username.trim() || !password.trim()) {
          setError('Please fill out all fields.');
          setIsLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setIsLoading(false);
          return;
        }

        const success = signUp(username, password);
        if (success) {
          navigate('/login');
        } else {
          setError('Username already exists. Please choose another one.');
          setIsLoading(false);
        }
    }, 1000);
  };

  return (
    // 1. Outer Container: Matches Home/Preferences (min-h-screen, bg-slate-50/50)
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* 2. Inner Wrapper: Matches Home/Preferences (max-w-7xl, centered, padding) */}
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-300">Community</span>
          </h1>
          <p className="text-lg text-slate-500">Start curating your daily intelligence briefing today.</p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Value Proposition (Sticky) */}
            <div className="hidden lg:block space-y-8 sticky top-12">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 overflow-hidden relative">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                            <Zap className="text-blue-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why create an account?</h2>
                        <ul className="space-y-4">
                            {[
                                "Unlimited access to all news sources",
                                "AI-powered personalized summaries",
                                "Save articles for later reading",
                                "Custom keyword tracking"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-600 font-medium">
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
                </div>

                {/* Testimonial Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                    <p className="text-lg leading-relaxed italic opacity-90 mb-4">
                        "This tool completely changed how I consume news. I no longer feel overwhelmed, just informed."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">
                            SJ
                        </div>
                        <div>
                            <p className="font-bold text-sm">Sarah Jenkins</p>
                            <p className="text-xs text-slate-400">Senior Analyst</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: The Sign Up Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <UserPlus className="text-blue-500" size={28} />
                        Create Account
                    </h2>
                    <p className="text-slate-500 mt-2">Free for 14 days. No credit card required.</p>
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
                            Or register with email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700 text-sm">
                            <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-0.5" />
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
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                    placeholder="Create a strong password"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                    placeholder="Repeat password"
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
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}