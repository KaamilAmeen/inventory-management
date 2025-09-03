const inventoryRepo =  require('../repositories/inventoryRepositories');

async function getAllInventoryItems() {
    return await inventoryRepo.getAllInventoryItems();
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

module.export = {
    getAllInventoryItems, addInventoryItems, updateInventoryItem, getInventoryProducts, deleteInventoryItem
};