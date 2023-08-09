import React, { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ebike from './images/Ebike.png';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import http from "../http";

function RidingBike() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [userDetail, setuserDetail] = useState({});


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Get the JSON object as a string from the query parameter
    const qrCodeParam = queryParams.get('qrCode');

    // Parse the JSON string to a JavaScript object
    const qrCodeObject = JSON.parse(qrCodeParam);

    // Now you can access the properties of the parsed object
    const serialno = qrCodeObject.serialno;
    const stopname = qrCodeObject.stopname;
    const repairs = qrCodeObject.repairs;

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http
                .get("/user/auth")
                .then((res) => {
                    setUser(res.data.userid);
                    console.log(res.data.userid); // Verify the user value here
                    return res.data.userid;
                })
                .then((user) => {
                    console.log(user, "hi"); // Verify the user value here
                    fetch(`http://localhost:3001/user/userdetails/${user}`, {
                        method: "GET",
                    })
                        .then((res) => res.json()) // Parse the response as JSON
                        .then((data) => {
                            setuserDetail(data);
                            console.log(data);
                        });
                });
        }
    }, []);

    const sampleData = {
        userId: user,
        mileage: 50.7,
        electricity: 8.3,
        bikeId: serialno,
    };

    const onSubmit = () => {
        console.log("work")

        http.post("/ridden", sampleData)
            .then((res) => {
                console.log("Backend Response:", res.status, res.data);
                    navigate(`/ridecomplete?userId=${sampleData.userId}&mileage=${sampleData.mileage}&electricity=${sampleData.electricity}&bikeId=${sampleData.bikeId}`);

            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    };

    const handleScanButtonClick = () => {
        console.log("work")

        http.post("/ridden", sampleData)
            .then((res) => {
                console.log("Backend Response:", res.status, res.data);
                    navigate(`/ridecomplete?userId=${sampleData.userId}&mileage=${sampleData.mileage}&electricity=${sampleData.electricity}&bikeId=${sampleData.bikeId}`);

            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    }

    return (
        <div>

            <Box className="landing-banner2">
                <Container className='landing-content'>
                    <Typography variant='h3'>Bicycle Rental</Typography>
                </Container>

            </Box>
            {/* Render the sampleData if it is available */}
            <div className="user-records">
                <Typography variant='h4' style={{ marginBottom: "20px", color: "white" }}>You are now riding Bike #{sampleData.bikeId}</Typography>

                <img src={ebike} alt="image" style={{ width: "40%" }} className='bike-image' />
                <div className='white-wrapper'>
                    <h2 style={{ color: "black" }}>User ID: {sampleData.userId}</h2>
                    <p style={{ color: "black" }}>Mileage: {sampleData.mileage}</p>
                    <p style={{ color: "black" }}>Electricity: {sampleData.electricity}</p>
                    <p style={{ color: "black" }}>Bike ID: {sampleData.bikeId}</p>
                </div>

                {/* Buttons */}
                <form onSubmit={onSubmit} style={{ marginTop: "40px" }}>
                    <button type="button" className='bike-btn' onClick={handleScanButtonClick} >Pause Journey</button>
                    <button type="submit" className='bike-btn' style={{ float: "right" }}>End Journey</button>

                </form>

            </div>
            <Container>
                <Typography variant='h4' style={{ marginBottom: "20px", color: "white", marginLeft: "20px", marginTop: "40px" }}>Stuck? Talk to our customer help</Typography>
                <button type="submit" className='stuck-btn'>Contact Us</button>
            </Container>


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
}

export default RidingBike;
