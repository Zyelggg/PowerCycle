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
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

const AdminSideNavigation = ({ handleLinkClick }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    // <AppBar className='sidebar'>
    //   <Container>
    //     <Toolbar disableGutters={true} className='nav-links'>

    //       <img src={logo} className='logo' />

    //       <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           viewBox="0 0 20 20"
    //           fill="white"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </button>

    //       <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
    //         <ul className='side-ul'>
    //           <li>
    //             <Link to="/bikedash" onClick={handleLinkClick}>
    //               <Typography variant="h6" component="div">
    //                 Bike Dashboard
    //               </Typography>
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/home" onClick={handleLinkClick}><Typography>Home Page  </Typography></Link>
    //           </li>
    //           <li>
    //             <Link to="/bike" onClick={handleLinkClick}><Typography>Bicycles</Typography></Link>
    //           </li>
    //           <li>
    //             <Link to="/bikestop" onClick={handleLinkClick}><Typography>Bike Stop</Typography></Link>
    //           </li>
    //           <li>
    //             <Link to="/addbike" onClick={handleLinkClick}><Typography>Add Bikes</Typography></Link>
    //           </li>

    //           <li>
    //             <Link to="/addbikestop" onClick={handleLinkClick}><Typography>Add Bikes</Typography></Link>
    //           </li>
    //         </ul>
    //       </div>

    //     </Toolbar>
    //   </Container>
    // </AppBar>

    <AppBar className="sidebar">
      <Container>
        <Toolbar disableGutters={true} className="nav-links">
          <img src={logo} className="logo" />

          <Link to="/bikedash">
            <Typography variant="h6" component="div" className="nav-title">
              Admin Dashboard
            </Typography>
          </Link>
          <Link to="/adminhome">
            <Typography>Home</Typography>
          </Link>
          <Link to="/reward">
            <Typography>Rewards</Typography>
          </Link>
          <Link to="/user">
            <Typography>Users</Typography>
          </Link>
          <Link to="/admin">
            <Typography>Admin</Typography>
          </Link>
          <Link to="/">
            <Typography>Bikes</Typography>
          </Link>
          <Link to="/">
            <Typography>Transactions</Typography>
          </Link>
          <Link to="/">
            <Typography>Feedback</Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminSideNavigation;
