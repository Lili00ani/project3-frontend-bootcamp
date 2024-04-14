//-----------Libraries-----------//
import { Typography, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

//-----------Components-----------//
import AdminEventPreviewList from "../../components/AdminEventPreviewList";
import theme from "../../theme";
import { BACKEND_URL } from "../../constant.js";

export default function AdminHomePage() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();
  const [adminId, setAdminId] = useState();

  const handleLogin = () => {
    navigate("/admin/home");
  };

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        if (user && user.email) {
          const token = await getAccessTokenSilently();
          const response = await axios.post(
            `${BACKEND_URL}/admins/`,
            {
              email: user.email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("success");
          const output = response.data;
          console.log(output);
          setAdminId(output[0].id);
        } else {
          console.log("User email is undefined.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated) {
      fetchAdminId();
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  console.log(isAuthenticated);
  console.log(adminId);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          padding: "5vw",
          paddingTop: "10vw",
          overflowY: "scroll",
        }}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", paddingLeft: "5vw" }}
        >
          Your Events
        </Typography>
        {adminId && <AdminEventPreviewList adminId={adminId} />}
      </div>
    </ThemeProvider>
  );
}
