const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createCommunity,
  sendMessages,
  getMessageById,
  sendReply,
  getReplies,
  updateMessages,
  updateReply,
  deleteMessages,
  deleteReply,
} = require("./com.controller");
router.post("/createRoom", createCommunity);
router.post("/:roomId/messages", checkToken, sendMessages);
router.get("/:roomId/messages", checkToken, getMessageById);
router.post("/:roomId/messages/:msgId/reply", checkToken, sendReply);
router.get("/:roomId/messages/:msgId/reply", checkToken, getReplies);
router.put("/updateMessages/:msgId", checkToken, updateMessages);
router.put("/updateReply/:replyId", checkToken, updateReply);
router.delete("/deleteMessages/:msgId", checkToken, deleteMessages);
router.delete("/deleteReply/:replyId", checkToken, deleteReply);

module.exports = router;
