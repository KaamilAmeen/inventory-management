const inventoryRepo =  require('../repositories/inventoryRepositories');

async function getAllInventoryItems() {
    
    const rows=await inventoryRepo.getAllInventoryItems();
    return rows[0];
}

async function addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity) {
    return await inventoryRepo. addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity);
}
async function updateInventoryItem(id, name, quantity, price) {
    return await inventoryRepo.updateInventoryItem(id, name, quantity, price);
}
async function getInventoryProducts(id){
    return await inventoryRepo.getInventoryProducts(id);
}
async function deleteInventoryItem(id) {
    return await inventoryRepo.deleteInventoryItem(id);
}

module.exports = {
    getAllInventoryItems, addInventoryItems, updateInventoryItem, getInventoryProducts, deleteInventoryItem
};