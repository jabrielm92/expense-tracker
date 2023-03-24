import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { firebase } from './firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Log In</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label" htmlFor="email">Email:</label>
        <input
          className="login-input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="login-label" htmlFor="password">Password:</label>
        <input
          className="login-input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="login-button" type="submit">Log In</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
