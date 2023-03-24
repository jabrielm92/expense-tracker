import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logout from './Logout';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-btn">Home</Link>
        {!isAuthenticated && (
          <>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
            <Link to="/login" className="nav-btn">Log In</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="nav-btn">Dashboard</Link>
            <Logout className="logout-btn" onLogout={onLogout} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;











