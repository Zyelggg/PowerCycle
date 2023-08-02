import React, { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';
import ebike from './images/Ebike.png';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import http from "../http";

function RideComplete() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [userDetail, setuserDetail] = useState({});
    
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const mileage = queryParams.get('mileage');
    const electricity = queryParams.get('electricity');
    const bikeId = queryParams.get('bikeId');

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


    const handleScanButtonClick = () => {
        console.log("Pause")
    }

    return (
        <div>

            <Box className="landing-banner2">
                <Container className='landing-content'>
                    <Typography variant='h3'>Bicycle Rental</Typography>
                </Container>

            </Box>


            <div className="user-records">

                <div className='white-wrapper'>
                    <Typography variant='h4' style={{ marginBottom: "20px" }}>Congratulations</Typography>

                    <img src={ebike} alt="image" style={{ width: "40%" }} className='bike-image' />
                    <Typography variant='h4' style={{ marginBottom: "20px" }}>Your Performance</Typography>
                    {/* Render the received data */}
                    <h2>User ID: {userId}</h2>
                    <p>Mileage: {mileage}</p>
                    <p>Electricity: {electricity}</p>
                    <p>Bike ID: {bikeId}</p>
                </div>


            </div>



            <Typography variant='h4' style={{ marginBottom: "20px", color: "white", marginLeft: "20px", marginTop: "40px" }}>Stuck? Talk to our customer help</Typography>



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

export default RideComplete;
