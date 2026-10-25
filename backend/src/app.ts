import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import partsRouter from './routes/parts.routes.js';
import devicesRouter from './routes/devices.routes.js';
import repairsRouter from './routes/repairs.routes.js';
import { db } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Health check endpoint with database connectivity check
app.get('/health', async (req: Request, res: Response) => {
    try {
        await db.one('SELECT 1');
        res.status(200).json({ status: 'healthy', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'unhealthy', database: 'disconnected', error });
    }
});

// API routes
app.use('/api/parts', partsRouter);
app.use('/api/devices', devicesRouter);
app.use('/api/repairs', repairsRouter);

// Global error handler
app.use(errorHandler);

export default app;