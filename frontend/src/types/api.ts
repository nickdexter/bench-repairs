export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        statusCode: string;
        errorCode: string;
    };
}