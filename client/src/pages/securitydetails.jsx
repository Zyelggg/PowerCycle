import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Input } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { edit2 } from "react-icons-kit/feather/edit2";
import http from "../http";
import dashboard from "./dashboard.module.css";
import { lock } from "react-icons-kit/feather/lock";
function securityDetails() {
  const [user, setUser] = useState(null);
  const resetbutton = () => {
    formik.setFieldValue("password", "");
    formik.setFieldValue("confirmPassword", "");
  };
  //readonly section
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

  const [userDetail, setuserDetail] = useState({
    password: "",
    confirmPassword: "",
  });


  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http
        .get("/user/auth")
        .then((res) => {
          setUser(res.data.userid);
          console.log(res.data.userid); // Verify the user value here
          return res.data.userid;
        })
        .then((user) => {
          console.log(user, "hi"); // Verify the user value here
          fetch(`http://localhost:3001/user/securitydetails/${user}`, {
            method: "GET",
          })
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
              setuserDetail(data);
              console.log(data);
            });
        });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
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
      data.password = data.password.trim();
      // data.email = data.email.trim();

      fetch(`http://localhost:3001/user/securitydetails/${userDetail.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json()) // Parse response body as JSON
        .then((data) => {
          console.log(data); // Log the parsed response data
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
        // .then((res) => {
            
        //   })
        //   .catch(function (err) {
        //     toast.error(`${err.response.data.message}`);
        //   });
    },
  });
  return (
    <div className={dashboard.purpleContainer}>
      <div className={dashboard.whiteContainer}>
        <div className={dashboard.header} style={{ fontFamily: "Montserrat" ,color:"black"}}>
          Security Details
        </div>
        <div className={dashboard.form}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <label
              for="Password"
              style={{ fontSize: "10px", fontFamily: "Montserrat",color:"black" }}
            >
              Password
            </label>

            <br />
            <div className={dashboard.textwrapSecurity}>
              <input
                style={{ color: "white" ,background : "blueviolet"  }}
                className={dashboard.phone}
                margin="normal"
                autoComplete="off"
                label="Password"
                name="password"
                type={type1}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span
                className={dashboard.eyespan}
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
            {formik.touched.password && formik.errors.password && (
              <div className={dashboard.errorText} color="red">
                {formik.errors.password}
              </div>
            )}

            <label
              for="confirmPassword"
              style={{ fontSize: "10px", fontFamily: "Montserrat" ,color:"black"}}
            >
              Confirm password
            </label>

            <div className={dashboard.textwrapSecurity}>
              <input
                style={{ color: "white" , background : "blueviolet" }}
                className={dashboard.phone}
                margin="normal"
                autoComplete="off"
                label="confirmPassword"
                name="confirmPassword"
                type={type2}
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <span
                className={dashboard.eyespan}
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
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className={dashboard.errorText} color="red">
                  {formik.errors.confirmPassword}
                </div>
              )}
            <br />
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                className={dashboard.save}
                // onClick={resetbutton}
                type="submit"
              >
                Save
              </Button>
              <br />
              <Button className={dashboard.cancel} onClick={resetbutton}>
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default securityDetails;
