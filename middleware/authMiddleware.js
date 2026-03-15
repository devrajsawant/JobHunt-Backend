const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token; // READ FROM COOKIE

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
