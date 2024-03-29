import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ResetPasswordPage() {
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
              Reset Password
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "1.5rem" }}>
              Please enter your email address to request a password reset
            </Typography>
            <form>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                placeholder="abc@email.com"
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
              <Button
                type="submit"
                variant="contained"
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
                  Send
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
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
