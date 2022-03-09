const {
  getChats,
  getUserInfo,
  deleteChat,
} = require("../controllers/messages");

const router = require("express").Router();

router.route("/").get(getChats);
router.route("/user/:userToFindId").get(getUserInfo);
router.route("/:messagesWith").delete(deleteChat);

module.exports = router;
