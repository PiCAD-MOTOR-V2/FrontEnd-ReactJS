// src/components/Common/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Import CSS module
// import "./sidebar.css";
import logo from "../../assets/images/mmLogo.svg";
import {ReactComponent as HomeIcon} from "../../assets/images/icons/homeIcon.svg";
import {ReactComponent as UserManagementIcon} from "../../assets/images/icons/userManagementIcon.svg";
import {ReactComponent as ReportIcon} from "../../assets/images/icons/reportIcon.svg";
import {ReactComponent as SettingsIcon} from "../../assets/images/icons/settingsIcon.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <img src={logo} alt="Logo" className={styles.logo} /> {/* Update with your logo path */}
      </div>
      <ul className={styles.sidebarMenu}>
        <li className={styles.sidebarMenuItem}>
          <NavLink exact="true" to="/admin/home" className={({ isActive }) => isActive ? styles.active : styles.sidebarMenuLink}>
          <HomeIcon /> {'\u00A0'} {'\u00A0'} {'\u00A0'} Home
          </NavLink>
        </li>
        <li className={styles.sidebarMenuItem}>
          <NavLink exact="true" to="/admin/user-management" className={({ isActive }) => isActive ? styles.active : styles.sidebarMenuLink}>
          <UserManagementIcon /> {'\u00A0'} {'\u00A0'} {'\u00A0'} User Management
          </NavLink>
        </li>
        <li className={styles.sidebarMenuItem}>
          <NavLink exact="true" to="/admin/reports" className={({ isActive }) => isActive ? styles.active : styles.sidebarMenuLink}>
          <ReportIcon /> {'\u00A0'} {'\u00A0'} {'\u00A0'} Report
          </NavLink>
        </li>
        <li className={styles.sidebarMenuItem}>
          <NavLink exact="true" to="/admin/settings" className={({ isActive }) => isActive ? styles.active : styles.sidebarMenuLink}>
          <SettingsIcon /> {'\u00A0'} {'\u00A0'} {'\u00A0'} Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
