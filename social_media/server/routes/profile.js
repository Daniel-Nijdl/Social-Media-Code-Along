const { getProfile, getUserPosts } = require("../controllers/profile");

const router = require("express").Router();

router.route("/:username").get(getProfile);
router.route("/posts/:username").get(getUserPosts)

module.exports = router;
