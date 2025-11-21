import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ImageEditor from './components/ImageEditor';
import Header from './components/Header';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            !user ? (
              <LoginScreen onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/" 
          element={
            user ? (
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header username={user.username} onLogout={handleLogout} />
                <main className="flex-1">
                  <ImageEditor />
                </main>
                <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
                  <p>Criado por Higor Ramos</p>
                </footer>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;