import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

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
            <form>
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
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
