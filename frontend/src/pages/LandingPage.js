// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import PauseLogo from '../asset/PauseLogo.png'; 

// Landing page component
function LandingPage() {
  return (
    <div className="container text-center mt-5">
      <div className="logo-container mb-4">
        <img src={PauseLogo} alt="Pause Logo" className="pause-logo img-fluid" />
      </div>
      <p className="app-description mb-5">
      <div className="welcome">Welcome to Pause.</div> <br /> The menopause tracking app that empowers you. <br /> Helping you track and manage your symptoms effectively.
      </p>
      <div className="button-container d-flex justify-content-center">
        <Link to="/register" className="primary-button">
          Get Started
        </Link>
        <Link to="/login" className="secondary-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
