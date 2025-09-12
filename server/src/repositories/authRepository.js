const pool = require('../config/db');

async function addAuthDetails(username,email, password, roleId){
    pool.getConnection();
    try {
        const query = "CALL InsertAuthDetails(?,?,?,?)";
        const [result] = await pool.query(query, [username, email, password, roleId]);
        return result;
    } catch (error){
        throw error;
    }
    finally{
        pool.releaseConnection();
    }
}

async function getUserByEmail(email){
    try {
        const query = "CALL getUserByEmail(?)";
        const [rows] = await pool.query(query, [email])
        return rows;
    } catch(error){
        throw error;
    }
}

module.exports = {
    addAuthDetails, getUserByEmail
}