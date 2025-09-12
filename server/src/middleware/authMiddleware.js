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

module.exports = {
    generateToken,
    verifyToken
}