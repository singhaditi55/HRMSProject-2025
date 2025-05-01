import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';

const HomePage = ({ onLogout }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('registeredUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        firstName: parsedUser.firstName || '',
        lastName: parsedUser.lastName || '',
        email: parsedUser.email || ''
      });
    }
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>HRMS Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {userData.firstName} {userData.lastName}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="home-content">
        <div className="welcome-section">
          <h2>Welcome to the HR Management System</h2>
          <p>You are now logged in as {userData.email}</p>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Employee Management</h3>
            <p>Manage employee profiles, departments, and positions</p>
            <button className="card-btn">Access</button>
          </div>
          
          <div className="card">
            <h3>Attendance Tracking</h3>
            <p>Monitor employee attendance, leaves, and time-off requests</p>
            <button className="card-btn">Access</button>
          </div>
          
          <div className="card">
            <h3>Payroll Management</h3>
            <p>Process salaries, bonuses, and manage financial records</p>
            <button className="card-btn">Access</button>
          </div>
          
          <div className="card">
            <h3>Performance Reviews</h3>
            <p>Conduct performance evaluations and set employee goals</p>
            <button className="card-btn">Access</button>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; 2023 HRMS System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
