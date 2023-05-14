import { useState } from "react";
import React from "react";
import { useDispatch,useSelector} from 'react-redux';
import { Link,useNavigate } from "react-router-dom"
import { setAlert } from "../../redux/actions/alertAction";
import { register } from "../../redux/actions/authAction";

const Register = () => {
  const { isAuthenticated }=useSelector(state=>state.authReducer)
  const navigate=useNavigate()
  const [FormData, setForData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const [role,setRole]=useState("user")
  const dispatch=useDispatch()
  var { name, email, password, password2 } = FormData;
  
  console.log(FormData)
  console.log(role)
  const onChange = (e) =>{
    setForData({ ...FormData, [e.target.name]: e.target.value })
    if(email==="emworks@gmail.com"){setRole("admin")}else{setRole("user")}};
  const onSubmit = (e) => {
    
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("password not match", "danger"));
    } else {
      
      dispatch(register({name,email,password,role},navigate))
    }
  };
  //Redirect if logged in 
  if(isAuthenticated){
    return navigate("/dashboard")
  }
  return (
    <div className="container">
    <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First & last Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
// };
// connect(null, { setAlert })
export default Register
