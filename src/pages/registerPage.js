import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import { useRegisterMutation } from "../slices/usersApiSlices";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { setCredentials } from "../slices/AuthSlices";

import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  // const [register, { isLoading }] = useRegisterMutation();

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/profile");
  //   }
  // }, [navigate, userInfo]);
  // async function handleRegister(e) {
  //   e.preventDefault();
  //   if (password !== confirmPassword)
  //     return toast.error(`Password not matched 😶`);
  //   try {
  //     const res = await register({ email, password, name }).unwrap();
  //     setName("");
  //     setEmail("");
  //     setPassword("");
  //     setConfirmPassword("");
  //     toast.success(res.message);
  //     navigate("/signin");
  //   } catch (err) {
  //     console.log(err?.data?.message || err.error);
  //   }
  // }
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} xl={6}>
          <Paper
            style={{
              padding: "2rem",
              borderRadius: "4px",
              backgroundColor: "#fff",
              border: "none",
              boxShadow: "none",
            }}
          >
            <div style={{ position: "absolute", top: 15, left: 20 }}>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <ArrowBackIcon />
              </Link>
            </div>
            <Typography
              variant="h5"
              component="h2"
              style={{
                marginBottom: "1.5rem",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Sign up
            </Typography>
            <form>
              <TextField
                label="Full name"
                variant="outlined"
                type="text"
                placeholder="Full name"
                onChange={(e) => setName(e.target.value)}
                fullWidth
                style={{ marginBottom: "1.5rem" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />{" "}
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                placeholder="abc@email.com"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                style={{ marginBottom: "1.5rem" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />{" "}
              <TextField
                label="Your password"
                variant="outlined"
                type="email"
                placeholder="Your password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: "1.5rem" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm password"
                variant="outlined"
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                style={{ marginBottom: ".5rem" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                // onClick={handleRegister}
                style={{
                  color: "#fff",
                  backgroundColor: "#486453",
                  borderRadius: "4px",
                  padding: ".5rem",
                  marginTop: "1rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    margin: "auto",
                    fontSize: "16px",
                  }}
                >
                  Sign Up
                </span>
                <div
                  style={{
                    backgroundColor: "#5F8565",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    marginLeft: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArrowForwardIcon />
                </div>
              </Button>
              <Typography
                variant="body1"
                align="center"
                style={{ marginTop: "1.5rem" }}
              >
                Already have an account?{" "}
                <Link
                  to="/signin"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Sign in
                </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
