const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middlwere/auth");
const Profile = require("../../model/Profile");

// get api/profile/me
// get current users profile
// access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );
    if (!profile) {
      res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("serveur error");
  }
});
// get api/profile
// create or update user profile
// access private
router.post(
  "/",
  auth,
  [
    body("status", "status is required").not().isEmpty(),
    body("skills", "skills is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      websit,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //build profile object
    const profilefields = {};
    profilefields.user = req.user.id;
    if (company) profilefields.company = company;
    if (websit) profilefields.websit = websit;
    if (location) profilefields.location = location;
    if (bio) profilefields.bio = bio;
    if (status) profilefields.status = status;
    if (githubusername) profilefields.githubusername = githubusername;
    if (skills) {
      profilefields.skills = skills.split(",").map((skill) => skill.trim());
    }
    console.log(profilefields.skills);
    //build social object
    profilefields.social = {};
    if (youtube) profilefields.social.youtube = youtube;
    if (facebook) profilefields.social.facebook = facebook;
    if (twitter) profilefields.social.twitter = twitter;
    if (instagram) profilefields.social.instagram = instagram;
    if (linkedin) profilefields.social.linkedin = linkedin;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profilefields);
      await profile.save();
      res.json(profile);
      //
    } catch (error) {
      console.error(error.message);
      res.status(500).send("serveur error");
    }
  }
);
// get api/profile
// get all profiles
// access public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
// get api/profile/user/:user_id
// get profile by user id
// access public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);
    if (!profile) return res.status(400).json({ msg: "profile not found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
// delete api/profile
// delete profile,user and post
// access private
router.delete("/", auth, async (req, res) => {
  try {
    //remove user post

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await user.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
// put api/profile/experience
// add profile experience
// access private
router.put(
  "/",
  auth,
  [
    body("title", "title is required").not().isEmpty(),
    body("company", "company is required").not().isEmpty(),
    body("from", "from is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = { title, company, location, from, to, current, description };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("serveur error");
    }
  }
);
// delete api/profile/experience
// delete experience from profile
// access private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience
      .map((el) => el.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
// put api/profile/education
// add profile education
// access private
router.put(
  "/education",
  auth,
  [
    body("school", "school is required").not().isEmpty(),
    body("degree", "degree is required").not().isEmpty(),
    body("fieldofstudy", "field of study is required").not().isEmpty(),
    body("from", "from is required").not().isEmpty()
   
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("serveur error");
    }
  }
);
// delete api/profile/education
// delete education from profile
// access private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.education
      .map((el) => el.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
module.exports = router;
