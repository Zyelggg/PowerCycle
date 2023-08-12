import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom';
import ebike from './images/Ebike.png';
import { Container, AppBar, Toolbar, Typography, Box, Grid, Button, duration } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import http from "../http";

function RideComplete() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [isImageShrunken, setIsImageShrunken] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const userid = queryParams.get('userId');
  const serialno = queryParams.get('serialno');
  const mileage = queryParams.get('mileage');
  const electricity = queryParams.get('electricity');
  const duration = queryParams.get('duration');

  let amount = 0;

  if (duration === '0') {
    amount = 3;
  } else {
    console.log(duration)
    amount = parseInt(duration) * 3; // Convert to integer and then calculate
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http
        .get("/user/auth")
        .then((res) => {
          setUser(res.data.userid);
          fetch(`http://localhost:3001/user/userdetails/${res.data.userid}`)
            .then((res) => res.json())
            .then((data) => {
              setUserDetail(data);
            });
        });
    }

  }, []);

  return (
    <div>
      <Box className="landing-banner2">
        <Container className='landing-content'>
          <Typography variant='h3'>Bicycle Rental</Typography>
        </Container>
      </Box>

      <div className="user-records">
        <div className={`white-wrapper ${isImageShrunken ? 'shrunken' : ''}`}>
          <Typography variant='h4' style={{ marginBottom: "20px" }}>Congratulations</Typography>

          <img
            src={ebike}
            alt="image"
            className='bike-image'
          />

          <Typography variant='h4' style={{ marginBottom: "20px", color: "black" }}>Your Performance</Typography>
          {/* Render the received data */}
          <p style={{ color: "black" }}>User ID: {userid}</p>
          <p style={{ color: "black" }}>Ride Duration: {duration} minutes</p>
          <p style={{ color: "black" }}>Mileage: {mileage} km</p>
          <p style={{ color: "black" }}>Electricity {electricity}</p>
          <p style={{ color: "black" }}>Bike Serial: {serialno}</p>

          <br></br>
          <Typography variant='h4' style={{ color: "black" }}>Payment Details</Typography>
          <Typography variant="subtitle1" style={{ color: "black" }}>Charged To: THIS CREDIT CARD</Typography>
          <Typography variant="subtitle1" style={{ color: "black" }}>Amount Charged: ${amount}.00</Typography>

          
        
        </div>
        <Button variant="contained" type="button" className='home-btn' style={{ marginTop: "20px"}} onClick={ () => navigate('/reviews')}>Leave us a review</Button>
      </div>



      <Typography variant='h4' style={{ marginBottom: "20px", color: "white", marginLeft: "20px", marginTop: "40px" }}>Stuck? Talk to our customer help</Typography>

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
                <img src={instagram} className='socials' alt="Instagram" />
                <img src={twitter} className='socials' alt="Twitter" />
                <img src={facebook} className='socials' alt="Facebook" />
              </Grid>
            </Grid>
          </Toolbar>
          <Typography variant="body1" style={{ textAlign: "center", marginTop: "40px" }}>
            © 2023 PowerRide. All rights reserved.
          </Typography>
        </Container>
      </AppBar>
    </div>
  );
}

export default RideComplete;
