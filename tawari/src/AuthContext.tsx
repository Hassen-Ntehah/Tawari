import React, { createContext, useState, useEffect, type ReactNode } from 'react';

// 1. Define our TypeScript Interfaces
export interface Preferences {
  categories: string[];
  customTopics: string[];
}

export interface User {
  email: string;
  password?: string; // Optional for safety, though stored here for the mock DB
  preferences: Preferences;
}

interface AuthContextType {
  currentUser: User | null;
  signUp: (email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updatePreferences: (newPreferences: Preferences) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// 2. Create the Context with an undefined initial state but cast to our type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  
  // Added an initialization state for our Tailwind loading screen
  const [isInitializing, setIsInitializing] = useState<boolean>(true); 

  // Load our simulated JSON file on startup
// 1. Update the initial load to fetch from the backend
useEffect(() => {
  const fetchUsers = async () => {
    try {
      // Fetch from our local backend instead of localStorage
      const response = await fetch('http://localhost:3001/api/users');
      const dbUsers = await response.json();
      setUsers(dbUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  fetchUsers();

  // We still keep the CURRENT logged-in user in localStorage 
  // so they stay logged in if they refresh the page.
  const loggedInUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (loggedInUser) setCurrentUser(loggedInUser);
}, []);

// 2. Update the save function to POST to the backend
const saveUsersToJSON = async (updatedUsers: User[]) => {
  setUsers(updatedUsers); // Update React state immediately for a snappy UI
  
  try {
    await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUsers)
    });
  } catch (error) {
    console.error("Failed to save to JSON file:", error);
  }
};

  const signUp = (email: string, password: string): boolean => {
    if (users.find(u => u.email === email)) return false; // User exists
    
    const newUser: User = { 
      email, 
      password, 
      preferences: { categories: [], customTopics: [] } 
    };
    saveUsersToJSON([...users, newUser]);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updatePreferences = (newPreferences: Preferences) => {
    if (!currentUser) return;

    const updatedUser: User = { ...currentUser, preferences: newPreferences };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const updatedUsers = users.map(u => 
      u.email === currentUser.email ? updatedUser : u
    );
    saveUsersToJSON(updatedUsers);
  };

  // 3. Tailwind CSS Loading Screen
  // This prevents the app from flashing unauthenticated states while reading localStorage
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          {/* Tailwind animated loading spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-b-blue-600"></div>
          <p className="text-slate-500 font-medium">Loading your news stream...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, signUp, login, logout, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};