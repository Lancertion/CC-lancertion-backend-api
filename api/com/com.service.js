const pool = require("../../config/database");
const { getUserIdFromToken } = require("../../auth/token_validation");

module.exports = {
  // createCommunity: (data, callBack) => {
  //   pool.query(
  //     `insert into chat_rooms(name)
  //               values(?)`,
  //     [data.name],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results);
  //     }
  //   );
  // },
  sendPost: (data, userId, callBack) => {
    pool.query(
      `INSERT INTO post ( user_id, content) VALUES (?, ?)`,
      [userId, data.content],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPost: (callBack) => {
    pool.query(
      `SELECT p.content, p.id as post_id, p.tanggal, u.id as user_id, u.fullName as pengirim FROM post p INNER JOIN account u ON p.user_id = u.id`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatePost: (data, postId, callBack) => {
    pool.query(
      `update post set content=? where id = ?`,
      [data.content, postId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deletePost: (postId, callBack) => {
    pool.query(
      `delete from post where id = ?`,
      [postId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  sendComment: (data, postId, userId, callBack) => {
    pool.query(
      `INSERT INTO comment (post_id, user_id, comment) VALUES (?, ?, ?)`,
      [postId, userId, data.comment],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getComment: (postId, callBack) => {
    pool.query(
      `SELECT * FROM comment WHERE post_id = ?`,
      [postId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateComment: (data, commentId, callBack) => {
    pool.query(
      `update comment set comment=? where id = ?`,
      [data.comment, commentId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteComment: (commentId, callBack) => {
    pool.query(
      `delete from comment where id = ?`,
      [commentId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
