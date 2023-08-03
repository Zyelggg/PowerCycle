import React from 'react'
import './Reviews.css'

function Reviews({username,message,review}) {
  return (
    <div className="feedback-item" style={{width:'75%',cursor:'default'}}>
      {/* You can replace the below icon with your "bx-user-circle" icon */}
      <i className="bx bx-user-circle"></i>

      <div className="feedback-content">
        <div style={{display:'flex'}}>
        <div className="username">{username}</div>
        <div style={{marginLeft:'auto',marginTop:'10px'}} className="rating">Rating: {review}</div>
        </div>
        <div className="message">{message}</div>
      </div>
    </div>
  )
}

export default Reviews;
