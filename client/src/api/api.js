import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend will run here
});

// GET all items
export const getItems = () => API.get("/items");

// VIEW single inventory item
const getInventoryById = (id) => API.get(`/list/${id}`);

// UPDATE item
export const updateItem = (id, item) => API.put(`/items/${id}`, item);

// DELETE item
export const deleteItem = (id) => API.delete(`/items/${id}`);

// VIEW single item
export const getItemById = (id) => API.get(`/items/${id}`);
