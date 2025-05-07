import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Navigation />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout; 