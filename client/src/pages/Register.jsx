import { React, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registers from "./Register.module.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import AspectRatio from '@mui/joy/AspectRatio';


function Register() {
  const navigate = useNavigate();
  const [type1, setType1] = useState("password");
  const [icon1, setIcon1] = useState(eyeOff);

  //first eye
  const passToggle = () => {
    if (type1 === "password") {
      setIcon1(eye);
      setType1("text");
    } else {
      setIcon1(eyeOff);
      setType1("password");
    }
  };
  const [type2, setType2] = useState("password");
  const [icon2, setIcon2] = useState(eyeOff);
  //second eye
  const passToggle1 = () => {
    if (type2 === "password") {
      setIcon2(eye);
      setType2("text");
    } else {
      setIcon2(eyeOff);
      setType2("password");
    }
  };
  

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .matches(/^[a-z ,.'-]+$/i, "Invalid name")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required"),
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      phone: yup
        .string()
        .trim()
        .min(8, "Phone number must be 8 characters")
        .max(8, "Phone number must be 8 characters")
        .required("Phone Number is required"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .trim()
        .required("Confirm password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (data) => {
      data.name = data.name.trim();
      data.email = data.email.trim().toLowerCase();
      data.phone = data.phone.trim();
      data.password = data.password.trim();
      data.admin = false;
      
      // data.userId = data.id;
      http
        .post("/user/register", data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('userData', JSON.stringify(data));
          navigate("/verification")
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });


    },
  });

  return (
    <div className={Registers.container}>
      <div className={Registers.box}>
        <span className={Registers.borderLine}></span>
        <Box
          component="form"
          sx={{ maxWidth: "500px" }}
          onSubmit={formik.handleSubmit}
        >
          <h2 style={{ color: "white" }}>SignUp</h2>
          <br />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={Registers.textwrap}>
              <input
                className={Registers.inp}
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

            <br />
            <div className={Registers.textwrap}>
              <input
                className={Registers.inp}
                margin="normal"
                autoComplete="off"
                label="Password"
                name="password"
                type={type1}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                sx={{ borderColor: "white" }}
              />
              <span
                className={Registers.eyespan}
                style={{ display: "inline-block" }}
              >
                <Icon
                  icon={icon1}
                  onClick={passToggle}
                  style={{
                    display: "inline-block",
                    color: "black",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {formik.touched.email && formik.errors.email && (
              <div className={Registers.errorText} color="red">
                {formik.errors.email}
              </div>
            )}
            {formik.touched.password && formik.errors.password && (
              <div className={Registers.errorText} color="red">
                {formik.errors.password}
              </div>
            )}
          </Box>
          <br style={{ paddingBottom: "50px" }} />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={Registers.textwrap}>
              <input
                className={Registers.inp}
                margin="normal"
                autoComplete="off"
                label="Name"
                name="name"
                placeholder="Username"
                value={formik.values.name}
                onChange={formik.handleChange}
                sx={{ borderColor: "white" }}
              />
            </div>

            <div className={Registers.textwrap}>
              <input
                className={Registers.inp}
                margin="normal"
                autoComplete="off"
                label="Confirm Password"
                name="confirmPassword"
                type={type2}
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                sx={{ borderColor: "white" }}
              />
              <span
                className={Registers.eyespan}
                style={{ display: "inline-block" }}
              >
                <Icon
                  icon={icon2}
                  onClick={passToggle1}
                  style={{
                    display: "inline-block",
                    color: "black",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {formik.touched.name && formik.errors.name && (
              <div className={Registers.errorText} color="red">
                {formik.errors.name}
              </div>
            )}
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className={Registers.errorText} color="red">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </Box>
          <br />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={Registers.textwrap}>
              <input
                className={Registers.inp}
                margin="normal"
                autoComplete="off"
                label="Phone"
                name="phone"
                placeholder="PhoneNumber"
                value={formik.values.phone}
                onChange={formik.handleChange}
                sx={{ borderColor: "white" }}
              />
            </div>
            
          </Box>

          {formik.touched.phone && formik.errors.phone && (
            <div className={Registers.errorText} color="red">
              {formik.errors.phone}
            </div>
          )}

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
              Continue
            </Button>
            <br />
            <p
              style={{
                color: "white",
                fontSize: "10px",
                marginTop: "10px",
                margin: "auto",
              }}
            >
              Already have an account yet? Click{"  "}
              <a
                className={Registers.forgotpass}
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold"
                }}
                href="./login"
              >
                Here
              </a>
              {"  "}to Login
            </p>


            <ToastContainer />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Register;
