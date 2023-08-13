import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import rewardimg from './images/reward.png';
import http from '../http';
import './styles/adminCard.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function DeleteReward() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteReward = () => {
    http.delete(`/reward/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("getreward");
        toast.success('Reward deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
        toast.error('Reward ID does not exist.');
      });
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  return (
    <Box className="main-wrap">
      <Box>
            <Box sx={{ mb: 2 }}>
          <Link to="/reward" style={{ textDecoration: 'none' }}>
            <Button variant="contained">
              <ChevronLeftIcon></ChevronLeftIcon>
                back
            </Button>
          </Link>
        </Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
          <img className="main-icon" src={rewardimg} alt="reward" />
          Delete Reward
        </Typography>
        <Box component="form">
          <TextField
            fullWidth margin="normal" autoComplete="off"
            label="Reward ID"
            name="id"
            value={id}
            onChange={handleIdChange}
          />
          <Box sx={{ mt: 2, marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end'}}>
            <Button className="main-btn" variant="contained" color="error" onClick={handleOpen}>
              Delete
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Delete Reward?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this reward?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={deleteReward}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
}

export default DeleteReward;
