import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className="home-header">Welcome to the MINT Money App</h1>
        <p className="home-subheader">In Production. To demo, click Login and enter provided credentials</p>
      </div>
      <div className="dollar-signs-container">
        <div className="dollar-signs-row">
          <span className="dollar-signs">$</span>
          <span className="dollar-signs">$</span>
          <span className="dollar-signs">$</span>
        </div>
        <div className="dollar-signs-row">
          <span className="dollar-signs">$</span>
          <span className="dollar-signs">$</span>
        </div>
        <div className="dollar-signs-row">
          <span className="dollar-signs">$</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

