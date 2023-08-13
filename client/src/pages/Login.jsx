import logins from "./Login.module.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import React, { useContext, useState , useEffect} from "react";
import { Box, Typography, TextField, Button, Input,Dialog,DialogTitle ,DialogContent,DialogContentText ,DialogActions  } from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const[email,setEmail] = useState("")
  const[pass,setPass]=useState(false)
  //remember me
  // const [rememberMe, setRememberMe] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("")
  

  // useEffect(()=>{
  //   const storedEmail = Cookies.get('rememberedEmail');
  //   const storedPassword = Cookies.get('rememberedPassword');

  //   if (storedEmail && storedPassword) {
  //     setEmail(storedEmail);
  //     setPassword(storedPassword);
  //     setRememberMe(true);
  //   }
    
  // },[])
  // const handleLogin = () => {
    
  //   if (rememberMe) {
  //     // Set cookies to expire in 30 days
  //     console.log("here")
  //     Cookies.set('rememberedEmail', email, { expires: 30 });
  //     Cookies.set('rememberedPassword', password, { expires: 30 });
  //   } else {
  //     // Remove cookies if "Remember Me" is not checked
  //     Cookies.remove('rememberedEmail');
  //     Cookies.remove('rememberedPassword');
  //   }
  // }
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
  };
  const handleClose = () => {
    setOpen(false);
    setPass(false)
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const formikemail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      }),
      onSubmit: (data) => {
        data.email = data.email.trim().toLowerCase();
        console.log(data)
        http
          .get(`/user/findemail?email=${data.email}`)
          .then((res) => {
            // handleLogin()
            setEmail(res.data.id)
            setPass(true)
          })
          .catch(function (err) {
            toast.error(`${err.response.data.message}`);
          });
      },
  })
  const formikpass = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
      }),
      onSubmit: (data) => {
        data.password = data.password.trim();
        console.log(data)
        fetch(`http://localhost:3001/user/securitydetails/${email}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json()) // Parse response body as JSON
        .then((data) => {
          console.log(data); // Log the parsed response data
          toast.success("Changed Suceessfully!")
          handleClose(true)
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
      },
  })

  
  const formik = useFormik({
    // initialValues: 
    //   // email: email,
    //   // password: password
    // ,
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
          // handleLogin()
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
              value={formik.values.email }
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
              value={formik.values.password }
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
              // checked={rememberMe}
              // onChange={(e) => setRememberMe(e.target.checked)}
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
              onClick={handleOpen}
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
            
            
          </Box>
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3588/3588294.png"
            style={{ height: "50px", width: "50px", margin: "auto" }}
            alt="warning"
            className="noti-icon"
          />

          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter The Email of the account you want to change the password for
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Box
          component="form"
          sx={{ maxWidth: "500px" }}
          onSubmit={formikemail.handleSubmit}
          style={{margin:"auto"}}
        >
            <input
              style={{width:"100%",margin:"auto"}}
              margin="normal"
              autoComplete="off"
              label="Email"
              name="email"
              placeholder="Email"
              value={formikemail.values.email}
              onChange={formikemail.handleChange}
            />
              {formikemail.touched.email && formikemail.errors.email && (
            <div className={logins.errorText} color="red">
              {formikemail.errors.email}
            </div>
          )}
            <Button
              fullWidth
              variant="contained"
              style={{
                width: "100%",
                margin: "auto",
                marginTop: "30px",
                backgroundColor: "white",
                color: "black",
              }}
              type="submit"
            >
              Continue
            </Button>

            </Box>
          </DialogActions>
          <DialogActions>
            <Button
              variant="contained"
              color="inherit"
              style={{ margin: "auto" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={pass} onClose={handleClose}>
          <DialogTitle>Change Your Password</DialogTitle>
          <Box
          component="form"
          sx={{ maxWidth: "500px" }}
          onSubmit={formikpass.handleSubmit}
        >
          <div className={logins.textwrap}>
          <input
              className={logins.inp}
              margin="normal"
              autoComplete="off"
              label="Password"
              name="password"
              type={type}
              placeholder="Password"
              value={formikpass.values.password }
              onChange={formikpass.handleChange}
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
            
            <Button
              fullWidth
              variant="contained"
              style={{
                width: "100%",
                margin: "auto",
                marginTop: "30px",
                backgroundColor: "white",
                color: "black",
              }}
              type="submit"
            >
              Continue
            </Button>
            </Box>

        </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Login;
