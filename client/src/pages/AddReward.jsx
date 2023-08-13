import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import rewardimg from './images/reward.png';
import * as yup from 'yup';
import http from '../http';
import './styles/adminCard.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';

function AddReward() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: yup.object({
      title: yup.string().trim()
          .min(5, 'Reward Title must be at least 5 characters')
          .max(100, 'Reward Title must be at most 100 characters')
          .required('Reward Title is required'),
      description: yup.string().trim()
          .min(5, 'Reward Description must be at least 5 characters')
          .max(100, 'Reward Description must be at most 100 characters')
          .required('Reward Description is required')
    }),
    onSubmit: (data) => {
      data.title = data.title.trim();
      data.description = data.description.trim();
      http.post("/reward", data)
          .then((res) => {
            console.log(res.data);
            navigate("/getreward");
          });
    }
  });

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
          Add Reward
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
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
          <Box sx={{ mt: 2, marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button className="main-btn" variant="contained" type="submit">
              Add
            </Button>
          </Box>
        </Box>

        <ToastContainer />
      </Box>
    </Box>
  )
}

export default AddReward