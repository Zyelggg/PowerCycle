import './styles/Reviews.css'
import React, { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, Typography, Box, Grid } from '@mui/material';
import "./styles/Feedback.css";
import http from '../http';

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
        <div className="newF">
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
        <div >
          {feedbacks.map((detail) => (
            <Container className="newRev">
            <Typography variant="h6" style={{ color: "white" }}>Review No.: #{detail.id}</Typography>
            {/* <Typography variant="h6">Hours Ridden: {detail.hoursRidden}</Typography> */}
            <Typography variant="h6" style={{ color: "white" }}>Username: {detail.senderName}</Typography>
            <Typography variant="h6" style={{ color: "white" }}>User Message: {detail.message}</Typography>
            {/* <Typography variant="h6" style={{ color: "white" }}>Electricity Generated: {detail.review}</Typography> */}
            </Container>

            
          ))}
        </div>

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
      </div>


    )
  }

  export default Reviews;
