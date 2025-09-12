const authService = require('../services/authService');

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Email and Password is Invalid"});
        }
        const result = await authService.loginUser(email, password);
        res.status(200).json({
            message: "Login Sucessful",
            token: result.token,
            user: result.user
        })
    } catch (error) {
        res.status(401).json({message: "Server Error"})
    }

}

module.exports = {
    login
}