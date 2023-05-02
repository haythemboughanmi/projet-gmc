import "./App.css";
import React, { Fragment, useEffect } from "react";
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Alert from "./Components/layout/Alert";
import Dashboard from "./Components/dashboard/Dashboard";
import CreateProfile from "./Components/profile-forms/CreateProfile";
import EditProfile from "./Components/profile-forms/EditProfile";
import AddExperience from "./Components/profile-forms/AddExperience";
import AddEducation from "./Components/profile-forms/AddEducation";
import Profiles from "./Components/Profiles/Profiles";
import Profile from  "./Components/profile/Profile";
import Posts from  "./Components/Posts/Posts";
import Post from  "./Components/Post/Post";
import PrivateRoute from "./Components/routing/PrivateRoute";
import { laodUser } from "./redux/actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from "react-redux";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(laodUser());
  }, [dispatch]);
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
           <Route
            path="/add-experience"
            element={
              <PrivateRoute>
                <AddExperience />
              </PrivateRoute>
            }
          />
           <Route
            path="/add-education"
            element={
              <PrivateRoute>
                <AddEducation />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
