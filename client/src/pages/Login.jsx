import logins from "./Login.module.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import React, { useContext, useState } from "react";
import { Box, Typography, TextField, Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";
import ggle from "./images/googleicon.png";
function Login() {
  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const onSuccess = (res) => {
    console.log("Success,Current user: ", res.ProfileObj);
  };

  const passToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
    console.log("Work");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
    }),
    onSubmit: (data) => {
      data.email = data.email.trim().toLowerCase();
      data.password = data.password.trim();
      http
        .post("/user/login", data)
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          setUser(res.data.user);
          navigate("/");
          console.log(data);
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
    <div className={logins.container}>
      <div className={logins.box}>
        <span className={logins.borderLine}></span>

        <Box
          component="form"
          sx={{ maxWidth: "500px" }}
          onSubmit={formik.handleSubmit}
        >
          <h2 style={{ color: "white" }}>Login</h2>
          <br />
          <div className={logins.textwrap}>
            <input
              className={logins.inp}
              margin="normal"
              autoComplete="off"
              label="Email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{ borderColor: "white" }}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className={logins.errorText} color="red">
              {formik.errors.email}
            </div>
          )}
          <br />
          <div className={logins.textwrap}>
            <input
              className={logins.inp}
              margin="normal"
              autoComplete="off"
              label="Password"
              name="password"
              type={type}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span
              className={logins.eyespan}
              style={{ display: "inline-block" }}
            >
              <Icon
                icon={icon}
                onClick={passToggle}
                style={{
                  display: "inline-block",
                  color: "black",
                  cursor: "pointer",
                }}
              />
            </span>
          </div>
          {formik.touched.email && formik.errors.password && (
            <div className={logins.errorText} color="red">
              {formik.errors.password}
            </div>
          )}
          <br />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              style={{ height: "20px", marginRight: "5px" }}
            />

            <div style={{ inline: true }}>
              <p
                style={{ color: "white", fontSize: "10px",  }}
              >
                Remember Me
              </p>
            </div>

            <a
              href="#"
              className={logins.forgotpass}
              style={{
                marginRight: "0",
                marginLeft: "auto",
                color: "white",
                textDecoration: "none",
                
                cursor: "pointer",
              }}
            >
              Forget Password?
            </a>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Button
              fullWidth
              variant="contained"
              style={{
                width: "80%",
                margin: "auto",
                marginTop: "30px",
                backgroundColor: "white",
                color: "black",
              }}
              type="submit"
            >
              Login
            </Button>

            <p
              style={{
                color: "white",
                fontSize: "10px",
                marginTop: "10px",
                margin: "auto",
              }}
            >
              Don't have an account yet? Click{"  "}
              <a
                className={logins.forgotpass}
                style={{
                  cursor: "pointer",
                  color: "white",
                }}
                href="./register"
              >
                Here
              </a>
              {"  "}to Sign Up
            </p>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "25px",
              }}
            >
              <hr style={{ width: "100%", height: "2px",color:"white",transform:"translateY(-7px)"}} />
              <p style={{ color: "white", fontSize: "10px" }}>OR</p>
              <hr style={{ width: "100%", height: "2px" ,color:"white",transform:"translateY(-7px)"}} />
            </Box>
            <div onClick={google} style={{ background: "white" ,height:"40px",textAlign:"center",borderRadius:"5px",cursor:"pointer"}}>
              <p style={{ font: "15px",fontFamily:"Roboto",marginTop:"5px" }}><img src={ggle} alt="" style={{height:"30px",marginRight:"15px"}} /> Continue with Google</p>
            </div>
          </Box>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
