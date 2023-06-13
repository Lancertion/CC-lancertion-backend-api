const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, "qwe123", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token...",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },

  getUserIdFromToken: (token) => {
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, "qwe123");

      // Extract the user ID from the decoded token
      const userId = decoded.userId;

      return userId;
    } catch (error) {
      // Handle any errors during token verification or decoding
      console.error("Error decoding JWT:", error.message);
      return null;
    }
  },
};
