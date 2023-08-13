import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, TextField } from '@mui/material';
import { AccessTime, Search, Clear, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';
import './styles/adminCard.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


function RetrieveReward() {
  const [rewardList, setRewardList] = useState([]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getRewards = () => {
    http.get('/reward').then((res) => {
      setRewardList(res.data);
    });
  };

  const searchRewards = () => {
    http.get(`/reward?search=${search}`).then((res) => {
      setRewardList(res.data);
    });
  };

  useEffect(() => {
    getRewards();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchRewards();
    }
  };

  const onClickSearch = () => {
    searchRewards();
  }

  const onClickClear = () => {
    setSearch('');
    getRewards();
  };

  return (
    <Box className="main-wrap">
      <Box sx={{ mb: 2 }}>
        <Link to="/reward" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            <ChevronLeftIcon></ChevronLeftIcon>
            back
          </Button>
        </Link>
      </Box>
      <Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
          Rewards
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            id="filled-search"
            label="Search"
            type="search"
            variant="standard"
            value={search}
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
          />
          <IconButton className="main-icon" onClick={onClickSearch}>
            <Search />
          </IconButton>
          <IconButton className="main-icon" onClick={onClickClear}>
            <Clear />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/addreward" style={{ textDecoration: 'none' }}>
            <Button className="main-btn" variant='contained'>
              Add Reward
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          {
            rewardList.map((reward, i) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={reward.id}>
                  <Card sx={{ border: '1px solid black' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                          {reward.title}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                        color="text.secondary">
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography>
                          {dayjs(reward.createdAt).format(global.datetimeFormat)}
                        </Typography>
                      </Box>
                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                        {reward.description}
                      </Typography>
                      <Typography className="available" sx={{ whiteSpace: 'pre-wrap' }}>
                        Available
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Link to={`/editreward/${reward.id}`}>
                          <Button className="main-btn" variant="contained" type="submit">
                            Edit Reward
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid>
      </Box>
    </Box>
  );
}


export default RetrieveReward