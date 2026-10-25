import { db } from "../config/db.js";
import { sendSuccess } from "../utils/response.js";
import { type Request, type Response } from 'express';
import { parseIdParam } from "../utils/validators.js";
import { AppError } from "../errors/AppError.js";

export const getDevices = async (req: Request, res: Response): Promise<void> => {
    const parts = await db.any('SELECT * FROM devices');

    sendSuccess(res, parts, 200);
}

export const getDevice = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const deviceId = parseIdParam(req.params.id);
    const device = await db.oneOrNone('SELECT * FROM devices WHERE id = $1', [deviceId]);

    if (!device) {
        throw new AppError('Device not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, device, 200);
}

export const createDevice = async (req: Request, res: Response): Promise<void> => {
    const { name, category, serial_number, status, purchase_price, sold_price } = req.body;

    const query = `
      INSERT INTO devices (name, category, serial_number, status, purchase_price, sold_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, category, serial_number, status, purchase_price, sold_price]

    const newDevice = await db.one(query, values);

    sendSuccess(res, newDevice, 201);
}

export const updateDevice = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const deviceId = parseIdParam(req.params.id);
    const { name, category, serial_number, status, purchase_price, sold_price } = req.body;

    const query = `
        UPDATE devices
        SET name = COALESCE($1, name),
            category = COALESCE($2, category),
            serial_number = COALESCE($3, serial_number),
            status = COALESCE($4, status),
            purchase_price = COALESCE($5, purchase_price),
            sold_price = COALESCE($6, sold_price)
        WHERE id = $7
        RETURNING *;
    `;
    const values = [name, category, serial_number, status, purchase_price, sold_price, deviceId];

    const updatedDevice = await db.oneOrNone(query, values);

    if (!updatedDevice) {
        throw new AppError('Device not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, updatedDevice, 204);
}

export const deleteDevice = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const deviceId = parseIdParam(req.params.id);
    const deletedDevice = await db.oneOrNone('DELETE FROM devices WHERE id = $1 RETURNING *', [deviceId]);

    if (!deletedDevice) {
        throw new AppError('Device not found', 404, 'NOT_FOUND');
    }

    sendSuccess(res, deletedDevice, 200);
}