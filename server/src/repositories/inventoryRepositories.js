const db = require('../db'); // Assumes you have a db module for database connection

class InventoryRepository {
    async getAllItems() {
        const query = 'SELECT * FROM inventory';
        const result = await db.query(query);
        return result.rows;
    }

    async getItemById(id) {
        const query = 'SELECT * FROM inventory WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    async addItem(item) {
        const query = `
            INSERT INTO inventory (name, quantity, price)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [item.name, item.quantity, item.price];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async updateItem(id, item) {
        const query = `
            UPDATE inventory
            SET name = $1, quantity = $2, price = $3
            WHERE id = $4
            RETURNING *
        `;
        const values = [item.name, item.quantity, item.price, id];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async deleteItem(id) {
        const query = 'DELETE FROM inventory WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new InventoryRepository();