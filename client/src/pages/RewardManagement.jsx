import React from "react";
import './styles/adminCard.css';
import { Typography, Box, Grid, CardContent, Link, IconButton, Drawer } from '@mui/material';
import { Add, Search, Edit, Delete} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
function RewardManagement() {
  const navigate = useNavigate();

  return (
    <Box className="main-wrap">
      <Typography variant="h5" sx={{ my: 2 }} className="main-title">
        Reward Management
      </Typography>

      <Box>
        <Grid container spacing={2}>  
          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="addCard">
              <Typography className="topheader">Add</Typography>
              <Box>
                <Link onClick={() => {
                  navigate("/admin/addreward")}}>
                  <IconButton className="changeicon">
                    <Add></Add>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="retrieveCard">
              <Typography className="topheader">Retrieve</Typography>
              <Box>
              <Link onClick={() => {
                  navigate("/admin/getreward")}}>
                  <IconButton className="changeicon">
                    <Search></Search>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="updateCard">
              <Typography className="topheader">Update</Typography>
              <Box>
              <Link onClick={() => {
                  navigate("/admin/getreward")}}>
                  <IconButton className="changeicon">
                    <Edit></Edit>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="deleteCard">
              <Typography className="topheader">Delete</Typography>
              <Box>
              <Link onClick={() => {
                  navigate("/admin/delreward")}}>
                  <IconButton className="changeicon">
                    <Delete></Delete>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RewardManagement;
