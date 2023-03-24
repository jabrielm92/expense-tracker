import React from 'react';
import { useNavigate } from 'react-router-dom';
import { firebase } from './firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;






