import React, { useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {createProfile,getCurrentProfile} from '../../redux/actions/profileAction'
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from '../../api/http'
import axios from "axios";


const EditProfile = () => {
const {loading}=useSelector((state)=>state.profileReducer)
const {profile}=useSelector((state)=>state.profileReducer)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    image:'',
    company: '',
    websit: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })
  const [image,setImage]=useState([])
console.log(formData)
console.log(image)
  const [displaySocialInput,setSocialInput]=useState(false)
//   useEffect(()=>{
// dispatch(getCurrentProfile)
// setFormData({
//   company:loading || !profile.company ? '' : profile.company,
//   website:loading || !profile.website ? '' : profile.website,
//   location:loading || !profile.location ? '' : profile.location,
//   status:loading || !profile.status ? '' : profile.status,
//   skills:loading || !profile.skills ? '' : profile.skills.join(','),
//   githubusername:loading || !profile.githubusername ? '' : profile.githubusername,
//   bio:loading || !profile.bio ? '' : profile.bio,
//   twitter:loading || !profile.social.twitter ? '' : profile.social.twitter,
//   facebook:loading || !profile.social.facebook ? '' : profile.social.facebook,
//   linkedin:loading || !profile.social.linkedin ? '' : profile.social.linkedin,
//   youtube:loading || !profile.social.youtube ? '' : profile.social.youtube,
//   instagram:loading || !profile.social.instagram ? '' : profile.social.instagram,

// })
//   },[loading])

useEffect(() => {
  // if there is no profile, attempt to fetch one
  if (!profile) dispatch(getCurrentProfile());

  // if we finished loading and we do have a profile
  // then build our profileData
  if (!loading && profile) {
    const profileData = { ...formData };
    for (const key in profile) {
      if (key in profileData) profileData[key] = profile[key];
    }
    for (const key in profile.social) {
      if (key in profileData) profileData[key] = profile.social[key];
    }
    // the skills may be an array from our API response
    if (Array.isArray(profileData.skills))
      profileData.skills = profileData.skills.join(', ');
    // set local state with the profileData
    setFormData(profileData);
  }
}, [loading, getCurrentProfile, profile]);

  const onChange = e =>setFormData({...formData,[e.target.name]:e.target.value})
  const onSubmit = async(e) => { 
    e.preventDefault()
    const formaData=new FormData()
    formaData.append('file',image)
    formaData.append('upload_preset','ml_default')
    if(image.length===undefined){
    await axios.post('https://api.cloudinary.com/v1_1/dwb8dvmbw/upload',formaData).then((res)=>
    { 
      console.log(res.data.url,'tttttt') 
     formData.image=res.data.url
  })
  }
dispatch(createProfile(formData,navigate ,true))
navigate('/dashboard')
  }
  return <div className="container">

      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <select name="status" defaultValue={profile?.status} onChange={e=>onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" defaultValue={profile?.company} onChange={e=>onChange(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="websit" defaultValue={profile?.websit} onChange={e=>onChange(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" defaultValue={profile?.location} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" defaultValue={profile?.skills} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            defaultValue={profile?.githubusername} onChange={e=>onChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username </small >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" defaultValue={profile?.bio} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        

        <div className="my-2">
          <button onClick={()=>setSocialInput(!displaySocialInput)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
          
        </div>
        <div className="form-group">
          
          <input  className="" type="file"  name="image" onChange={e=>setImage(e.target.files[0])}/>
          
          <small className="form-text" >Upload image</small >
        </div>
{displaySocialInput ? ( 
<div>
    <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" defaultValue={profile?.twitter} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" defaultValue={profile?.facebook} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" defaultValue={profile?.youtube} onChange={e=>onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" defaultValue={profile?.linkedin} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram"  defaultValue={profile?.instagram} onChange={e=>onChange(e)} />
        </div>
</div>
):null
}
       
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    

  </div>;
};

export default EditProfile;
