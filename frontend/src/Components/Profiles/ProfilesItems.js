import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProfilesItems = ({
    profile: {
      user: { _id, name },
      image,
      status,
      company,
      location,
      skills
    }
  }) => {
    const { user}=useSelector(state=>state.authReducer)
    const { isAuthenticated }=useSelector(state=>state.authReducer)

  return (
    <div className='profile bg-light'>
     {image?<img  alt='' src={image} className='round-img' />:<img  alt='' src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' className='round-img' />}
    
    <div>
      <h2>{name}</h2>
      <p>
        {status} {company && <span> at {company}</span>}
      </p>
      <p className='my-1'>{location && <span>{location}</span>}</p>
      {isAuthenticated?(<Link to={`/profile/${_id}`} className='btn btn-primary'>
        View Profile
      </Link>):(null)}
      {/* {user?.role==="admin"?<>
      <Link className='btn btn-primary'>Send mail</Link>
      <Link className='btn btn-danger'>Delete account</Link>
      </>:null} */}
    </div>
    <ul>
      {skills.slice(0, 4).map((skill, index) => (
        <li key={index} className='text-primary'>
          <i className='fas fa-check' /> {skill}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default ProfilesItems