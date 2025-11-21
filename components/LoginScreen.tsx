import React, { useState } from 'react';
import { Building2, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      onLogin({ username: username || 'Eng. Ricardo', role: 'admin' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-900 transform -skew-y-6 origin-top-left scale-110 translate-y-[-20%]"></div>
      
      <div className="w-full max-w-md mx-4 z-20 relative">
        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-10">
            
            {/* Brand Header */}
            <div className="text-center mb-10">
               <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-lg mb-4">
                 <Building2 size={32} className="text-indigo-900" />
               </div>
              <h1 className="text-3xl font-bold text-indigo-900 tracking-tight brand-font italic">
                Augusto<br/>Velloso
              </h1>
              <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest font-semibold">Portal Corporativo</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                  Usuário
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-400 group-focus-within:text-indigo-900 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 transition-all"
                    placeholder="ID do Funcionário"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                  Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400 group-focus-within:text-indigo-900 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-indigo-900/30 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <span className="text-sm">AUTENTICANDO...</span>
                ) : (
                  <>
                    <span className="text-sm">ACESSAR SISTEMA</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400">
               © {new Date().getFullYear()} Augusto Velloso Engenharia.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;