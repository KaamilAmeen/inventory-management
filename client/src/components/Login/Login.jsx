import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import inventoryAPI from "../../api/api";

export default function Login() {
  const [authDetails, setAuthFormDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle changes
  const handleChange = (e) => {
    setAuthFormDetails({
      ...authDetails,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await inventoryAPI.login(authDetails);
      console.log("✅ Login Success:", response.data);

      // Example: save token to localStorage
      localStorage.setItem("token", response.data.token);

      // redirect if needed
      // navigate("/dashboard");  <-- if you use react-router
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          padding: 2,
          maxWidth: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h5">Login</Typography>

          <TextField
            label="email"
            name="email"
            fullWidth
            margin="normal"
            value={authDetails.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={authDetails.password}
            onChange={handleChange}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: "20px" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
