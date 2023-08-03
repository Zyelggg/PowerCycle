import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import banner1 from './images/banner1.png';
import './styles/Home.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import markerIconUrl from './images/bikeicon.png';
import http from '../http.js'; // Import your HTTP library
import AspectRatio from '@mui/joy/AspectRatio';



function BikeService() {
  const [markerClicked, setMarkerClicked] = useState(null);
  const [bikeStopList, setBikeStopList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  const handleMarkerClick = (markerId) => {
    setMarkerClicked(markerId);
  };

  const getBikeStop = () => {
    http.get('/bikestop').then((res) => {
      setBikeStopList(res.data);
    });
  };

  useEffect(() => {
    getBikeStop();
    getUserLocation();

  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by your browser');
    }
  };

  const markerIcon = L.icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const handleScanButtonClick = () => {
    navigate("/ridingbike")
  }

  return (

    <Box>
      <Box className="landing-banner">
        <Container className='landing-content'>
          <Typography variant='h3'>Our Bicycles</Typography>
        </Container>
      </Box>

      <Typography variant='h3' className='title-wrap'>Find our nearest bikes</Typography>

      <MapContainer center={[1.350270, 103.821959]} zoom={12}>
        <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=vawTmn0mJjBwNQB6GFOe" />

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {bikeStopList.map((bikeStop) => (
          <Marker
            key={bikeStop.stopname}
            position={[bikeStop.coordx, bikeStop.coordy]}
            eventHandlers={{ click: () => handleMarkerClick(bikeStop.stopname) }}
            icon={markerIcon}
          >
            <Popup>
              {
                bikeStop.imageFile && (
                  <AspectRatio>
                    <Box component="img"
                      src={`${import.meta.env.VITE_FILE_BASE_URL}${bikeStop.imageFile}`}
                      alt="bikestop">
                    </Box>
                  </AspectRatio>
                )
              }

              {bikeStop.stopname}</Popup>
          </Marker>
        ))}

        {markerClicked && (
          <div className="marker-info">
            <h2>{markerClicked}</h2>
            <p>
              {bikeStopList.find((bikeStop) => bikeStop.stopname === markerClicked)?.info}
            </p>
          </div>
        )}
      </MapContainer>


      <button style={{ color: "white" }} onClick={handleScanButtonClick}>Scan QR Code</button>


      <Box className="wrap-div" style={{ marginTop: "80px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img src={banner1} alt="Banner" style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" style={{ color: "black" }}>Our Service</Typography>
            <Typography style={{ color: "black", marginTop: "20px" }}>
              Experience the future of sustainable transportation with our innovative bike rental service.
              Ride our eco-friendly bicycles and generate electricity while you pedal, powering your journey and contributing to a greener world.
              With affordable rental prices, you can enjoy the thrill of cycling while making a positive impact on the environment.
              Join us today and embark on a renewable energy adventure that's both affordable and environmentally conscious
            </Typography>
            <Typography variant="h5" style={{ color: "black", marginTop: "20px" }}>
              Price: $1.00 / hour
            </Typography>
            <Typography variant="h5" style={{ color: "black", marginTop: "20px" }}>
              Benefits: 10 points / km
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default BikeService;
