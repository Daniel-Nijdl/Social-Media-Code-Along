const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  getLikes,
  createComment,
  deleteComment,
} = require("../controllers/posts");

router.route("/").post(createPost).get(getAllPosts);
router.route("/:postId").get(getPostById).delete(deletePost);
router.route("/likes/:postId").post(likePost).put(unlikePost).get(getLikes);
router.route("/comments/:postId").post(createComment)
router.route("/comments/:postId/:commentId").delete(deleteComment)

module.exports = router;
