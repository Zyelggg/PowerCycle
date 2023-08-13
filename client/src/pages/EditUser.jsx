import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useFormik } from "formik";
import * as yup from "yup";
import userimg from "./images/user.png";
import http from "../http";
// import "./styles/adminCard.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    admin: "",
  });

  useEffect(() => {
    http.get(`/user/userdetails/${id}`).then((res) => {
      setUser(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
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
      name: yup
        .string()
        .trim()
        .min(5, "User name must be at least 5 characters")
        .max(30, "User name must be at most 30 characters")
        .required("User name is required"),
      phone: yup
        .string()
        .trim()
        .matches(/^\d{8}$/, "Invalid phone number")
        .required("Phone number is required"),
      admin: yup.boolean().required("Admin field is required"),
    }),
    onSubmit: (data) => {
      data.email = data.email.trim();
      data.password = data.password.trim();
      data.name = data.name.trim();
      data.phone = data.phone.trim();
      http.put(`/userdetails/${id}`, data).then((res) => {
        console.log(res.data);
        navigate("/admin/getuser");
      });
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsDeleted(false);
  };

  const deleteUser = () => {
    http.delete(`/user/${id}`).then((res) => {
      console.log(res.data);
      setIsDeleted(true);
      setOpen(false);

      setTimeout(() => {
        navigate("/admin/getuser");
      }, 2000);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#250D69",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          maxHeight: "100vh", // Adjust maxHeight to make the box smaller in height
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Link to="/admin/getuser" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <ChevronLeftIcon></ChevronLeftIcon>
              back
            </Button>
          </Link>
        </Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
          <img className="main-icon" src={userimg} alt="user" />
          Edit User
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
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
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            label="User name"
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
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <InputLabel id="admin-label">Admin Role</InputLabel>
          <Select
            fullWidth
            margin="normal"
            labelId="admin-label"
            id="admin"
            name="admin"
            value={formik.values.admin}
            onChange={formik.handleChange}
          >
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              mt: 2,
            }}
          >
            <Button variant="contained" type="submit">
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ ml: 2 }}
              onClick={handleOpen}
            >
              Delete
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete User?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you want to delete this user account?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={deleteUser}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default EditUser;
