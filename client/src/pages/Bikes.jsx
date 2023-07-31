import dayjs from 'dayjs';
import global from '../global';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import http from '../http';
import bikeicon from './images/bikeicon.png';

function Bikes() {
  const [bikeList, setBikeList] = useState([]);
  const [search, setSearch] = useState('');
  const [totalBikes, setTotalBikes] = useState(0);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getBikes = () => {
    http.get('/bike').then((res) => {
      setBikeList(res.data);
      setTotalBikes(res.data.length);
    });
  };

  const searchBikes = () => {
    http.get(`/bike?search=${search}`).then((res) => {
      setBikeList(res.data);
    });
  };

  useEffect(() => {
    http.get('/bike').then((res) => {
      setBikeList(res.data);
      setTotalBikes(res.data.length);
    });
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchBikes();
    }
  };

  const onClickSearch = () => {
    searchBikes();
  };

  const onClickClear = () => {
    setSearch('');
    getBikes();
  };

  return (
    <Box className="admin-wrap main-wrap">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={bikeicon} className="crud-icons" alt="Bike Icon" />
        <Typography variant="h5" sx={{ ml: 2 }} className="main-title">
          Retrieve Bikes
        </Typography>
      </div>

      <Typography variant="h6" sx={{ mt: 1 }} style={{ color: 'black' }}>
        Total Bikes: {totalBikes}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%', marginTop: '10px' }}>
        <Input
          value={search}
          placeholder="Search"
          sx={{ width: '100%' }}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
        />
        <IconButton color="primary" onClick={onClickSearch}>
          <Search />
        </IconButton>
        <IconButton color="primary" onClick={onClickClear}>
          <Clear />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {bikeList.map((bike, i) => (
          <Grid item xs={12} md={6} lg={4} key={bike.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Bike No. #{bike.id}
                </Typography>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Stop Name: {bike.stopname}
                  </Typography>
                  <Link to={`/editbike/${bike.id}`}>
                    <IconButton color="primary" sx={{ padding: '4px' }}>
                      <Edit />
                    </IconButton>
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography>{dayjs(bike.createdAt).format(global.datetimeFormat)}</Typography>
                </Box>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}></Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Bikes;
  