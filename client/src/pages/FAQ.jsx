import React, { useState } from 'react';
import './styles/FAQ.css';

import { useNavigate, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid } from '@mui/material';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
   
    <div className='faq-item'>
      <div className={`question ${isExpanded ? 'expanded' : ''}`} onClick={toggleAccordion}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <span>{question}</span>
        <div className='arrow' style={{marginLeft:'auto'}}></div>
        </div>
      </div>
      {isExpanded && <div className='answer'>{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: 'What payment methods are accepted on the app?',
      answer: 'Visa, Mastercard, Paynow and Grap pay are all methods of payment.',
    },
    {
      question: 'How do I unlock the bicycle?',
      answer: 'Simply scan the QR Code on the bicycle, and you are on your way!',
    },
    {
      question: 'How do i track my points?',
      answer: 'Your points balance will be visible in your rewards program account dashboard on our website. Log in to your account to see your current points total.',
    },
    {
      question: 'Can i earn points for rentals made offline?',
      answer: 'Points can only be earned for rentals made through our official website or app. Rentals made offline are not eligible for reward points',
    },
    
  ];

  return (
    
    <div className='new'>
    <div className='faq-container'>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
    <iframe
        src="http://localhost:8501"  
        width="100%"
        height="800px"
        style={{background:"#250D69"}}
        frameBorder="0"
        title="StreamlitApp"
      />
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
      
    </div>
  
  );
};

export default FAQ;