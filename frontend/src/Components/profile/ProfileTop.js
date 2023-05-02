import React from "react";
import { useSelector } from "react-redux";

const ProfileTop = () => {
  const { profile } = useSelector((state) => state.profileReducer);
  console.log(profile)
  return (
    <div class="profile-top bg-primary p-2">
      {profile.image?<img
        class="round-img my-1"
        src={profile?.image}
        alt=""
      />:<img  class="round-img my-1" src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"/>}
      <h1 class="large">{profile.user.name}</h1>
      <p class="lead"> {profile.status} {profile.company ? <span> at {profile.company} </span> :null} </p>
      <p>{profile.location}</p>
      <div class="icons my-1">
        <a href={profile.websit} target="_blank" rel="noopener noreferrer">
          <i class="fas fa-globe fa-2x"></i>
        </a>
        <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-twitter fa-2x"></i>
        </a>
        <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-facebook fa-2x"></i>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin fa-2x"></i>
        </a>
        <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-youtube fa-2x"></i>
        </a>
        <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default ProfileTop;
