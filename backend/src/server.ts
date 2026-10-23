import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import partsRouter from './routes/parts.routes.js';
import { db } from './config/db.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
app.use('/api/parts', partsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});