import React, { useContext, useState } from "react";
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/Home.css';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import powercycle from './images/powercycle.png'
import logo from './images/powerlogo.png';
import UserContext from "../contexts/UserContext";

function UserHistory() {

 const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({}); // No need for 'user' state

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // Use axios instead of fetch to keep consistency with other requests
      http.get("/user/auth")
        .then((res) => {
          const userId = res.data.userid;
          console.log(userId); // Verify the user value here
          fetchUserDetails(userId); // Fetch user details using the foreign key (userId)
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  const fetchUserDetails = (userId) => {
    http.get(`/user/userdetails/${userId}`)
      .then((res) => {
        setUserDetail(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });

    http.get('/ridden')
      .then((res) => {
        setUserDetail(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching ridden details:', error);
      });
  };

  const handleScanButtonClick = () => {
    console.log("Pause");
  };

  return (
<Box>
      <Box className="wrap-div">
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <img src={powercycle} alt="image" style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="h3" style={{ color: "black", }}>John Doe</Typography>
            <Box className="hist-box">
              <Typography variant="h5" >User History</Typography>
              {/* Display the user details here */}
              {userDetail.map((userDetail, index) => (
                <Box key={index} className="record-box">
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" >Bike No.: {userDetail.bikeNo}</Typography>
                      <Typography variant="h6" >Hours Ridden: {userDetail.hoursRidden}</Typography>
                      <Typography variant="h6" >Distance: {userDetail.distance}</Typography>
                      <Typography variant="h6" >Total Charged: {userDetail.totalCharged}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <img src={powercycle} alt="image" style={{ width: "40px%" }} />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <AppBar position="static" className="Footer">
        <Container>
          <Toolbar disableGutters={true}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <img src={logo} className="logo" alt="PowerLogo" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">Navigation</Typography>
                <Link to="/home">
                  <Typography>Home</Typography>
                </Link>
                <Link to="/bikeservice">
                  <Typography>Bicycles</Typography>
                </Link>
                <Link to="/">
                  <Typography>About</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">Customer Help</Typography>
                <Link to="/">
                  <Typography>FAQ</Typography>
                </Link>
                <Link to="/">
                  <Typography>Message Us</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">Social Media</Typography>
                <img src={instagram} className='socials'></img>
                <img src={twitter} className='socials'></img>
                <img src={facebook} className='socials'></img>
              </Grid>
            </Grid>
          </Toolbar>
          <Typography variant="body1" style={{ textAlign: "center", marginTop: "40px" }}>
            © 2023 PowerRide. All rights reserved.
          </Typography>
        </Container>
      </AppBar>
    </Box>
  );
}

export default UserHistory;