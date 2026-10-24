import { type Response } from 'express';

/**
 * Sends a standardized success response following the Envelope Pattern.
 */
export const sendSuccess = <T>(res: Response, data: T, statusCode: number = 200): void => {
    res.status(statusCode).json({
        success: true,
        data,
    });
};