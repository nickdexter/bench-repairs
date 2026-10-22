import { db } from '../config/db.js';

const createTables = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS parts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        unit_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        purchase_link VARCHAR(512)
    );

    CREATE TABLE IF NOT EXISTS devices (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        serial_number VARCHAR(100),
        status VARCHAR(50) NOT NULL DEFAULT 'acquired',
        purchase_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        sold_price DECIMAL(10, 2)
    );

    CREATE TABLE IF NOT EXISTS repairs (
        id SERIAL PRIMARY KEY,
        device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'queue',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS repair_issues (
        id SERIAL PRIMARY KEY,
        repair_id INTEGER REFERENCES repairs(id) ON DELETE CASCADE,
        description TEXT NOT NULL,
        is_resolved BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS repair_parts (
        id SERIAL PRIMARY KEY,
        repair_id INTEGER REFERENCES repairs(id) ON DELETE CASCADE,
        part_id INTEGER REFERENCES parts(id) ON DELETE RESTRICT,
        quantity_used INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS repair_logs (
        id SERIAL PRIMARY KEY,
        repair_id INTEGER REFERENCES repairs(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        await db.any(queryText);
        console.log('All database tables verified / created successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error executing database migration:', err);
        process.exit(1);
    }
};

createTables();