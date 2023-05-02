import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getGithybRepos } from "../../redux/actions/profileAction";
import { useSelector, useDispatch } from "react-redux";

const ProfileGithub = () => {
  const dispatch = useDispatch();
  const { profile} = useSelector((state) => state.profileReducer);
  const username = profile.githubusername;
  const { repos} = useSelector((state) => state.profileReducer);
  console.log(repos)
  useEffect(() => {
    dispatch(getGithybRepos(username));
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 1) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, [dispatch]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos?.map((repo) => 
        
        <div key={repo?._id} className="repos bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo?.html_url} target="_blank" rel="noopener noreferrer">
                {repo?.name}
              </a>
            </h4>
            <p>{repo?.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">
                Stars: {repo?.stargazers_count}
              </li>
              <li className="badge badge-dark">
                Watchers: {repo?.watchers_count}
              </li>
              <li className="badge badge-light">Forks: {repo?.forks_count}</li>
            </ul>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default ProfileGithub;
