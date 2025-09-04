const inventoryRepo =  require('../repositories/inventoryRepositories');

async function getAllInventoryItems() {
    
    const rows=await inventoryRepo.getAllInventoryItems();
    return rows[0];
}

async function addInventoryItems(name, quantity, price) {
    return await inventoryRepo. addInventoryItems(name, quantity, price);
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