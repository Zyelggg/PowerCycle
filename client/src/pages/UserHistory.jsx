import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/Home.css';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import powercycle from './images/powercycle.png'
import logo from './images/powerlogo.png';

function Home() {
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
              
                <Box className="record-box">
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                  <Typography variant="h6" >Bike No.</Typography>
                    <Typography variant="h6" >Hours Ridden: </Typography>
                    <Typography variant="h6" >Distance</Typography>
                    <Typography variant="h6" >Total Charged</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <img src={powercycle} alt="image" style={{ width: "40px%" }} />
                    </Grid>
                  </Grid>
                    
                </Box>
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

export default Home;