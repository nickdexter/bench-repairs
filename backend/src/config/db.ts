import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize pg-promise instance
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables.');
}

// Create the database connection instance
const db = pgp(connectionString);

export { db, pgp };