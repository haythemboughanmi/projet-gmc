import React, { useState,useEffect} from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExperience ,getCurrentProfile  } from "../../redux/actions/profileAction";
const AddExperience = () => {
  const dispatch=useDispatch()
  // const { profile }=useSelector(state=>state.profileReducer)
  
  
    useEffect(()=>{
      dispatch(getCurrentProfile())
    },[dispatch])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const { company, title, location,from, to, current, description } = formData;
  console.log(formData)

  const [toDateDisabled, settoDateDisabled] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="container">
      <h1 className="large text-primary"> Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>{
        e.preventDefault()
        dispatch(addExperience(formData,navigate))
        console.log(formData)
      }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e) => onChange(e)}/>
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              // value=""
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                settoDateDisabled(!toDateDisabled);
              }}
            />{" "}
            {""}Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddExperience;
