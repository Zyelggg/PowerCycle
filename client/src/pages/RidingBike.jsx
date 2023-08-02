import React, { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';


function RidingBike() {
    const navigate = useNavigate();

  const sampleData = {
    userId: 1,
    mileage: 50.7,
    electricity: 8.3,
    bikeId: 456,
  };

  const onSubmit = (data) => {
    console.log("Submit button clicked");
    http.post("/ridden", sampleData)
      .then((res) => {
        console.log(res.data);
        navigate("/bike");
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  const handleScanButtonClick = () => {
    navigate("/bike")
  }

  return (
    <div>
      {/* Render the sampleData if it is available */}
      <div className="user-records">
        <h2>User ID: {sampleData.userId}</h2>
        <p>Mileage: {sampleData.mileage}</p>
        <p>Electricity: {sampleData.electricity}</p>
        <p>Bike ID: {sampleData.bikeId}</p>
      </div>

      {/* Form for submission */}
      <form onSubmit={onSubmit}>
        <button type="submit" >Submit</button>
        <button type="button" onClick={handleScanButtonClick}>Click</button>
      </form>
    </div>
  );
}

export default RidingBike;
