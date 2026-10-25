import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { sendSuccess } from "../utils/response.js";
import { parseIdParam } from "../utils/validators.js";
import { AppError } from "../errors/AppError.js";

export const getRepairIssues = async (req: Request, res: Response): Promise<void> => {
    const repairIssues = await db.any('SELECT * FROM repair_issues');

    sendSuccess(res, repairIssues, 200);
}

export const getRepairIssue = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairIssueId = parseIdParam(req.params.id);

    const repairIssue = await db.oneOrNone('SELECT * FROM repair_issues WHERE id = $1', [repairIssueId]);
    if (!repairIssue) {
        throw new AppError('Repair issue not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, repairIssue, 200);
}

export const createRepairIssue = async (req: Request<{ repairId: string }>, res: Response): Promise<void> => {
    const repairId = parseIdParam(req.params.repairId);
    const { description } = req.body;

    const query = `
        INSERT INTO repair_issues (repair_id, description) 
        VALUES ($1, $2) 
        RETURNING *;
    `;
    const newRepairIssue = await db.one(query, [repairId, description]);

    sendSuccess(res, newRepairIssue, 201);
}

export const updateRepairIssue = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairIssueId = parseIdParam(req.params.id);
    const { description, is_resolved } = req.body;

    const query = `
        UPDATE repair_issues
        SET description = COALESCE($1, description),
            is_resolved = COALESCE($2, is_resolved)
        WHERE id = $3
        RETURNING *;
        `;
    const updatedRepairIssue = await db.oneOrNone(query, [description, is_resolved, repairIssueId]);

    if (!updatedRepairIssue) {
        throw new AppError('Repair issue not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedRepairIssue, 200);
}

export const deleteRepairIssue = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const repairIssueId = parseIdParam(req.params.id);

    const query = `
        DELETE FROM repair_issues
        WHERE id = $1
        RETURNING *;
        `;
    const deletedRepairIssue = await db.oneOrNone(query, [repairIssueId]);

    if (!deletedRepairIssue) {
        throw new AppError('Repair issue not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, deletedRepairIssue, 200);
}
