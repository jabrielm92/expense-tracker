import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { firebase } from './firebase';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!firebase.auth().currentUser;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;






