import React, { useEffect, useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../http'; // Make sure to import the http client for API requests
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import twitter from './images/twitter.png';
import powercycle from './images/powercycle.png';
import logo from './images/powerlogo.png';

function UserHistory() {
  const [userDetails, setUserDetails] = useState([]); // Initialize as an empty array

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

  console.log('userDetails:', userDetails);

  const fetchUserDetails = (userId) => {
    http.get(`/ridden`)
      .then((res) => {
        setUserDetails(res.data); // Assuming the API response is an array of user details
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
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
            <Typography variant="h3" style={{ color: "black" }}>John Doe</Typography>
            <Box className="hist-box">
              <Typography variant="h5">User History</Typography>
              {/* Display the user details here */}
              {userDetails.map((detail, index) => (
                <Box key={index} className="record-box">
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6">Bike No.: #{detail.bikeId}</Typography>
                      {/* <Typography variant="h6">Hours Ridden: {detail.hoursRidden}</Typography> */}
                      <Typography variant="h6">Distance: {detail.mileage}</Typography>
                      <Typography variant="h6">Electricity Generated: {detail.electricity}</Typography>
                      {/* <Typography variant="h6">Total Charged: {detail.totalCharged}</Typography> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <img src={powercycle} alt="image" style={{ width: "40px" }} />
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
                <img src={instagram} className='socials' alt="instagram"></img>
                <img src={twitter} className='socials' alt="twitter"></img>
                <img src={facebook} className='socials' alt="facebook"></img>
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
