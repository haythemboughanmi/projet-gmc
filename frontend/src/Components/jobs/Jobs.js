
import React from "react";
const Jobs = () => {
    return <div className="container">

        <h1 className="large text-primary">
            job & Internship offer 

        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Let's get some information
        </p>
        {/* <small>* = required field</small> */}
        <form className="form" >
            <div className="form-group">
                <select name="status">
                    <option value="0">* select job offer
                    </option>
                    <option value="Developer">Full-stack Developer</option>
                    <option value="Junior Developer">Frontend Developer</option>
                    <option value="Senior Developer">Backend Developer</option>
                    <option value="Manager">Manager</option>

                    <option value="Instructor">Electrical engineer
                    </option>
                    <option value="Intern">Designer</option>
                    <option value="Intern">stagiaire</option>

                </select>
                {/* <small className="form-text"
                >Give us an idea of where you are at in your career</small
                > */}
            </div>
            {/* <div className="form-group">
                <input type="text" placeholder="Company" name="company" />
                <small className="form-text"
                >Could be your own company or one you work for</small
                >
            </div> */}
            {/* <div className="form-group">
                <input type="text" placeholder="Website" name="website" />
                <small className="form-text"
                >Could be your own or a company website</small
                >
            </div> */}
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" />
                
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" />
                {/* <small className="form-text"
                >Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small
                > */}
            </div>
            <div className="form-group">
                <input type="text" placeholder="The number required to work " name="skills" />
                
            </div>
            {/* <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"

                />
                <small className="form-text"
                >If you want your latest repos and a Github link, include your
                    username</small
                >
            </div> */}
            <div className="form-group">
                <textarea placeholder="A short bio of the job" name="bio" ></textarea>
                {/* <small className="form-text">Tell us a little about yourself</small> */}
            </div>

            {/* <div className="my-2">
                <button type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
            </div> */}

            {/* <div>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" />
                </div>
            </div> */}



            {/* <input type="submit" className="btn btn-primary my-1" /> */}
            <a className="btn btn-primary my-1" href="dashboard.html">Add offre</a>
            <a className="btn btn-primary my-1" href="dashboard.html">Update offre</a>
            <a className="btn btn-danger my-1" href="dashboard.html">Delete offre</a>
        </form>


    </div>;

};

export default Jobs;
