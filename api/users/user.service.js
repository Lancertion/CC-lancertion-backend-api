const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into account(fullName, email, password, number) 
                values(?,?,?,?)`,
      [data.full_name, data.email, data.password, data.number],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  checkEmailExists: (email, callback) => {
    // Perform a database query to check if the email exists
    pool.query(
      "SELECT COUNT(*) AS count FROM account WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          return callback(error);
        }

        const count = results[0].count;
        const emailExists = count > 0;
        callback(null, emailExists);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from account where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,fullName,email,number from account where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `select id,fullName,email,number from account`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update account set fullName=?, email=?, password=?, number=? where id = ?`,
      [data.full_name, data.email, data.password, data.number, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (id, callBack) => {
    pool.query(
      `delete from account where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
