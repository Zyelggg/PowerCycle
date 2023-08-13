import React from 'react';
import './Footer.css';
import logo from '../assets/powerlogo.png';
import { Link } from 'react-router-dom';
import instagram from '../pages/images/instagram.png'
import facebook from '../pages/images/facebook.png'
import twitter from '../pages/images/twitter.png'
import { AppBar, Container, Typography, Grid, Toolbar } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="static" className="Footer">
      <Container>
        <Toolbar disableGutters={true}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <img src={logo} className="logo" alt="PowerLogo" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Navigation</Typography>
              <Link to="/">
                <Typography>Home</Typography>
              </Link>
              <Link to="/bikeservice">
                <Typography>Bicycles</Typography>
              </Link>
              <Link to="/about">
                <Typography>About</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Customer Help</Typography>
              <Link to="/faq">
                <Typography>FAQ</Typography>
              </Link>
              <Link to="/faq">
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
  );
};

export default Footer;
