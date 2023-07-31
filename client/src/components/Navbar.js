// components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../assets/powerlogo.png';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [displayText, setDisplayText] = useState('About Us & Benefits');

  const handleAboutClick = () => {
    setDisplayText('About Us & Benefits');
  };

  const handleFaqsClick = () => {
    setDisplayText('Frequently Asked Questions');
  };

  const handleFeedbackClick = () => {
    setDisplayText('Feedbacks/Reviews');
  };


  return (
    <div className="body">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img className="logoImage" src={logoImage} alt="logo" />
        </Link>

        <ul className="links">
          <li>
            <NavLink exact to="/about" activeClassName="active" onClick={handleAboutClick}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/faqs" activeClassName="active" onClick={handleFaqsClick}>
              FAQs
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" activeClassName="active" onClick={handleFeedbackClick}>
              Feedback
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='heading'>{displayText}</div>
    </div>
  );
};

export default Navbar;
