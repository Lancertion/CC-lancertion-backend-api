const pool = require("../../config/database");
const { getUserIdFromToken } = require("../../auth/token_validation");

module.exports = {
  createCommunity: (data, callBack) => {
    pool.query(
      `insert into chat_rooms(name) 
                values(?)`,
      [data.name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  sendMessages: (data, roomId, userId, callBack) => {
    pool.query(
      `INSERT INTO messages (chat_room_id, user_id, content) VALUES (?, ?, ?)`,
      [roomId, userId, data.content],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMessageById: (roomId, callBack) => {
    pool.query(
      `SELECT m.content, m.id as message_id, u.id as user_id, u.fullName as pengirim FROM messages m INNER JOIN account u ON m.user_id = u.id WHERE m.chat_room_id = ?`,
      [roomId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  sendReply: (data, msgId, callBack) => {
    pool.query(
      `INSERT INTO replies (message_id, reply) VALUES (?, ?)`,
      [msgId, data.reply],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getReplies: (msgId, callBack) => {
    pool.query(
      `SELECT * FROM replies WHERE message_id = ?`,
      [msgId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateMessages: (data, msgId, callBack) => {
    pool.query(
      `update messages set content=? where id = ?`,
      [data.content, msgId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateReply: (data, replyId, callBack) => {
    pool.query(
      `update replies set reply=? where id = ?`,
      [data.reply, replyId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteMessages: (msgId, callBack) => {
    pool.query(
      `delete from messages where id = ?`,
      [msgId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteReply: (replyId, callBack) => {
    pool.query(
      `delete from replies where id = ?`,
      [replyId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
