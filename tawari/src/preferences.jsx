import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Settings, Plus, X, Check, Zap, Hash, Sparkles, Loader2, Sliders } from 'lucide-react';

const PREDEFINED_CATEGORIES = [
  "Technology", "Business", "Sports", "Entertainment", "Health", 
  "Science", "Politics", "Environment", "Finance", "Art"
];

export default function Preferences() {
  const { currentUser, updatePreferences } = useContext(AuthContext);
  const [customInput, setCustomInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Loading / No User State (Centered in the full screen view)
  if (!currentUser) {
    return (
      <div className=" bg-slate-50/50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
            <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Authentication Required</h2>
            <p className="text-slate-500 mt-2 mb-6">Please log in to manage your news feed.</p>
            <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Go to Login
            </button>
        </div>
      </div>
    );
  }

  const { categories, customTopics } = currentUser.preferences || { categories: [], customTopics: [] };

  const toggleCategory = (category) => {
    let updatedCategories = [...categories];
    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter(c => c !== category);
    } else {
      updatedCategories.push(category);
    }
    updatePreferences({ categories: updatedCategories, customTopics });
  };

  const addCustomTopic = (e) => {
    e.preventDefault();
    if (customInput.trim() && !customTopics.includes(customInput.trim())) {
      updatePreferences({ 
        categories, 
        customTopics: [...customTopics, customInput.trim()] 
      });
      setCustomInput('');
    }
  };

  const removeCustomTopic = (topic) => {
    const updatedTopics = customTopics.filter(t => t !== topic);
    updatePreferences({ categories, customTopics: updatedTopics });
  };

  const getNews = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In real app: fetch logic here
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    // 2. Main Wrapper: Matches Home.js exactly (min-h-screen, bg-slate-50/50, same padding)
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Feed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-300">Controls</span>
          </h1>
          <p className="text-lg text-slate-500">Fine-tune your algorithms and data sources.</p>
        </header>

        {/* Control Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Panel (Left - 2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Action Banner */}
             <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="text-blue-500" size={20} />
                        Generate New Report
                    </h3>
                    <p className="text-slate-500 mt-1">Run our Python engine to curate a fresh batch of news based on your new settings.</p>
                </div>
                <button
                    onClick={getNews}
                    disabled={loading}
                    className={`flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/20
                    ${loading 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:-translate-y-0.5 hover:shadow-blue-500/40'
                    }`}
                >
                    {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Zap size={20} className="mr-2 fill-current" />}
                    {loading ? 'Processing...' : 'Run Analysis'}
                </button>
             </div>

            {/* Categories Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Broad Categories</h3>
                        <p className="text-sm text-slate-500">Select the general topics for your feed.</p>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                        {categories.length} Active
                    </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {PREDEFINED_CATEGORIES.map(cat => {
                        const isSelected = categories.includes(cat);
                        return (
                        <button 
                            key={cat} 
                            onClick={() => toggleCategory(cat)}
                            className={`relative group flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                            ${isSelected 
                                ? 'border-blue-500 bg-blue-50/50 text-blue-700' 
                                : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            {isSelected && (
                                <div className="absolute top-1 right-1">
                                    <Check size={12} className="text-blue-500" strokeWidth={4} />
                                </div>
                            )}
                            {cat}
                        </button>
                        )
                    })}
                </div>
            </div>
          </div>

          {/* Sidebar Panel (Right - 1/3 width) */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <Sliders size={20} className="text-slate-400" />
                        Specific Keywords
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Add specific companies, people, or events to track (e.g., "NVIDIA", "Election").
                    </p>
                </div>
                
                <form onSubmit={addCustomTopic} className="relative mb-6">
                    <div className="relative flex items-center">
                        <Hash className="absolute left-3 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            value={customInput} 
                            onChange={(e) => setCustomInput(e.target.value)} 
                            placeholder="Add keyword..." 
                            className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
                        />
                        <button 
                            type="submit"
                            disabled={!customInput.trim()}
                            className="absolute right-2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-200 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </form>

                {/* Tag Cloud */}
                <div className="flex flex-wrap gap-2 content-start">
                    {customTopics.length > 0 ? (
                        customTopics.map((topic, index) => (
                        <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm group hover:border-red-200 hover:bg-red-50 transition-colors cursor-default"
                        >
                            {topic}
                            <button 
                            onClick={() => removeCustomTopic(topic)}
                            className="ml-2 text-slate-400 group-hover:text-red-500 focus:outline-none"
                            >
                            <X size={14} />
                            </button>
                        </span>
                        ))
                    ) : (
                        <div className="w-full py-12 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                            <p className="text-sm text-slate-400 font-medium">No active keywords</p>
                        </div>
                    )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}