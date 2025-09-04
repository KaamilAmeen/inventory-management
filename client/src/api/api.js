import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/inventory", // backend will run here
});

// GET all inventory
const getInventory = () => API.get("/list");

// VIEW single inventory item
const getInventoryById = (id) => API.get(`/list/${id}`);

// ADD new inventory item (with id)
const addInventory = (item) => API.post('/new', item);

// UPDATE inventory item
const updateInventory = (invId, prodId, item) => API.put(`/update/${invId}/${prodId}`, item);

// DELETE inventory item
const deleteInventory = (id) => API.delete(`/delete/${id}`);

// Export all API functions as a single object
const inventoryAPI = {
  getInventory,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
};

export default inventoryAPI;
