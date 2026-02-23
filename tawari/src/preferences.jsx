import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';


const PREDEFINED_CATEGORIES = [
  "Technology", "Business", "Sports", "Entertainment", "Health", 
  "Science", "Politics", "Environment", "Finance", "Art"
];

export default function Preferences() {
  const { currentUser, updatePreferences } = useContext(AuthContext);
  const [customInput, setCustomInput] = useState('');

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900">Authentication Required</h2>
        <p className="text-slate-600 mt-2">Please log in to manage your news preferences.</p>
      </div>
    );
  }

  const { categories, customTopics } = currentUser.preferences;

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


    const getNews = async () => {
      if (!currentUser) {
        alert("You must be logged in to run the script!");
        return;
      }
  
      // setIsLoading(true);
      // setPythonResult(null);
  
      try {
        const response = await fetch('http://localhost:3001/api/run-news-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // We pass the currentUser object inside the request body
          body: JSON.stringify({ currentUser }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Data.result contains whatever Python printed to the console
          // setPythonResult(data.result);
        } else {
          // setPythonResult(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Failed to connect to backend:", error);
        // setPythonResult("Failed to connect to the backend server.");
      }
    };
  

  const removeCustomTopic = (topic) => {
    const updatedTopics = customTopics.filter(t => t !== topic);
    updatePreferences({ categories, customTopics: updatedTopics });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 mt-8">
    
    <div className='flex items-center justify-between'>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4 border-b pb-4">Feed Preferences</h2>
      <button
      onClick={getNews}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border `}
      >Get Your News Report Now</button>
      </div>  
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Broad Categories</h3>
        <p className="text-sm text-slate-500 mb-4">Select the general topics you want to see in your feed.</p>
        <div className="flex flex-wrap gap-3">
          {PREDEFINED_CATEGORIES.map(cat => {
            const isSelected = categories.includes(cat);
            return (
              <button 
                key={cat} 
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border 
                  ${isSelected 
                    ? 'bg-blue-600 text-black border-blue-600 shadow-md transform scale-105' 
                    : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                  }`}
              >
                {cat} {isSelected && <span className="ml-1 text-green-400">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Specific Keywords</h3>
        <p className="text-sm text-slate-500 mb-4">Track niche stories by adding exact phrases or keywords.</p>
        
        <form onSubmit={addCustomTopic} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={customInput} 
            onChange={(e) => setCustomInput(e.target.value)} 
            placeholder='e.g., "The war in Iran"' 
            className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Add
          </button>
        </form>

        {customTopics.length > 0 ? (
          <ul className="space-y-2">
            {customTopics.map((topic, index) => (
              <li key={index} className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                <span className="text-slate-700 font-medium">"{topic}"</span>
                <button 
                  onClick={() => removeCustomTopic(topic)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400 italic">No specific topics added yet.</p>
        )}
      </div>
    </div>
  );
}