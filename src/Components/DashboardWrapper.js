import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { firebase } from './firebase';
import Dashboard from './Dashboard';

const DashboardWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
};

export default DashboardWrapper;
