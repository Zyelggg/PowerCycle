import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./pages/images/powerlogo.png";
import human from "./pages/images/humanicon.png";
import "./App.css";

import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import "./App.css";
const handleLinkClick = () => {
  setIsNavExpanded(false);
};

const UserSideNavigation = ({ handleLinkClick }) => {

  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // Function to handle link click and close the navigation menu


  return (
    
        <nav className="navigation">
          <Link to="/home" className="brand-name">
            <img src={logo} className='logo' alt="Logo" />
          </Link>
          <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
          </button>
          <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
            <ul className='nav-flex'>
              <li>
                <Link to="/home" onClick={handleLinkClick}>Home</Link>
              </li>
              <li>
                <Link to="/bikeservice" onClick={handleLinkClick}>Bicycles</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLinkClick}>About</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLinkClick}>FAQ</Link>
              </li>
            </ul>
          </div>
        </nav>

    );
};

export default UserSideNavigation;