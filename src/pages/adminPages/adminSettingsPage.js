//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Box, TextField, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme.js";

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState();
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        if (user && user.email) {
          console.log(user.email);
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
          const output = response.data;
          setAdmin(output[0]);
          if (output && output[0].name) {
            setEditName(output[0].name);
          }
        } else {
          console.log("User email is undefined.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated) {
      fetchAdmin();
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(
        `${BACKEND_URL}/admins/${admin.id}`,
        {
          newName: editName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmin({ ...admin, name: editName });
      navigate("../profile", { replace: true });
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleNameChange = (e) => {
    setEditName(e.target.value);
  };

  const adminInfo = admin ? (
    <Box sx={{ margin: "5vw" }}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={editName}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Name
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  ) : null;

  return <ThemeProvider theme={theme}> {adminInfo}</ThemeProvider>;
}
