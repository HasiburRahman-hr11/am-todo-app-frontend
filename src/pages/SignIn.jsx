import React, { useContext, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context/userContext";
import { createUserFailed, createUserStart, createUserSuccess } from "../context/user-context/userAction";
import axios from "axios";

const textFieldStyle = {
  width: "100%",
  marginTop: "20px",
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch, user } = useContext(UserContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      return alert("Please fill up the form correctly");
    }
    let userData = {
      email: email,
      password: password,
    };

    try {
      dispatch(createUserStart());
      const { data } = await axios.post(
        "http://localhost:8000/user/login",
        userData
      );
      if (data?.email) {
        localStorage.setItem(
          "am-todo-user",
          JSON.stringify({
            username: data?.username,
            email: data?.email,
            _id: data?._id,
          })
        );
        dispatch(createUserSuccess(data));
        navigate("/");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      dispatch(createUserFailed(error));
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
            Signin
          </Typography>
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
              Signin
            </Button>
          </Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{ mt: "30px", textAlign: "center" }}
          >
            Or <Link to="/signup">Signup</Link>
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default SignIn;
