const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY;

function generateToken(payload){
    return jwt.sign(payload, secretKey, {expiresIn:30});
}

function verifyToken(token){
    try {
        return jwt.verify(token, secretKey)
    } catch(error){
        return null;
    }
}

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = {
    generateToken,
    verifyToken,
    protect
}