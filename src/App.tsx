/**
 * Main App component - Entry point for the cybersecurity dashboard
 * Handles routing and authentication
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Auth/SignIn';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authState } = useAuth();

  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route 
          path="/signin" 
          element={
            authState.user ? <Navigate to="/dashboard" replace /> : <SignIn />
          } 
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirect to dashboard or signin based on auth state */}
        <Route 
          path="*" 
          element={
            <Navigate to={authState.user ? "/dashboard" : "/signin"} replace />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
