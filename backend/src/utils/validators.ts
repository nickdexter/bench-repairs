import { AppError } from "../errors/AppError.js";

export const parseIdParam = (id: string): number => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        throw new AppError('Invalid ID format', 400, 'INVALID_ID');
    }
    return parsedId;
};