import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const mockArticles = [
      { id: 1, title: "Global Markets Rally Today", category: "Business", excerpt: "Stocks saw a massive surge today as tech companies reported earnings..." },
      { id: 2, title: "New AI Model Released", category: "Technology", excerpt: "The latest generative model promises to change how we write code..." },
      { id: 3, title: "Updates on the War in Iran", category: "Politics", excerpt: "Diplomats are gathering today to discuss the ongoing situation..." },
      { id: 4, title: "General News Headline: Weather Alert", category: "General", excerpt: "Severe storms expected across the coastal regions this weekend..." }
    ];
    setHeadlines(mockArticles);
  }, []);

  // Reusable card component for cleaner code
  const ArticleCard = ({ article }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <span className="text-xs font-semibold tracking-wide uppercase text-blue-400 mb-2">
        {article.category}
      </span>
      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{article.title}</h3>
      <p className="text-slate-600 text-sm flex-grow">{article.excerpt}</p>
      <button className="mt-4 text-sm font-medium text-blue-400 self-start">
        Read more →
      </button>
    </div>
  );

  const renderPersonalizedNews = () => {
    if (!currentUser) return (
      <div className="bg-blue-50 text-blue-400 p-4 rounded-lg border border-blue-100 mt-6">
        <p>Log in to tailor this feed to your exact interests.</p>
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
      <p className="text-slate-500 mt-6 italic">No news found matching your current preferences.</p>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {personalizedArticles.map(article => <ArticleCard key={article.id} article={article} />)}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Top Headlines</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {headlines.map(article => <ArticleCard key={`top-${article.id}`} article={article} />)}
        </div>
      </section>
      
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Personalized Feed</h2>
          {currentUser && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Custom</span>}
        </div>
        {renderPersonalizedNews()}
      </section>
    </div>
  );
}