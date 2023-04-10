import { useState } from "react";
import React from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/actions/alertAction";
import { register } from "../../redux/actions/authAction";

const Register = () => {
  const [FormData, setForData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch=useDispatch()
  const { name, email, password, password2 } = FormData;
  const onChange = (e) =>
    setForData({ ...FormData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("password not match", "danger"));
    } else {
      dispatch(register({name,email,password}))
    }
  };
  return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
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
