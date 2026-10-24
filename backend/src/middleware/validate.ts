
import { ZodObject, ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import type { NextFunction, Request, Response } from 'express';


export const validate = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Parse req.body asynchronously to support advanced Zod refinements if needed
        const result = await schema.safeParseAsync(req.body);

        if (!result.success) {
            const error = result.error;
            const message = error ? error.message : 'Validation failed';

            throw new AppError(message, 400, 'VALIDATION_ERROR');
        }

        // Replace req.body with the sanitized/parsed data (e.g. applied defaults, trims)
        req.body = result.data;

        next();
    };
};