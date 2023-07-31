import './styles/Bike.css';
import { AccessTime, Add, Search, Clear, Edit, Delete } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, Container } from '@mui/material';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AddBikes from './AddBikes';
import AddBikeStop from './AddBikeStop';
import EditBikeStop from './EditBikeStop';
import EditBikes from './EditBikes';
import DeleteBikes from './DeleteBikes';
import DeleteBikeStop from './DeleteBikeStop';
import http from '../http';

function BikeDash() {

  const [totalBikestop, setTotalBikestop] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);
  
  useEffect(() => {
    http.get('/bikestop').then((res) => {
      setTotalBikestop(res.data.length);
    });
  }, []);



  useEffect(() => {
    http.get('/bike').then((res) => {
      setTotalBikes(res.data.length);
    });
  }, []);


  return (
    <Box display="flex">

      <Box className="main-wrap admin-wrap">
        <Typography variant="h5" sx={{ my: 2 }} className="main-title">
          Bicycle Management
        </Typography>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6}>
              <CardContent className="addCard">
                <Typography className="topheader">Add</Typography>
                <Box>
                  <Link to="/addbikestop"><IconButton className="changeicon"><Add></Add></IconButton></Link>
                  <Typography>Bicycle Stops</Typography>
                  <Typography>{totalBikestop} Stops</Typography>
                </Box>
                <Box>
                  <Link to="/addbike"><IconButton className="changeicon"><Add></Add></IconButton></Link>
                  <Typography>Bicycles</Typography>
                  <Typography>{totalBikes} Bikes</Typography>
                </Box>

              </CardContent>

            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <CardContent className="retrieveCard">
                <Typography className="topheader">Retrieve</Typography>
                <Box>
                  <Link to="/bikestop"><IconButton className="changeicon"><Search></Search></IconButton></Link>
                  <Typography>Bicycle Stops</Typography>
                  <Typography>{totalBikestop} Stops</Typography>
                </Box>
                <Box>
                  <Link to="/bike"><IconButton className="changeicon"><Search></Search></IconButton></Link>
                  <Typography>Bicycles</Typography>
                  <Typography>{totalBikes} Bikes</Typography>
                </Box>

              </CardContent>

            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <CardContent className="updateCard">
                <Typography className="topheader">Update</Typography>
                <Box>
                  <Link to="/bikestop"><IconButton className="changeicon"><Edit></Edit></IconButton></Link>
                  <Typography>Bicycle Stops</Typography>
                  <Typography>{totalBikestop} Stops</Typography>
                </Box>
                <Box>
                  <Link to="/bike"><IconButton className="changeicon"><Edit></Edit></IconButton></Link>
                  <Typography>Bicycles</Typography>
                  <Typography>{totalBikes} Bikes</Typography>
                </Box>

              </CardContent>

            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <CardContent className="deleteCard">
                <Typography className="topheader">Delete</Typography>
                <Box>
                  <Link to="/bikestop"><IconButton className="changeicon"><Delete></Delete></IconButton></Link>
                  <Typography>Bicycle Stops</Typography>
                  <Typography>{totalBikestop} Stops</Typography>
                </Box>
                <Box>
                  <Link to="/bike"><IconButton className="changeicon"><Delete></Delete></IconButton></Link>
                  <Typography>Bicycles</Typography>
                  <Typography>{totalBikes} Bikes</Typography>
                </Box>

              </CardContent>

            </Grid>

            <Routes>
              <Route path={"/bikedash"} element={< BikeDash />} />
              <Route path={"/addbike"} element={<AddBikes />} />
              <Route path={"/addbikestop"} element={<AddBikeStop />} />
              <Route path={"/editbike"} element={<EditBikes />} />
              <Route path={"/editbikestop"} element={<EditBikeStop />} />
              <Route path={"/delbike"} element={<DeleteBikes />} />
              <Route path={"/delbikestop"} element={<DeleteBikeStop />} />
            </Routes>

          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default BikeDash;
