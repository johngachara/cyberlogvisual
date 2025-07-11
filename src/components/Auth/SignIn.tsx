import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const { signIn, signUp, resetPassword, authState } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (isResetPassword) {
      if (!email) {
        setMessage('Please enter your email address');
        return;
      }

      const { error } = await resetPassword(email);
      if (error) {
        setMessage(error.message || 'Failed to send password reset email');
      } else {
        setMessage('Password reset email sent. Please check your inbox.');
      }
      return;
    }

    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }

    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) {
        setMessage(error.message || 'Failed to sign up');
      } else {
        setMessage('Sign up successful! Please check your email for verification.');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setMessage(error.message || 'Failed to sign in');
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsResetPassword(false);
    setMessage('');
  };

  const toggleResetPassword = () => {
    setIsResetPassword(!isResetPassword);
    setIsSignUp(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isResetPassword
              ? 'Reset your password'
              : isSignUp
              ? 'Create your account'
              : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isResetPassword
              ? 'Enter your email to receive reset instructions'
              : isSignUp
              ? 'Join our cybersecurity platform'
              : 'Welcome back to your security dashboard'}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors duration-200"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              {!isResetPassword && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
                      required
                      className="appearance-none relative block w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors duration-200"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-sm ${
                message.includes('successful') || message.includes('sent')
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={authState.loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {authState.loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {isResetPassword
                    ? 'Send reset instructions'
                    : isSignUp
                    ? 'Create account'
                    : 'Sign in'}
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                onClick={toggleMode}
              >
                {isSignUp ? 'Already have an account?' : 'Need an account?'}
              </button>
              <button
                type="button"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                onClick={toggleResetPassword}
              >
                {isResetPassword ? 'Back to sign in' : 'Forgot password?'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;