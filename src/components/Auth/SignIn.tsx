import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isResetPassword
              ? 'Reset your password'
              : isSignUp
              ? 'Create your account'
              : 'Sign in to your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!isResetPassword && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {message && (
            <div className={`text-sm text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          {authState.loading && (
            <div className="text-center">
              <div className="spinner"></div>
              <p className="mt-2 text-sm text-gray-500">Loading...</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={toggleMode}
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={toggleResetPassword}
              >
                {isResetPassword ? 'Back to sign in' : 'Forgot your password?'}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={authState.loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isResetPassword
                ? 'Send reset instructions'
                : isSignUp
                ? 'Sign up'
                : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;