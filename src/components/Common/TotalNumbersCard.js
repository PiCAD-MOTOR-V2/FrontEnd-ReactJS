import React from 'react';
import styles from './TotalNumbersCard.module.css'; // Import the CSS module


const TotalNumbersCard = ({ username, email, avatar }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>{username}</div>
          <div className={styles.userEmail}>{email}</div>
        </div>
      </div>
      <div className={styles.powerButton}>
        <LogoutIcon />
      </div>
    </div>
  );
};

export default UserCard;
