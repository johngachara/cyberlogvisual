import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import ThemeToggle from '../components/common/ThemeToggle';
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await login(email, password);
      if (error) throw error;
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Please check your credentials.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-white to-purple-50/90 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        {/* Theme toggle with improved positioning and styling */}
        <div className="absolute top-0 right-0 md:top-6 md:right-6 z-10">
          <ThemeToggle />
        </div>
        
        {/* Logo with enhanced animation and styling */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/20 transform hover:scale-105 transition-all duration-300">
            <Shield className="h-12 w-12 text-white drop-shadow-md" />
          </div>
        </div>
        
        {/* Title with improved gradient and responsive typography */}
        <h2 className="text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 tracking-tight">
          CyberGuard
        </h2>
        
        <p className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
          Security Dashboard
        </p>
      </div>

      {/* Form container with enhanced glassmorphism effect */}
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-12 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                <Mail className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/80 dark:bg-gray-700/80 dark:text-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                <Lock className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/80 dark:bg-gray-700/80 dark:text-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign in to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Adding a footer for completeness */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} CyberGuard Security • All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Login;