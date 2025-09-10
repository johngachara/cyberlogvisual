
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import ThemeToggle from './common/ThemeToggle';
import { Shield, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast({
      title: 'Signed Out',
      description: "You have been successfully logged out.",
      status: 'info'
    });
    navigate('/login');
  };

  return (
    <nav className="glass border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/20">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="ml-3 md:ml-4">
              <h1 className="text-lg md:text-xl font-bold gradient-text">
                CyberGuard
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                Security Dashboard
              </p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-ghost p-2 rounded-xl"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-in-down border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1 glass">
              <button
                onClick={handleLogout}
                className="btn-ghost w-full justify-start px-3 py-3 text-sm font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
