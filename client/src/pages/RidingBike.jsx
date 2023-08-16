import React, { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ebike from './images/Ebike.png';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, Divider, CardHeader, CardActions } from '@mui/material';
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
    const [isPaused, setIsPaused] = useState(false); // Add this state
    const [counter, setCounter] = useState(0);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Get the JSON object as a string from the query parameter
    const qrCodeParam = queryParams.get('qrCode');

    // Parse the JSON string to a JavaScript object
    const qrCodeObject = JSON.parse(qrCodeParam);

    const serialno = qrCodeObject.serialno;

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isPaused === true) {
            console.log(intervalRef.current); // Access interval using the ref
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 60000);

            // Clear the interval when the component unmounts or isPaused changes to true
            return () => {
                clearInterval(intervalRef.current);
            };
        }
    }, [isPaused]);


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
        duration: counter,
        mileage: 50.7,
        electricity: 8.3,
        serialno: serialno,
        bikeId: 1,
    };

    const onSubmit = () => {
        http.post("/ridden", sampleData)
            .then((res) => {
                console.log("Backend Response:", res.status, res.data);
                navigate(`/ridecomplete?serialno=${sampleData.serialno}&duration=${sampleData.duration}&userId=${sampleData.userId}&mileage=${sampleData.mileage}&electricity=${sampleData.electricity}`);
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    };

    const handleSubmitButtonClick = () => {
        console.log("work");
        http.post("/ridden", sampleData)
            .then((res) => {
                navigate(`/ridecomplete?userId=${sampleData.userId}&mileage=${sampleData.mileage}&duration=${sampleData.duration}&electricity=${sampleData.electricity}&serialno=${sampleData.serialno}`);
            })
    }


    const handlePauseButtonClick = () => {
        setIsPaused(!isPaused);
    }


    return (
        <>
            <Box className="landing-banner2">
                <Container className='landing-content'>
                    <Typography variant='h3'>Bicycle Rental</Typography>
                </Container>
            </Box>

            {/* Render the sampleData if it is available */}
            {isPaused ? (
                <>
                    <Card style={{ borderRadius: "0", padding: "15px" }}>
                        <CardHeader title="Journey Paused" subheader="Your journey has been paused" />
                        <CardActions style={{ paddingLeft: "15px" }}>
                            <Button variant="contained" className='bike-btn' onClick={handlePauseButtonClick} style={{ marginTop: "20px" }}>Resume Journey</Button>
                        </CardActions>
                    </Card>
                </>
            ) : (
                <>
                    <Card style={{ borderRadius: "0", padding: "15px" }}>
                        <CardHeader title={"You are now riding Bike #" + sampleData.serialno} />
                        <CardMedia component="img" height="300" image={ebike} alt="Bike" style={{ width: "unset", margin: "0 auto" }} />
                        <CardContent>
                            <Typography gutterBottom variant="h5">Your Stats</Typography>
                            <Typography variant="subtitle1" color="text.secondary">User ID: {sampleData.userId}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Time Elapsed: {counter} minutes</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Mileage: {sampleData.mileage}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Electricity {sampleData.electricity}</Typography>
                        </CardContent>
                        <CardActions style={{ paddingLeft: "15px" }}>
                            <Button variant="contained" className='bike-btn' onClick={handlePauseButtonClick} >Pause Journey</Button>
                            <Button variant='outlined' style={{ color: "#F2C086", borderColor: "#F2C086" }} className='bike-btn' onClick={handleSubmitButtonClick}> End Journey</Button>
                        </CardActions>
                    </Card>
                </>
            )}

            <div style={{ textAlign: 'left', padding: "60px 30px" }}>
                <Typography variant='h4' style={{ marginBottom: "0px" }}>Stuck?</Typography>
                <Typography variant='subtitle1'>Talk to our customer helpline</Typography>
                <Button variant='outlined' style={{ backgroundColor: "white", marginTop: "20px" }} onClick={() => navigate("/faq")}>
                    Chat with Us
                </Button>
            </div >
        </>
    );
}

export default RidingBike;
