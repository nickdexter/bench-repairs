import { type Request, type Response } from 'express';
import { db } from '../config/db.js';

export const getParts = async (req: Request, res: Response): Promise<void> => {
    try {
        const parts = await db.any('SELECT * FROM parts ORDER BY name DESC');
        res.status(200).json(parts);
    } catch (err) {
        console.error('Error fetching parts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createPart = async (req: Request, res: Response): Promise<void> => {
    const { name, sku, quantity, min_stock, location } = req.body;

    try {
        const query = `
      INSERT INTO parts (name, sku, quantity, min_stock, location)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const values = [name, sku, quantity || 0, min_stock || 0, location];
        const result = await db.one(query, values);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating part:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};