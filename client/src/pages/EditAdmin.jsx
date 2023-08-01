import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useFormik } from 'formik';
import * as yup from 'yup';
import rewardimg from './images/reward.png';
import http from '../http';
import './styles/adminCard.css';

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    password: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    http.get(`/admin/${id}`).then((res) => {
      setAdmin(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: admin,
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .trim()
        .min(5, "Admin name must be at least 5 characters")
        .max(30, "Admin name must be at most 30 characters")
        .required("Admin name is required"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Reward Description must be at most 128 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
          "Password must contain at least one letter, one number, and one special character"
        )
        .required("Password is required"),
      email: yup
        .string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      phone: yup
        .string()
        .trim()
        .matches(/^\d{8}$/, "Invalid phone number")
        .required("Phone number is required"),
    }),
    onSubmit: (data) => {
      data.name = data.name.trim();
      data.password = data.password.trim();
      data.email = data.email.trim();
      data.phone = data.phone.trim();
      http.put(`/admin/${id}`, data)
          .then((res) => {
            console.log(res.data);
            navigate("/getadmin");
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

  const deleteAdmin = () => {
    http.delete(`/admin/${id}`)
        .then((res) => {
          console.log(res.data)
          navigate("/getadmin");
        });
  }

  return (
    <Box className="main-wrap">
      <Box>
        <Box sx={{ mb: 2 }}>
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <Button variant="contained">
              <ChevronLeftIcon></ChevronLeftIcon>
                back
            </Button>
          </Link>
        </Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
        <img className="main-icon" src={rewardimg} alt="admin" />
          Edit Admin
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            label="Admin name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            multiline
            minRows={2}
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            multiline
            minRows={2}
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && Boolean(formik.errors.email)
            }
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            multiline
            minRows={2}
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={
              formik.touched.phone && Boolean(formik.errors.phone)
            }
            helperText={formik.touched.phone && formik.errors.phone}
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
              Delete Admin?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you want to delete this admin account?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={deleteAdmin}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default EditAdmin