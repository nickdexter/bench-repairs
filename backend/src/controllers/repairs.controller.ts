import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { sendSuccess } from "../utils/response.js";
import { parseIdParam } from "../utils/validators.js";
import { AppError } from "../errors/AppError.js";

export const getRepairs = async (req: Request, res: Response): Promise<void> => {
    const repairs = await db.any('SELECT * FROM repairs');

    sendSuccess(res, repairs, 200);
}

export const getRepair = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.id);

    const repair = await db.oneOrNone('SELECT * FROM repairs WHERE id = $1', [repairId]);
    if (!repair) {
        throw new AppError('Repair not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, repair, 200);
}

export const createRepair = async (req: Request, res: Response): Promise<void> => {
    const { device_id, description, status } = req.body;

    const query = `
        INSERT INTO repairs (device_id, description, status) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const newRepair = await db.one(query, [device_id, description, status]);

    sendSuccess(res, newRepair, 201);
}

export const updateRepair = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.id);
    const { description, status } = req.body;

    const query = `
        UPDATE repairs
        SET description = COALESCE($1, description),
            status = COALESCE($2, status)
        WHERE id = $3
        RETURNING *;
        `;
    const updatedRepair = await db.oneOrNone(query, [description, status, repairId]);

    if (!updatedRepair) {
        throw new AppError('Repair not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedRepair, 200);
}

export const deleteRepair = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.id);

    const query = `
        DELETE FROM repairs
        WHERE id = $1
        RETURNING *;
        `;
    const deletedRepair = await db.oneOrNone(query, [repairId]);

    if (!deletedRepair) {
        throw new AppError('Repair not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, deletedRepair, 200);
}
