import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import UserCard from './UserCard'; // Ensure the path is correct

const Header = ({ pageTitle, user }) => {
  const location = useLocation();

  // Extract the current pathname to determine the active page
  const getCurrentPage = () => {
    const path = location.pathname;
    switch (path) {
      case '/admin/home':
        return 'Home';
      case '/admin/user-management':
        return 'User Management';
      case '/admin/reports':
        return 'Reports';
      case '/admin/settings':
        return 'Settings';
      default:
        return 'Admin Panel';
    }
  };

  const currentPageTitle = pageTitle || getCurrentPage();

  return (
    <div className={styles.header}>
      <div className={styles.pageTitle}>
        <Link to="/admin/home" className={styles.link}>{currentPageTitle}</Link>
      </div>
      <div className={styles.userDetails}>
        <UserCard
          username={user.username}
          email={user.email}
          avatar={user.avatar}
        />
      </div>
    </div>
  );
};

export default Header;
