import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CheckCircle } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import { useLoginMutation } from "../slices/usersApiSlices";
// import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "../slices/AuthSlices";
import toast from "react-hot-toast";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  // const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  // const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    getAccessTokenSilently,
    logout,
    isLoading,
    user,
  } = useAuth0();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();
  const checkUser = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      setAccessToken(token);
      navigate("/profile");
    } else {
      loginWithRedirect();
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await login({ email, password }).unwrap();
  //     setEmail("");
  //     setPassword("");
  //     toast.success(res.message);
  //     dispatch(setCredentials({ ...res }));
  //     navigate("/profile");
  //   } catch (err) {
  //     console.log(err?.data?.message || err.error);
  //   }
  // };
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
            {/* <Typography
              variant="h1"
              component="h2"
              style={{
                marginBottom: ".5rem",
                fontWeight: "bolder",
                color: "#E5D3D3",
                fontSize: "36px",
                textAlign: "center", // Center-align the text
              }}
            >
              EventLink
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              style={{
                marginBottom: "1.5rem",
                fontWeight: "bold",
                textAlign: "start", // Center-align the text
              }}
            >
              Sign in
            </Typography> */}
            <form>
              {/* <TextField
                label="Email"
                variant="outlined"
                type="email"
                placeholder="abc@email.com"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: "1.5rem" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: ".5rem",
                }}
              >
                <ToggleButtonGroup
                  value={rememberMe}
                  exclusive
                  onChange={handleRememberMe}
                  aria-label=""
                  style={{ border: "none" }}
                >
                  <ToggleButton style={{ border: "none" }}>
                    {rememberMe ? (
                      <CheckCircle
                        fontSize="small"
                        style={{ color: "#658C6D" }}
                      />
                    ) : (
                      <CancelOutlinedIcon
                        fontSize="small"
                        // style={{ color: "#658C6D" }}
                      />
                    )}{" "}
                    <Typography style={{ textTransform: "capitalize" }}>
                      Remember me
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
                <Button
                  component={Link}
                  to="/reset-password"
                  variant="text"
                  style={{
                    color: "#007bff",
                    textTransform: "none",
                  }}
                >
                  Forgot Password?
                </Button>
              </div> */}
              {!isAuthenticated && (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => loginWithRedirect()}
                  style={{
                    color: "#fff",
                    backgroundColor: "#486453",
                    borderRadius: "4px",
                    padding: ".5rem",
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
                    Sign In
                  </span>
                  <div
                    style={{
                      backgroundColor: "#68C598",
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
              )}

              {/* <Typography
                variant="body1"
                align="center"
                style={{ marginTop: "1.5rem" }}
              >
                Don’t have any account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </Typography> */}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
