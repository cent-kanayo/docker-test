const { Router } = require("express");
const protect = require("../middleware/authsession");

const {
  getAllPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");

const router = Router();

router.route("/").get(getAllPost).post(createPost);

router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);

module.exports = router;
