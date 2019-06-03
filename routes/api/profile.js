const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

const { check, validationResult } = require("express-validator/check");

//@route /api/profile/me
//@desc  get personal profile
//@access public
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.person.id }).populate(
      // "User_from_Model",
      "user_id",
      ["name", "avatar"]
    );
    if (!profile) {
      console.log("Profile error");
      return res.status(400).json({
        msg: "Profile failed"
      });
    }
    console.log("API get personal profile: " + JSON.stringify(profile));
    console.log("profile user name" + profile.user_id.name);
    return res.json(profile);
  } catch (err) {
    return res.status(400).json({ msg: "Auth Failed" });
  }
});
router.post("/", auth, async (req, res) => {
  try {
    console.log("Profile post accessing");
    // console.log("Req object : " + JSON.stringify(req.body));
    // console.log("Req ALL : " + JSON.stringify(req));

    const company = req.body.company;
    const website = req.body.website;
    const location = req.body.location;
    const status = req.body.status;
    const skills = req.body.skills;
    const bio = req.body.bio;
    const githubusername = req.body.githubusername
      ? req.body.githubusername
      : null;
    const experience = req.body.experience ? req.body.experience : [];
    const education = req.body.education ? req.body.education : [];
    const social = req.body.social ? req.body.social : {};
    // console.log("Profile accessing 4");
    // console.log("EXPERIENCE:" + experience);
    const exp_title = experience.title;
    const exp_company = experience.company;
    const exp_location = experience.location;
    const exp_from = experience.from;
    const exp_to = experience.to;
    const exp_current = experience.current;
    const exp_description = experience.description;
    // console.log("Profile accessing 3");

    const edu_school = education.school;
    const edu_degree = education.degree;
    const edu_fieldOfStudy = education.fieldOfStudy;
    const edu_from = education.from;
    const edu_to = education.to;
    const edu_current = education.current;
    const edu_description = education.description;
    // console.log("Profile accessing 2");

    const facebook = req.body.facebook;
    const linkedin = req.body.linkedin;
    const youtube = req.body.youtube;
    const instagram = req.body.instagram;
    console.log("Profile accessing 1");
    const profileFields = {};
    profileFields.social = {};
    // console.log("REQ.USER: " + JSON.stringify(req.person));
    console.log("API profile post user_id: " + JSON.stringify(req.person.id));

    profileFields.user_id = req.person.id;
    console.log("User from post: " + JSON.stringify(profileFields.user_id));
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (status) {
      profileFields.status = status;
    }
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
      console.log("In skills: " + skills);
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    if (experience) {
      profileFields.experience = experience;
      // console.log("Experience: " + JSON.stringify(profileFields.experience));
    }
    if (education) {
      profileFields.education = education;
    }
    if (social) {
      profileFields.social = social;
    }
    //exp
    if (exp_title) {
      profileFields.experience.title = exp_title;
    }
    if (exp_company) {
      profileFields.experience.company = exp_company;
    }
    if (exp_location) {
      profileFields.experience.location = exp_location;
    }
    if (exp_from) {
      profileFields.experience.from = exp_from;
    }
    if (exp_to) {
      profileFields.experience.to = exp_to;
    }
    if (exp_current) {
      profileFields.experience.current = exp_current;
    }
    if (exp_description) {
      profileFields.experience.description = exp_description;
    }
    //edu
    if (edu_school) {
      profileFields.education.school = edu_school;
    }
    if (edu_degree) {
      profileFields.education.degree = edu_degree;
    }
    if (edu_fieldOfStudy) {
      profileFields.education.fieldOfStudy = edu_fieldOfStudy;
    }
    if (edu_from) {
      profileFields.education.from = edu_from;
    }
    if (edu_to) {
      profileFields.education.to = edu_to;
    }
    if (edu_current) {
      profileFields.education.current = edu_current;
    }
    if (edu_description) {
      profileFields.education.description = edu_description;
    }
    //social
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }
    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }
    console.log("skills:" + profileFields.skills);
    // console.log(profileFields.experience.company);
    // console.log(profileFields.experience.title);
    // console.log(profileFields.education.school);
    console.log("FACEBOOK:" + profileFields.social.facebook);

    // let profile = await Profile.findOne({ user: req.user.id });
    let profile = await Profile.findOne({ user_id: profileFields.user_id });

    if (profile) {
      console.log("Profile update ok");
      console.log(profile);

      profile = await Profile.findOneAndUpdate(
        { user_id: req.person.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    } else {
      console.log("Profile create ing");
      console.log("ProfileFields: " + JSON.stringify(profileFields));
      // console.log("profile: " + JSON.stringify(profile));
      profile = new Profile(
        profileFields
        // company,
        // website,
        // location,
        // status,
        // skills,
        // bio,
        // githubusername,
        // experience,
        // education,
        // social
      );
      console.log("===================");
      console.log(profile);
      await profile.save(err => {
        // console.log(err);
      });
      // console.log("Profile object: " + profile.education.fieldOfStudy);
      console.log("Profile create finished");

      return res.json(profile);
    }
    // res.send("Profile access correct");
  } catch (err) {
    console.log("some profile params are error");
    return res.status(400).json({ msg: "Profile post failed" });
  }
});

