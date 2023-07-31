import React, { useState, useEffect } from "react";
import "./Admin.css";
import Modal from "react-modal";
import Loader from "./Loader";


const Admin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    fetch("http://localhost:3001/replies")
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks(data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  };

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = () => {
    if (!selectedFeedbackId) {
      console.error("No feedback selected.");
      return;
    }

    // Assuming you have an API endpoint to handle reply submission, e.g., /submit-reply/:feedbackId
    fetch(`http://localhost:3001/${edit?'update-reply':'submit-reply'}/${selectedFeedbackId}`, {
      method: `${edit?'PUT':'POST'}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        replyMessage: reply, // Make sure to use the correct property name (replyMessage)
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Reply submitted:", data); // Data received from the server
        // Clear the reply input and refresh feedbacks after reply is sent
        setReply("");
        setSelectedFeedbackId(null);
        setIsModalOpen(false); // Close the modal after reply is submitted
        fetchFeedbacks();
        handleUpdateStatus(selectedFeedbackId,'Replied')
        if(edit) setEdit(false)
      })
      .catch((error) => {
        console.error("Error submitting reply:", error);
        
      });
  };

  const handleUpdateStatus = (feedbackId, newStatus) => {
    setIsLoading(true)
    fetch(`http://localhost:3001/update-feedback-status/${feedbackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the correct content type
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Feedback status updated:", data);
        // Refresh feedbacks after updating the status
        fetchFeedbacks();
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error updating feedback status:", error);
        setIsLoading(false)
      });
  };
  const [edit,setEdit] = useState(false)
  function editHandler(id){
    setEdit(true)
    setSelectedFeedbackId(id)
    setIsModalOpen(true)
  }


  function deleteHandler(id){
    
    if (!id) {
        console.error("No feedback selected.");
        return;
      }
      setIsLoading(true)
  
      // Assuming you have an API endpoint to handle feedback deletion, e.g., /delete-reply/:feedbackId
      fetch(`http://localhost:3001/delete-feedback/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Feedback reply deleted:", data);
          setSelectedFeedbackId(null);
          fetchFeedbacks(); // Refresh the feedbacks after deletion
          setIsLoading(false)
          
        })
        .catch((error) => {
          console.error("Error deleting feedback reply:", error);
          setIsLoading(false)
        });

  }


  return (
    <div className="containerA">
     <div className="sidebar"></div>   
    <div className="admin-feedbacks">
    {isLoading&& <Loader/>}
      <h2>Feedback Management</h2>
      <ul className={`feedback-list `}>
        {feedbacks.map((feedback) => (
            <><div className="list">
          <li
            key={feedback.id}
            className={`feedbackA-item ${feedback.reply?'disabled':''}`}
            onClick={() => {
              setSelectedFeedbackId(feedback.id);
              setIsModalOpen(true); // Open the modal when a feedback is clicked
            }}
          >
            <div>
              <div className="senderName">{feedback.senderName}</div>

              <div>
                {" "}
                <strong>Message: </strong> {feedback.message}
                <br />
                <strong> {feedback.reply?`Reply:`:''} </strong> {feedback.reply&&feedback.reply.replyMessage}
              </div>
            </div>
            <div className="status">  {feedback.status}</div>
          </li>
          <i onClick={()=>editHandler(feedback.id)} className='bx bxs-edit' ></i>
        <i onClick = {()=>{ deleteHandler(feedback.id)}} className='bx bx-trash'></i>
    
          </div>
          </>
        ))}
      </ul>

      {/* Modal for replying to feedback */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Reply Modal"
        style={{
          overlay: {
            // Style for the overlay (background)
            backgroundColor: "rgba(0, 0, 0, 0.6)", // You can adjust the opacity (last value) as desired
          },
          content: {
            // Style for the modal content
            maxWidth: "600px",
            height:"300px",
            margin: "auto",
            padding: "40px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          },
        }}
      >
        <h2>Send Reply</h2>
        <textarea
          className="reply-input" // Add the CSS class for the input element
          type="text"
          value={reply}
          onChange={handleReplyChange}
          placeholder="Type your reply..."
        />
        <button onClick={handleReplySubmit}>Send Reply</button>
        <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
    </div>
  );
};

export default Admin;
