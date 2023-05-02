import { useState } from "react"
import React from 'react'
import { Link,useNavigate } from "react-router-dom"
import { login } from "../../redux/actions/authAction"
import { useDispatch ,useSelector} from 'react-redux';

const Login = () => {
  const { isAuthenticated }=useSelector(state=>state.authReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [FormData,setForData]=useState({
    email:'',
    password:''
  })
  const{email,password}=FormData
  const onChange=e=>setForData({...FormData,[e.target.name]:e.target.value})
  const onSubmit = (e) => {
    e.preventDefault();
     dispatch(login({email,password},navigate))
    }
  //Redirect if logged in 
  if(isAuthenticated){
    return navigate("/dashboard")
  }
 
  return  (
    <div className="container">
    <h1 className="large text-primary">Sign In</h1>
  <p className="lead"><i className="fas fa-user"></i>Sign Into Your Account</p>
  <form className="form" onSubmit={e=>onSubmit(e)}>
    <div className="form-group">
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>onChange(e)} />
     
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password} onChange={e=>onChange(e)}
        minLength="6"
      />
    </div>
   
    <input type="submit" className="btn btn-primary" value="Login"  onSubmit={(e)=>onSubmit(e)}  />
  </form>
  <p className="my-1">
    Don't have an account? <Link to="/register">Sign Up</Link>
  </p>
  </div>
)
}

export default Login