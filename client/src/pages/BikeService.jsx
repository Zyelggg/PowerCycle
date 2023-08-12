import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box, Button, Grid, Card, CardContent, CardActions, CardMedia, Chip } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import banner1 from './images/banner1.png';
import './styles/Home.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import markerIconUrl from './images/bikeicon.png';
import http from '../http.js'; // Import your HTTP library
import AspectRatio from '@mui/joy/AspectRatio';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import bikeIOS from "../assets/Mountain_bike.usdz";
import { AndroidRounded } from '@mui/icons-material';



function BikeService() {

  var urlAndroid =
    "intent://arvr.google.com/scene-viewer/1.0?file=" +
    'https://raw.githubusercontent.com/limcai21/gltf/main/bicycle/scene.gltf' +
    "&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;";

  const [markerClicked, setMarkerClicked] = useState(null);
  const [bikeStopList, setBikeStopList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [stopRecords, setStopRecords] = useState({});

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleMarkerClick = (markerId) => {
    setMarkerClicked(markerId);
  };

  const fetchStopRecords = () => {
    http.get('/bike/stoprecords').then((res) => {
      setStopRecords(res.data);
    });
  };

  const getBikeStop = () => {
    http.get('/bikestop').then((res) => {
      setBikeStopList(res.data);
    });
  };

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get("/user/auth").then((res) => {
        setUser(res.data.user);

      });
    }
  }, []);


  useEffect(() => {
    getBikeStop();
    getUserLocation();
    fetchStopRecords(); // Fetch stop records count


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
    navigate("/qrcode")
  }

  const handleLoginButton = () => {
    console.log("work")
    navigate("/login")
  }

  return (

    <Box>
      <Box className="landing-banner">
        <Container className='landing-content'>
          <Typography variant='h3'>Our Bicycles</Typography>
        </Container>
      </Box>

      <Typography variant='h3' className='title-wrap'>Find our nearest bikes</Typography>

      {user ? (

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
                        alt="bikestop"
                        className="popup-image"
                      >

                      </Box>
                    </AspectRatio>
                  )
                }

                {bikeStop.stopname}
                <Typography variant="subtitle1" style={{ color: "black" }}>Bikes in this area: {stopRecords[bikeStop.stopname] || 0}</Typography>

                {/* Add amount of bikes */}


              </Popup>
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
      ) : (

        <MapContainer center={[1.350270, 103.821959]} zoom={12}>
          <Container className='unactive-map'>
            <Container className='not-log'>
              <Typography variant='h4' >Looks like you are not logged in</Typography>
              <Button variant="contained" type="button" className='home-btn' style={{ marginTop: "20px" }} onClick={handleLoginButton}>Log in here</Button>
            </Container>


          </Container>
        </MapContainer>

      )}




      <Container>
        <button className='scanqr-btn' onClick={handleScanButtonClick}>Scan QR Code</button>

      </Container>


      <Container>
        <Typography variant='h3' className='title-wrap'>Curious how our bike looks like?</Typography>

        <Container style={{ width: "-webkit-fill-available", margin: "20px" }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid item xs={12} sm={6}>
              <Chip
                label="Try for Android"
                component="a"
                href={urlAndroid}
                icon={<AndroidRounded />}
                variant="outlined"
                clickable
              />
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://lh3.googleusercontent.com/GTmuiIZrppouc6hhdWiocybtRx1Tpbl52eYw4l-nAqHtHd4BpSMEqe-vGv7ZFiaHhG_l4v2m5Fdhapxw9aFLf28ErztHEv5WYIz5fA"
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant='h4' color="text.secondary" gutterBottom>
                    Try for Android
                  </Typography>
                </CardContent>
                <CardActions>
                  <a rel="ar" href={urlAndroid}>
                    <Button size="small">View Now</Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://s03.s3c.es/imag/_v0/640x292/1/b/0/apple-logo-reinicio.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant='h4' color="text.secondary" gutterBottom>
                    Try for Apple
                  </Typography>
                </CardContent>
                <CardActions>
                  <a rel="ar" href={bikeIOS}>
                    <Button size="small">View Now</Button>
                  </a>
                </CardActions>
              </Card>

            </Grid>

          </Grid>


        </Container>

      </Container>




      <Box className="wrap-div" style={{ marginTop: "40px" }}>
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
              Price: $3.00 / hour
            </Typography>
            <Typography variant="h5" style={{ color: "black", marginTop: "20px" }}>
              Benefits: 10 points / km
            </Typography>
          </Grid>
        </Grid>
      </Box>

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
    </Box>
  );
}

export default BikeService;
