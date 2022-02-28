const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("No User Found");
    }

    const profile = await ProfileModel.findOne({ user: user._id }).populate(
      "user"
    );

    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    return res.status(200).json({
      profile,
      followersLength:
        profileFollowStats.followers.length > 0
          ? profileFollowStats.followers.length
          : 0,
      followingLength:
        profileFollowStats.following.length > 0
          ? profileFollowStats.following.length
          : 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getProfile");
  }
};

const getUserPosts = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getUserPosts");
  }
};

const getFollowers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getFollowers");
  }
};

const getFollowing = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getFollowing");
  }
};

const followUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ followUser");
  }
};

const unfollowUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ unfollowUser");
  }
};

const updateProfile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ updateProfile");
  }
};

const updatePassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ updatePassword");
  }
};

module.exports = {
  getProfile,
  getUserPosts,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  updateProfile,
  updatePassword
};
