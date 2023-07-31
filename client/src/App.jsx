import BikeDash from './pages/BikeDash';
import Bikes from './pages/Bikes';
import BikeStop from './pages/BikeStop';
import AddBikes from './pages/AddBikes';
import AddBikeStop from './pages/AddBikeStop';
import EditBikes from './pages/EditBikes';
import EditBikeStop from './pages/EditBikeStop';
import Home from './pages/Home';
import BikeService from './pages/BikeService';
import QRCode from './pages/QRCode';
import './App.css';
import logo from './pages/images/powerlogo.png';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  // Hook from react-router-dom

  // Function to handle link click and close the navigation menu
  const handleLinkClick = () => {
    setIsNavExpanded(false);
  };

  return (

    /* User Side Navigation */
    <Router>
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
        <Container>
          <Routes>
          <Route path="/home" element={<Home />} />
            <Route path="/" element={ <BikeDash/>}/>
            <Route path="/bikeservice" element={<BikeService />} />
            <Route path="/bike" element={<Bikes />} />
            <Route path="/bikestop" element={<BikeStop />} />
            <Route path="/bikedash" element={<BikeDash />} />
            <Route path="/addbike" element={<AddBikes />} />
            <Route path="/addbikestop" element={<AddBikeStop />} />
            <Route path="/editbike/:id" element={<EditBikes />} />
            <Route path="/editbikestop/:id" element={<EditBikeStop />} />
            <Route path="/qrcode" element={<QRCode />} />

          </Routes>
        </Container>
      </Router>


    /* Admin Side Navigation */
    // <Router>
    //   <AppBar className='sidebar'>
    //     <Container>
    //       <Toolbar disableGutters={true} className='nav-links'>

    //         <img src={logo} className='logo' />

    //         <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5"
    //             viewBox="0 0 20 20"
    //             fill="white"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
    //               clipRule="evenodd"
    //             />
    //           </svg>
    //         </button>

    //         <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
    //           <ul className='side-ul'>
    //             <li>
    //               <Link to="/bikedash" onClick={handleLinkClick}>
    //                 <Typography variant="h6" component="div">
    //                   Bike Dashboard
    //                 </Typography>
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/home" onClick={handleLinkClick}><Typography>Home Page  </Typography></Link>
    //             </li>
    //             <li>
    //               <Link to="/bike" onClick={handleLinkClick}><Typography>Bicycles</Typography></Link>
    //             </li>
    //             <li>
    //               <Link to="/bikestop" onClick={handleLinkClick}><Typography>Bike Stop</Typography></Link>
    //             </li>
    //             <li>
    //               <Link to="/addbike" onClick={handleLinkClick}><Typography>Add Bikes</Typography></Link>
    //             </li>

    //             <li>
    //               <Link to="/addbikestop" onClick={handleLinkClick}><Typography>Add Bikes</Typography></Link>
    //             </li>
    //           </ul>
    //         </div>

    //       </Toolbar>
    //     </Container>
    //   </AppBar>
    //   <Container>
    //     <Routes>
    //       <Route path={"/home"} element={< Home />} />
    //       <Route path={"/bikeservice"} element={< BikeService />} />
    //       <Route path={"/bike"} element={< Bikes />} />
    //       <Route path={"/bikestop"} element={< BikeStop />} />
    //       <Route path={"/bikedash"} element={< BikeDash />} />
    //       <Route path={"/addbike"} element={<AddBikes />} />
    //       <Route path={"/addbikestop"} element={<AddBikeStop />} />
    //       <Route path={"/editbike/:id"} element={<EditBikes />} />
    //       <Route path={"/editbikestop/:id"} element={<EditBikeStop />} />
    //     </Routes>
    //   </Container>

    // </Router>



  );
}
export default App;