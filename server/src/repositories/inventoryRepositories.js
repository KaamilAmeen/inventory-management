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

async function addInventoryItems(name, quantity, price) {
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = ""; // Your SQL query here
        const [result] = await pool.query(query, [name, quantity, price]);
        return result;
    } catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function updateInventoryItem(id, name, quantity, price) {
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = ""; 
        const [result] = await pool.query(query, [name, quantity, price, id]);
        return result;
    }
    catch (error) { 
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function getInventoryProducts(id){
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = "CALL GetInventoryWithProducts(?);"; // Your SQL query here
        const [rows] = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

async function deleteInventoryItem(id) {
    pool.getConnection(); // Acquire a connection from the pool
    try {
        const query = ""; // Your SQL query here
        const [result] = await pool.query(query, [id]);
        return result;
    }
    catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

module.exports = { 
    getAllInventoryItems, addInventoryItems, updateInventoryItem, getInventoryProducts, deleteInventoryItem  // Export the function
};