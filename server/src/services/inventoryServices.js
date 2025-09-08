const inventoryRepo =  require('../repositories/inventoryRepositories');

async function getAllInventoryItems() {
    
    const rows=await inventoryRepo.getAllInventoryItems();
    return rows[0];
}

async function addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity) {
    return await inventoryRepo. addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity);
}
async function updateInventoryItem(i_id,p_id,quantity, hub_location) {
    return await inventoryRepo.updateInventoryItem(i_id,p_id,quantity, hub_location);
}
async function getInventoryProducts(id){
    return await inventoryRepo.getInventoryProducts(id);
}
async function deleteInventoryItem(i_id,p_id){
    return await inventoryRepo.deleteInventoryItem(i_id,p_id);
}

module.exports = {
    getAllInventoryItems, addInventoryItems, updateInventoryItem, getInventoryProducts, deleteInventoryItem
};