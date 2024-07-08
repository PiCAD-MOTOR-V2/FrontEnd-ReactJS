// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Common/Sidebar';
import AdminHomePage from './pages/Admin/AdminHomePage';
import UserManagementPage from './pages/Admin/UserManagementPage';
import ReportPage from './pages/Admin/ReportPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';
import styles from './App.module.css';
import Header from './components/Common/Header';

const user = {
  name: 'John Doe',
  role: 'Admin' // Example role
};

const App = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Sidebar />
        {/* <Header title="Admin Panel" user={user} /> */}
        <div className={styles.mainContent}>
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
