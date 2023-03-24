import React, { useState } from 'react';
import { firebase } from './firebase';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.updateProfile({
        displayName: name
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        <label>
          Email:
          <input
            type="email"
            className="signup-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            className="signup-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            className="signup-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;



