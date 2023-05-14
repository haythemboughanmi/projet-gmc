import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfileById,adminDelete } from "../../redux/actions/profileAction";
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEduction"
import ProfileGithub from "./ProfileGithub";
import Spinner from "../layout/Spinner";

const Profile = () => {
  // Get the id param from the URL.
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {

    dispatch(getProfileById(id));

  }, [getProfileById, id]);

  const { profile, loading,repos } = useSelector((state) => state.profileReducer);
  console.log(profile)
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
console.log(user)
  return (
    <div className="container">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {isAuthenticated &&
            loading === false &&
            user?._id === profile.user?._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
            {
              user?.role==="admin"&&(<button onClick={()=>dispatch(adminDelete(id,navigate))} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i>Delete  Account  
              </button>)
            }
          <div class="profile-grid my-1">
            <ProfileTop />
            <ProfileAbout />
            <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {profile.experience.map((experience)=>(
            <ProfileExperience
            key={experience?._id}
            experience={experience}
          />
          ))}
          </div>
          <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {profile.education.map((education)=>(
            <ProfileEducation
            key={education?._id}
            education={education}
          />
          ))}
          </div>
          
          <ProfileGithub  />
        
          {/* {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} /> */}
              
          </div>
          
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
