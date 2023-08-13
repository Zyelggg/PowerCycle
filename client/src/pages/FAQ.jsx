import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import http from "../http";
import { Container, Typography, Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from "../components/Footer"


const FAQ = () => {
  const [user, setUser] = useState('');
  const iframeSrc = `http://localhost:8501?user_input=${user}`;
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http
        .get("/user/auth")
        .then((res) => {
          setUser(res.data.userid);
          console.log(res.data.userid); // Verify the user value here
          return res.data.userid;
        })
    }
  }, []);

  const faqData = {
    "General": [
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
    ],
    "Payment": [
      {
        question: 'What payment methods are accepted on the app?',
        answer: 'Visa, Mastercard, Paynow and Grap pay are all methods of payments.',
      },
    ]
  }

  return (
    <>
      <Box className="landing-banner2">
        <Container className='landing-content'>
          <Typography variant='h3'>Frequently Asked Questions (FAQ)</Typography>
        </Container>
      </Box>

      {Object.keys(faqData).map((k, categoryIndex) => {
        return (
          <div className='faqSection' style={{ padding: "20px" }}>
            <Typography variant='h6' gutterBottom>{k}</Typography>
            {faqData[k].map((faq, faqIndex) => (
              <Accordion key={`category-${categoryIndex}-faq-${faqIndex}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${faqIndex}a-content`}>
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='subtitle1' gutterBottom>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )
      })}

      <iframe
        src="http://localhost:8501"
        width="100%"
        height="800px"
        style={{ background: "#250D69" }}
        frameBorder="0"
        className='streamlit-iframe'
        title="StreamlitApp"
      />
    </>
  );
};

export default FAQ;