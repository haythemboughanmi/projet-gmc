import React from "react";
import Moment from "react-moment";
import { deleteExperience } from "../../redux/actions/profileAction";
import { useDispatch,useSelector } from "react-redux";
const Experience = ({experience}) => {
  // const { profile }=useSelector(state=>state.profileReducer)
  // const experience=profile.experience
  // console.log(profile)
  const dispatch=useDispatch()
    const experiences=experience?.map((exp)=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{
                    exp.to===null ?('Now') :(<Moment format="YYYY/MM/DD">{exp.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={()=>dispatch(deleteExperience(exp._id))} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

export default Experience;
