import React from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import rewardimg from "./images/reward.png";
import * as yup from "yup";
import http from "../http";
import "./styles/adminCard.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function AddAdmin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
    },
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
      http.post("/admin", data).then((res) => {
        console.log(res.data);
        navigate("/getadmin");
      });
      toast.success("Admin Added");
    },
  });

  return (
    <Box className="main-wrap">
      <Box>
        <Box sx={{ mb: 2 }}>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <ChevronLeftIcon></ChevronLeftIcon>
              back
            </Button>
          </Link>
        </Box>
        <Typography className="main-title" variant="h5" sx={{ my: 2 }}>
          <img className="main-icon" src={rewardimg} alt="admin" />
          Add Admin
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

export default AddAdmin;
