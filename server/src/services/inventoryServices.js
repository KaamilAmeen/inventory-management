const inventoryServices =  require('../repositories/inventoryRepositories');

async function getAllInventoryItems() {
    return await inventoryServices.getAllInventoryItems();
}

async function addInventoryItems(name, quantity, price) {
    return await inventoryServices. addInventoryItems(name, quantity, price);
}
async function updateInventoryItem(id, name, quantity, price) {
    return await inventoryServices.updateInventoryItem(id, name, quantity, price);
}
async function getInventoryProducts(id){
    return await inventoryServices.getInventoryProducts(id);
}

module.export = {
    getAllInventoryItems, addInventoryItems, updateInventoryItem, getInventoryProducts
};