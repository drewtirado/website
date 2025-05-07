import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useWorkData } from '../context/WorkContext';

function Navigation() {
  const [isWorkExpanded, setIsWorkExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { workBodies, loading, error } = useWorkData();

  const getNavLinkClass = ({ isActive }) => isActive ? styles.activeLink : '';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsWorkExpanded(false);
  }

  const handleWorkToggle = () => {
    if (!loading && !error && workBodies && workBodies.length > 0) {
        setIsWorkExpanded(!isWorkExpanded);
    }
  }

  const renderNavLinks = (isMobile = false) => (
    <>
      <li className={styles.navItem}><NavLink to="/" className={getNavLinkClass} onClick={isMobile ? closeMobileMenu : undefined}>Home</NavLink></li>
      <li className={`${styles.navItem} ${styles.workNavItem}`}>
        <button 
          className={styles.navItem}
          onClick={handleWorkToggle}
          aria-expanded={isWorkExpanded}
          disabled={loading || error || !workBodies || workBodies.length === 0}
        >
          Work {loading ? '(L)' : error ? '(E)' : ''}
        </button>
        {isWorkExpanded && !loading && !error && workBodies && workBodies.length > 0 && (
          <ul className={styles.workSubnav}>
            {workBodies.map(body => (
              <li key={body.id}>
                <NavLink 
                  to={`/work/${body.id}`}
                  className={getNavLinkClass}
                  onClick={isMobile ? closeMobileMenu : undefined}
                >
                  {body.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li className={styles.navItem}><NavLink to="/journal" className={getNavLinkClass} onClick={isMobile ? closeMobileMenu : undefined}>Journal</NavLink></li>
      <li className={styles.navItem}><NavLink to="/shop" className={getNavLinkClass} onClick={isMobile ? closeMobileMenu : undefined}>Shop</NavLink></li>
      <li className={styles.navItem}><NavLink to="/info" className={getNavLinkClass} onClick={isMobile ? closeMobileMenu : undefined}>Info</NavLink></li>
    </>
  );

  return (
    <nav className={styles.navContainer}>
      <button className={styles.hamburgerButton} onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={styles.navList}>
        {renderNavLinks(false)}
      </ul>

      {isMobileMenuOpen && (
        <div className={styles.mobileNavOverlay}>
          <ul className={styles.mobileNavList}>
            <button className={styles.closeButton} onClick={closeMobileMenu} aria-label="Close menu">&times;</button>
            {renderNavLinks(true)}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation; 