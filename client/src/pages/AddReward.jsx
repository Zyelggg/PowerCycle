import React, { useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import rewardimg from "./images/reward.png";
import * as yup from "yup";
import http from "../http";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

function AddReward() {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .trim()
        .min(5, "Reward Title must be at least 5 characters")
        .max(100, "Reward Title must be at most 100 characters")
        .required("Reward Title is required"),
      description: yup
        .string()
        .trim()
        .min(5, "Reward Description must be at least 5 characters")
        .max(100, "Reward Description must be at most 100 characters")
        .required("Reward Description is required"),
    }),
    onSubmit: (data) => {
      data.title = data.title.trim();
      data.description = data.description.trim();
      http.post("/reward", data).then((res) => {
        console.log(res.data);
        navigate("/admin/getreward");
      });
    },
  });

  return (
    <Box
      className="main-wrap"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#250D69",
        padding: "20px",
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
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Link to="/admin/rewards" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <ChevronLeftIcon /> back
            </Button>
          </Link>
        </Box>
        <Typography
          className="main-title"
          variant="h5"
          sx={{ my: 2, display: "flex", alignItems: "center" }}
        >
          <img
            className="main-icon"
            src={rewardimg}
            alt="reward"
            style={{ marginRight: "10px" }}
          />
          Add Reward
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            label="Reward Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            multiline
            minRows={2}
            label="Reward Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.title && formik.errors.title}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
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

export default AddReward;
