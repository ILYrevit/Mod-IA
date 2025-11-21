import React from 'react';
import { Building2, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, username }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-900 p-2 rounded-lg text-white">
            <Building2 size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-indigo-900 brand-font italic">
            Augusto Velloso
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <span className="hidden md:block text-gray-500 text-sm">
            Olá, <span className="text-indigo-900 font-semibold">{username}</span>
          </span>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-900 hover:bg-indigo-50 px-3 py-2 rounded-md transition-colors"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;