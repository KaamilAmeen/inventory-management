const inventoryRepo =  require('../repositories/inventoryRepositories');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function getAllInventoryItems() {
    
    const rows=await inventoryRepo.getAllInventoryItems();
    return rows[0];
}

async function addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity) {
    return await inventoryRepo. addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity);
}
async function updateInventoryItem(i_id,p_id,Owner_name,Quantity, Hub_location) {
    return await inventoryRepo.updateInventoryItem(i_id,p_id,Owner_name,Quantity, Hub_location);
}
async function getInventoryProducts(i_id){
    return await inventoryRepo.getInventoryProducts(i_id);
}
async function deleteInventoryItem(i_id,p_id){
    return await inventoryRepo.deleteInventoryItem(i_id,p_id);
}

async function getProductDetails() {
    return await inventoryRepo.getProductDetails();
}

module.exports = {
    getAllInventoryItems, addInventoryItems, updateInventoryItem, 
    getInventoryProducts, deleteInventoryItem, getProductDetails, 
    addAuthDetails, loginUser
};