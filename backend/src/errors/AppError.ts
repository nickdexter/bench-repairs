export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string;

    constructor(message: string, statusCode: number, errorCode: string = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;

        // Maintains proper stack trace for where the error was thrown (Node.js specific)
        Error.captureStackTrace(this, this.constructor);
    }
}