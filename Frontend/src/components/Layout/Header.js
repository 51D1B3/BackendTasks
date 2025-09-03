import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = memo(() => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="glass-effect border-b border-white/20 animate-slide-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold gradient-text floating-animation">
              ✨ Gestionnaire de Tâches
            </Link>
          </div>

          <nav className="hidden md:flex space-x-2">
            <Link
              to="/"
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg' 
                  : 'text-sky-700 hover:bg-white/50 hover:text-sky-800'
              }`}
            >
              🏠 Tableau de bord
            </Link>
            <Link
              to="/tasks"
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isActive('/tasks') 
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg' 
                  : 'text-sky-700 hover:bg-white/50 hover:text-sky-800'
              }`}
            >
              📋 Mes Tâches
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="pulse-ring"></div>
              <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                👋 {user?.name || user?.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-sky-700 hover:text-red-600 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/50 transform hover:scale-105"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
