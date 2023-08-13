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

    return (
        <Container>
            <Typography variant='h2' style={{ color: "black;", textAlign: 'left', margin: "20px" }}>Weather Forecast</Typography>
            <div style={{ padding: "20px" }}>
                <iframe width="100%" height="400" src="https://data.gov.sg/dataset/weather-forecast/resource/571ef5fb-ed31-48b2-85c9-61677de42ca9/view/4c127d9a-cba6-445a-8fc1-978b565f9bf7" frameBorder="0"> </iframe>
                <Accordion style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header"                    >
                        <Typography>2-Hour Weather Forecast</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {weatherData.map((forecast, index) => (
                            <li key={index}>{forecast.area}: {forecast.forecast}</li>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div >
        </Container>

    );
}

export default Weather;





