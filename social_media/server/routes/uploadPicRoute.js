const router = require("express").Router();

const { uploadProfilePic } = require("../controllers/uploadPic");

router.route("/").post(uploadProfilePic);

module.exports = router