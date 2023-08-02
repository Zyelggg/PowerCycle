import BikeDash from "./pages/BikeDash";
import Bikes from "./pages/Bikes";
import BikeStop from "./pages/BikeStop";
import AddBikes from "./pages/AddBikes";
import AddBikeStop from "./pages/AddBikeStop";
import EditBikes from "./pages/EditBikes";
import EditBikeStop from "./pages/EditBikeStop";
import Home from "./pages/Home";
import BikeService from "./pages/BikeService";
import RewardManagement from './pages/RewardManagement';
import AddReward from './pages/AddReward';
import EditReward from './pages/EditReward';
import RetrieveReward from './pages/RetrieveReward';
import DeleteReward from './pages/DeleteReward';
import UserManagement from './pages/UserManagement';
import AddUser from "./pages/AddUser";
import RetrieveUser from "./pages/RetrieveUser";
import DeleteUser from './pages/DeleteUser';
import EditUser from './pages/EditUser';
import AdminManagement from './pages/AdminManagement';
import AddAdmin from './pages/AddAdmin';
import EditAdmin from './pages/EditAdmin';
import RetrieveAdmin from './pages/RetrieveAdmin';
import DeleteAdmin from './pages/DeleteAdmin';
// import AdminHome from './pages/AdminHome';
import QRCode from "./pages/QRCode";
import UserContext from "./contexts/UserContext";
import http from "./http";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./pages/verification";
import Userdetails from "./pages/userdetails";
import Securitydetails from "./pages/securitydetails";
import "./App.css";
import logo from "./pages/images/powerlogo.png";
import human from "./pages/images/humanicon.png";

import UserSideNavigation from "./UserSideNavigation"; // Import user side navigation
import AdminSideNavigation from "./AdminSideNavigation"; // Import admin side navigation

