const { searchUsers } = require("../controllers/search");
const { authMiddleware } = require("../middleware/auth");

const router = require("express").Router();

router.route('/:searchText').get(authMiddleware, searchUsers);

module.exports = router;