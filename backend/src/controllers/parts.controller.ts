import { type NextFunction, type Request, type Response } from 'express';
import { db } from '../config/db.js';
import { AppError } from '../errors/AppError.js';
import { parseIdParam } from '../utils/validators.js';
import { sendSuccess } from '../utils/response.js';

export const getParts = async (req: Request, res: Response): Promise<void> => {
    const parts = await db.any('SELECT * FROM parts ORDER BY name DESC');
    sendSuccess(res, parts, 200);
};

export const getPart = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const partId = parseIdParam(req.params.id);

    const query: string = 'SELECT * FROM parts WHERE id = $1';
    const part = await db.one(query, [partId]);

    if (!part) {
        throw new AppError('Part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, part, 200);
};

export const createPart = async (req: Request, res: Response): Promise<void> => {
    const { name, quantity, cost } = req.body;

    const query = `
      INSERT INTO parts (name, quantity, cost)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const newPart = await db.one(query, [name, quantity, cost]);

    sendSuccess(res, newPart, 201);
};

export const updatePart = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const partId = parseIdParam(req.params.id);

    const { name, quantity, cost } = req.body;

    // TODO: update to allow single parameters to be sent and updated?
    const query = `
        UPDATE parts
        SET name = $1, quantity = $2, cost = $3
        WHERE id = $4
        RETURNING *;
    `;

    const updatedPart = await db.oneOrNone(query, [name, quantity, cost, partId]);

    if (!updatedPart) {
        throw new AppError('Part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedPart, 200);
}

export const updatePartStock = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const partId = parseIdParam(req.params.id);

    const { quantity } = req.body;

    const query = `
        UPDATE parts
        SET quantity = $1
        WHERE id = $2
        RETURNING *;
    `;

    const updatedPart = await db.oneOrNone(query, [quantity, partId]);

    if (!updatedPart) {
        throw new AppError('Part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedPart, 200);
}

export const deletePart = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const partId = parseIdParam(req.params.id);

    const query = 'DELETE FROM parts WHERE id = $1 RETURNING *';
    const deletedPart = await db.oneOrNone(query, [partId]);

    if (!deletedPart) {
        throw new AppError('Part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, deletedPart, 200);


}