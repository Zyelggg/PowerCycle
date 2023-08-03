import React, { useState,useEffect } from "react";
import "./Feedback.css";
import Reviews from "./Reviews";


const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [isSent, setIsSent] = useState(false); // State to track if the message has been sent
  const [updateUI,setUpdateUI] = useState(false)

  const handleChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true); // Set loading state to true when message is being sent

    const signedUser = JSON.parse(localStorage.getItem("signedUser")); // Retrieve signed user from local storage
    const feedbackData = {
      id: signedUser.id,
      senderName: signedUser.name,
      message: feedbackText,
      review: selectedReview
    };

    // Send the feedbackData to the server using fetch or axios
    fetch("http://localhost:5000/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Feedback submitted:", data); // Data received from the server
        setIsSent(true); // Set isSent state to true when the message is sent
        setFeedbackText(""); // Clear the textarea after submission
        setTimeout(()=>{setIsSent(false)},2000)
        updateUI?setUpdateUI(false):setUpdateUI(true)
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
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
    try {
      const response = await fetch("http://localhost:3001/feedbacks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };
  const [selectedReview, setSelectedReview] = useState(null);
  //reviews
  const ReviewRow = () => {
  
    const handleReviewClick = (reviewNumber) => {
      setSelectedReview(reviewNumber);
      console.log(selectedReview)
    };
  
    return (
      <div className="review-row">
        <div className={`review ${selectedReview === 1 ? "selected" : ""}`} onClick={() => handleReviewClick(1)}>
          1
        </div>
        <div className={`review ${selectedReview === 2 ? "selected" : ""}`} onClick={() => handleReviewClick(2)}>
          2
        </div>
        <div className={`review ${selectedReview === 3 ? "selected" : ""}`} onClick={() => handleReviewClick(3)}>
          3
        </div>
        <div className={`review ${selectedReview === 4 ? "selected" : ""}`} onClick={() => handleReviewClick(4)}>
          4
        </div>
        <div className={`review ${selectedReview === 5 ? "selected" : ""}`} onClick={() => handleReviewClick(5)}>
          5
        </div>
      </div>
    );
  };
  
};

export default Feedback;
