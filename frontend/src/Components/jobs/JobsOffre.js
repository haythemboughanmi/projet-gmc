


import React from "react";
import { Link } from "react-router-dom";
const JobsOffre = () => {
    return  <div >
        <div className="photo">
        <div className="jobs">
    <h2 ><strong className="large text-primary">jobs offer:  </strong>Frontend Developer</h2>
    <h3> 
    <em >bio of the job:</em>
    </h3>
    <h3>
    <em>skills: </em>  JavaScript,CSS,html,React
    </h3>
    <h3>
    <em>location: </em> Ariena
  </h3>
  <h3> <em> The number required to work:</em>3</h3>
  <Link className='btn btn-primary'>Post offre</Link>
      
  </div>
  <div className="jobs">
    <h2 ><strong className="large text-primary">jobs offer:  </strong>Backend Developer</h2>
    <h3> 
    <em >bio of the job:</em>
    </h3>
    <h3>
    <em>skills: </em>  node.js,Express,mongoodb
    </h3>
    <h3>
    <em>location: </em> tunis
  </h3>
  <h3> <em> The number required to work:</em>2</h3>
  <Link className='btn btn-primary'>Post offre</Link>
      
  </div>
  <div className="jobs">
    <h2 ><strong className="large text-primary">jobs offer:  </strong>stagiaire</h2>
    <h3> 
    <em >bio of the job:</em>
    </h3>
    <h3>
    <em>skills: </em> java,SpringBoot,MySql
    </h3>
    <h3>
    <em>location: </em> medinine
  </h3>
  <h3> <em> The number required to work:</em>1</h3>
  <Link className='btn btn-primary'>Post offre</Link>
      
  </div>
  <Link className='btn btn-light'>Back Profile</Link>
  </div>
  </div>
}
export default  JobsOffre
