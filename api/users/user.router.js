const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
} = require("./user.controller");
router.get("/allusers", checkToken, getUsers);
router.post("/create", createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.put("/update/:id", checkToken, updateUsers);
router.delete("/:id", checkToken, deleteUser);

module.exports = router;
