const {
  sendPost,
  getPost,
  updatePost,
  deletePost,
  sendComment,
  getComment,
  updateComment,
  deleteComment,
} = require("./com.service");
const { getUserIdFromToken } = require("../../auth/token_validation");
const jwt = require("jsonwebtoken");
module.exports = {
  sendPost: (req, res) => {
    const body = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Token not provided." });
    }

    if (!body.content) {
      return res.status(400).json({ error: "content tidak boleh kosong." });
    }

    const decodedToken = jwt.decode(token); // Decode the token payload
    if (!decodedToken || !decodedToken.result || !decodedToken.result.id) {
      return res.status(401).json({ error: "Invalid token." });
    }

    const userId = decodedToken.result.id;

    sendPost(body, userId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getPost: (req, res) => {
    getPost((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updatePost: (req, res) => {
    const body = req.body;
    const postId = req.params.postId;
    if (!body.content) {
      return res.status(400).json({ error: "content tidak boleh kosong." });
    }
    updatePost(body, postId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deletePost: (req, res) => {
    const postId = req.params.postId;
    deletePost(postId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Post deleted successfully",
      });
    });
  },
  sendComment: (req, res) => {
    const body = req.body;
    const postId = req.params.postId;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Token not provided." });
    }

    if (!body.comment) {
      return res.status(400).json({ error: "comment tidak boleh kosong." });
    }

    const decodedToken = jwt.decode(token); // Decode the token payload
    if (!decodedToken || !decodedToken.result || !decodedToken.result.id) {
      return res.status(401).json({ error: "Invalid token." });
    }

    const userId = decodedToken.result.id;

    sendComment(body, postId, userId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getComment: (req, res) => {
    const postId = req.params.postId;
    getComment(postId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateComment: (req, res) => {
    const body = req.body;
    const commentId = req.params.commentId;
    if (!body.comment) {
      return res.status(400).json({ error: "comment tidak boleh kosong." });
    }
    updateComment(body, commentId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },

  deleteComment: (req, res) => {
    const commentId = req.params.commentId;
    deleteComment(commentId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Comment deleted successfully",
      });
    });
  },
};
