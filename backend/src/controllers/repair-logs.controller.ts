import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { sendSuccess } from "../utils/response.js";
import { parseIdParam } from "../utils/validators.js";
import { AppError } from "../errors/AppError.js";

export const getRepairLogs = async (req: Request, res: Response): Promise<void> => {
    const repairLogs = await db.any('SELECT * FROM repair_logs');

    sendSuccess(res, repairLogs, 200);
}

export const getRepairLog = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairLogId = parseIdParam(req.params.id);

    const repairLog = await db.oneOrNone('SELECT * FROM repair_logs WHERE id = $1', [repairLogId]);
    if (!repairLog) {
        throw new AppError('Repair log not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, repairLog, 200);
}

export const createRepairLog = async (req: Request<{ repairId: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.repairId);
    const { content } = req.body;

    const query = `
        INSERT INTO repair_logs (repair_id, content) 
        VALUES ($1, $2) 
        RETURNING *;
    `;
    const newRepairLog = await db.one(query, [repairId, content]);

    sendSuccess(res, newRepairLog, 201);
}

export const updateRepairLog = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairLogId = parseIdParam(req.params.id);
    const { content } = req.body;

    const query = `
        UPDATE repair_logs
        SET content = COALESCE($1, content)
        WHERE id = $2
        RETURNING *;
        `;
    const updatedRepairLog = await db.oneOrNone(query, [content, repairLogId]);

    if (!updatedRepairLog) {
        throw new AppError('Repair log not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedRepairLog, 200);
}

export const deleteRepairLog = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairLogId = parseIdParam(req.params.id);

    const query = `
        DELETE FROM repair_logs
        WHERE id = $1
        RETURNING *;
        `;
    const deletedRepairLog = await db.oneOrNone(query, [repairLogId]);

    if (!deletedRepairLog) {
        throw new AppError('Repair log not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, deletedRepairLog, 200);
}
