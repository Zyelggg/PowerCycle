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
    </div>
  )
}

export default Reviews;
