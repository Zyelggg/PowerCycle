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
import About from "./pages/About";
import FAQ from "./pages/FAQ";
// import AdminHome from './pages/AdminHome';
import QRCode from "./pages/QRCode";
import UserContext from "./contexts/UserContext";
import Feedback from "./components/Feedback";
import UserHistory from "./pages/UserHistory"
import http from "./http";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./pages/verification";
import Userdetails from "./pages/userdetails";
import Securitydetails from "./pages/securitydetails";import RidingBike from "./pages/RidingBike";
import RideComplete from "./pages/RideComplete";
import "./App.css";
import AddPayment from "./pages/AddPayment";
import PaymentMethods from "./pages/PaymentMethods";
import EditPayment from "./pages/EditPayment";
import logo from "./pages/images/powerlogo.png";
import human from "./pages/images/humanicon.png";
import UserSideNavigation from "./UserSideNavigation";
import AdminSideNavigation from "./AdminSideNavigation";
import Reviews from "./pages/Reviews"

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
import { Add, Update } from "@mui/icons-material";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [userid, setUserid] = useState(null);
  const [open, setOpen] = useState(false);

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  // Hook from react-router-dom
  const [isAdmin, setIsAdmin] = useState(false);

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
        // Check if the user is an admin
        setIsAdmin(res.data.user.admin === true);
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
          <>
            <AdminSideNavigation handleLinkClick={handleLinkClick} />
            <Container>
              <Routes>
                
              </Routes>
            </Container>
          </>
        ) : (
          // Render user side navigation if the user is not an admin
          <>
            <UserSideNavigation handleLinkClick={handleLinkClick} />
            <Container>
              <Routes>

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
              </Routes>
            </Container>
          </>
        ) : (
          // Render user side navigation if the user is not an admin
          <>
            <UserSideNavigation handleLinkClick={handleLinkClick} />
            <Container>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/qrcode" element={<QRCode />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/ridecomplete" element={<RideComplete />} />
                <Route path={"/about"} element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/review" element={<Reviews />} />
                <Route path="/ridingbike" element={<RidingBike />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/verification"} element={<Verification />} />
                <Route path="/bikeservice" element={<BikeService />} />
                <Route path={"/userdetails/:id"} element={<Userdetails />} />
                <Route path={"/userhistory/:id"} element={< UserHistory />} />
                <Route path={"/securitydetails/:id"} element={<Securitydetails />} />
                <Route path={"/payment"} element={<PaymentMethods />} />
                <Route path={"/addpayment"} element={<AddPayment />} />
                <Route path={"/editpayment"} element={<EditPayment />} />
              </Routes>
            </Container>
          </>
        )}
        </Router>
        </UserContext.Provider>
  );
}

export default App;