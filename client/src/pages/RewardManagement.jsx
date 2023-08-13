import React, { useEffect, useState } from "react";
// import "./styles/adminCard.css";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  Link,
  IconButton,
  Drawer,
} from "@mui/material";
import { Add, Search, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import http from '../http';

function RewardManagement() {
  const navigate = useNavigate();
  const [totalRewards, setTotalRewards] = useState(0);

  useEffect(() => {
    http.get('/reward').then((res) => {
      setTotalRewards(res.data.length);
    });
  }, []);

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);


  return (
    <Box
      className="main-wrap"
      sx={{ padding: '50px', marginLeft: '250px', marginRight: '50px'
      }}
    >
      <Typography variant="h5" sx={{ my: 2 }} className="main-title">
        Reward Management
      </Typography>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="addCard">
              <Typography className="topheader">Add</Typography>
              <Box>
                <Link
                  onClick={() => {
                    navigate("/admin/addreward");
                  }}
                >
                  <IconButton className="changeicon">
                    <Add></Add>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
                <Typography>{totalRewards} Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="retrieveCard">
              <Typography className="topheader">Retrieve</Typography>
              <Box>
                <Link
                  onClick={() => {
                    navigate("/admin/getreward");
                  }}
                >
                  <IconButton className="changeicon">
                    <Search></Search>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
                <Typography>{totalRewards} Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="updateCard">
              <Typography className="topheader">Update</Typography>
              <Box>
                <Link
                  onClick={() => {
                    navigate("/admin/getreward");
                  }}
                >
                  <IconButton className="changeicon">
                    <Edit></Edit>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
                <Typography>{totalRewards} Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <CardContent className="deleteCard">
              <Typography className="topheader">Delete</Typography>
              <Box>
                <Link
                  onClick={() => {
                    navigate("/admin/delreward");
                  }}
                >
                  <IconButton className="changeicon">
                    <Delete></Delete>
                  </IconButton>
                </Link>
                <Typography>Rewards</Typography>
                <Typography>{totalRewards} Rewards</Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RewardManagement;
