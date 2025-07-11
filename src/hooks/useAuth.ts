import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { User, AuthState } from '../types';

// Create the authentication context
interface AuthContextType {
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

export const AuthContext = createContext<AuthContextType>({
  authState: { user: null, session: null, loading: true, error: null },
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
});

// Hook for components to get the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication functions that will be used by the AuthProvider
export const createAuthFunctions = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
          return;
        }

        if (data?.session) {
          const { data: userData } = await supabase.auth.getUser();
          setAuthState({
            user: userData.user as User,
            session: data.session,
            loading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error: any) {
        setAuthState(prev => ({ 
          ...prev, 
          error: error.message || 'An error occurred while checking authentication',
          loading: false 
        }));
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session) {
            const { data } = await supabase.auth.getUser();
            setAuthState({
              user: data.user as User,
              session,
              loading: false,
              error: null,
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { error };
      }
      
      return { error: null };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error.message || 'An error occurred during sign in',
        loading: false 
      }));
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { error };
      }
      
      setAuthState(prev => ({ 
        ...prev, 
        loading: false,
        error: null 
      }));
      
      return { error: null };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error.message || 'An error occurred during sign up',
        loading: false 
      }));
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error.message || 'An error occurred during sign out',
        loading: false 
      }));
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { error };
      }
      
      setAuthState(prev => ({ ...prev, loading: false }));
      return { error: null };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error.message || 'An error occurred during password reset',
        loading: false 
      }));
      return { error };
    }
  };

  return {
    authState,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};