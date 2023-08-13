import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton,InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import rewardimg from "./images/reward.png";
import * as yup from "yup";
import http from "../http";
import "./styles/adminCard.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function AddUser() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      admin: true
    },
    validationSchema: yup.object({
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
        .min(5, "Admin name must be at least 5 characters")
        .max(30, "Admin name must be at most 30 characters")
        .required("Admin name is required"),
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
      http.post("/user/verification", data).then((res) => {
        console.log(res.data);
        toast.success("User Added")
        navigate("/admin/getuser");
      });
    },
  });

  const [admin, setAdmin] = useState(false);

  const handleChangeAdmin = (event) => {
    setAdmin(event.target.value);
  }

  return (
    <Box className="main-wrap admin-wrap">
      <Box>
        <Box sx={{ mb: 2 }}>
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <ChevronLeftIcon></ChevronLeftIcon>
              back
            </Button>
          </Link>
        </Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
          <img className="main-icon" src={rewardimg} alt="admin" />
          Add User
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
            value={admin}
            onChange={handleChangeAdmin}
            error={formik.touched.admin && Boolean(formik.errors.admin)}
            helperText={formik.touched.admin && formik.errors.admin}
          >
            <MenuItem value={true}>False</MenuItem>
            <MenuItem value={false}>True</MenuItem>
          </Select>
          <Box
            sx={{
              mt: 2,
              marginLeft: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button className="main-btn" variant="contained" type="submit">
              Add
            </Button>
          </Box>
        </Box>

        <ToastContainer />
      </Box>
    </Box>
  );
}

export default AddUser
