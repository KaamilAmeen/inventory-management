const authRepo = require('../repositories/authRepository')

async function addAuthDetails(username, email,password, roleId) {
    return await authRepo.addAuthDetails(username, email,password, roleId);
}
async function loginUser(email, password){
    const user = await authRepo.getUserByEmail(email)
    if (!user){
        throw new Error("Invalid Username or Password");
    }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Password");

        const token = jwt.sign({id: user.user_id, role: user.role_id}, process.env.SECRET_KEY, {expires: 30});
        return {
            token,
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role_id
            }
        }   
}

module.exports = {
    loginUser, addAuthDetails
}