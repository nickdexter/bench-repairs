import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { sendSuccess } from "../utils/response.js";
import { parseIdParam } from "../utils/validators.js";
import { AppError } from "../errors/AppError.js";

export const getRepairParts = async (req: Request<{ repairId: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.repairId);
    const repairParts = await db.any('SELECT * FROM repair_parts WHERE repair_id = $1', [repairId]);

    sendSuccess(res, repairParts, 200);
}

export const getRepairPart = async (req: Request<{ id: string, repairId: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.repairId);
    const partId = parseIdParam(req.params.id);

    const repairPart = await db.oneOrNone('SELECT * FROM repair_parts WHERE repair_id = $1 AND id = $2', [repairId, partId]);
    if (!repairPart) {
        throw new AppError('Repair part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, repairPart, 200);
}

export const createRepairPart = async (req: Request<{ repairId: string }>, res: Response): Promise<void> => {
    const { quantity_used } = req.body;
    const repairId = parseIdParam(req.params.repairId);
    const partId = parseIdParam(req.body.partId);


    const query = `
        INSERT INTO repair_parts (repair_id, part_id, quantity_used) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const newRepairPart = await db.one(query, [repairId, partId, quantity_used]);

    sendSuccess(res, newRepairPart, 201);
}

export const updateRepairPart = async (req: Request<{ id: string, repairId: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.repairId);
    const repairPartId = parseIdParam(req.params.id);
    const { quantity_used } = req.body;

    const query = `
        UPDATE repair_parts
        SET quantity_used = COALESCE($1, quantity_used)
        WHERE id = $2 AND repair_id = $3
        RETURNING *;
        `;
    const updatedRepairPart = await db.oneOrNone(query, [quantity_used, repairPartId, repairId]);

    if (!updatedRepairPart) {
        throw new AppError('Repair part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedRepairPart, 200);
}

export const deleteRepairPart = async (req: Request<{ id: string, repairId: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.repairId);
    const repairPartId = parseIdParam(req.params.id);

    const query = `
        DELETE FROM repair_parts
        WHERE id = $1 AND repair_id = $2
        RETURNING *;
        `;
    const deletedRepairPart = await db.oneOrNone(query, [repairPartId, repairId]);

    if (!deletedRepairPart) {
        throw new AppError('Repair part not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, deletedRepairPart, 200);
}
