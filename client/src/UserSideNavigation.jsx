import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./pages/images/powerlogo.png";
import human from "./pages/images/humanicon.png";
import "./App.css";
import http from "./http";
import Dropdown from "react-bootstrap/Dropdown";

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
  const [user, setUser] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  // Function to handle link click and close the navigation menu
  
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get("/user/auth").then((res) => {
        setUser(res.data.user);
        // setUserid(res.data.userid);
        
      });

    }
  }, []);

  const deleteAccount = () => {
    http.delete(`/user/${userid}`).then((res) => {
      console.log(res.data);
      setIsDeleted(true);
      setOpen(false);

      setTimeout(() => {
        logout();
        window.location = "/";
      }, 2000);
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsDeleted(false);
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location = "/";
  };


  return (
    
        <div>
          <nav className="navigation">
          <Link to="/home" className="brand-name">
            <img
              src={logo}
              className="logo"
              style={{ marginTop: "20px", width: "80%" }}
              alt="Logo"
            />
          </Link>
          <button
            className="hamburger"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
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

          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
            <ul>
              <li>
                <Link to="/home" onClick={handleLinkClick} className="navlink">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/bikeservice"
                  onClick={handleLinkClick}
                  className="navlink"
                >
                  Bicycles
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLinkClick} className="navlink">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={handleLinkClick} className="navlink">
                  FAQ
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Dropdown className="navlink" style={{ marginTop: "10px" }}>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{ background: "none", border: "none" }}
                      >
                        <img src={human} className="humannlogo" alt="" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>More...</Dropdown.Item>
                        <Dropdown.Item href="/securitydetails/:id">
                          Security Details
                        </Dropdown.Item>
                        <Dropdown.Item href="/userdetails/:id">
                          User Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
                        <Dropdown.Item onClick={handleOpen}>
                          Delete account
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li>
                    <Dropdown className="navlink" style={{ marginTop: "10px" }}>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{ background: "none", border: "none" }}
                      >
                        <img src={human} className="humannlogo" alt="" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="/register">Register</Dropdown.Item>
                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Dialog open={open} onClose={handleClose}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3588/3588294.png"
            style={{ height: "50px", width: "50px", margin: "auto" }}
            alt="warning"
            className="noti-icon"
          />

          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this Account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              style={{ margin: "auto" }}
              onClick={deleteAccount}
            >
              Delete
            </Button>
          </DialogActions>
          <DialogActions>
            <Button
              variant="contained"
              color="inherit"
              style={{ margin: "auto" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isDeleted} onClose={handleClose}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png"
            style={{ height: "50px", width: "50px", margin: "auto" }}
          />

          <DialogTitle>Account has been deleted</DialogTitle>
        </Dialog>
        </div>
    );
};

export default UserSideNavigation;