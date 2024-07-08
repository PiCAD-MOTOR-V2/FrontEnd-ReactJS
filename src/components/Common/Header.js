// TitleBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title, user }) => {
  return (
    <div className={styles.Header}>
      <div className={styles.pageTitle}>
        <Link to="/admin/home" className={styles.link}>{title}</Link>
      </div>
      <div className={styles.userDetails}>
        <span>{user.name}</span>
        <span>{user.role}</span>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default Header;
