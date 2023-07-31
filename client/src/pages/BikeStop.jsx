import dayjs from 'dayjs';
import global from '../global';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import http from '../http';
import bikestopicon from './images/bikestop.png'
function BikeStop() {
  const [bikeStopList, setbikeStopList] = useState([]);
  const [search, setSearch] = useState('');
  const [totalBikestop, setTotalBikestop] = useState(0);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getBikeStop = () => {
    http.get('/bikestop').then((res) => {
      setbikeStopList(res.data);
      setTotalBikestop(res.data.length);
    });
  };

  const searchBikeStop = () => {
    http.get(`/bikestop?search=${search}`).then((res) => {
      setbikeStopList(res.data);
    }
    )
  }

  useEffect(() => {
    http.get('/bikestop').then((res) => {
      getBikeStop();
      setTotalBikestop(res.data.length);
    });
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchBikeStop();
    }
  }

  const onClickSearch = () => {
    searchBikeStop();
  }

  const onClickClear = () => {
    setSearch('');
    getBikeStop();
  }

  return (
    <Box className="admin-wrap main-wrap">
      <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bikestopicon} className='crud-icons'/>
                <Typography variant="h5" sx={{ ml: 2 }} className="main-title">
                  Retrieve Bikestop
                </Typography>
            </div>
      
    <Typography variant="h6" sx={{ mt: 1 }} style={{ color: 'black' }}>
        Total Bikes: {totalBikestop}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, marginTop: "10px" }}>
      <Input value={search} placeholder="Search" sx={{ width: '100%' }}
          onChange={onSearchChange} onKeyDown={onSearchKeyDown} />
        <IconButton color="primary" onClick={onClickSearch}>
          <Search />
        </IconButton>
        <IconButton color="primary" onClick={onClickSearch}>
          <Clear />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {
          bikeStopList.map((bikeStop, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={bikeStop.id}>
                <Card>
                  <CardContent>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Bikestop No. #{bikeStop.id}</Typography>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {bikeStop.stopname}
                      </Typography>
                      <Link to={`/editbikestop/${bikeStop.id}`}>
                        <IconButton color="primary" sx={{ padding: '4px' }}>
                          <Edit />
                        </IconButton>
                      </Link>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      color="text.secondary">
                      <AccessTime sx={{ mr: 1 }} />
                      <Typography>
                        {dayjs(bikeStop.createdAt).format(global.datetimeFormat)}
                      </Typography>
                    </Box>

                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                      {bikeStop.coordsx}
                    </Typography>
                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                      {bikeStop.coordsy}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        }
      </Grid>

    </Box>
  );
}

export default BikeStop