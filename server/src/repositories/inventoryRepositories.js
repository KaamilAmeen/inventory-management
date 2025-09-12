const pool = require('../config/db');

async function getAllInventoryItems() {
    pool.getConnection(); // Acquire a connection from the pool
    try{
    const query = "CALL Allinventory()"; // Your SQL query here
    const [rows] = await pool.query(query);
    return rows;
    } catch (error) {
        throw error; // Handle error appropriately
    }
    finally{
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity) {
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = "CALL InsertInventory(?,?,?,?,?);"; // Your SQL query here
        const [result] = await pool.query(query, [i_id, p_id, Owner_name, Hub_location, Quantity]);
        return result;
    } catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function updateInventoryItem(i_id,p_id,Owner_name,Quantity, Hub_location) {
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = "CALL UpdateInventory(?,?,?,?,?);"; 
        const [result] = await pool.query(query, [i_id,p_id,Owner_name,Quantity, Hub_location]);
        return result;
    }
    catch (error) { 
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function getInventoryProducts(i_id){
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = "CALL GetInventoryWithProducts(?);"; // Your SQL query here
        const [rows] = await pool.query(query, [i_id]);
        return rows;
    } catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function deleteInventoryItem(i_id,p_id){
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = "call DeleteInventory(?,?);"; // Your SQL query here
        const [result] = await pool.query(query, [i_id,p_id]);
        return result;
    }
    catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function getProductDetails() {
    try {
        const query = "CALL Allproduct();";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error){
        throw error;
    }
}

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
    getAllInventoryItems, addInventoryItems, updateInventoryItem, 
    getInventoryProducts, deleteInventoryItem, getProductDetails, 
    addAuthDetails, getUserByEmail // Export the function
};