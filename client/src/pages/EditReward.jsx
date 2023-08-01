import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useFormik } from 'formik';
import * as yup from 'yup';
import rewardimg from './images/reward.png';
import http from '../http';
import './styles/adminCard.css';

function EditReward() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reward, setReward] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    http.get(`/reward/${id}`).then((res) => {
      setReward(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: reward,
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().trim()
          .min(5, "Reward Title must be at least 5 characters")
          .max(100, "Reward Title must be at most 100 characters")
          .required("Reward Title is required"),
      description: yup.string().trim()
          .min(5, "Reward Description must be at least 5 characters")
          .max(100, "Reward Description must be at most 100 characters")
          .required("Reward Description is required")
    }),
    onSubmit: (data) => {
      data.title = data.title.trim();
      data.description = data.description.trim();
      http.put(`/reward/${id}`, data)
          .then((res) => {
            console.log(res.data);
            navigate("/getreward");
          });
    }
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteReward = () => {
    http.delete(`/reward/${id}`)
        .then((res) => {
          console.log(res.data)
          navigate("/getreward");
        });
  }

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
          Edit Reward
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            className="main-tf"
            fullWidth margin="normal" autoComplete="off"
            label="Reward Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth margin="normal" autoComplete="off"
            multiline minRows={2}
            label="Reward Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <Box sx={{ mt: 2 }}>
            <Button className="main-btn" variant="contained" type="submit">
              Update
            </Button>
            <Button variant="contained" sx={{ ml : 2 }} color="error" onClick={handleOpen}>
              Delete
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Delete Reward?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you want to delete this reward?
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
    </Box>
  );
}

export default EditReward