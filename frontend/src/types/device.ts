export type DeviceStatus = 'acquired' | 'broken' | 'in_repair' | 'refurbished' | 'listed' | 'sold';

export interface Device {
    id: number;
    name: string;
    category: string;
    serial_number: string | null;
    status: DeviceStatus;
    purchase_price: string | number; // PostgreSQL decimals come across as strings via pg-promise
    sold_price: string | number | null;
    created_at: string;
}