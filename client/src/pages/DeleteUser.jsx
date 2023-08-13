import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userimg from "./images/user.png";
import http from "../http";
// import './styles/adminCard.css';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function DeleteUser() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = () => {
    http
      .delete(`/user/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/admin/getuser");
        toast.success("User account deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
        toast.error("User ID does not exist.");
      });
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  return (
    <Box
      className="main-wrap"
      sx={{ marginLeft: "250px", marginRight: "50px" }}
    >
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
          <img className="main-icon" src={userimg} alt="user" />
          Delete User
        </Typography>
        <Box component="form">
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            label="User ID"
            name="id"
            value={id}
            onChange={handleIdChange}
          />
          <Box
            sx={{
              mt: 2,
              marginRight: "auto",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleOpen}
              sx={{ display: "block", mt: 2 }}
            >
              Delete
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete User?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this user account?
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}

export default DeleteUser;
