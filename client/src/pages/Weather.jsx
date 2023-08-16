import React, { useState, useEffect } from 'react';
import './styles/adminCard.css';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid, Card, CardContent, CardActions, CardMedia, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Add, Search, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import { Helmet } from 'react-helmet';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper library
import showers from '../assets/showers.png'
import cloudy from '../assets/cloudy.png'
import lightshowers from '../assets/lightshowers.png'
import 'swiper/css';
function Weather() {
    const navigate = useNavigate();

    const [weatherData, setWeatherData] = useState([]);
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast'
                );
                const data = await response.json();
                setWeatherData(data.items[0].forecasts); // Assuming the data structure
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);


    // const swiper = new Swiper(".mySwiper", {
    //     effect: "coverflow",
    //     grabCursor: true,
    //     centeredSlides: true,
    //     slidesPerView: "auto",
    //     coverflowEffect: {
    //         rotate: 0,
    //         stretch: 0,
    //         depth: 100,
    //         modifier: 2,
    //         slideShadows: true,
    //     },
    //     loop: true,
    // });

    return (
        <Container>
            <Typography variant='h2' style={{color:"black;", textAlign: 'left', margin: "20px"}}>Weather Forecast</Typography>
            <Container style={{ margin: "20px" }}>

                <iframe width="100%" height="400" src="https://data.gov.sg/dataset/weather-forecast/resource/571ef5fb-ed31-48b2-85c9-61677de42ca9/view/4c127d9a-cba6-445a-8fc1-978b565f9bf7" frameBorder="0"> </iframe>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>2-Hour Weather Forecast</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        {weatherData.map((forecast, index) => (
                            <li key={index}>
                                {forecast.area}: {forecast.forecast}
                            </li>
                        ))}
                        </div>
                            </div> */}
                            <Swiper 
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    loop={true}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}

                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                        slideShadows: true,
                    }}
                >

                    {weatherData.map((forecast, index) => (

                        <SwiperSlide className="swiper-slide" key={index}>
                            {forecast.forecast.toLowerCase().includes("cloudy") && (
                                <img src={cloudy} className='weatherimage' alt="Cloudy" />
                            )}
                            {forecast.forecast.toLowerCase().includes("light showers") && !forecast.forecast.toLowerCase().includes("showers") && (
                                <img src={lightshowers} className='weatherimage' alt="Light Showers" />
                            )}
                            {forecast.forecast.toLowerCase().includes("showers") && (
                                <img src={showers} className='weatherimage' alt="Showers" />
                            )}
                            <p style={{textAlign:"center",color:"black"}}>{forecast.area} : {forecast.forecast}</p>
                        </SwiperSlide>

                    ))}

                </Swiper>
                    </AccordionDetails>
                </Accordion>


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

        </Container>

    );
}

export default Weather;





