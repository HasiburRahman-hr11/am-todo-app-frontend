import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context/userContext";
import axios from "axios";

const textFieldStyle = {
  width: "100%",
  marginTop: "20px",
};

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      return alert("Please fill up the form correctly");
    }
    if (password.length < 5) {
      return alert("Password must be at least 5 charecters");
    }
    let userData = {
      username: username,
      email: email,
      password: password,
    };
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://am-todo-app-api.onrender.com/user/add-user",
        userData
      );
      if (data?.email) {
        setLoading(false);
        navigate("/signin");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      setLoading(false);
    }
  };
  if (user?.email) {
    navigate("/");
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "450px",
            background: "#fff",
            padding: "30px 30px",
            borderRadius: "10px",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "#1976D2",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Signup
          </Typography>

          <TextField
            sx={textFieldStyle}
            id="userName"
            label="Username"
            variant="standard"
            autoComplete="false"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="email"
            label="Email"
            variant="standard"
            autoComplete="false"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="password"
            label="Password"
            type="password"
            variant="standard"
            autoComplete="false"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ mt: "30px", textAlign: "center" }}>
            <Button variant="contained" onClick={handleSubmit}>
              {loading ? (
                <CircularProgress
                  sx={{
                    color: "#fff",
                    width: "25px !important",
                    height: "25px !important",
                  }}
                />
              ) : (
                "Signup"
              )}
            </Button>
          </Box>

          <Typography
            variant="h6"
            component="h6"
            sx={{ mt: "30px", textAlign: "center" }}
          >
            Or <Link to="/signin">Signin</Link>
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default SignUp;
