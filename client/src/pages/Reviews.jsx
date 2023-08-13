import './styles/Reviews.css'
import React, { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, Typography, Box, Grid, Link } from '@mui/material';
import "./styles/Feedback.css";
import http from '../http';
import logo from './images/powerlogo.png';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'

function Reviews() {
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [isSent, setIsSent] = useState(false); // State to track if the message has been sent
  const [updateUI, setUpdateUI] = useState(false)

  
  const handleChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {

    if (localStorage.getItem("accessToken")) {
      // Use axios instead of fetch to keep consistency with other requests
      http.get("/user/auth")
        .then((res) => {
          const userId = res.data.userid;
          console.log(userId); // Verify the user value here
          setUser(res.data.user);
          // Fetch user details using the foreign key (userId)
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  const handleSubmit = () => {
    setIsLoading(true); // Set loading state to true when message is being sent

    const feedbackData = {
      id: user.id,
      senderName: user.name,
      message: feedbackText,
      review: 1
    };

    console.log("press");
    console.log(user.name);
    console.log(feedbackText);
    http.post("/feedback/submit-feedback", feedbackData)
      .then((res) => {
        console.log("Backend Response:", res.status, res.data);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after the request is completed
      });

  };

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, [updateUI]);

  const fetchFeedbacks = async () => {

    http.get(`/feedback/feedbacks`)
      .then((res) => {
        setFeedbacks(res.data); // Assuming the API response is an array of user details
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });



  };
  const [selectedReview, setSelectedReview] = useState(null);
  //reviews
  const ReviewRow = () => {

    const handleReviewClick = (reviewNumber) => {
      setSelectedReview(reviewNumber);
      console.log(user);
    };
  }

  return (
    <div className="backgroundF">
      <div className="newF" style={{ marginBottom: '40px' }} >
        <div className="feedback-container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>Send Us Your Feedback!</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <ReviewRow />
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              className="feedback-textarea"
              placeholder="Enter your feedback here..."
              value={feedbackText}
              onChange={handleChange}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="send-button" type='button' onClick={handleSubmit}>
                {isLoading ? "Sending..." : "Send Feedback"}
              </button>

            </div>
          </form>


          {isSent && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>Message has been sent!</p>
            </div>
          )}
        </div>
      </div>


<<<<<<< Updated upstream
        {feedbacks.map((detail) => (
        <div className="feedback-item" style={{ width: '75%', cursor: 'default' }}>
          {/* You can replace the below icon with your "bx-user-circle" icon */}
          <i className="bx bx-user-circle"></i>

          <div className="feedback-content">
            <div style={{ display: 'flex' }}>
              <div className="username">{detail.senderName}</div>
              <div style={{ marginLeft: 'auto', marginTop: '10px' }} className="rating">Rating: {detail.review}</div>
            </div>
            <div className="message">{detail.message}</div>
          </div>
        </div>

      ))}

<div className="page-container">
<AppBar position="static" className="Footer">
=======
      <AppBar position="static" className="Footer">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      </div>
      </div>
=======
    </div>
>>>>>>> Stashed changes


  )
}

export default Reviews;
