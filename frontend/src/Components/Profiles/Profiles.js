import React, { useEffect,Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfile } from "../../redux/actions/profileAction";
import ProfileItem from './ProfilesItems'
import Spinner from "../layout/Spinner";

const Profiles = () => {
  const { profiles } = useSelector((state) => state.profileReducer);
  const { loading } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getAllProfile())
  },[getAllProfile])

  return(
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profiles;
