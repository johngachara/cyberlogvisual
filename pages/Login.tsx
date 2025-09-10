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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-white to-purple-50/90 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative animate-fade-in">
        {/* Theme toggle with improved positioning and styling */}
        <div className="absolute -top-4 right-0 md:top-6 md:right-6 z-10">
          <ThemeToggle />
        </div>
        
        {/* Logo with enhanced animation and styling */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="p-4 md:p-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl shadow-blue-500/25 dark:shadow-blue-700/25 transform hover:scale-105 transition-all duration-300 animate-scale-in">
            <Shield className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow-md" />
          </div>
        </div>
        
        {/* Title with improved gradient and responsive typography */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 tracking-tight animate-slide-in-up">
          CyberGuard
        </h2>
        
        <p className="text-center text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6 md:mb-8 animate-slide-in-up">
          Security Dashboard
        </p>
      </div>

      {/* Form container with enhanced glassmorphism effect */}
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-up">
        <div className="glass py-8 md:py-10 px-6 sm:px-8 md:px-12 shadow-2xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2"
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
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2"
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
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm md:text-base"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
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
        <div className="mt-6 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
          © {new Date().getFullYear()} CyberGuard Security • All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Login;