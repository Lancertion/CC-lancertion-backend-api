const {
  createCommunity,
  sendMessages,
  getMessageById,
  sendReply,
  getReplies,
  updateMessages,
  updateReply,
  deleteReply,
  deleteMessages,
} = require("./com.service");
const { getUserIdFromToken } = require("../../auth/token_validation");
const jwt = require("jsonwebtoken");
module.exports = {
  //   authenticateToken(req, res, next) {
  //     const authorizationHeader = req.headers.authorization;
  //     const token = authorizationHeader && authorizationHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"

  //     if (!token) {
  //       return res
  //         .status(401)
  //         .json({ error: "Authentication failed. Token not provided." });
  //     }

  //     const userId = getUserIdFromToken(token);
  //     if (!userId) {
  //       return res
  //         .status(401)
  //         .json({ error: "Authentication failed. Invalid token." });
  //     }

  //     req.id = userId;
  //     next();
  //   },

  createCommunity: (req, res) => {
    const body = req.body;
    createCommunity(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  sendMessages: (req, res) => {
    const body = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const roomId = req.params.roomId;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Token not provided." });
    }

    const decodedToken = jwt.decode(token); // Decode the token payload
    if (!decodedToken || !decodedToken.result || !decodedToken.result.id) {
      return res.status(401).json({ error: "Invalid token." });
    }

    const userId = decodedToken.result.id;

    sendMessages(body, roomId, userId, (err, results) => {
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

  getMessageById: (req, res) => {
    const roomId = req.params.roomId;
    getMessageById(roomId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  sendReply: (req, res) => {
    const body = req.body;
    const { roomId, msgId } = req.params;
    sendReply(body, msgId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getReplies: (req, res) => {
    const { roomId, msgId } = req.params;
    getReplies(msgId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateMessages: (req, res) => {
    const body = req.body;
    const { roomId, msgId } = req.params;
    updateMessages(body, msgId, (err, results) => {
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
  updateReply: (req, res) => {
    const body = req.body;
    const replyId = req.params.replyId;
    updateReply(body, replyId, (err, results) => {
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
  deleteMessages: (req, res) => {
    const msgId = req.params.msgId;
    deleteMessages(msgId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Messages deleted successfully",
      });
    });
  },
  deleteReply: (req, res) => {
    const replyId = req.params.replyId;
    deleteReply(replyId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Reply deleted successfully",
      });
    });
  },
};
