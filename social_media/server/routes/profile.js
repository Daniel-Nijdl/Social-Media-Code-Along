const { getProfile } = require("../controllers/profile");

const router = require("express").Router();

router.route("/:username").get(getProfile);

module.exports = router;
