import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../errors/AppError.js";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
    const message = err.message || "Internal Server Error";

    // Log the full stack trace for debugging (avoid in production logs if sensitive)
    console.error(err.stack);

    // Send a structured JSON error response to the client
    res.status(statusCode).json({
        success: false,
        error: {
            code: errorCode,
            message,
        }
    });
};