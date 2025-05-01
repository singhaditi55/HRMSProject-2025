import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('registeredUser');
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? 
            <Login onLoginSuccess={handleLoginSuccess} /> : 
            <Navigate to="/home" />
          } />
          <Route path="/register" element={
            !isAuthenticated ? 
            <Register /> : 
            <Navigate to="/home" />
          } />
          <Route path="/home" element={
            isAuthenticated ? 
            <HomePage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
