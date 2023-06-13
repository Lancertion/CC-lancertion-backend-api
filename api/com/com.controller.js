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

module.exports = {
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
    const roomId = req.params.roomId;
    sendMessages(body, roomId, (err, results) => {
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
