import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, TextField } from '@mui/material';
import { AccessTime, Search, Clear, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';
import './styles/adminCard.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function RetrieveUser() {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getUser = () => {
    http.get('/user').then((res) => {
      setUserList(res.data);
    });
  };

  const searchUser = () => {
    http.get(`/user?search=${search}`).then((res) => {
      setUserList(res.data);
    });
  };
  
  useEffect(() => {
    getUser();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  const onClickSearch = () => {
    searchUser();
  }

  const onClickClear = () => {
    setSearch('');
    getUser();
  };

  return (
    <Box className="main-wrap">
        <Box sx={{ mb: 2 }}>
          <Link to="/admin/user" style={{ textDecoration: 'none' }}>
            <Button variant="contained">
              <ChevronLeftIcon></ChevronLeftIcon>
                back
            </Button>
          </Link>
        </Box>
      <Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
          Users
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
          <IconButton  className="main-icon" onClick={onClickSearch}>
            <Search />
          </IconButton>
          <IconButton className="main-icon" onClick={onClickClear}>
            <Clear />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          {
            userList.map((user, i) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={user.id}>
                  <Card sx={{ border: '1px solid black'}}>
                    <CardContent>
                      <Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                          {user.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                          color="text.secondary">
                            <AccessTime sx={{ mr: 1 }} />
                            <Typography>
                              {dayjs(user.createdAt).format(global.datetimeFormat)}
                            </Typography>
                      </Box>
                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                        {user.email}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                      <Link to={`/admin/edituser/${user.id}`}>
                          <Button className="main-btn" variant="contained" type="submit">
                          Edit User
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


export default RetrieveUser