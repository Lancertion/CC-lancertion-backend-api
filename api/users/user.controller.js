const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  checkEmailExists,
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  // createUser: (req, res) => {
  //   const body = req.body;
  //   const salt = genSaltSync(10);
  //   body.password = hashSync(body.password, salt);
  //   create(body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: 0,
  //         message: "Database connection errror",
  //       });
  //     }
  //     return res.status(200).json({
  //       success: 1,
  //       data: results,
  //     });
  //   });
  // },
  createUser: (req, res) => {
    const body = req.body;

    // Check if email is provided and not null
    if (!body.email) {
      return res.status(400).json({ error: "Email is required." });
    }

    if (!body.password) {
      return res.status(400).json({ error: "password is required." });
    }

    if (!body.full_name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    // Check if email already exists
    checkEmailExists(body.email, (err, emailExists) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      if (emailExists) {
        return res.status(409).json({ error: "Email already exists." });
      }

      create(body, (err, results) => {
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
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe123", {
          expiresIn: "1d",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  updateUsers: (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, id, (err, results) => {
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
  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
