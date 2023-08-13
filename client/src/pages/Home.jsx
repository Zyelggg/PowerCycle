import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Home.css';
import pic1 from './images/1.png'
import pic2 from './images/2.png'
import pic3 from './images/3.png'
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import banner1 from './images/banner1.png'
import Footer from "../components/Footer.jsx";

function Home() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box className="landing-banner">
        <Container className='landing-content'>
          <Typography variant='h3'>Power your ride, </Typography>
          <Typography variant='h3'>light up the city</Typography>
          <Typography variant='h5'> Ride with us now</Typography>
          <Box sx={{ mt: 2 }} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Button variant="contained" type="button" className='home-btn' onClick={() => navigate('/bikeservice')}>
              Ride now
            </Button>
            <Button variant="contained" type="button" className='home-btn' onClick={() => navigate('/faq')}>
              Learn more
            </Button>
          </Box>
        </Container>
      </Box>

      <Box className="wrap-div">
        <Typography variant='h2' style={{ textAlign: "center", marginTop: "20px", color: "black", marginBottom: "30px" }}>How it works</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <img src={pic1} alt="Image 1" className='pic-icon' />
            <Typography style={{ color: "black", textAlign: "center" }}>Make a difference for the planet with our revolutionary bike rental service that goes beyond transportation. By choosing our eco-friendly bicycles, you actively contribute to environmental preservation. As you ride, our bikes generate electricity,
              harnessing the power of your pedaling to reduce carbon emissions and promote sustainable energy. </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <img src={pic3} alt="Image 3" className='pic-icon' />
            <Typography style={{ color: "black", textAlign: "center" }}>Discover the freedom of unlimited exploration with our bike rental service. With our wide range of bicycles available, you can easily get to any place you desire. Whether you want to navigate through bustling city streets, explore scenic trails,
              or reach your favorite local attractions, our bikes provide the perfect means of transportation.</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <img src={pic2} alt="Image 2" className='pic-icon' />
            <Typography style={{ color: "black", textAlign: "center" }}>Our cutting-edge bicycles are equipped with advanced technology that harnesses your pedaling energy and converts it into electricity. Every rotation of the pedals generates clean, sustainable power,
              which is stored and utilized to power various components of the bike and even charge electronic devices. </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box className="wrap-div">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img src={banner1} alt="Banner" style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" style={{ color: "black", }}>Our Service</Typography>
            <Typography style={{ color: "black", marginTop: "20px" }}>
              Experience the future of sustainable transportation with our innovative bike rental service.
              Ride our eco-friendly bicycles and generate electricity while you pedal, powering your journey and contributing to a greener world.
              With affordable rental prices, you can enjoy the thrill of cycling while making a positive impact on the environment.
              Join us today and embark on a renewable energy adventure that's both affordable and environmentally conscious
            </Typography>
            <Typography variant="h5" style={{ color: "black", marginTop: "20px" }}>Price: $3.00 / hour</Typography>
            <Typography variant="h5" style={{ color: "black", marginTop: "20px" }}>Benefits: 10 points / km</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;