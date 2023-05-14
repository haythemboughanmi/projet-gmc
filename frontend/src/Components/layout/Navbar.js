import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { laodUser, logout } from "../../redux/actions/authAction";
const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const user =useSelector((state)=>state.authReducer)
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(laodUser());
  }, [dispatch]);
  const handlelogout = () => {
    dispatch(logout(),navigate("/login"));
    
  };
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {isAuthenticated ? (
        <ul>
          <li>
          <Link to="/jobs">jobs</Link>
          </li>
            
          <li>
            
          <Link to="/jobs-offre">jobs-offre</Link>
          </li>
          
          <li>
          <Link to="/profiles">Developers</Link>
          </li>
          <li>
          <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-user" />{" "}
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link onClick={handlelogout}>
              <i className="fas fa-sign-out-alt" />{" "}
              <span className="hide-sm">logout</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
          <Link to="/profiles">Developers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