import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [userid, setUserid] = useState(null);
  const [open, setOpen] = useState(false);

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  // Hook from react-router-dom


  // const isAdmin = user && user.role === False;
  const isAdmin = true;
  // Function to handle link click and close the navigation menu
  const handleLinkClick = () => {
    setIsNavExpanded(false);
  };
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
        setUserid(res.data.userid);
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
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        {isAdmin ? (
          // Render admin side navigation if the user is an admin
          <AdminSideNavigation handleLinkClick={handleLinkClick} />
        ) : (
          // Render user side navigation if the user is not an admin
          <UserSideNavigation handleLinkClick={handleLinkClick} />
        )}
        <Container>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<BikeDash />} />
            <Route path="/bikeservice" element={<BikeService />} />
            <Route path="/bike" element={<Bikes />} />
            <Route path="/bikestop" element={<BikeStop />} />
            <Route path="/bikedash" element={<BikeDash />} />
            <Route path="/addbike" element={<AddBikes />} />
            <Route path="/addbikestop" element={<AddBikeStop />} />
            <Route path="/editbike/:id" element={<EditBikes />} />
            <Route path="/editbikestop/:id" element={<EditBikeStop />} />
            <Route path={"/reward"} element={<RewardManagement />} />
            <Route path={"/addreward"} element={<AddReward />} />
            <Route path={"/getreward"} element={<RetrieveReward />} />
            <Route path={"/editreward/:id"} element={<EditReward />} />
            <Route path={"/delreward"} element={<DeleteReward />} />
            <Route path={"/user"} element={<UserManagement />} />
            <Route path={"/adduser"} element={<AddUser />} />
            <Route path={"/getuser"} element={<RetrieveUser />} />
            <Route path={"/edituser/:id"} element={<EditUser />} />
            <Route path={"/deluser"} element={<DeleteUser />} />
            {/* <Route path={"/adminhome"} element={<AdminHome />} /> */}
            <Route path={"/admin"} element={<AdminManagement />} />
            <Route path={"/addadmin"} element={<AddAdmin />} />
            <Route path={"/getadmin"} element={<RetrieveAdmin />} />
            <Route path={"/editadmin/:id"} element={<EditAdmin />} />
            <Route path={"/deladmin"} element={<DeleteAdmin />} />
            <Route path="/qrcode" element={<QRCode />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/verification"} element={<Verification />} />
            <Route path={"/userdetails/:id"} element={<Userdetails />} />
            <Route
              path={"/securitydetails/:id"}
              element={<Securitydetails />}
            />
          </Routes>
        </Container>
      </Router>
      </UserContext.Provider>
    /* User Side Navigation */
    // <UserContext.Provider value={{ user, setUser }}>
    //   <Router>
    //     <nav className="navigation">
    //       <Link to="/home" className="brand-name">
    //         <img
    //           src={logo}
    //           className="logo"
    //           style={{ marginTop: "20px", width: "80%" }}
    //           alt="Logo"
    //         />
    //       </Link>
    //       <button
    //         className="hamburger"
    //         onClick={() => setIsNavExpanded(!isNavExpanded)}
    //       >
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

    //       <div
    //         className={
    //           isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
    //         }
    //       >
    //         <ul>
    //           <li>
    //             <Link to="/home" onClick={handleLinkClick} className="navlink">
    //               Home
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/bikeservice"
    //               onClick={handleLinkClick}
    //               className="navlink"
    //             >
    //               Bicycles
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/" onClick={handleLinkClick} className="navlink">
    //               About
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/" onClick={handleLinkClick} className="navlink">
    //               FAQ
    //             </Link>
    //           </li>
    //           {user && (
    //             <>
    //               <li>
    //                 <Dropdown className="navlink" style={{ marginTop: "10px" }}>
    //                   <Dropdown.Toggle
    //                     variant="success"
    //                     id="dropdown-basic"
    //                     style={{ background: "none", border: "none" }}
    //                   >
    //                     <img src={human} className="humannlogo" alt="" />
    //                   </Dropdown.Toggle>

    //                   <Dropdown.Menu>
    //                     <Dropdown.Item>More...</Dropdown.Item>
    //                     <Dropdown.Item href="/securitydetails/:id">
    //                       Security Details
    //                     </Dropdown.Item>
    //                     <Dropdown.Item href="/userdetails/:id">
    //                       User Details
    //                     </Dropdown.Item>
    //                     <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
    //                     <Dropdown.Item onClick={handleOpen}>
    //                       Delete account
    //                     </Dropdown.Item>
    //                   </Dropdown.Menu>
    //                 </Dropdown>
    //               </li>
    //             </>
    //           )}
    //           {!user && (
    //             <>
    //               <li>
    //                 <Dropdown className="navlink" style={{ marginTop: "10px" }}>
    //                   <Dropdown.Toggle
    //                     variant="success"
    //                     id="dropdown-basic"
    //                     style={{ background: "none", border: "none" }}
    //                   >
    //                     <img src={human} className="humannlogo" alt="" />
    //                   </Dropdown.Toggle>

    //                   <Dropdown.Menu>
    //                     <Dropdown.Item href="/register">Register</Dropdown.Item>
    //                     <Dropdown.Item href="/login">Login</Dropdown.Item>
    //                   </Dropdown.Menu>
    //                 </Dropdown>
    //               </li>
    //             </>
    //           )}
    //         </ul>
    //       </div>
    //     </nav>
    //     <Dialog open={open} onClose={handleClose}>
    //       <img
    //         src="https://cdn-icons-png.flaticon.com/512/3588/3588294.png"
    //         style={{ height: "50px", width: "50px", margin: "auto" }}
    //         alt="warning"
    //         className="noti-icon"
    //       />

    //       <DialogTitle>Delete Account</DialogTitle>
    //       <DialogContent>
    //         <DialogContentText>
    //           Are you sure you want to delete this Account?
    //         </DialogContentText>
    //       </DialogContent>
    //       <DialogActions>
    //         <Button
    //           variant="contained"
    //           color="error"
    //           style={{ margin: "auto" }}
    //           onClick={deleteAccount}
    //         >
    //           Delete
    //         </Button>
    //       </DialogActions>
    //       <DialogActions>
    //         <Button
    //           variant="contained"
    //           color="inherit"
    //           style={{ margin: "auto" }}
    //           onClick={handleClose}
    //         >
    //           Cancel
    //         </Button>
    //       </DialogActions>
    //     </Dialog>

    //     <Dialog open={isDeleted} onClose={handleClose}>
    //       <img
    //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png"
    //         style={{ height: "50px", width: "50px", margin: "auto" }}
    //       />

    //       <DialogTitle>Account has been deleted</DialogTitle>
    //     </Dialog>

    //     <Container>
    //       <Routes>
    //         <Route path="/home" element={<Home />} />
    //         <Route path="/" element={<BikeDash />} />
    //         <Route path="/bikeservice" element={<BikeService />} />
    //         <Route path="/bike" element={<Bikes />} />
    //         <Route path="/bikestop" element={<BikeStop />} />
    //         <Route path="/bikedash" element={<BikeDash />} />
    //         <Route path="/addbike" element={<AddBikes />} />
    //         <Route path="/addbikestop" element={<AddBikeStop />} />
    //         <Route path="/editbike/:id" element={<EditBikes />} />
    //         <Route path="/editbikestop/:id" element={<EditBikeStop />} />
    //         <Route path={"/reward"} element={<RewardManagement />} />
    //         <Route path={"/addreward"} element={<AddReward />} />
    //         <Route path={"/getreward"} element={<RetrieveReward />} />
    //         <Route path={"/editreward/:id"} element={<EditReward />} />
    //         <Route path={"/delreward"} element={<DeleteReward />} />
    //         <Route path={"/user"} element={<UserManagement />} />
    //         {/* <Route path={"/adminhome"} element={<AdminHome />} /> */}
    //         <Route path={"/admin"} element={<AdminManagement />} />
    //         <Route path={"/addadmin"} element={<AddAdmin />} />
    //         <Route path={"/getadmin"} element={<RetrieveAdmin />} />
    //         <Route path={"/editadmin/:id"} element={<EditAdmin />} />
    //         <Route path={"/deladmin"} element={<DeleteAdmin />} />
    //         <Route path="/qrcode" element={<QRCode />} />
    //         <Route path={"/register"} element={<Register />} />
    //         <Route path={"/login"} element={<Login />} />
    //         <Route path={"/verification"} element={<Verification />} />
    //         <Route path={"/userdetails/:id"} element={<Userdetails />} />
    //         <Route
    //           path={"/securitydetails/:id"}
    //           element={<Securitydetails />}
    //         />
    //       </Routes>
    //     </Container>
    //   </Router>
    // </UserContext.Provider>

);
}
export default App;