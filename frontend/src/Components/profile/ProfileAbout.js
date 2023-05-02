import React from 'react'
import { useSelector } from "react-redux";

const ProfileAbout = () => {
    const { profile } = useSelector((state) => state.profileReducer);
console.log(profile.skills)
  return (
    <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{profile.name} bio</h2>
          <p> {profile.bio}</p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {profile?.skills.map((skill,index)=>
                <div key={index} className="p-1"> <i className='fas fa-chek' style={{color:'black'}}></i> {skill}</div>
            )}
          </div>
        </div>
  )
}

export default ProfileAbout