import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Clock, ArrowRight, Zap, TrendingUp, Globe, ShieldAlert } from 'lucide-react'; // Assuming lucide-react is available, or use standard SVGs

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    // Enhanced mock data with images and timestamps for realism
    const mockArticles = [
      { 
        id: 1, 
        title: "Global Markets Rally Today", 
        category: "Business", 
        excerpt: "Stocks saw a massive surge today as tech companies reported earnings...", 
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "bg-emerald-100 text-emerald-700"
      },
      { 
        id: 2, 
        title: "New AI Model Released", 
        category: "Technology", 
        excerpt: "The latest generative model promises to change how we write code forever...", 
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        color: "bg-indigo-100 text-[#00b5e8]"
      },
      { 
        id: 3, 
        title: "Updates on the War in Iran", 
        category: "Politics", 
        excerpt: "Diplomats are gathering today to discuss the ongoing situation in the region...", 
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1667157105317-35d6c4380e1c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "bg-rose-100 text-rose-700"
      },
      { 
        id: 4, 
        title: "Weather Alert: Coastal Storms", 
        category: "General", 
        excerpt: "Severe storms expected across the coastal regions this weekend. Prepare now.", 
        readTime: "2 min read",
        image: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&q=80&w=800",
        color: "bg-slate-100 text-slate-700"
      }
    ];
    setHeadlines(mockArticles);
  }, []);

  // Modern Card Component
  const ArticleCard = ({ article, featured = false }) => (
    <div className={`group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${featured ? 'md:flex-row md:col-span-2' : ''}`}>
      
      {/* Image Section */}
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'}`}>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 md:hidden" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${article.color}`}>
            {article.category}
          </span>
          <div className="flex items-center text-slate-400 text-xs">
            <Clock size={14} className="mr-1" />
            {article.readTime}
          </div>
        </div>

        <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-[#00b5e8] transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {article.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {article.excerpt}
        </p>

        <button className="flex items-center text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform self-start mt-auto">
          Read full story <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );

  const renderPersonalizedNews = () => {
    if (!currentUser) return (
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-300 rounded-2xl p-8 text-white shadow-lg mt-8">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Curate your own feed</h3>
            <p className="text-indigo-100">Sign in to filter news by topics that matter to you.</p>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-50 transition-colors">
            Log In / Sign Up
          </button>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
      </div>
    );
    
    const { categories, customTopics } = currentUser.preferences || { categories: [], customTopics: [] };
    
    const personalizedArticles = headlines.filter(article => {
      if (categories.includes(article.category)) return true;
      return customTopics.some(topic => 
        article.title.toLowerCase().includes(topic.toLowerCase())
      );
    });

    if (personalizedArticles.length === 0) return (
      <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 mt-6">
        <Zap className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="text-slate-500 font-medium">No updates match your specific interests right now.</p>
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {personalizedArticles.map(article => <ArticleCard key={article.id} article={article} />)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-blue-300">Daily Briefing</span>
          </h1>
          <p className="text-lg text-slate-500">Essential insights for the modern professional.</p>
        </header>

        {/* Top Headlines Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <Globe className="text-[#00b5e8]" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">Top Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {headlines.map((article, index) => (
              // Make the first item a "Featured" card spanning 2 columns
              <div key={`top-${article.id}`} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                 <ArticleCard article={article} featured={index === 0} />
              </div>
            ))}
          </div>
        </section>
        
        <hr className="border-slate-200 mb-16" />

        {/* Personalized Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-800">For You</h2>
            </div>
            {currentUser && (
               <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
                 Custom Feed
               </span>
            )}
          </div>
          {renderPersonalizedNews()}
        </section>
      </div>
    </div>
  );
}