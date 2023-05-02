import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { addEducation,getCurrentProfile } from "../../redux/actions/profileAction";
const AddEducation = () => {
  
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCurrentProfile())
  },[dispatch])
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const [toDateDisabled, settoDateDisabled] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)

  return (
    <div className="container">
      <h1 className="large text-primary"> Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any scholl or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>{
        e.preventDefault()
        dispatch(addEducation(formData,navigate))
      }}>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="filed of study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e) => onChange(e)} />
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
            {""}Current school
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
            placeholder="Program Description"
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

export default AddEducation;
