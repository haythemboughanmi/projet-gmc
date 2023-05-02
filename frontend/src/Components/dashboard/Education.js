import React from "react";
import Moment from "react-moment";
import { deleteEducation } from "../../redux/actions/profileAction";
import { useDispatch,useSelector } from "react-redux";
const Education = ({education}) => { 
//   const { profile }=useSelector(state=>state.profileReducer)
// const  education=profile?.education
  const dispatch=useDispatch()
  console.log(education)
    const educations=education?.map((edu)=>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{
                    edu.to===null ?('Now') :(<Moment format="YYYY/MM/DD">{edu.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={()=>dispatch(deleteEducation())} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

export default Education;
