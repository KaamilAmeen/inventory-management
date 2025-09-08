import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend server
});

// ✅ Inventory APIs

// GET all items
export const getItems = () => API.get("/inventory");

// GET single item by ID
export const getItemById = (id) => API.get(`/inventory/${id}`);

// ADD new item
export const addItem = (item) => API.post("/inventory", item);

// UPDATE item
export const updateItem = (id, item) => API.put(`/inventory/${id}`, item);

// DELETE item
export const deleteItem = (id) => API.delete(`/inventory/${id}`);

export default {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
