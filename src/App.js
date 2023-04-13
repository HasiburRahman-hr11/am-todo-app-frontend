import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./context/user-context/userContext";


const App = () => {

  const {user} = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={!user?.email ? <Navigate to="/signin" /> : <Home />}
        />
        <Route
          exact
          path="/signin"
          element={user?.email ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          exact
          path="/signup"
          element={user?.email ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
