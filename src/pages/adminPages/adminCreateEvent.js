//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  CardMedia,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";

export default function AdminCreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venueId, setVenueId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [price, setPrice] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [capacity, setCapacity] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [marker, setMarker] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const [accessToken, setAccessToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, languagesResponse, statusesResponse] =
          await Promise.all([
            axios.get(`${BACKEND_URL}/categories`),
            axios.get(`${BACKEND_URL}/categories/languages`),
            axios.get(`${BACKEND_URL}/categories/statuses`),
          ]);

        setCategories(categoriesResponse.data);
        setLanguages(languagesResponse.data);
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
    localStorage.setItem("test", previewUrl);
  }, [file]);

  const onMapClick = (e) => {
    setMarker({
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    });
  };

  const fetchData = async () => {
    try {
      if (user && user.email) {
        const response = await axios.post(`${BACKEND_URL}/admins/`, {
          email: user.email,
          name: "CC",
        });

        const output = response.data;

        setAdminId(output[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkUser = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      setAccessToken(token);
      fetchData();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !title ||
      !description ||
      !selectedLanguageId ||
      !selectedCategoryId ||
      !selectedStatusId ||
      !price ||
      !start ||
      !end ||
      !capacity ||
      !address ||
      !postalCode ||
      !marker
    ) {
      setErrorMessage(true);
      return; // Prevent form submission
    }

    try {
      const venueResponse = await axios.post(`${BACKEND_URL}/venues`, {
        lat: marker.lat,
        lng: marker.lng,
        postal_code: postalCode,
        address: address,
        country: "Singapore",
      });

      const venueId = venueResponse.data.id;

      await axios.post(`${BACKEND_URL}/events`, {
        title: title,
        description: description,
        languageId: selectedLanguageId,
        categoryId: selectedCategoryId,
        venueId: venueId,
        adminId: adminId,
        price: price,
        start: start,
        end: end,
        statusId: selectedStatusId,
        capacity: capacity,
        image_link: previewUrl,
      });

      setTitle("");
      setDescription("");
      setSelectedLanguageId("");
      setSelectedCategoryId("");
      setVenueId("");
      setAdminId("");
      setPrice("");
      setStart("");
      setEnd("");
      setAddress("");
      setPostalCode("");
      setSelectedStatusId("");
      setCapacity("");
      setPreviewUrl("");

      navigate("../home", { replace: true });
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  console.log(previewUrl);

  return (
    <Box sx={{ margin: "6vh" }}>
      <Box
        sx={{
          position: "fixed",
          top: "5vw",
          left: "5vw",
          zIndex: 9999,
        }}
      >
        <Link to="/admin/home">
          <ArrowBackIcon />
        </Link>
      </Box>
      <Box sx={{ height: "5vh" }}></Box>
      <Typography variant="h5" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel id="title">Title</InputLabel>
            <TextField
              size="small"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="description">Description</InputLabel>
            <TextField
              size="small"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="language">Language</InputLabel>
            <Select
              size="small"
              fullWidth
              label="Language"
              value={selectedLanguageId}
              onChange={(e) => setSelectedLanguageId(e.target.value)}
            >
              {languages.map((language) => (
                <MenuItem key={language.id} value={language.id}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              size="small"
              fullWidth
              label="Category"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              size="small"
              fullWidth
              label="Status"
              value={selectedStatusId}
              onChange={(e) => setSelectedStatusId(e.target.value)}
            >
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="amount">Amount</InputLabel>
            <OutlinedInput
              size="small"
              id="outlined-adornment-amount"
              fullWidth
              inputProps={{ type: "number" }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="start">Start</InputLabel>
            <TextField
              size="small"
              type="datetime-local"
              fullWidth
              value={start}
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="end">End</InputLabel>
            <TextField
              size="small"
              type="datetime-local"
              fullWidth
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="capacity">Capacity</InputLabel>
            <TextField
              size="small"
              fullWidth
              inputProps={{ type: "number" }}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="address">Address</InputLabel>
            <TextField
              size="small"
              fullWidth
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="postal code">Postal Code</InputLabel>
            <TextField
              size="small"
              fullWidth
              inputProps={{ type: "number" }}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ height: "5vw" }}></Box>
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            mapId={"map"}
            style={{ width: "79vw", height: "30vh" }}
            defaultCenter={{
              lat: 1.3521,
              lng: 103.8198,
            }}
            defaultZoom={10}
            onClick={onMapClick}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {marker && (
              <AdvancedMarker
                position={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
              />
            )}
          </Map>
        </APIProvider>
        <Box sx={{ height: "5vw" }}></Box>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Box sx={{ height: "5vw" }}></Box>
        {previewUrl && (
          <CardMedia
            sx={{ height: 120, position: "relative" }}
            image={previewUrl}
            title="shoes"
          ></CardMedia>
        )}
        <Box sx={{ height: "5vw" }}></Box>

        <Button type="submit" fullWidth variant="contained" color="primary">
          Create Event
        </Button>
        {errorMessage && <p>Please fill in all the details</p>}
      </form>
    </Box>
  );
}
