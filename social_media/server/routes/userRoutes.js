const router = require("express").Router();

const {
  getUsernameAvailable,
  createUser,
  postLoginUser,
} = require("../controllers/user");

router.route("/signup").post(createUser);
router.route("/login").post(postLoginUser);
router.route("/:username").get(getUsernameAvailable);

module.exports = router;
