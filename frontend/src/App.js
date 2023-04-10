import "./App.css";
import React ,{Fragment,useEffect}from "react";
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Alert from "./Components/layout/Alert";
import {laodUser} from'./redux/actions/authAction'
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from 'react-redux';


if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
const dispatch=useDispatch()
  useEffect(()=>{
dispatch(laodUser())
  },[dispatch])
  return (
    <Fragment >
      <BrowserRouter>
        <Navbar />
        <div className="container">
         <Alert /> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </div>
      </BrowserRouter>
    </Fragment >
  );
}

export default App;
