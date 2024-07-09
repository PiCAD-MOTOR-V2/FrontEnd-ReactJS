// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Common/Sidebar';
import AdminHomePage from './pages/Admin/AdminHomePage';
import UserManagementPage from './pages/Admin/UserManagementPage';
import ReportPage from './pages/Admin/ReportPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';
import styles from './App.module.css';
import Header from './components/Common/Header';
import DateRangePickerComponent from './components/Common/DateRangePicker';

const App = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    // Simulate async data fetching
    const fetchData = async () => {
      const response = await fetchUserData();
      setUserData({
        username: response.username,
        email: response.email,
        avatar: response.avatar
      });
    };

    fetchData();
  }, []);

  // Replace this with actual async function to fetch user data
  const fetchUserData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          username: 'Administrator',
          email: 'admin123@gmail.com',
          avatar: 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png' // Provide the correct path
        });
      }, 1000);
    });
  };

  return (
    <Router>
      <div className={styles.appContainer}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Header user={userData} />
          <DateRangePickerComponent />
          <Routes>
            <Route path="/admin/home" element={<AdminHomePage />} />
            <Route path="/admin/user-management" element={<UserManagementPage />} />
            <Route path="/admin/reports" element={<ReportPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
