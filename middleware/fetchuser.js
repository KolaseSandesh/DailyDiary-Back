var jwt = require("jsonwebtoken");
const JWT_SECRET = "checkpayloadchangeornot";

const fetchuser = (req, res, next) => {
  //! Get the user from JWT Token and into req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      error: "Please Authenticalte a valid Token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error, "Error in fetchUserMiddleWare");
    res.status(401).send({
      error: "Please Authenticalte a valid Token",
    });
  }
};

module.exports = fetchuser;
