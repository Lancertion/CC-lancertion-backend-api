const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  // createCommunity,
  sendPost,
  getPost,
  updatePost,
  deletePost,
  sendComment,
  getComment,
  updateComment,
  deleteComment,
} = require("./com.controller");
// router.post("/createRoom", createCommunity);
router.post("/post", checkToken, sendPost);
router.get("/post", checkToken, getPost);
router.put("/updatePost/:postId", checkToken, updatePost);
router.delete("/deletePost/:postId", checkToken, deletePost);
router.post("/post/:postId/comment", checkToken, sendComment);
router.get("/post/:postId/comment", checkToken, getComment);
router.put("/updateComment/:commentId", checkToken, updateComment);
router.delete("/deleteComment/:commentId", checkToken, deleteComment);

module.exports = router;
