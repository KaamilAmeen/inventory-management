const pool = require('../db');

async function getAllInventoryItems() {
    pool.getConnection(); // Acquire a connection from the pool
    try{
    const [rows] = await pool.query(""); // Your SQL query here
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
        const [result] = await pool.query("", [name, quantity, price]);
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
        const [result] = await pool.query("", [name, quantity, price, id]);
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
        const [rows] = await pool.query("", [id]);
        return rows;
    } catch (error) {
        throw error; // Handle error appropriately
    }
    finally {
        pool.releaseConnection(); // Release the connection back to the pool
    }
}

module.export = { 
    getAllInventoryItems, addInventoryItems, updateInventoryItem, getInventoryProducts// Export the function
};