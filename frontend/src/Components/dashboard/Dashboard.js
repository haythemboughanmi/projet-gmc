import React,{Fragment, useEffect} from 'react'
import { deleteAccount, getCurrentProfile } from '../../redux/actions/profileAction'
import { useDispatch,useSelector} from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const { user}=useSelector(state=>state.authReducer)
  const { loading }=useSelector(state=>state.profileReducer)
  const { profile }=useSelector(state=>state.profileReducer)
console.log(profile)
console.log(user)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCurrentProfile())
  },[dispatch])
  return (
    <div className='container'>
{loading&&profile===null?<Spinner/>:<Fragment>
  <h1 className="large text-primary">Dashboard</h1>
  <p className='lead'>
    <i className='fas fa-user'></i>  Welcome {user?.name} </p>
  {profile !==null ?(
    <Fragment>
      <DashboardAction/>
      <Experience experience={profile?.experience} />
      <Education education={profile?.education}/>
      <div className='my-2'> <button onClick={()=>dispatch(deleteAccount())} className='btn btn-danger'>
      <i className='fas fa-user-minus'></i>Delete My Account  
      </button> </div>
      </Fragment>
  ):(
    <Fragment><p>You have not yet setup a profile, please add some info</p>
    <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>

    </Fragment>
  )}
  </Fragment>}



    </div>
    
  )
}

export default Dashboard