//GET /api/profiles
router.get("/", (req, res) => {
  console.log("begin to get all profiles");
  try {
    Profile.find()
      .populate("user_id", ["name", "avatar"])
      .exec({}, (err, users) => {
        var userMap = [];

        users.forEach(user => {
          console.log(
            "user profiles name:" + JSON.stringify(user.user_id.name)
          );

          // userMap[user._id] = user;
          userMap.push(user);
        });

        return res.json(userMap);
      }); //.populate("user", ["name", "avatar"]);
    // const profiles = await Profile.find()
    // profiles.
    console.log("Get profiles success by get method");
    // console.log("PROFILES:" + JSON.stringify(profile));
    // return res.json(profile);
  } catch (error) {
    console.log("Get failed profile");
    return res.status(400).json({ msg: "Get failed profile" });
  }
});

//GET profile/user/:user_id
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user_id: req.params.user_id
    }).populate("user_id", ["name", "avatar"]);
    if (!profile) {
      console.log("Not found profile by user id");
      return res.json({ msg: "Not found profile by user id" });
    } else {
      console.log("profile get success");
      return res.json(profile);
    }
  } catch (error) {
    console.log("Get failed profile");
    return res.status(400).json({ msg: "Get failed profile" });
  }
});

//delete profile/user by token ID
router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.person.id });
    await Profile.findOneAndRemove({ user_id: req.person.id });
    await User.findOneAndRemove({ _id: req.person.id });
    return res.json({ msg: "Delete succeed" });
  } catch (error) {
    console.log("Delete failed");
    return res.status(400).json({ msg: "Delete failed" });
  }
});

//put experience
router.put("/experience", auth, async (req, res) => {
  console.log("PERSON ID : " + req.person.id);
  const profile = await Profile.findOne({ user_id: req.person.id });
  console.log("PROFILE " + JSON.stringify(profile));
  const company = req.body.company;
  const location = req.body.location;
  const title = req.body.title;
  const from = req.body.from;
  const to = req.body.to;
  const current = req.body.current;
  const description = req.body.description;
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  try {
    if (!profile) {
      console.log("WRONG profile token id");
      return res.json({ msg: "WRONG profile token id" });
    } else {
      console.log("new experience object: " + JSON.stringify(newExperience));
      // profile.experience.push(newExperience);
      profile.experience.push(newExperience);

      console.log("NEW experience: " + JSON.stringify(profile.experience));
      await profile.save();
      return res.json(profile);
    }
  } catch (error) {
    console.log("PUT profile failed");
    return res.status(400).json({ msg: "PUT profile failed" });
  }
});

//delete /user/profile/experience/:exp_id
router.delete("/experience/:exp_id", auth, async (req, res) => {
  const profile = await Profile.findOne({ user_id: req.person.id });
  try {
    if (!profile) {
      console.log("NO profile");
      return res.json({ msg: "No profile" });
    } else {
      const remove_id = req.params.exp_id;
      let exp_arr = [];
      exp_arr = profile.experience.map(element => element.id);
      console.log(exp_arr);
      const remove_idx = exp_arr.indexOf(remove_id);
      console.log("REMove index: " + remove_idx);
      profile.experience.splice(remove_idx, 1);
      await profile.save();
      return res.json(profile);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Delete experience failed" });
  }
});

//put /profile/education
router.put("/education", auth, async (req, res) => {
  try {
    // console.log("education: user id: " + req.person.id);
    const profile = await Profile.findOne({ user_id: req.person.id });
    console.log("education:" + JSON.stringify(profile.education));
    const school = req.body.school;
    const degree = req.body.degree;
    const fieldOfStudy = req.body.fieldOfStudy;
    const from = req.body.from;
    const to = req.body.to;
    const current = req.body.current;
    const description = req.body.description;

    const newEducation = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };
    console.log("NEW education: " + JSON.stringify(newEducation));
    if (!profile) {
      console.log("NO profile");
      return res.json({ msg: "No profile" });
    } else {
      console.log("Begin to add education");
      profile.education.push(newEducation);
      await profile.save();
      return res.json(profile);
    }
  } catch (error) {
    console.log("Update education failed");
    return res.status(400).json({ msg: "update experience failed" });
  }
});

//delete education
router.delete("/education/:edu_id", auth, async (req, res) => {
  const profile = await Profile.findOne({ user_id: req.person.id });
  try {
    if (!profile) {
      console.log("NO profile");
      return res.json({ msg: "No profile" });
    } else {
      const remove_id = req.params.edu_id;
      let exp_arr = [];
      exp_arr = profile.education.map(element => element.id);
      console.log(exp_arr);
      const remove_idx = exp_arr.indexOf(remove_id);
      console.log("REMove index: " + remove_idx);
      profile.education.splice(remove_idx, 1);
      await profile.save();
      return res.json(profile);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Delete education failed" });
  }
});
module.exports = router;
