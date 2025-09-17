const authRepo = require('../repositories/authRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function addAuthDetails(username, email,password, roleId) {
    return await authRepo.addAuthDetails(username, email,password, roleId);
}
async function loginUser(email, password){
    const users = await authRepo.getUserByEmail(email)
    const user = users[0];
    if (!user){
        throw new Error("Invalid Username or Password");
    }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Password");
        const token = jwt.sign({id: user.id, role: user.roleId}, process.env.SECRET_KEY, {expiresIn: 30});
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.roleId
            }
        }   
}

module.exports = {
    loginUser, addAuthDetails
}